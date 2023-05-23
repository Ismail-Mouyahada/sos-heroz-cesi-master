
import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Superhero from 'App/Models/Superhero'
import SuperheroValidator from 'App/Validators/SuperheroValidator'


export default class SuperheroesController {


  public async index({ view }: HttpContextContract) {
    // Récupérer tous les types des superheroes
    const superheros = await Superhero.all()


    // renvoyer les données vers le vue 'index' de l'application
    return view.render('pages.superheros.index', { superheros })
  }
  public async list({ view }: HttpContextContract) {
    // Récupérer tous les types des superheroes
    const superheros = await Superhero.all()


    // renvoyer les données vers le vue 'list' de l'application
    return view.render('pages.superheros.list', { superheros })
  }

  public async create({ view }: HttpContextContract) {
    // renvoyer la page de création d'un nouveau superhero
    return view.render('pages.superheros.create')
  }

  public async store({ request, response, session, auth }: HttpContextContract) {

    // // Validation de la formulaire
    // const payload = await request.validate(SuperheroValidator)

    // filtrer les valuers envoyé depuis la requête
    const { nom, prenom, tel, nom_heroique, description_pouvoir, disponible, latitude, longitude, max_mission } = request.body()

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

    superhero.nom = nom
    superhero.prenom = prenom
    superhero.tel = tel
    superhero.nom_heroique = nom_heroique
    superhero.description_pouvoir = description_pouvoir
    superhero.disponible = parseInt(disponible) === 1 ? true : false
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

    return response.redirect().toRoute('superhero.index')


  }

  public async show({ view, params }: HttpContextContract) {

    const superhero = await Superhero.findOrFail(params.id)
    const missions = await superhero.related('missions').query();
    console.log(missions.length)
    return view.render('pages.superheros.show', { superhero, missions })
  }

  public async edit({ view, params }: HttpContextContract) {

    const superhero = await Superhero.findOrFail(params.id)
    const missions = await superhero.related('missions').query();
    console.log(missions.length)
    return view.render('pages.superheros.edit', { superhero, missions })
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    const superhero = await Superhero.findOrFail(params.id)

    // Filtrer les valeurs envoyées depuis la requête
    const { nom, prenom, tel, nom_heroique, description_pouvoir, disponible, latitude, longitude, max_mission, userId } = request.body()

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
    superhero.userId = userId


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
