import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Incident from 'App/Models/Incident'
import IncidentValidator from 'App/Validators/IncidentValidator'

export default class IncidentsController {
  public async index({ view, request }: HttpContextContract) {

    // Récupérer tous les types des incidents
    const search = request.all().search


    if (search != null) {
      const incidents = await Incident.query()
        .whereILike('type_incident', `%${search}%`)
        .orWhereILike('description', `%${search}%`)

      // renvoyer les données vers le vue 'index' de l'application
      return view.render('pages.incidents.index', { incidents })

    } else {
      const incidents = await Incident.all()
      // renvoyer les données vers le vue 'index' de l'application
      return view.render('pages.incidents.index', { incidents })
    }


  }

  public async create({ view }: HttpContextContract) {

    // renvoyer la page de création d'un nouveau incident
    return view.render('pages.incidents.create')
  }

  public async store({ request, response, session }: HttpContextContract) {


    const payload = await request.validate(IncidentValidator)

    // filtrer les valuers envoyé depuis la requête
    await Incident.create(payload)
    // Affichier le message de confirmation
    session.flash({
      notification: {
        type: 'success',
        message: `l'incident "${payload.type_incident}" a été créé avec succès 🥳 `,
      },
    })

    return response.redirect().toRoute('incident.index')

  }

  public async show({ view, params, }: HttpContextContract) {

    const incident = await Incident.findOrFail(params.id)

    return view.render('pages.incidents.show', { incident })
  }

  public async edit({ view, params, session }: HttpContextContract) {

    const incident = await Incident.findOrFail(params.id)

    session.flash({
      notification: {
        type: 'success',
        message: `Détails de l'incident "${incident.type_incident}" est prêt à être modifié 🥳 `,
      },
    })

    return view.render('pages.incidents.edit', { incident })
  }

  public async update({ response, request, params, session }: HttpContextContract) {

    const payload = await request.validate(IncidentValidator)

    const incident = await Incident.findOrFail(params.id)

    // retrouvez l'element rechercher
    incident.type_incident = payload.type_incident
    incident.description = payload.description

    incident.save()

    session.flash({
      notification: {
        type: 'success',
        message: `Votre alerte "${incident.type_incident}" a été modifié avec succès 🥳 `,
      },
    })

    return response.redirect().toRoute('incident.show', { id: params.id })
  }

  public async destroy({ response, params, session }: HttpContextContract) {

    const incident = await Incident.findOrFail(params.id)

    await incident.delete()

    session.flash({
      notification: {
        type: 'success',
        message: ` l'incident a été supprimé avec succès 🥳 `,
      },
    })

    return response.redirect().toRoute('incident.index')
  }
}
