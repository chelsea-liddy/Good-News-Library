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

describe('GET /:id', () => {
  test('show individual story based on id', () => {
    return request(server)
      .get('/0')
      .then((res) => {
        document.body.innerHTML = res.text
        const storyTitle = screen.getAllByRole('heading')
        expect(storyTitle[[1]]).toHaveTextContent('You have checked out')
      })
  })
})

describe('POST /contribute', () => {
  test('show contribution form', () => {
    return request(server)
      .get('/contribute')
      .then((res) => {
        document.body.innerHTML = res.text
        const form = screen.getAllByRole('form')
        expect(form).toBeInTheDocument()
      })
  })
})
