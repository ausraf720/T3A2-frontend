class User {
    constructor(user, pass) {
      this.user = user;
      this.pass = pass;
    }
  }

const user1 = new User("user1", "pass1")
const user2 = new User("user2", "pass2")
const user3 = new User("user3", "pass3")
const user4 = new User("user4", "pass4")

const users_array = [user1, user2, user3, user4]



function pass_checker(users_array, user_attempt, pass_attempt) {
    const username_array = users_array.map(x => x.user)
    const password_array = users_array.map(x => x.pass)
    index = username_array.indexOf(user_attempt)
    if (index !== -1) {
        if (pass_attempt === password_array[index]) {
            return "True"
        } else {
            return "False"
        }
    } else {
        return "False"
    }
}

console.log(pass_checker(users_array, "user2", "pass2"))