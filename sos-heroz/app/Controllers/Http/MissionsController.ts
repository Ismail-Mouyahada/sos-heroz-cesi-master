import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mission from 'App/Models/Mission'

export default class MissionsController {
  public async index({ view }: HttpContextContract) {

    // Récupérer tous les types des missions
    const missions = await Mission.all()

    // renvoyer les données vers le vue 'index' de l'application
    return view.render('pages.missions.index', { missions })
  }

  public async create({ view }: HttpContextContract) {

    // renvoyer la page de création d'un nouveau mission
    return view.render('pages.missions.create')
  }

  public async store({ request, response, session }: HttpContextContract) {

    // filtrer les valuers envoyé depuis la requête
    const { nom_mission, type_incident, description, latitude, longitude, date_incident, statut, est_confirmee, urgence, superheroId, villeId } = request.body()

    // Nouvelle instanciation d'une mission
    const mission = new Mission()

    // Injeter les valeurs dans les champs
    mission.nom_mission = nom_mission
    mission.type_incident = type_incident
    mission.description = description
    mission.latitude = latitude
    mission.longitude = longitude
    mission.date_incident = date_incident
    mission.statut = statut
    mission.est_confirmee = est_confirmee
    mission.urgence = urgence
    mission.nom_mission = nom_mission
    mission.superheroId = superheroId
    mission.villeId = villeId

    // Sauvgarder le nouveau element
    await mission.save()

    // Affichier le message de confirmation
    session.flash({
      notification: {
        type: 'success',
        message: `la mission "${mission.nom_mission}" a été créé avec succès 🥳 `,
      },
    })

    return response.redirect().toRoute('missions.index')
  }

  public async show({ view }: HttpContextContract) {

    return view.render('pages.missions.create')
  }

  public async edit({ view, params }: HttpContextContract) {

    const mission = await Mission.findOrFail(params.id)
    return view.render('pages.missions.edit', { mission })
  }

  public async update({ request, response, session, params }: HttpContextContract) {
    // filtrer les valuers envoyé depuis la requête
    const { nom_mission, type_incident, description, latitude, longitude, date_incident, statut, est_confirmee, urgence, superheroId, villeId } = request.body()
    const mission = await Mission.findOrFail(params.id)

    // Injeter les valeurs dans les champs
    mission.nom_mission = nom_mission
    mission.type_incident = type_incident
    mission.description = description
    mission.latitude = latitude
    mission.longitude = longitude
    mission.date_incident = date_incident
    mission.statut = statut
    mission.est_confirmee = est_confirmee
    mission.urgence = urgence
    mission.nom_mission = nom_mission
    mission.superheroId = superheroId
    mission.villeId = villeId

    mission.save()

    session.flash({
      notification: {
        type: 'success',
        message: `la mission "${mission.nom_mission}" a été modifié avec succès 🥳 `,
      },
    })

    return response.redirect().toRoute('mission.show', { id: params.id })


  }

  public async destroy({ params, session, response }: HttpContextContract) {

    const mission = await Mission.findOrFail(params.id)

    await mission.delete()

    session.flash({
      notification: {
        type: 'danger',
        message: ` la mission a été supprimé avec succès 🥳 `,
      },
    })

    return response.redirect().toRoute('missions.index')
  }



}
