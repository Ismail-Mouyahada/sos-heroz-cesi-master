import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import VilleFactory from 'Database/factories/VilleFactory'

export default class extends BaseSeeder {
  public async run() {
    await VilleFactory.createMany(10)
  }
}
