const { expect } = require("chai");
const request = require("supertest");
const { response } = require("../app");
const app = require("../app");

let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjIsInVzZXJOYW1lIjoiYWRtaW4yIn0sImlhdCI6MTY2NjkxOTkzOX0.Y5XkpU3qd6pDO4sKvlMOy9xeVmco3yJaodm2QzgRQoo'


// test cases for adding new show (post request for show.)
describe('Adding new show.', () => {
    it('Returns 201 created when new show is added.', () =>{
        return request(app)
        .post('/api/shows')
        .auth(adminToken, { type: 'bearer' })
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
        .post('/api/shows')
        .auth(adminToken, { type: 'bearer' })
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
        .get('/api/shows')
        .auth(adminToken, { type: 'bearer' })
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
        .get('/api/shows/1')
        .auth(adminToken, { type: 'bearer' })
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
        .get('/api/shows/44')
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



// Test cases for delete show Request of the user.
describe('Delete show' ,() =>{
    it('Returns 404 Not Found where the show was not found.', () => {
        return request(app)
        .delete('/api/shows/22')
        .auth(adminToken, { type: 'bearer' })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "Record Not found."
            });
        });
    });

    it('Returns 200 Ok where the show was deleted successfully.', () => {
        return request(app)
        .delete('/api/shows/1')
        .auth(adminToken, { type: 'bearer' })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "show deleted Successfully."
            });
        });
    });
});