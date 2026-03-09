const request = require('supertest');
const server = require('../server');

describe('Server Tests', () => {
    it('should load the home page successfully', (done) => {
        request(server)
            .get('/')
            .expect(200, done);
    });
});
