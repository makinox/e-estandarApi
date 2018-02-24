'use strict'

let request = require('supertest-as-promised')
const api = require('../app')
const host = api

request = request(host)

describe('index rout, hello world', () => {
  describe('GET /', () => {
    it('should return hello world', (done) => {
      request
        .get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /application\/json/g)
        .end((err, res) => {
          let body = res.body

          expect(body).to.have.property('message', 'hello world')
          done(err)
        })
    })
  })
})