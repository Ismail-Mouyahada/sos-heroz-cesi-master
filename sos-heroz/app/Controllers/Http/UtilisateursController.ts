import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import UtilisateurValidator from 'App/Validators/UtilisateurValidator'

export default class UtilisateursController {

  public async index({ view }: HttpContextContract) {
    const utilisateurs = await User.all()

    return view.render('pages.utilisateurs.index', { utilisateurs })
  }


  public async create({ view }: HttpContextContract) {

    return view.render('pages.utilisateurs.create')
  }

  public async store({ request, response }: HttpContextContract) {

    // Validation de la formulaire
    await request.validate(UtilisateurValidator)


    const payload = await request.validate(RegisterValidator)

    const utilisateur = await User.create(payload)

    return response.redirect().toRoute('utilisateur.show', { id: utilisateur.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const utilisateur = await User.findOrFail(params.id)


    return view.render('pages.utilisateurs.show', { utilisateur, date:utilisateur.createdAt })
  }

  public async edit({ params, view }: HttpContextContract) {
    const utilisateur = await User.findOrFail(params.id)

    return view.render('pages.utilisateurs.edit', { utilisateur })
  }

  public async update({ params, request, response }: HttpContextContract) {
    // Validation de la formulaire
    const { nom, prenom, role, email, telephone } = request.body()
    console.log(nom)
    const utilisateur = await User.findOrFail(params.id)
    try {

      console.log('here')

      utilisateur.nom = nom
      utilisateur.prenom = prenom
      utilisateur.role = role
      utilisateur.email = email
      utilisateur.telephone = telephone



      await utilisateur.save()

    } catch (error) {
      console.log(error)
    }


    return response.redirect().toRoute('utilisateur.show', { id: utilisateur.id })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const utilisateur = await User.findOrFail(params.id)
    await utilisateur.delete()

    return response.redirect().toRoute('utilisateur.index')
  }
}
