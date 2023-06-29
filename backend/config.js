const JWTSECRET = 'SECRET';
const SESSSECURITY = 'SESSSECURITY';
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const ENV = 'local';
// const ENV = 'production';

module.exports = {
    ENV: ENV,
    jwtSecret: JWTSECRET,
    SESSSECURITY: SESSSECURITY,
    mongodburi: 'mongodb://3.13.217.87:27017/dagapp'
};