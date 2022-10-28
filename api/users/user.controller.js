const { create, getUserById, getUsers, updateUser, deleteUser, getUserByPhNo, getAdmin } = require("./user.service");
const { hashSync, genSaltSync, compareSync  } = require("bcrypt");
const { sign, JsonWebTokenError } = require("jsonwebtoken");
const ck = require("ckey");

module.exports = {
    createUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.psswd = hashSync(body.psswd,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(409).json({
                    success: 0,
                    message: "User already exists."
                });
            }
            if(!results){
                return res.status(400).json({
                    success : 0,
                    message : "Please enter all the parameters properly."
                });
            }
            return res.status(201).json({
                success: 1,
                data: results
            });
        });
    },
    getUserById : (req,res) => {
        const id = req.params.id;
        getUserById(id,(error,results) =>{
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
    getUsers: (req,res) => {
        getUsers((err,results) => {
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
    updateUser : (req,res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.psswd = hashSync(body.psswd,salt);
        const id = req.params.id;
        updateUser(body,id,(err,results) =>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(400).json({
                    success : 0,
                    message : "failed to update user"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "updated successfully"
            });
        });
    },
    deleteUser : (req,res) => {
        const id = req.params.id;
        deleteUser(id,(err,results) => {
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
                message : "user deleted successfully."
            });
        });
    },
    login: (req,res) => {
        const body = req.body;
        getUserByPhNo(body.phNo,(err,results) => {
            if(err) { 
                console.log(err);
            }
            if(!results){
                return res.status(400).json({
                    success : 0,
                    data : "Invalid phone number or password."
                });
            }
            const result = compareSync(body.psswd,results.psswd);
            if(result){
                results.psswd = undefined;
                const jsontoken = sign({result : results}, ck.USER_SECRET);
                return res.status(200).json({
                    success : 1,
                    message : "login successful",
                    token : jsontoken
                });
            }else{
                return res.status(401).json({
                    success : 0,
                    data : "Invalid phone number or password"
                });
            }
        });
    }
};