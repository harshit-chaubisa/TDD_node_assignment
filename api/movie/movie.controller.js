const { create, getMovies, getMoviesById, updateMovies, deleteMovie } = require("./movie.service")

module.exports = {
    createMovie: (req,res)=>{
        const body = req.body;
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(409).json({
                    success: 0,
                    message: "Movie Already Exists"
                });
            }
            return res.status(201).json({
                success: 1,
                data: results
            });
        });
    },
    getMoviesById : (req,res) => {
        const id = req.params.id;
        getMoviesById(id,(error,results) =>{
            if(error){
                console.log(err);
                return;
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },
    getMovies: (req,res) => {
        getMovies((err,results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },
    updateMovies : (req,res) =>{
        const body = req.body;
        const id = req.params.id;
        updateMovies(body,id,(err,results) =>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(400).json({
                    success : 0,
                    message : "failed to update movie"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "updated successfully"
            });
        });
    },
    deleteMovie : (req,res) => {
        const id = req.params.id;
        deleteMovie(id,(err,results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(404).json({
                    success : 1,
                    message : "Record not Found"
                });
            }
            return res.status(200).json({
                success :1,
                message : "movie deleted successfully."
            });
        });
    }
}