
import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

export default Factory.define(User, ({ faker }) => {
  return {
    nom: faker.name.lastName(),
    prenom: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password-cesi',
    role: faker.helpers.arrayElement(['superadmin', 'visiteur', 'citoyen', 'super-hero', 'commune']),
    telephone: faker.phone.number(),
    rememberMeToken: faker.date.recent().toISOString().toString().slice(0,10).trim(),
  }
}).build()
