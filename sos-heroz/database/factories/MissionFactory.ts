import Mission from 'App/Models/Mission'
import Factory from '@ioc:Adonis/Lucid/Factory'


export default Factory.define(Mission, ({ faker }) => {
  return {
    nom_mission: faker.lorem.slug(),
    type_incident: faker.lorem.slug(),
    description: faker.lorem.lines(3),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    urgence: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    ville: faker.address.cityName(),
    code_postal: faker.address.zipCode(),
    superheroId: parseInt(faker.random.numeric()),
    est_confirmee: faker.helpers.arrayElement([true, false]),
    statut: faker.helpers.arrayElement(['en_cours', 'en_attente', 'terminée', 'rapportée']),

  }
}).build()
