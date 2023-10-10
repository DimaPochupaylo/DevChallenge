const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { expect } = require('chai');

const { calculatePost, getCell, getSheet } = require('./controller/apiController.js');

const app = express();
app.use(bodyParser.json());

app.get('/api/v1/:sheet_id', getSheet);
app.get('/api/v1/:sheet_id/:cell_id', getCell);
app.post('/api/v1/:sheet_id/:cell_id', calculatePost);

describe('API Tests', () => {
    it('should respond with a 404 status for an unknown route to the table', (done) => {
        request(app)
            .get('/api/v1/unknown-route')
            .expect(404, done);
    }
    );

    it('should calculate a cell value via POST request', (done) => {
        request(app)
            .post('/api/v1/testSheet/A1')
            .send({ value: '=2+2' })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.deep.equal({ value: '=2+2', result: '4' });
                done();
            });
    });

    it('should return ERROR when calculating an unknown cell', (done) => {
        request(app)
            .post('/api/v1/testSheet/A1')
            .send({ value: '=2+A2' })
            .expect(422)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.deep.equal({ value: '=2+A2', "result": "ERROR" });
                done();
            });
    });

    it('should get a cell value via GET request', (done) => {
        request(app)
            .get('/api/v1/testSheet/A1')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.deep.equal({ value: '=2+2', result: '4' });
                done();
            });
    });

    it('should respond with a 404 status for an unknown route to the cell', (done) => {
        request(app)
            .get('/api/v1/sheet1/A2')
            .expect(404, done);
    }
    );

    it('should get a sheet via GET request', (done) => {
        request(app)
            .get('/api/v1/testSheet')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.deep.equal({
                    a1: { value: '=2+2', result: '4' },
                });
                done();
            });
    });
});
