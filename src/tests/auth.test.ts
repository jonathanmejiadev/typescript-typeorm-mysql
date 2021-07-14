import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index'
//import request from 'supertest';

const assert = chai.assert;
chai.use(chaiHttp);

let userId;
let token;

describe("POST /auth/register", () => {
    it("register a user with valid data", (done) => {
        const userData = {
            username: 'usertest',
            password: 'passtest',
            email: 'email@test.com',
            roles: ['ADMIN']
        }

        chai.request(app)
            .post('/auth/register')
            .send(userData)
            .end(function (err, res) {
                assert.equal(res.status, 201);
                assert.equal(res.body.success, true);
                done();
            })
    });

    it('register a user with username already taken', (done) => {
        const userData = {
            username: 'usertest',
            password: 'passtest',
            email: 'email@test.com',
            roles: ['ADMIN']
        }
        chai.request(app)
            .post('/auth/register')
            .send(userData)
            .end(function (err, res) {
                assert.equal(res.status, 409);
                assert.equal(res.body.success, false);
                done();
            })
    });

    it('register a user with invalid password', (done) => {
        const userData = {
            username: 'usertest',
            password: '',
            email: 'email@test.com',
            roles: ['ADMIN']
        }
        chai.request(app)
            .post('/auth/register')
            .send(userData)
            .end(function (err, res) {
                assert.equal(res.status, 422);
                assert.equal(res.body.success, false);
                done();
            })
    });

    it('register a user with invalid email', (done) => {
        const userData = {
            username: 'usertest',
            password: 'passtest',
            email: 'email',
            roles: ['ADMIN']
        }
        chai.request(app)
            .post('/auth/register')
            .send(userData)
            .end(function (err, res) {
                assert.equal(res.status, 422);
                assert.equal(res.body.success, false);
                done();
            })
    });

    it('register a user with invalid role', (done) => {
        const userData = {
            username: 'usertest',
            password: 'passtest',
            email: 'email',
            roles: [1]
        }
        chai.request(app)
            .post('/auth/register')
            .send(userData)
            .end(function (err, res) {
                assert.equal(res.status, 422);
                assert.equal(res.body.success, false);
                done();
            })
    });
});

describe('Confirm email', () => {

    it('confirm email with valid token', (done) => {
        chai.request(app)
            .get(`/confirmation/:confirmCode`)
            .end(function (err, res) {

            })
    })
})

describe('POST /auth/login', () => {
    it('login user with valid data', (done) => {
        const userData = {
            username: 'usertest',
            password: 'passtest'
        }
        chai.request(app)
            .post('/auth/login')
            .send(userData)
            .end(function (err, res) {
                token = res.body.access_token;
                assert.equal(res.status, 200);
                assert.equal(res.body.success, true);
                done();
            })
    })

})