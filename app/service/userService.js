const fs = require('fs')

class Users {
  constructor () {
    const usersString = fs.readFileSync('./app/data/users.json', 'utf-8')
    const users = JSON.parse(usersString)
    this.users = users
  }

  getAllUsers () {
    return this.users
  }

  getUserByUsername (username) {
    const user = this.users.find(user => user.username === username)
    return user
  }

  login (username, password) {
    const user = this.users.find(user => user.username === username && user.password === password)
    return user
  }
}

module.exports = Users