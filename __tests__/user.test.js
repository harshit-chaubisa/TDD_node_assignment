const { expect } = require("chai");
const request = require("supertest");
const { response } = require("../app");
const app = require("../app");


// test cases for Sign up (post request for users.)
describe('User Registration.', () => {
    it('Returns 201 created when signup request is successful.', () =>{
        return request(app)
        .post('/api/users')
        .send({
            fName : "Harshit",
            lName : "Chaubisa",
            eMail : "harshit33@gmail.com",
            phNo : "7737110740",
            psswd : "harshit"
        })
        .then((response) => {
            expect(response.status).toBe(201);
            done();
        });
    });

    it('Returns 409 conflict as user already exists', () => {
        return request(app)
        .post('/api/users')
        .send({
            fName : "Harshit",
            lName : "Chaubisa",
            eMail : "harshit33@gmail.com",
            phNo : "7737110740",
            psswd : "harshit"
        })
        .expect(201)
        .then((response) => {
            expect({
                success : 0,
                message : "User already exists."
            })
            done();
        });
    });

    it('Returns 400 Bad Request as the post data is not complete', () => {
        return request(app)
        .post('/api/users')
        .send({
            fName : "Arvind",
            lName : "Yadav",
            eMail : "",
            phNo : "9933882211",
            psswd : "arvind"
        })
        .expect(400)
        .then((response) => {
            expect({
                success : 0,
                message : "Please enter all the requests properly."
            })
            done();
        });
    });
});


// test cases for user login (post request for login.)
describe("User Login", () => {
    it('Returns 200 on successful login.', () => {
        return request(app)
        .post('/api/users/login')
        .send({
            phNo : "7737110740",
            psswd : "harshit"
        })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "Login Successful.",
                token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjgsImZOYW1lIjoiVGFudSIsImxOYW1lIjoiU2hhcm1hMiIsImVNYWlsIjoidGFudUBnbWFpbC5jb20iLCJwaE5vIjoiODg4Nzc3MzMzMiJ9LCJpYXQiOjE2NjYwODg0MTF9.BuSKU6rmD7GM_yyPvF-zqivi5W9TuoftSB_vwdBR4w4"
            });
            done();
        });
    });

    it('Returns 400 for entering incomplete login details. ', () => {
        return request(app)
        .post('/api/users/login')
        .send({
            phNo : "",
            psswd : "harshit"
        })
        .expect(400)
        .then((response) => {
            expect({
                success : 0,
                message : "Please enter all the details."
            });
            done();
        });
    });

    it('Returns 401 for entering wrong phone number or password. ', () => {
        return request(app)
        .post('/api/users/login')
        .send({
            phNo : "8883332221",
            psswd : "harshit"
        })
        .expect(401)
        .then((response) => {
            expect({
                success : 0,
                message : "Invalid phone number or password."
            });
            done();
        });
    });
});

// test cases for getting users(get request for accessing all users and also get user by id.)
describe("Get Users.", () => {
    it('Returns 200 Ok for getting all the users.', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then((response) => {
            expect({
                "success": 1,
                "data": [
                    {
                        "id": 1,
                        "fName": "Harshit",
                        "lName": "Chaubisa",
                        "eMail": "harshit33@gmail.com",
                        "phNo": "7737110740",
                        "psswd": "$2b$10$4xdYgmuE3jUJ6ba0xCq8DenCBpuiXymnXKAyYp0oy3ogMcnMENLqG"
                    }
                ]
            });
            done();
        });
    });

    it('Returns 200 Ok for getting a user with the help of its id.', () => {
        return request(app)
        .get('/api/users/1')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                data : [
                    {
                        "id": 1,
                        "fName": "Harshit",
                        "lName": "Chaubisa",
                        "eMail": "harshit33@gmail.com",
                        "phNo": "7737110740",
                        "psswd": "$2b$10$4xdYgmuE3jUJ6ba0xCq8DenCBpuiXymnXKAyYp0oy3ogMcnMENLqG"
                    }
                ]
            });
            done();
        });
    });

    it('Returns 404 Not Found where the user doesnt exists.', () => {
        return request(app)
        .get('/api/users/44')
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : "The user doesn't exists."
            });
            done();
        });
    });
});

// Test cases for patch request of user entity.
describe('update user.', () => {
    it('Returns 200 OK when the update is successful.', () => {
        return request(app)
        .patch('/api/users/1')
        .send({
            fName : "Khushi",
            lName : "Sharma",
            eMail : "harshit33@gmail.com",
            phNo : "7737110740",
            psswd : "chaubisa"
        })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "Updated successfully."
            });
            done();
        });
    });

    it('Returns 400 Bad Request when the request is not valid.', () => {
        return request(app)
        .patch('/api/users/1')
        .send({
            fName : "Khushi",
            lName : "Sharma",
            eMail : "",
            phNo : "",
            psswd : "chaubisa"
        })
        .expect(400)
        .then((response) => {
            expect({
                success : 0,
                message : "Failed to Update user."
            });
            done();
        });
    });
});

// Test cases for delete Request of the user.
describe('Delete User' ,() =>{
    it('Returns 404 Not Found where the user was not found.', () => {
        return request(app)
        .delete('/api/users/22')
        .expect(404)
        .then((response) => {
            expect({
                success : 1,
                message : "Record Not found."
            });
            done();
        });
    });

    it('Returns 200 Ok where the user was deleted successfully.', () => {
        return request(app)
        .delete('/api/users/2')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "User deleted Successfully."
            });
            done();
        });
    });
});