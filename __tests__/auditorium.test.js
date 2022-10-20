const { expect } = require("chai");
const request = require("supertest");
const { response } = require("../app");
const app = require("../app");


// test cases for adding new auditorium (post request for auditorium.)
describe('Adding new auditorium.', () => {
    it('Returns 201 created when new auditorium is added.', () =>{
        return request(app)
        .post('/api/auditorium')
        .send({
            name : "PVR",
            seats : 150
        })
        .then((response) => {
            expect(response.status).toBe(201);
        });
    });

    it('Returns 409 conflict as the auditorium is already present.', () => {
        return request(app)
        .post('/api/auditorium')
        .send({
            name : "PVR",
            seats : 150
        })
        .expect(409)
        .then((response) => {
            expect({
                success : 0,
                message : "Auditorium already exists."
            })
        });
    });

    it('Returns 400 Bad Request as the post data is not complete', () => {
        return request(app)
        .post('/api/auditorium')
        .send({
            name : "",
            seats : 230
        })
        .expect(400)
        .then((response) => {
            expect({
                success : 0,
                message : "Please enter all the parameters properly."
            })
        });
    });
});

// test cases for getting auditoriums(get request for accessing all auditoriums and also get auditorium by id.)
describe("Get auditoriums.", () => {
    it('Returns 200 Ok for getting all the auditoriums.', () => {
        return request(app)
        .get('/api/auditorium')
        .expect(200)
        .then((response) => {
            expect({
                    success: 1,
                    data: [
                        {
                            id: 1,
                            name: "PVR",
                            seats: 150
                        }
                    ]
            });
        });
    });

    it('Returns 200 Ok for getting an auditorium with the help of its id.', () => {
        return request(app)
        .get('/api/auditorium/1')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                data : [
                    {
                        id : 1,
                        name : "PVR",
                        seats : 150
                    },
                ]
            });
        });
    });

    it('Returns 404 Not Found where the auditorium doesnt exists.', () => {
        return request(app)
        .get('/api/auditorium/44')
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : "Record not found."
            });
        });
    });
});

// Test cases for patch request of auditorium entity.
describe('update auditorium.', () => {
    it('Returns 200 OK when the update is successful.', () => {
        return request(app)
        .patch('/api/auditorium/2')
        .send({
            name : "Inox",
            seats : 160
        })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "Updated successfully."
            });
        });
    });

    it('Returns 400 Bad Request when the request is not valid.', () => {
        return request(app)
        .patch('/api/auditorium/1')
        .send({
            name : "",
            seats : 160
        })
        .expect(400)
        .then((response) => {
            expect({
                success : 0,
                message : "Failed to Update auditorium."
            });
        });
    });
});

// Test cases for delete auditorium Request of the user.
describe('Delete auditorium' ,() =>{
    it('Returns 404 Not Found where the auditorium was not found.', () => {
        return request(app)
        .delete('/api/auditorium/22')
        .expect(404)
        .then((response) => {
            expect({
                success : 1,
                message : "Record Not found."
            });
        });
    });

    it('Returns 200 Ok where the auditorium was deleted successfully.', () => {
        return request(app)
        .delete('/api/auditorium/1')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "Auditorium deleted Successfully."
            });
        });
    });
});