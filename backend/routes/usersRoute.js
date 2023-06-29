const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/usersModel.js');
const config = require('../config');

const router = express.Router();

// Check if E-mail is Valid or not
const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * Check uniqueness for the certain user.
 * 
 * @param {*} field 
 * @param {*} value 
 * @returns 
 */
const checkUserUniqueness = async (field, value) => {
    return new Promise((resolve, reject)=>{
        User.findOne({ [field]: value }).exec().
        then(user=>{
            if (Boolean(user)) {
                res = { error: { [field]: "This " + field + " is not available" }, isUnique: false };
            } else {
                res = { error: { [field]: "" }, isUnique: true };
            }
            resolve(res);
        })
        .catch(err=>{
            reject({isUnique: false, error: err.message});
        })
    })
    
}

/**
 * Check validate
 * 
 * @param {*} req
 * @param {*} res
 */
router.post('/validate', async (req, res) => {
    const { field, value } = req.body;
    const { error, isUnique } = await checkUserUniqueness(field, value);

    if (isUnique) {
        res.json({ success: 'success' });
    } else {
        res.json({ error });
    }
});

/**
 * Sign up
 * 
 * @param req
 * @param res
 */
router.post('/signup', async (req, res) => {
    const fname = req.body.fname || '';
    const lname = req.body.lname || '';
    const country = req.body.country || '';
    const genre = req.body.genre || '';
    const mobile = req.body.mobile || '';
    const email = req.body.email || '';
    const role = req.body.role || '';
    const password = req.body.password || '';
    const confirmPassword = req.body.confirmPassword || '';

    const reqBody = { fname, lname, email, country, mobile, role, password, confirmPassword };

    let errors = {};

    for (let field in reqBody) {
        if (reqBody[field] === '') {
            errors = { ...errors, [field]: 'This field is required' }
        }
        if (field === 'email') {
            const value = reqBody[field];
            const { error, isUnique } = await checkUserUniqueness(field, value);
            console.log('aaaaaaaaaaa ', error, isUnique);
            if (!isUnique) {
                errors = { ...errors, ...error };
            }
        }
        if (field === 'email' && !validateEmail(reqBody[field])) {
            errors = { ...errors, [field]: 'Not a valid Email' }
        }
        if (field === 'password' && password !== '' && password < 4) {
            errors = { ...errors, [field]: 'Password too short' }
        }
        if (field === 'confirmPassword' && confirmPassword !== password) {
            errors = { ...errors, [field]: 'Passwords do not match' }
        }
    }

    if (Object.keys(errors).length > 0) {
        res.json({ errors });
    } 
    else {
        const newUser = new User({
            fname: fname,
            lname: lname,
            email: email,
            country: country,
            mobile: mobile,
            genre: genre,
            role: role,
            password: password
        });

        // Generate the Salt
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return err;
            // Create the hashed password
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) return err;
                newUser.password = hash;
                // Save the User
                newUser.save().then(() => {
                    res.json({ status: true });
                }).catch(err => {
                    res.json({ status: false, msg: err.message });
                })
            });
        });
    }
});

/** 
 * User login
 * 
 */
router.post('/login', (req, res) => {
    const email = req.body.email || '';
    const password = req.body.password || '';

    let errors = {};

    if (email === '') {
        errors = { ...errors, email: 'This field is required' };
    }
    if (password === '') {
        errors = { ...errors, password: 'This field is required' };
    }

    if (Object.keys(errors).length > 0) {
        res.json({ errors });
    } else {
        User.findOne({ email: email }).exec().then(user => {
            if (Boolean(user)) {
                if (!user.emailVerified) {
                    res.json({ status: false, msg: 'Email is not verified.' });
                    return;
                }
                // Match Password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) return err;
                    if (isMatch) {
                        const token = jwt.sign({
                            id: user._id,
                            username: user.username,
                            role: user.role,
                            expiredAt: new Date().getTime() + 365 * 24 * 3600 * 1000
                        }, config.jwtSecret);
                        req.session.auth_token = token;
                        res.json({ token, status: true })
                    } else {
                        res.json({ msg: 'Invalid Username or Password', status: false });
                    }
                });
            } else {
                res.json({ msg: 'Invalid Username or Password', status: false });
            }
        }).catch(err => {
            console.log('sdfsdfsdfdddddddddddddddddddd', err);
            res.json({ msg: err.message, status: false });
        })
    }
});

/**
 * logout
 */
router.delete('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw (err);
        }
        res.clearCookie("session-id");
        res.json({ status: false, msg: 'Logged out successfully' });
    });
})

module.exports = router;