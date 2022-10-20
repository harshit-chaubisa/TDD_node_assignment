const { expect } = require("chai");
const request = require("supertest");
const { response } = require("../app");
const app = require("../app");


// test cases for adding new movie (post request for movie.)
describe('Adding new movie.', () => {
    it('Returns 201 created when new movie is added.', () =>{
        return request(app)
        .post('/api/movie')
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
        .post('/api/movie')
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

    it('Returns 400 Bad Request as the post data is not complete', () => {
        return request(app)
        .post('/api/movie')
        .send({
            title : "",
            director : "Salmaan Khan",
            prodCast : "Salmaan Khan",
            description : "",
            durationMin : 180
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

// test cases for getting movies(get request for accessing all movies and also get movie by id.)
describe("Get movies.", () => {
    it('Returns 200 Ok for getting all the movies.', () => {
        return request(app)
        .get('/api/movie')
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
                    },
                ]
            });
        });
    });

    it('Returns 200 Ok for getting an movie with the help of its id.', () => {
        return request(app)
        .get('/api/movie/1')
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
                    },
                ]
            });
        });
    });

    it('Returns 404 Not Found where the user doesnt exists.', () => {
        return request(app)
        .get('/api/movie/44')
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

    it('Returns 400 Bad Request when the request is not valid.', () => {
        return request(app)
        .patch('/api/movie/1')
        .send({
            title : "Prem Ratan Dhan Paayo",
            director : "",
            durationMin : 180
        })
        .expect(400)
        .then((response) => {
            expect({
                success : 0,
                message : "Failed to Update movie."
            });
        });
    });
});

// Test cases for delete movie Request of the user.
describe('Delete movie' ,() =>{
    it('Returns 404 Not Found where the movie was not found.', () => {
        return request(app)
        .delete('/api/movie/22')
        .expect(404)
        .then((response) => {
            expect({
                success : 1,
                message : "Record Not found."
            });
        });
    });

    it('Returns 200 Ok where the movie was deleted successfully.', () => {
        return request(app)
        .delete('/api/movie/1')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "movie deleted Successfully."
            });
        });
    });
});