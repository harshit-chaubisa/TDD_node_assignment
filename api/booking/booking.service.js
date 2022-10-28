const pool = require("../../config/database");

module.exports = {
    create: (data,callBack) =>{
        pool.query(
            'INSERT INTO `booking`(showId, userId, paid, noOfSeats) VALUES(?,?,?,?)',
            [
                data.showId,
                data.userId,
                data.paid,
                data.noOfSeats
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                return callBack(null,results)
            }
        );
    },
    getBooking: callBack=>{
        pool.query(
            'SELECT * FROM `booking`',
            [],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );

    },
    getBookingById: (id,callBack) =>{
        pool.query(
            'SELECT * FROM `booking` WHERE id = ?',
            [id],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    updateBooking : (data,id,callBack) =>{
        pool.query(
            'UPDATE `booking` set showId = ?, userId = ?, paid = ?, noOfSeats = ? where id = ?',
            [
                data.showId,
                data.userId,
                data.paid,
                data.noOfSeats,
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
    deleteBooking : (id,callBack)=>{
        pool.query(
            'DELETE FROM `booking` where id = ?',
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