import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    nom: schema.string([rules.trim()]),
    prenom: schema.string([rules.trim()]),
    telephone: schema.string([
      rules.trim(),
      rules.mobile(),
      rules.unique({ table: 'users', column: 'telephone' }),
    ]),
    email: schema.string([
      rules.trim(),
      rules.email(),
      rules.normalizeEmail({ allLowercase: true }),
      rules.maxLength(255),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string([rules.trim(), rules.minLength(6), rules.confirmed()]),
  })

  public messages = {
    'required': 'le  field est obligatoire.',
    'unique': 'le  est déjà réservé par une autre utilisateur.',
    'password.minLength': 'le mot de passe devrait contenir en moins 6 caractèrs.',
    'password_confirmation.confirmed': 'la confirmation de mot de passe n\'est pas indentique.',
  }
}
