const { create, getAdmin, getAdminById, updateAdmin, deleteAdmin, adminLogin } = require("./admin.service");
const { hashSync, genSaltSync, compareSync  } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const ck = require("ckey");

module.exports = {
    createAdmin: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.psswd = hashSync(body.psswd,salt);
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
    getAdminById : (req,res) => {
        const id = req.params.id;
        getAdminById(id,(error,results) =>{
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
    getAdmin: (req,res) => {
        getAdmin((err,results) => {
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
    updateAdmin : (req,res) =>{
        const body = req.body;
        const id = req.params.id;
        const salt = genSaltSync(10);
        body.psswd = hashSync(body.psswd,salt);
        updateAdmin(body,id,(err,results) =>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(400).json({
                    success : 0,
                    message : "Failed to update admin"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "Updated successfully"
            });
        });
    },
    deleteAdmin : (req,res) => {
        const id = req.params.id;
        deleteAdmin(id,(err,results) => {
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
                message : "Admin deleted successfully."
            });
        });
    },
    adminLogin: (req,res) => {
        const body = req.body;
        adminLogin(body.userName,(err,results) => {
            if(err){
                console.log(err);
            }
            if(!results){
                return res.status(401).json({
                    success :0,
                    data : "Invalid username or password."
                });
            }
            const result = compareSync(body.psswd,results.psswd);
            if(results){
                results.psswd = undefined;
                const jsontoken = sign({result :results}, ck.ADMIN_SECRET);
                return res.status(200).json({
                    success : 1,
                    message : "login successful",
                    token : jsontoken
                });
            }else{
                return res.status(401).json({
                    success : 0,
                    data : "Invalid username or password."
                });
            }
        });
    }
};