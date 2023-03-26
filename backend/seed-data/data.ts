function timestamp() {
  // sometime in the last 30 days
  const stampy = Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)
  return new Date(stampy).toISOString()
}
import bcryptjs from 'bcryptjs'

export const seedUser = [
  {
    firstName: 'Adamya',
    lastName: 'Kumar',
    name: 'Adamya Kumar',
    username: 'adamyaKumar',
    email: 'adamyakumar@gyaniguru.co.in',
    password: bcryptjs.hashSync('12345678a', 10),
  }
]