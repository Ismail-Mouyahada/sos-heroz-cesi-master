import Superhero from 'App/Models/Superhero'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Superhero, ({ faker }) => {
  return {
    profil: faker.image.avatar(),
    nom_heroique: faker.internet.userName(),
    prenom: faker.name.firstName(),
    nom: faker.name.lastName(),
    description_pouvoir: faker.lorem.text(),
    disponible: faker.helpers.arrayElement([true, false]),
    tel: faker.phone.number(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    max_mission: parseInt(faker.random.numeric()),
    incidents_list: `${faker.lorem.slug()},${faker.lorem.slug()},${faker.lorem.slug()}`,
    userId: parseInt(faker.random.numeric()),
    super_force: faker.helpers.arrayElement([true, false]),
    vol: faker.helpers.arrayElement([true, false]),
    super_vitesse: faker.helpers.arrayElement([true, false]),
    invulnerabilite: faker.helpers.arrayElement([true, false]),
    guerison_rapide: faker.helpers.arrayElement([true, false]),
    controle_des_elements: faker.helpers.arrayElement([true, false]),
    teleportation: faker.helpers.arrayElement([true, false]),
    invisibilite: faker.helpers.arrayElement([true, false]),
    controle_montal: faker.helpers.arrayElement([true, false]),
    precognition: faker.helpers.arrayElement([true, false]),
    super_intelligence: faker.helpers.arrayElement([true, false]),



  }
}).build()
