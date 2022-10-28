const { expect } = require("chai");
const request = require("supertest");
const { response } = require("../app");
const app = require("../app");

let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjIsInVzZXJOYW1lIjoiYWRtaW4yIn0sImlhdCI6MTY2NjkxOTkzOX0.Y5XkpU3qd6pDO4sKvlMOy9xeVmco3yJaodm2QzgRQoo'


// test cases for adding new auditorium (post request for auditorium.)
describe('Adding new auditorium.', () => {
    it('Returns 201 created when new auditorium is added.', () =>{
        return request(app)
        .post('/api/auditorium')
        .auth(adminToken, { type: 'bearer' })
        .send({
            name : "PVR",
            seats : 150
        })
        .expect(201);
    });

    it('Returns 409 conflict as the auditorium is already present.', () => {
        return request(app)
        .post('/api/auditorium')
        .auth(adminToken, { type: 'bearer' })
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
});

// test cases for getting auditoriums(get request for accessing all auditoriums and also get auditorium by id.)
describe("Get auditoriums.", () => {
    it('Returns 200 Ok for getting all the auditoriums.', () => {
        return request(app)
        .get('/api/auditorium')
        .auth(adminToken, { type: 'bearer' })
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
        .auth(adminToken, { type: 'bearer' })
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

    it('Returns 200 ok where the auditorium doesnt exists.', () => {
        return request(app)
        .get('/api/auditorium/44')
        .auth(adminToken, { type: 'bearer' })
        .expect(200)
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
        .patch('/api/auditorium/1')
        .auth(adminToken, { type: 'bearer' })
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

    it('Returns 200 ok when there is no change.', () => {
        return request(app)
        .patch('/api/auditorium/1')
        .auth(adminToken, { type: 'bearer' })
        .send({
        })
        .expect(200)
        .then((response) => {
            expect({
                success : 0,
                message : "User Updated."
            });
        });
    });
});

// Test cases for delete auditorium Request of the user.
describe('Delete auditorium' ,() =>{
    it('Returns 404 Not Found where the auditorium was not found.', () => {
        return request(app)
        .delete('/api/auditorium/22')
        .auth(adminToken, { type: 'bearer' })
        .expect(200)
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
        .auth(adminToken, { type: 'bearer' })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "Auditorium deleted Successfully."
            });
        });
    });
});