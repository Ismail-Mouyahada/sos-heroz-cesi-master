
import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Incident from 'App/Models/Incident'
import Superhero from 'App/Models/Superhero'


export default class SuperheroesController {


  public async index({ view, request }: HttpContextContract) {
    const search = request.all().search


    if (search != null) {
      const superheros = await Superhero.query()
        .whereILike('nom_heroique', `%${search}%`)
        .orWhereILike('tel', `%${search}%`)
        .orWhereILike('nom', `%${search}%`)
        .orWhereILike('prenom', `%${search}%`)


      // renvoyer les données vers le vue 'index' de l'application
      return view.render('pages.superheros.index', { superheros })

    } else {
      const superheros = await Superhero.all()
      // renvoyer les données vers le vue 'index' de l'application
      return view.render('pages.superheros.index', { superheros })
    }

  }
  public async list({ view, request }: HttpContextContract) {

    const search = request.all().search
    console.log(search)

    if (search != null) {
      const superheros = await Superhero.query()
        .whereILike('nom_heroique', `%${search}%`)
        .orWhereILike('tel', `%${search}%`)
        .orWhereILike('nom', `%${search}%`)
        .orWhereILike('prenom', `%${search}%`)
      // renvoyer les données vers le vue 'index' de l'application
      return view.render('pages.superheros.list', { superheros })

    } else {
      const superheros = await Superhero.all()
      // renvoyer les données vers le vue 'index' de l'application
      return view.render('pages.superheros.list', { superheros })
    }



  }

  public async create({ view }: HttpContextContract) {

    const incidents = await Incident.all()
    // renvoyer la page de création d'un nouveau superhero
    return view.render('pages.superheros.create', { incidents })
  }

  public async store({ request, response, session, auth }: HttpContextContract) {

    // // Validation de la formulaire
    // const payload = await request.validate(SuperheroValidator)



    // filtrer les valuers envoyé depuis la requête
    const { nom, prenom, tel, nom_heroique, incidents_list, description_pouvoir, disponible, latitude, longitude, max_mission, super_force, vol, super_vitesse, invulnerabilite, guerison_rapide, controle_des_elements, teleportation, invisibilite, controle_montal, precognition, super_intelligence } = request.body()



    const userId = auth.user?.id ? auth.user?.id : 1
    console.log(userId)
    // Nouvelle instanciation d'une superhero
    const superhero = new Superhero()

    const profileImage = request.file('profil')


    if (profileImage) {
      // Save the file to a desired location
      await profileImage.move(Application.publicPath('uploads/profile-images'), {
        name: `${new Date().getTime()}.${profileImage.extname}`,
      })

      if (!profileImage.isValid) {
        return response.badRequest('Invalid file format')
      }

      // Get the file path
      const filePath = `/uploads/profile-images/${profileImage.fileName}`

      // Save the file path in the database
      superhero.profil = filePath

    }
    console.log(incidents_list)
    superhero.nom = nom
    superhero.prenom = prenom
    superhero.tel = tel
    superhero.nom_heroique = nom_heroique
    superhero.description_pouvoir = description_pouvoir
    superhero.disponible = parseInt(disponible) === 1 ? true : false
    superhero.latitude = latitude
    superhero.longitude = longitude
    superhero.max_mission = max_mission
    superhero.incidents_list = incidents_list.join()
    superhero.userId = userId
    superhero.super_force = super_force
    superhero.vol = vol
    superhero.super_vitesse = super_vitesse
    superhero.invulnerabilite = invulnerabilite
    superhero.guerison_rapide = guerison_rapide
    superhero.controle_des_elements = controle_des_elements
    superhero.teleportation = teleportation
    superhero.invisibilite = invisibilite
    superhero.controle_montal = controle_montal
    superhero.precognition = precognition
    superhero.super_intelligence = super_intelligence

    // Sauvgarder le nouveau element
    await superhero.save()
    // Affichier le message de confirmation
    session.flash({
      notification: {
        type: 'success',
        message: `le superhero "${superhero.nom_heroique}" a été ajouté avec succès 🥳 `,
      },
    })

    return response.redirect().toRoute('superhero.index')


  }

  public async show({ view, params }: HttpContextContract) {

    const superhero = await Superhero.findOrFail(params.id)
    const missions = await superhero.related('missions').query();
    console.log(missions.length)
    return view.render('pages.superheros.show', { superhero, missions })
  }

  public async edit({ view, params }: HttpContextContract) {
    const incidents = await Incident.all()

    const superhero = await Superhero.findOrFail(params.id)
    const missions = await superhero.related('missions').query();

    return view.render('pages.superheros.edit', { superhero, missions, incidents })
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    const superhero = await Superhero.findOrFail(params.id)

    // Filtrer les valeurs envoyées depuis la requête
    const { nom, prenom, tel, nom_heroique, description_pouvoir, disponible, latitude, incidents_list, longitude, max_mission, userId, super_force, vol, super_vitesse, invulnerabilite, guerison_rapide, controle_des_elements, teleportation, invisibilite, controle_montal, precognition, super_intelligence } = request.body()

    const profileImage = request.file('profil')

    if (profileImage) {
      // Save the file to a desired location
      await profileImage.move(Application.publicPath('uploads/profile-images'), {
        name: `${new Date().getTime()}.${profileImage.extname}`,
      })

      if (!profileImage.isValid) {
        return response.badRequest('Invalid file format')
      }

      // Get the file path
      const filePath = `/uploads/profile-images/${profileImage.fileName}`
      console.log(parseInt(disponible) === 1 ? true : false)
      // Save the file path in the database
      superhero.profil = filePath

      // Sauvgarder le nouveau element

    }
    superhero.nom = nom
    superhero.prenom = prenom
    superhero.tel = tel
    superhero.nom_heroique = nom_heroique
    superhero.description_pouvoir = description_pouvoir
    superhero.disponible = parseInt(disponible) === 1 ? true : false
    superhero.latitude = latitude
    superhero.longitude = longitude
    superhero.max_mission = max_mission
    superhero.incidents_list = incidents_list.join()
    superhero.userId = userId
    superhero.super_force = super_force
    superhero.vol = vol
    superhero.super_vitesse = super_vitesse
    superhero.invulnerabilite = invulnerabilite
    superhero.guerison_rapide = guerison_rapide
    superhero.controle_des_elements = controle_des_elements
    superhero.teleportation = teleportation
    superhero.invisibilite = invisibilite
    superhero.controle_montal = controle_montal
    superhero.precognition = precognition
    superhero.super_intelligence = super_intelligence


    await superhero.save()
    // Afficher le message de confirmation
    session.flash({
      notification: {
        type: 'success',
        message: `Le super-héro "${superhero.nom_heroique}" a été mis à jour avec succès 🥳`,
      },
    })

    return response.redirect().toRoute('superhero.index')
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

    return response.redirect().toRoute('superhero.index')
  }
}
