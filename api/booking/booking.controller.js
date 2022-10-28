const { create, getBooking, getBookingById, updateBooking, deleteBooking } = require("./booking.service");

module.exports = {
    addBooking: (req,res)=>{
        const body = req.body;
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error."
                });
            }
            return res.status(201).json({
                success: 1,
                data: results
            });
        });
    },
    getBookingById : (req,res) => {
        const id = req.params.id;
        getBookingById(id,(error,results) =>{
            if(error){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(404).json({
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
    getBooking: (req,res) => {
        getBooking((err,results) => {
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
    updateBooking : (req,res) =>{
        const body = req.body;
        const id = req.params.id;
        updateBooking(body,id,(err,results) =>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(400).json({
                    success : 0,
                    message : "Failed to update Booking"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "updated successfully"
            });
        });
    },
    deleteBooking : (req,res) => {
        const id = req.params.id;
        deleteBooking(id,(err,results) => {
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
                message : "Booking deleted successfully."
            });
        });
    }
}