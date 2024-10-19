const Users = require('../service/userService')

const users = new Users()

function getAllUsers(request, response) {
  response.setHeader('Content-Type', 'application/json')
  const allUsers = users.getAllUsers()
  const allUsersString = JSON.stringify(allUsers)
  response.end(allUsersString)
}

function getUserByUsername(request, response, username) {
  const user = users.getUserByUsername(username)
  if (user) {
    response.setHeader('Content-Type', 'application/json')
    const userString = JSON.stringify(user)
    return response.end(userString)
  }
  response.statusCode = 404
  response.end('User not found')
}

function login(request, response) {
  let requestBody = ''
  request.on('data', chunk => {
    requestBody += chunk
  })
  request.on('end', () => {
    if (requestBody) {
      const credentials = JSON.parse(requestBody)
      const user = users.login(credentials.username, credentials.password)
      if (user) {
        response.setHeader('Content-Type', 'application/json')
        const userString = JSON.stringify(user)
        return response.end(userString)
      }
    }
    response.statusCode = 403
    response.end('Invalid credentials')
  })
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  login
}


