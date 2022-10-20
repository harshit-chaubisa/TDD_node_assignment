const { expect } = require("chai");
const request = require("supertest");
const { response } = require("../app");
const app = require("../app");


// test cases for adding new show (post request for show.)
describe('Adding new show.', () => {
    it('Returns 201 created when new show is added.', () =>{
        return request(app)
        .post('/api/show')
        .send({
            movieId : 1,
            auditoriumId : 1,
            screeningTime : "",
            screenNo : 6
        })
        .expect(201);
    });

    it('Returns 409 conflict as the show is already present.', () => {
        return request(app)
        .post('/api/show')
        .send({
            movieId : 1,
            auditoriumId : 1,
            screeningTime : "",
            screenNo : 6
        })
        .expect(409)
        .then((response) => {
            expect({
                success : 0,
                message : "show already exists."
            })
        });
    });
});

// test cases for getting shows(get request for accessing all shows and also get show by id.)
describe("Get shows.", () => {
    it('Returns 200 Ok for getting all the shows.', () => {
        return request(app)
        .get('/api/show')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                data : [
                    {
                        id : 1,
                        movieId : 1,
                        auditoriumId : 1,
                        screeningTime : "",
                        screenNo : 6
                    }
                ]
            });
        });
    });

    it('Returns 200 Ok for getting an show with the help of its id.', () => {
        return request(app)
        .get('/api/show/1')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                data : [
                    {
                        id : 1,
                        movieId : 1,
                        auditoriumId : 1,
                        screeningTime : "",
                        screenNo : 6
                    }
                ]
            });
        });
    });

    it('Returns 404 Not Found where the show doesnt exists.', () => {
        return request(app)
        .get('/api/show/44')
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : "Record not found."
            });
        });
    });
});

// Test cases for patch request of show entity.
describe('update show.', () => {
    it('Returns 200 OK when the update is successful.', () => {
        return request(app)
        .patch('/api/show/2')
        .send({
            movieId : 1,
            auditoriumId : 2,
            screeningTime : "",
            screenNo : 4
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
        .patch('/api/show/1')
        .send({
            movieId : 1,
            auditoriumId : 1,
            screeningTime : ""
        })
        .expect(400)
        .then((response) => {
            expect({
                success : 0,
                message : "Failed to Update show."
            });
        });
    });
});

// Test cases for delete show Request of the user.
describe('Delete show' ,() =>{
    it('Returns 404 Not Found where the show was not found.', () => {
        return request(app)
        .delete('/api/show/22')
        .expect(404)
        .then((response) => {
            expect({
                success : 1,
                message : "Record Not found."
            });
        });
    });

    it('Returns 200 Ok where the show was deleted successfully.', () => {
        return request(app)
        .delete('/api/show/1')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "show deleted Successfully."
            });
        });
    });
});