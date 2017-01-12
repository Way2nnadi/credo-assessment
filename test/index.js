import assert from 'assert';
import request from 'request';

import '../src/server.js';

let testUri = `http://127.0.0.1:${process.env.PORT || 3001}/`

describe('Testing Node Server', () => {
  it('should return a string template on home path', done => {
    request({
        url: testUri,
        method: "GET",
    }, (err, res, body) => {
        assert.equal('string', typeof body);
        done();
    });
  });

  it('should return a string template on good paths', done => {
    request({
        url: testUri + '/course/101',
        method: "GET",
    }, (err, res, body) => {
        assert.equal('string', typeof body);
    });

    request({
        url: testUri + '/course/110',
        method: "GET",
    }, (err, res, body) => {
        assert.equal('string', typeof body);
    });

    done();

  });

  it('should return 404 on bad path', done => {
    request({
        url: testUri + '/bad-path',
        method: "GET",
    }, (err, res, body) => {
        assert.equal(404, res.statusCode);
        done();
    });
  });

});
