
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Incident from 'App/Models/Incident'
import Mission from 'App/Models/Mission'
import Superhero from 'App/Models/Superhero'
import Ville from 'App/Models/Ville'

export default class MissionsController {
  public async index({ view }: HttpContextContract) {


    // Récupérer tous les types des missions
    const missions = await Mission.all()
    const incidents = await Incident.all()
    const superheros = await Superhero.all()
    const villes = await Ville.all()

    // renvoyer les données vers le vue 'index' de l'application
    return view.render('pages.missions.index', { missions, incidents, villes, superheros })
  }

  public async create({ view }: HttpContextContract) {

    // renvoyer la page de création d'un nouveau mission
    return view.render('pages.missions.create')
  }

  public async store({ request, response, session }: HttpContextContract) {

    // filtrer les valuers envoyé depuis la requête
    const { nom_mission, type_incident, description, latitude, longitude, date_incident, statut, est_confirmee, urgence, superhero_id, ville_id } = request.body()

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
    mission.est_confirmee = est_confirmee ? true : false
    mission.urgence = urgence
    mission.superheroId = superhero_id
    mission.villeId = ville_id

    // Sauvgarder le nouveau element
    await mission.save()

    // Affichier le message de confirmation
    session.flash({
      notification: {
        type: 'success',
        message: `la mission "${mission.nom_mission}" a été créé avec succès 🥳 `,
      },
    })

    return response.redirect().toRoute('mission.index')
  }

  public async show({ view, params }: HttpContextContract) {

    const mission = await Mission.findOrFail(params.id)




    return view.render('pages.missions.show', { mission, createdAt: mission.createdAt, ville : mission.Ville, superhero:mission.Superhero })
  }

  public async edit({ view, params }: HttpContextContract) {

    const mission = await Mission.findOrFail(params.id)
    const incidents = await Incident.all()
    const superheros = await Superhero.all()
    const villes = await Ville.all()

    return view.render('pages.missions.edit', { mission, incidents, villes, superheros })
  }

  public async update({ request, response, session, params }: HttpContextContract) {
    // filtrer les valuers envoyé depuis la requête
    const { nom_mission, type_incident, description, latitude, longitude, date_incident, statut, est_confirmee, urgence, superhero_id, ville_id } = request.body()
    const mission = await Mission.findOrFail(params.id)

    // Injeter les valeurs dans les champs
    mission.nom_mission = nom_mission
    mission.type_incident = type_incident
    mission.description = description
    mission.latitude = latitude
    mission.longitude = longitude
    mission.date_incident = date_incident
    mission.statut = statut
    mission.est_confirmee = est_confirmee ? true : false
    mission.urgence = parseInt(urgence)
    mission.superheroId = superhero_id
    mission.villeId = ville_id

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

    return response.redirect().toRoute('mission.index')
  }



}
