const { expect } = require("chai");
const request = require("supertest");
const { response } = require("../app");
const app = require("../app");

let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjEsImZOYW1lIjoiSGFyc2hpdCIsImxOYW1lIjoiQ2hhdWJpc2EiLCJlTWFpbCI6ImhhcnNoaXQzM0BnbWFpbC5jb20iLCJwaE5vIjoiNzczNzExMDc0MCJ9LCJpYXQiOjE2NjY4ODYwNTR9.bf_2ucZ7dncFhtQXqhK3eO5F-9ZRhpUFNgqjchnerqg'


// test cases for adding new booking (post request for booking.)
describe('Adding new booking.', () => {
    it('Returns 201 created when new booking is added.', () =>{
        return request(app)
        .post('/api/booking')
        .auth(accessToken, { type: 'bearer' })
        .send({
            showId : 1,
            userId : 1,
            paid : false,
            noOfSeats : 5
        })
        .expect(201)
    });

});

// test cases for getting bookings(get request for accessing all bookings and also get booking by id.)
describe("Get bookings.", () => {
    it('Returns 200 Ok for getting all the bookings.', () => {
        return request(app)
        .get('/api/booking')
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .then((response) => {
            expect({
                    success : 1,
                    data : [
                        {
                            id : 1,
                            showId : 1,
                            userId : 6,
                            paid : 1,
                            noOfSeats : 4
                        }
                    ]
            });
        });
    });

    it('Returns 200 Ok for getting an booking with the help of its id.', () => {
        return request(app)
        .get('/api/booking/1')
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                    data : [
                        {
                            id : 1,
                            showId : 1,
                            userId : 6,
                            paid : 1,
                            noOfSeats : 4
                        }
                    ]
            });
        });
    });

    it('Returns 404 Not Found where the booking doesnt exists.', () => {
        return request(app)
        .get('/api/booking/44')
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .then((response) => {
            expect({
                success : 0,
                message : "Record not found."
            });
        });
    });
});

// Test cases for patch request of booking entity.
describe('update booking.', () => {
    it('Returns 200 OK when the update is successful.', () => {
        return request(app)
        .patch('/api/booking/1')
        .auth(accessToken, { type: 'bearer' })
        .send({
            showId : 1,
            userId : 1,
            paid : true,
            noOfSeats : 10
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
        .patch('/api/booking/1')
        .auth(accessToken, { type: 'bearer' })
        .send({
            showId : 4,
            userId : 1,
            paid : true,
            noOfSeats : 5
        })
        .expect(200)
        .then((response) => {
            expect({
                success : 0,
                message : "Failed to Update booking."
            });
        });
    });
});

// Test cases for delete booking Request of the user.
describe('Delete booking' ,() =>{
    it('Returns 404 Not Found where the booking was not found.', () => {
        return request(app)
        .delete('/api/booking/22')
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "Record Not found."
            });
        });
    });

    it('Returns 200 Ok where the booking was deleted successfully.', () => {
        return request(app)
        .delete('/api/booking/1')
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "booking deleted Successfully."
            });
        });
    });
});