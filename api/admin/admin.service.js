const pool = require("../../config/database");

module.exports = {
    create: (data,callBack) =>{
        pool.query(
            'INSERT INTO `admin`(userName, psswd) VALUES(?,?)',
            [
                data.userName,
                data.psswd
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                return callBack(null,results)
            }
        );
    },
    getAdmin: callBack=>{
        pool.query(
            'SELECT * FROM `admin`',
            [],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );

    },
    getAdminById: (id,callBack) =>{
        pool.query(
            'SELECT * FROM `admin` WHERE id = ?',
            [id],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    updateAdmin : (data,id,callBack) =>{
        pool.query(
            'UPDATE `admin` set userName = ?, psswd = ? where id = ?',
            [
                data.userName,
                data.psswd,
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    deleteAdmin : (id,callBack)=>{
        pool.query(
            'DELETE FROM `admin` where id = ?',
            [id],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    adminLogin : (userName, callBack) =>{
        pool.query(
            'SELECT * FROM `admin` WHERE userName = ?',
            [userName],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0])
            }
        )
    }
};