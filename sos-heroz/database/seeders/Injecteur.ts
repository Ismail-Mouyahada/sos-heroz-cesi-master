import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import IncidentFactory from 'Database/factories/IncidentFactory'
import MissionFactory from 'Database/factories/MissionFactory'
import SuperheroFactory from 'Database/factories/SuperheroFactory'
import UtilisateurFactory from 'Database/factories/UtilisateurFactory'
import VilleFactory from 'Database/factories/VilleFactory'

export default class extends BaseSeeder {
  public async run() {
    await UtilisateurFactory.createMany(10)
    await VilleFactory.createMany(10)
    await IncidentFactory.createMany(10)
    await SuperheroFactory.createMany(10)
    await MissionFactory.createMany(10)

  }
}
