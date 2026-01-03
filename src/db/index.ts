import dotenv from 'dotenv';
dotenv.config();

console.log('POSTGRES ENV VARS:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '[HIDDEN]' : 'undefined');
console.log('DB_NAME:', process.env.DB_NAME);
