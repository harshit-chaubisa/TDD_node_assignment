const { create, getAuditoriumById, getAuditoriums, updateAuditorium, deleteAuditorium } = require("./auditorium.service");

module.exports = {
    addAuditorium: (req,res)=>{
        const body = req.body;
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(409).json({
                    success: 0,
                    message: "Record already exists."
                });
            }
            if(!results){
                return res.status(404).json({
                    success : 0,
                    message : "Record not found."
                });
            }
            return res.status(201).json({
                success: 1,
                data: results
            });
        });
    },
    getAuditoriumById : (req,res) => {
        const id = req.params.id;
        getAuditoriumById(id,(error,results) =>{
            if(error){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(200).json({
                    success : 0,
                    message : "Record not found."
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },
    getAuditoriums: (req,res) => {
        getAuditoriums((err,results) => {
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
    updateAuditorium : (req,res) =>{
        const body = req.body;
        const id = req.params.id;
        updateAuditorium( body,id,(err,results) =>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(400).json({
                    success : 0,
                    message : "Failed to update auditorium."
                })
            }
            return res.status(200).json({
                success : 1,
                message : "updated successfully"
            });
        });
    },
    deleteAuditorium : (req,res) => {
        const id = req.params.id;
        deleteAuditorium(id,(err,results) => {
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
                message : "Auditorium deleted successfully."
            });
        });
    }
}