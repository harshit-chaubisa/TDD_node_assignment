const pool = require("../../config/database");

module.exports = {
    create: (data,callBack) =>{
        pool.query(
            'INSERT INTO `auditorium`(name, seats) VALUES(?,?)',
            [
                data.name,
                data.seats
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                return callBack(null,results)
            }
        );
    },
    getAuditoriums: callBack=>{
        pool.query(
            'SELECT * FROM `auditorium`',
            [],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );

    },
    getAuditoriumById: (id,callBack) =>{
        pool.query(
            'SELECT * FROM `auditorium` WHERE id = ?',
            [id],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    updateAuditorium : (data,id,callBack) =>{
        pool.query(
            'UPDATE `auditorium` set name = ?, seats = ? where id = ?',
            [
                data.name,
                data.seats,
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
    deleteAuditorium : (id,callBack)=>{
        pool.query(
            'DELETE FROM `auditorium` where id = ?',
            [id],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    }
}