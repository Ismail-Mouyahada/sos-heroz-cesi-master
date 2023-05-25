import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UtilisateurFactory from 'Database/factories/UtilisateurFactory'

export default class extends BaseSeeder {
  public async run() {
    await UtilisateurFactory.createMany(10)
  }
}
