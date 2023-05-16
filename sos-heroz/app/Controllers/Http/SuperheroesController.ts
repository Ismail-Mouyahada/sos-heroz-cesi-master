import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Superhero from 'App/Models/Superhero'

export default class SuperheroesController {
  public async index({ view }: HttpContextContract) {
    // Récupérer tous les types des superheroes
    const superheros = await Superhero.all()

    // renvoyer les données vers le vue 'index' de l'application
    return view.render('pages.superheros.index', { superheros })
  }

  public async create({ view }: HttpContextContract) {
    // renvoyer la page de création d'un nouveau superhero
    return view.render('pages.superheros.create')
  }

  public async store({ request, response, session }: HttpContextContract) {
    // filtrer les valuers envoyé depuis la requête
    const { nom, prenom, telephone, nom_heroique, description_pouvoir, disponible, latitude, longitude, max_mission, userId } = request.body()

    // Nouvelle instanciation d'une superhero
    const superhero = new Superhero()

    const profil = request.file('profil')!

    // Injeter les valeurs dans les champs
    superhero.profil = Attachment.fromFile(profil)
    superhero.nom = nom
    superhero.prenom = prenom
    superhero.telephone = telephone
    superhero.nom_heroique = nom_heroique
    superhero.description_pouvoir = description_pouvoir
    superhero.disponible = disponible
    superhero.latitude = latitude
    superhero.longitude = longitude
    superhero.max_mission = max_mission
    superhero.userId = userId

    // Sauvgarder le nouveau element
    await superhero.save()

    // Affichier le message de confirmation
    session.flash({
      notification: {
        type: 'success',
        message: `le superhero "${superhero.nom_heroique}" a été ajouté avec succès 🥳 `,
      },
    })

    return response.redirect().toRoute('superheros.index')

  }

  public async show({ view, params }: HttpContextContract) {

    const superhero = await Superhero.findOrFail(params.id)
    return view.render('pages.superheros.show', { superhero })
  }

  public async edit({ view, params }: HttpContextContract) {

    const superhero = await Superhero.findOrFail(params.id)
    return view.render('pages.superheros.edit', { superhero })
  }

  public async update({ view, request, session, params }: HttpContextContract) {
    // filtrer les valuers envoyé depuis la requête
    const { nom, prenom, telephone, nom_heroique, description_pouvoir, disponible, latitude, longitude, max_mission, userId } = request.body()

    // Nouvelle instanciation d'une superhero
    const superhero = await Superhero.findOrFail(params.id)

    const profil = request.file('profil')!

    // Injeter les valeurs dans les champs
    superhero.profil = Attachment.fromFile(profil)
    superhero.nom = nom
    superhero.prenom = prenom
    superhero.telephone = telephone
    superhero.nom_heroique = nom_heroique
    superhero.description_pouvoir = description_pouvoir
    superhero.disponible = disponible
    superhero.latitude = latitude
    superhero.longitude = longitude
    superhero.max_mission = max_mission
    superhero.userId = userId

    // Sauvgarder le nouveau element
    await superhero.save()

    // Affichier le message de confirmation
    session.flash({
      notification: {
        type: 'success',
        message: `le superhero "${superhero.nom_heroique}" a été modifié avec succès 🥳 `,
      },
    })

    return view.render('pages.superheros.show', { superhero })

  }

  public async destroy({ response, params, session }: HttpContextContract) {

    const superhero = await Superhero.findOrFail(params.id)

    await superhero.delete()

    session.flash({
      notification: {
        type: 'danger',
        message: ` la superhero a été supprimé avec succès 🥳 `,
      },
    })

    return response.redirect().toRoute('superheros.index')
  }
}
