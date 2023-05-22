
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Incident from 'App/Models/Incident'
import Mission from 'App/Models/Mission'
import Superhero from 'App/Models/Superhero'
import Ville from 'App/Models/Ville'
import MissionValidator from 'App/Validators/MissionValidator'

export default class MissionsController {
  public async index({ request, view }: HttpContextContract) {

    const search = request.all().search
    const incidents = await Incident.all()
    const superheros = await Superhero.all()
    const villes = await Ville.all()

    // Récupérer tous les types des missions

    if (search != null) {
      const missions = await Mission.query()
        .whereILike('nom_mission', `%${search}%`)
      // renvoyer les données vers le vue 'index' de l'application
      return view.render('pages.missions.index', { missions, incidents, villes, superheros })

    } else {
      const missions = await Mission.all()
      // renvoyer les données vers le vue 'index' de l'application
      return view.render('pages.missions.index', { missions, incidents, villes, superheros })
    }


  }

  public async create({ view }: HttpContextContract) {

    // renvoyer la page de création d'un nouveau mission
    return view.render('pages.missions.create')
  }

  public async store({ request, response, session }: HttpContextContract) {

    await request.validate(MissionValidator)

    // filtrer les valuers envoyé depuis la requête
    const { nom_mission, type_incident, description, latitude, longitude, date_incident, est_confirmee, urgence, superhero_id, ville_id } = request.body()

    // Nouvelle instanciation d'une mission
    const mission = new Mission()

    // Injeter les valeurs dans les champs
    mission.nom_mission = nom_mission
    mission.type_incident = type_incident
    mission.description = description
    mission.latitude = latitude
    mission.longitude = longitude
    mission.date_incident = date_incident
    mission.statut = 'en_attente'
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
  public async Client({ request, response, session }: HttpContextContract) {

    await request.validate(MissionValidator)

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

    return response.redirect().toRoute('merci')
  }

  public async show({ view, params }: HttpContextContract) {
    const mission = await Mission.findOrFail(params.id)
    const superhero = await mission.related('Superhero').query().first();



    return view.render('pages.missions.show', { mission, createdAt: mission.createdAt, superhero })
  }

  public async edit({ view, params }: HttpContextContract) {

    const mission = await Mission.findOrFail(params.id)
    const superhero = await mission.related('Superhero').query().first();
    const incidents = await Incident.all()
    const superheros = await Superhero.all()
    const villes = await Ville.all()

    return view.render('pages.missions.edit', { mission, incidents, villes, superheros, superhero })
  }

  public async update({ request, response, session, params }: HttpContextContract) {


    // await request.validate(MissionValidator)

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
