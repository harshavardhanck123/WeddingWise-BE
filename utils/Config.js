
require('dotenv').config();

const URI = process.env.URI || 'your_default_mongo_uri';
const JWT_SECRET = process.env.JWT_SECRET ||'your_default_jwt_secret';

module.exports = {
    URI,
    JWT_SECRET
};