import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class IncidentValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    type_incident: schema.string({}, [
      rules.required(),
      rules.maxLength(255),
      rules.alphaNum(),
    ])

    ,
    description: schema.string({}, [
      rules.required(),
      rules.alphaNum(),
    ]),
  })


  public static messages = {
    'type_incident.required': 'Le type d\'incident est requis.',
    'type_incident.maxLength': 'Le type d\'incident ne doit pas dépasser 255 caractères.',
    'description.required': 'La description est requise.',
  }
}
