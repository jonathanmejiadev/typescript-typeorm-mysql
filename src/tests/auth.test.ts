import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index'
import { provideToken } from '../libs/jwt';

const assert = chai.assert;
chai.use(chaiHttp);

let userId: String;
let confirmToken: String;
let token: String;

describe("POST /auth/register", () => {
    it("register a user with valid data", (done) => {
        const userData = {
            username: 'usertest',
            password: 'passtest',
            email: 'email@test.com',
            roles: ['ADMIN']
        };

        chai.request(app)
            .post('/auth/register')
            .send(userData)
            .end(function (err, res) {
                userId = res.body.data.id;
                confirmToken = provideToken(res.body.data.id);
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

    it('confirm email with valid confirmToken', (done) => {
        chai.request(app)
            .get(`/auth/confirmation/${confirmToken}`)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.success, true);
                done();
            })
    })

    it('confirm email with invalid confirmToken', (done) => {
        chai.request(app)
            .get(`/auth/confirmation/12321321321asd`)
            .end(function (err, res) {
                assert.equal(res.status, 401);
                assert.equal(res.body.success, false);
                done();
            })
    })

});

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
    });
});

describe('GET /user/profile', () => {
    it('get profile with valid userId', (done) => {
        chai.request(app)
            .get('/user/profile')
            .set('Authorization', `Bearer ${token}`)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.success, true);
                done();
            })
    })
})

describe('DELETE /user/deleteAccount', () => {
    it('delete current user account', (done) => {
        chai.request(app)
            .delete('/user/deleteAccount')
            .set('Authorization', `Bearer ${token}`)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.success, true);
                done();
            });
    });
});