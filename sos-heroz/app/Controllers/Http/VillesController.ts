import { faker } from '@faker-js/faker'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ville from 'App/Models/Ville'

export default class VillesController {
  public async index({ view, request, response }: HttpContextContract) {
    await Ville.create({
      nom_ville: faker.address.cityName(),
      code_postal: faker.address.zipCode(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude()

    })

    const villes = await Ville.all();

    return await view.render('pages.villes.index', { villes })

  }

  public async create({ }: HttpContextContract) { }

  public async store({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
