import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VilleValidator {
  constructor(protected ctx: HttpContextContract) { }

  public static schema = schema.create({
    nom_ville: schema.string({}, [
      rules.required(),
      rules.maxLength(255),
    ]),
    code_postal: schema.string({}, [
      rules.required(),
      rules.maxLength(10),
    ]),
    latitude: schema.string({}, [
      rules.required(),
      rules.maxLength(35),
    ]),
    longitude: schema.string({}, [
      rules.required(),
      rules.maxLength(35),
    ]),
  });

  public static messages = {
    'nom_ville.required': 'Le nom de la ville est requis.',
    'nom_ville.maxLength': 'Le nom de la ville ne doit pas dépasser 255 caractères.',
    'code_postal.required': 'Le code postal est requis.',
    'code_postal.maxLength': 'Le code postal ne doit pas dépasser 10 caractères.',
    'latitude.required': 'La latitude est requise.',
    'longitude.required': 'La longitude est requise.',
  };
}
