import Ville from 'App/Models/Ville'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Ville, ({ faker }) => {
  return {
    nom_ville: faker.address.city(),
    code_postal: faker.address.zipCode(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),

  }
}).build()
