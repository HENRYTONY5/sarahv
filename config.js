exports.PORT = exports.DB_USER = exports.DB_PORT = exports.DB_PASSWORD = exports.DB_HOST = exports.DB_DATABASE = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();

// console.log(process.env.PORT)
// console.log(process.env.DB_HOST)
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASSWORD)
// console.log(process.env.DB_DATABASE)

const PORT = process.env.PORT ;
exports.PORT = PORT;
const DB_USER = process.env.DB_USER;
exports.DB_USER = DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD || 'secret';
exports.DB_PASSWORD = DB_PASSWORD;
const DB_HOST = process.env.DB_HOST || 'localhost';
exports.DB_HOST = DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE || 'companydb';
exports.DB_DATABASE = DB_DATABASE;
const DB_PORT = process.env.DB_PORT || '33060';
exports.DB_PORT = DB_PORT;
exports.JWT_TIMPO_EXPIRA = exports.JWT_SECRETO = exports.JWT_COOKIE_EXPIRA = void 0;
const JWT_SECRETO = process.env.JWT_SECRETO;
exports.JWT_SECRETO = JWT_SECRETO;
const JWT_TIMPO_EXPIRA = process.env.JWT_TIMPO_EXPIRA;
exports.JWT_TIMPO_EXPIRA = JWT_TIMPO_EXPIRA;
const JWT_COOKIE_EXPIRA = process.env.JWT_COOKIE_EXPIRA;
exports.JWT_COOKIE_EXPIRA = JWT_COOKIE_EXPIRA;