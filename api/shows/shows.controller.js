const { create, getShows, getShowsById, updateShows, deleteShows } = require("./shows.service");

module.exports = {
    addShows: (req,res)=>{
        const body = req.body;
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(409).json({
                    success: 0,
                    message: "Show Already Exists."
                });
            }
            return res.status(201).json({
                success: 1,
                data: results
            });
        });
    },
    getShowsById : (req,res) => {
        const id = req.params.id;
        getShowsById(id,(error,results) =>{
            if(error){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(404).json({
                    success : 0,
                    message : "Show not found."
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },
    getShows: (req,res) => {
        getShows((err,results) => {
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
    updateShows : (req,res) =>{
        const body = req.body;
        const id = req.params.id;
        updateShows(body,id,(err,results) =>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(400).json({
                    success : 0,
                    message : "failed to update shows"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "updated successfully"
            });
        });
    },
    deleteShows : (req,res) => {
        const id = req.params.id;
        deleteShows(id,(err,results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(404).json({
                    success : 0,
                    message : "Record not Found"
                });
            }
            return res.status(200).json({
                success :1,
                message : "Show deleted successfully."
            });
        });
    }
}