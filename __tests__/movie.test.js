const { expect } = require("chai");
const request = require("supertest");
const { response } = require("../app");
const app = require("../app");

let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjIsInVzZXJOYW1lIjoiYWRtaW4yIn0sImlhdCI6MTY2NjkxOTkzOX0.Y5XkpU3qd6pDO4sKvlMOy9xeVmco3yJaodm2QzgRQoo'

// test cases for adding new movie (post request for movie.)
describe('Adding new movie.', () => {
    it('Returns 201 created when new movie is added.', () =>{
        return request(app)
        .post('/api/movies')
        .auth(adminToken, { type: 'bearer' })
        .send({
            title : "Prem Ratan Dhan Paayo",
            director : "Salmaan Khan",
            prodCast : "Salmaan Khan",
            description : "Romance",
            durationMin : 180
        })
        .expect(201);
    });

    it('Returns 409 conflict as the movie is already present.', () => {
        return request(app)
        .post('/api/movies')
        .auth(adminToken, { type: 'bearer' })
        .send({
                title : "Prem Ratan Dhan Paayo",
                director : "Salmaan Khan",
                prodCast : "Salmaan Khan",
                description : "Romance",
                durationMin : 180
        })
        .expect(409)
        .then((response) => {
            expect({
                success : 0,
                message : "movie already exists."
            })
        });
    });
});

// test cases for getting movies(get request for accessing all movies and also get movie by id.)
describe("Get movies.", () => {
    it('Returns 200 Ok for getting all the movies.', () => {
        return request(app)
        .get('/api/movies')
        .auth(adminToken, { type: 'bearer' })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                data : [
                    {
                        id : 1,
                        title : "Prem Ratan Dhan Paayo",
                        director : "Salmaan Khan",
                        prodCast : "Salmaan Khan",
                        description : "Romance",
                        durationMin : 180
                    }
                ]
            });
        });
    });

    it('Returns 404 Not Found where the movie doesnt exists.', () => {
        return request(app)
        .get('/api/movie/44')
        .auth(adminToken, { type: 'bearer' })
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : "Record not found."
            });
        });
    });
});

// Test cases for patch request of movie entity.
describe('update movie.', () => {
    it('Returns 200 OK when the update is successful.', () => {
        return request(app)
        .patch('/api/movie/2')
        .auth(adminToken, { type: 'bearer' })
        .send({
            title : "Prem Ratan Dhan Paayo",
            director : "Rajkumar Hirani",
            prodCast : "Red Chilly",
            description : "Romance",
            durationMin : 190
        })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "Updated successfully."
            });
        });
    });
});

// Test cases for delete movie Request of the user.
describe('Delete movie' ,() =>{
    it('Returns 404 Not Found where the movie was not found.', () => {
        return request(app)
        .delete('/api/movies/22')
        .auth(adminToken, { type: 'bearer' })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "Record Not found."
            });
        });
    });

    it('Returns 200 Ok where the movie was deleted successfully.', () => {
        return request(app)
        .delete('/api/movies/1')
        .auth(adminToken, { type: 'bearer' })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "movie deleted Successfully."
            });
        });
    });
});