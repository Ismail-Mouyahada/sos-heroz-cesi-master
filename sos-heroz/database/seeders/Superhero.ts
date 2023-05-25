import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SuperheroFactory from 'Database/factories/SuperheroFactory'

export default class extends BaseSeeder {
  public async run() {
    await SuperheroFactory.createMany(10)
  }
}
