const pool = require("../../config/database");

module.exports = {
    create: (data,callBack) =>{
        pool.query(
            'INSERT INTO `shows`(movieId, auditoriumId,screeningTime, screenNo) VALUES(?,?,?,?)',
            [
                data.movieId,
                data.auditoriumId,
                data.screeningTime,
                data.screenNo
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                return callBack(null,results)
            }
        );
    },
    getShows: callBack=>{
        pool.query(
            'SELECT * FROM `shows`',
            [],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );

    },
    getShowsById: (id,callBack) =>{
        pool.query(
            'SELECT * FROM `shows` WHERE id = ?',
            [id],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    updateShows : (data,id,callBack) =>{
        pool.query(
            'UPDATE `shows` set movieId = ?, auditoriumId = ?, screenNo = ? where id = ?',
            [
                data.movieId,
                data.auditoriumId,
                data.screenNo,
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
    deleteShows : (id,callBack)=>{
        pool.query(
            'DELETE FROM `shows` where id = ?',
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