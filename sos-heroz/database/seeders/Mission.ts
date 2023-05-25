import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import MissionFactory from 'Database/factories/MissionFactory'

export default class extends BaseSeeder {
  public async run() {
    await MissionFactory.createMany(10)
  }
}
