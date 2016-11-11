/// <reference path="../../../typings/index.d.ts" />
// Two databases: users + dates/times
// Users infor link to dates/times

//User table(Rows:User columns:name,email,id-datetime....):
//datestime table(Rows:datetimes Columns:Users); id-datetime id-user  
//SQL: Add right to join to get all the dates for the single user.
///SELECT User.name, Date.date, Date.time FROM Users INNER RIGHT JOIN Date ON User.id = Date.user.id;
import * as mysql from 'mysql';
import * as Promise from "promises"; ///TODO:Stupid typings!!!!!
import param from "../config/global";
var connection = mysql.createConnection(param().con);
export function database() {
    function getUserFromDB(email: string, password: string) {
        return new Promise(function (resolve, reject) {
            var insertQuery = "SELECT FirstName, SecondName, email, Password FROM Users WHERE email = '" + email + "' AND Password = '" + password + "'";
            connection.query(insertQuery, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    var user = {};
                    user.name = rows[0].FirstName + " " + rows[0].SecondName;
                    user.email = rows[0].email;
                    resolve(user);
                }
            });
        });
    }
    function setNewUser(email: string, password: string) {
        return new Promise(function (resolve, reject) {
            var user = new Object();
            user.email = email;
            user.password = password; // use the generateHash function in our user model
            var insertQuery = "INSERT INTO Users ( email, password ) values ('" + email + "','" + password + "')";
            console.log(insertQuery);
            connection.query(insertQuery, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    user.id = rows.insertId;
                    resolve(user);
                }
            });
        })
    }
    function getDateTimeFromUser(id: number) {
        return new Promise(function (resolve, reject) {
            var insertQuery = "SELECT User.name, Date.date, Date.timeStart,Date.timeEnd FROM Users INNER RIGHT JOIN Date ON '" + id + "' = Date.user.id";
            connection.query(insertQuery, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    var user = new Object();
                    user.name = rows[0].FirstName + " " + rows[0].SecondName;
                    user.datetime = []
                    rows.forEach(function (el) {
                        user.datetime.push([el.date,el.timeStart,el.timeEnd]);
                    });
                    resolve(user);
                }
            });
        })
    }
    return {
        getDateTimeFromUser,
        setNewUser,
        getUserFromDB
    };
} 