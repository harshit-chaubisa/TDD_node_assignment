const  { verify } = require("jsonwebtoken");
const ck = require("ckey");

module.exports ={
    checkUserToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token) {
            token = token.slice(7);
            verify(token, ck.USER_SECRET, (err,decoded) => {
                if(err){
                    res.status(400).json({
                        success : 0,
                        message : "Invalid token."
                    });
                }
                else{
                    next();
                }
            });
        }
        else{
            res.status(401).json({
                success : 0,
                message : "Access denied! Unauthorized user."
            });
        }
    },
    checkAdminToken: (req, res, next) =>{
        let token = req.get("authorization");
        if(token) {
            token = token.slice(7);
            verify(token, ck.ADMIN_SECRET, (err,decoded) => {
                if(err){
                    res.status(400).json({
                        success : 0,
                        message : "Invalid token."
                    });
                }
                else{
                    next();
                }
            });
        }
        else{
            res.status(401).json({
                success : 0,
                message : "Access denied! Unauthorized user."
            });
        }
    }
}