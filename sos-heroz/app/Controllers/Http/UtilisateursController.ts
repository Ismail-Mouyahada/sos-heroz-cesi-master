import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UtilisateursController {
  public async index({ view }: HttpContextContract) {
    const utilisateurs = await User.all()

    return view.render('pages.utilisateurs.index', { utilisateurs })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages.utilisateurs.create')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['nom', 'prenom', 'role', 'email', 'password'])
    const utilisateur = await User.create(data)

    return response.redirect().toRoute('utilisateur.show', { id: utilisateur.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const utilisateur = await User.findOrFail(params.id)

    return view.render('pages.utilisateurs.show', { utilisateur })
  }

  public async edit({ params, view }: HttpContextContract) {
    const utilisateur = await User.findOrFail(params.id)

    return view.render('pages.utilisateurs.edit', { utilisateur })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const utilisateur = await User.findOrFail(params.id)

    const data = request.only(['nom', 'prenom', 'role', 'email', 'password'])
    utilisateur.merge(data)
    await utilisateur.save()

    return response.redirect().toRoute('utilisateur.show', { id: utilisateur.id })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const utilisateur = await User.findOrFail(params.id)
    await utilisateur.delete()

    return response.redirect().toRoute('utilisateurs.index')
  }
}
