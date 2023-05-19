import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([
      rules.trim(),
      rules.email(),
      rules.exists({ table: 'users', column: 'email' }),
    ]),
  })

  public messages = {
    required: 'le  champ est obligatoire.',
    exists: 'Aucun compte avec cet adresse e-mail.',
  }
}
