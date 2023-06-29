const jwt = require('jsonwebtoken');
const config = require('../config.js');

const isAuthenticated = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const authorizationToken = authorizationHeader.split(' ')[1];
    const sessToken = req.session.auth_token;
    if (sessToken) {
        if (authorizationToken) {
            jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
                if (err) {
                    res.status(200).json({ errors: 'Unauthorized' });
                } else {
                    if(sessToken === authorizationToken) {
                        req.authorId = decoded.id;
                        next();
                    }
                    res.status(200).json({ errors: 'Unauthorized' });
                }
            });
        } else {
            res.status(200).json({ errors: 'Unauthorized' })
        }
    } else {
        return res.status(200).json({ errors: "Unauthorized" });
    }
}

module.exports = isAuthenticated;
