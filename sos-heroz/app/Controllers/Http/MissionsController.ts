
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

      const urgenceStat = search.trim() == 'pas urgent' ? 1 : 1 || search.trim() == 'très urgent' ? 2 : 1 || search.trim() == 'danger public' ? 3 : 1 || search.trim() == 'danger imminent' ? 4 : 1
      const confirmee = search.trim() == 'confirmée' ? 1 : 0 || search.trim() == 'en attente' ? 1 : 0
      const missions = await Mission.query()
        .whereILike('nom_mission', `%${search}%`)
        .orWhereILike('type_incident', `%${search}%`)
        .orWhereILike('ville', `%${search}%`)
        .orWhereILike('code_postal', `%${search}%`)

      // renvoyer les données vers le vue 'index' de l'application
      return view.render('pages.missions.index', { missions, incidents, villes, superheros })

    } else {
      const missions = await Mission.all()
      // renvoyer les données vers le vue 'index' de l'application
      return view.render('pages.missions.index', { missions, incidents, villes, superheros })
    }


  }

  public async create({ view }: HttpContextContract) {
    const incidents = await Incident.all()
    const heros = await Superhero.all()
    // renvoyer la page de création d'un nouveau mission
    return view.render('pages.missions.create', { superher: heros, incidents })
  }
  public async list({ request, view }: HttpContextContract) {

    const search = request.all().search
    const incidents = await Incident.all()
    const superheros = await Superhero.all()
    const villes = await Ville.all()

    // Récupérer tous les types des missions

    if (search != null) {

      const urgenceStat = search.trim() == 'urgent' ? 1 : 1 || search.trim() == 'très urgent' ? 2 : 1 || search.trim() == 'danger public' ? 3 : 1 || search.trim() == 'danger imminent' ? 4 : 1
      console.log(urgenceStat)
      const missions = await Mission.query()
        .whereILike('nom_mission', `%${search}%`)
        .orWhereILike('type_incident', `%${search}%`)
        .orWhereILike('ville', `%${search}%`)
        .orWhereILike('code_postal', `%${search}%`)

      // renvoyer les données vers le vue 'index' de l'application
      return view.render('pages.missions.list', { missions, incidents, villes, superheros })

    } else {
      const missions = await Mission.all()
      // renvoyer les données vers le vue 'index' de l'application
      return view.render('pages.missions.list', { missions, incidents, villes, superheros })
    }


  }

  public async declare({ view }: HttpContextContract) {
    const incidents = await Incident.all()
    const heros = await Superhero.all()
    // renvoyer la page de création d'un nouveau mission
    return view.render('pages.missions.create', { superher: heros, incidents })
  }

  public async store({ request, response, session }: HttpContextContract) {

    await request.validate(MissionValidator)

    // filtrer les valuers envoyé depuis la requête
    const { nom_mission, type_incident, description, latitude, longitude, est_confirmee, urgence, superhero_id, ville, code_postal } = request.body()

    // Nouvelle instanciation d'une mission
    const mission = new Mission()

    // Injeter les valeurs dans les champs
    mission.nom_mission = nom_mission
    mission.type_incident = type_incident
    mission.description = description
    mission.latitude = latitude
    mission.longitude = longitude
    mission.statut = 'en_attente'
    mission.est_confirmee = est_confirmee ? true : false
    mission.urgence = urgence
    mission.superheroId = superhero_id
    mission.ville = ville
    mission.code_postal = code_postal

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
  public async client({ request, response, session }: HttpContextContract) {

    // await request.validate(MissionValidator)

    // filtrer les valuers envoyé depuis la requête
    const { nom_mission, type_incident, description, latitude, longitude, statut, est_confirmee, urgence, superhero_id, ville, code_postal } = request.body()

    // Nouvelle instanciation d'une mission
    const mission = new Mission()

    // Injeter les valeurs dans les champs
    mission.nom_mission = nom_mission
    mission.type_incident = type_incident
    mission.description = description
    mission.latitude = latitude
    mission.longitude = longitude
    mission.statut = statut
    mission.est_confirmee = est_confirmee ? true : false
    mission.urgence = urgence
    mission.superheroId = superhero_id
    mission.ville = ville
    mission.code_postal = code_postal

    // Sauvgarder le nouveau element
    await mission.save()

    // Affichier le message de confirmation
    session.flash({
      notification: {
        type: 'success',
        message: `la mission "${mission.nom_mission}" a été créé avec succès 🥳 `,
      },
    })

    return response.redirect().toRoute('mission.list')
  }

  public async show({ view, params }: HttpContextContract) {

    const mission = await Mission.findOrFail(params.id)
    const superhero = await mission.related('Superhero').query().first();
    const superHeros = await Superhero.all()


    return view.render('pages.missions.show', { mission, createdAt: mission.createdAt, superhero, superHeros })
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
    const { nom_mission, type_incident, description, latitude, longitude, statut, est_confirmee, urgence, superhero_id, ville, code_postal } = request.body()
    const mission = await Mission.findOrFail(params.id)

    // Injeter les valeurs dans les champs
    mission.nom_mission = nom_mission
    mission.type_incident = type_incident
    mission.description = description
    mission.latitude = latitude
    mission.longitude = longitude

    mission.statut = statut
    mission.est_confirmee = est_confirmee ? true : false
    mission.urgence = parseInt(urgence)
    mission.superheroId = superhero_id
    mission.ville = ville
    mission.code_postal = code_postal

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
