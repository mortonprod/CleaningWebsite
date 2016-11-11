/// @function This is the module for storing all variables which might be used throughout the site.
export default function global() {
    var con = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'cleanBase'
    };
    var mail = {
        user: 'atticusfbf@gmail.com',
        pass: '975975975'
    };
    var mailOptions = {
        from: 'atticusfbf@gmail.com', // This does not do anything????
        to: 'mortonprod@gmail.com' // list of receivers
    };
    return {
        con: con,
        mail: mail,
        mailOptions: mailOptions
    }
}