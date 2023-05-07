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
    const user = await User.create(data)

    return response.redirect().toRoute('pages.utilisateurs.show', { id: user.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return view.render('pages.utilisateurs.show', { user })
  }

  public async edit({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return view.render('pages.utilisateurs.edit', { user })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const data = request.only(['nom', 'prenom', 'role', 'email', 'password'])
    user.merge(data)
    await user.save()

    return response.redirect().toRoute('pages.utilisateurs.show', { id: user.id })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return response.redirect().toRoute('pages.utilisateurs.index')
  }
}
