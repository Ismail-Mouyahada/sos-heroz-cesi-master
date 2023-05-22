import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UtilisateurValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({
    nom: schema.string([rules.trim()]),
    role: schema.string([rules.trim()]),
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
    'required': 'Le champ est obligatoire.',
    'unique': 'Ce champ est déjà réservé par un autre utilisateur.',
    'password.minLength': 'Le mot de passe doit contenir au moins 6 caractères.',
    'password_confirmation.confirmed': 'La confirmation du mot de passe ne correspond pas.',
  };
}
