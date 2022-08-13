const request = require('supertest')
const { screen } = require('@testing-library/dom')
require('@testing-library/jest-dom')

const server = require('./server')

describe('GET /', () => {
  test('display heading', () => {
    return request(server)
      .get('/')
      .then((res) => {
        document.body.innerHTML = res.text
        const headings = screen.getAllByRole('heading')
        expect(headings[[1]]).toHaveTextContent('Welcome')
      })
  })
})
