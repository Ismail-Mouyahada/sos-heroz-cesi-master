import Incident from 'App/Models/Incident'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Incident, ({ faker }) => {
  return {
    type_incident: faker.lorem.slug(),
    description: faker.lorem.text(),
  }
}).build()
