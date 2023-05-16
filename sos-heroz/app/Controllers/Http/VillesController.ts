import { faker } from '@faker-js/faker'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ville from 'App/Models/Ville'


export default class VillesController {
  public async index({ view }: HttpContextContract) {
    await Ville.create({
      nom_ville: faker.address.cityName(),
      code_postal: faker.address.zipCode(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude()

    })

    const villes = await Ville.all();

    return await view.render('pages.villes.index', { villes })

  }

  public async create({ view }: HttpContextContract) {

    return await view.render('pages.villes.create')
  }

  public async store({ request, view, session }: HttpContextContract) {

    const { latitude, longitude, nom_ville } = request.body()
    const ville = new Ville()
    ville.nom_ville = nom_ville
    ville.longitude = longitude
    ville.latitude = latitude

    ville.save()

    session.flash({
      notification: {
        type: 'success',
        message: ` la ville a été ajouté avec succès 🥳 `,
      },
    })

    return await view.render('pages.villes.show', { ville })
  }

  public async show({ view, params }: HttpContextContract) {
    const ville = await Ville.findOrFail(params.id)
    return view.render('pages.villes.show', { ville })
  }

  public async edit({ view, params }: HttpContextContract) {
    const ville = await Ville.findOrFail(params.id)
    return view.render('pages.villes.edit', { ville })
  }

  public async update({ view, params, request, session }: HttpContextContract) {
    const { latitude, longitude, nom_ville } = request.body()
    const ville = await Ville.findOrFail(params.id)

    ville.nom_ville = nom_ville
    ville.longitude = longitude
    ville.latitude = latitude

    ville.save()

    session.flash({
      notification: {
        type: 'success',
        message: ` la ville a été modifié avec succès 🥳 `,
      },
    })

    return view.render('pages.villes.show', { ville })

  }

  public async destroy({ params, session, response }: HttpContextContract) {

    const ville = await Ville.findOrFail(params.id)

    await ville.delete()

    session.flash({
      notification: {
        type: 'danger',
        message: ` la ville a été supprimé avec succès 🥳 `,
      },
    })

    return response.redirect().toRoute('villes.index')
  }
}
