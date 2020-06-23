import { expect } from 'chai'
import * as request from 'supertest'
import app from '../src/app'

describe('test_controller.test', () => {
  const req = request(app)

  it('GET /test', async () => {
    const msg = 'message'
    const res = await req.get(`/test?msg=${msg}`).expect(200)
    expect(res.body.msg).to.equal(msg)
  })
})
