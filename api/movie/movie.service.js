const pool = require("../../config/database");

module.exports = {
    create: (data,callBack) =>{
        pool.query(
            'INSERT INTO `movies`(title, director, prodCast, description, durationMin) VALUES(?,?,?,?,?)',
            [
                data.title,
                data.director,
                data.prodCast,
                data.description,
                data.durationMin,
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                return callBack(null,results)
            }
        );
    },
    getMovies: callBack=>{
        pool.query(
            'SELECT * FROM `movies`',
            [],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );

    },
    getMoviesById: (id,callBack) =>{
        pool.query(
            'SELECT * FROM `movies` WHERE id = ?',
            [id],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    updateMovies : (data,id,callBack) =>{
        pool.query(
            'UPDATE `movies` set title = ?, director = ?, prodCast = ?, description = ?, durationMin = ? where id = ?',
            [
                data.title,
                data.director,
                data.prodCast,
                data.description,
                data.durationMin ,
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
    deleteMovie : (id,callBack)=>{
        pool.query(
            'DELETE FROM `movies` where id = ?',
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