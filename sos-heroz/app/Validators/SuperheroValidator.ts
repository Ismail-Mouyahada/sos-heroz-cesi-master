import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SuperheroValidator {
  constructor(protected ctx: HttpContextContract) { }
  public static schema = schema.create({
    profil: schema.string({}, [
      rules.required(),
      rules.maxLength(255),
    ]),
    nom: schema.string({}, [
      rules.required(),
      rules.maxLength(255),
    ]),
    prenom: schema.string({}, [
      rules.required(),
      rules.maxLength(255),
    ]),
    tel: schema.string({}, [
      rules.required(),
    ]),
    nom_heroique: schema.string({}, [
      rules.required(),
      rules.maxLength(255),
    ]),
    description_pouvoir: schema.string({}, [
      rules.required(),
    ]),
    disponible: schema.string({}, [
      rules.required(),
    ]),
    latitude: schema.string({}, [
      rules.required(),
    ]),
    longitude: schema.string({}, [
      rules.required(),
    ]),
    max_mission: schema.number(),

  });

  public static messages = {
    'profil.required': 'Le profil est requis.',
    'profil.maxLength': 'Le profil ne doit pas dépasser 255 caractères.',
    'nom.required': 'Le nom est requis.',
    'nom.maxLength': 'Le nom ne doit pas dépasser 255 caractères.',
    'prenom.required': 'Le prénom est requis.',
    'prenom.maxLength': 'Le prénom ne doit pas dépasser 255 caractères.',
    'tel.required': 'Le téléphone est requis.',
    'nom_heroique.required': 'Le nom héroïque est requis.',
    'nom_heroique.maxLength': 'Le nom héroïque ne doit pas dépasser 255 caractères.',
    'description_pouvoir.required': 'La description du pouvoir est requise.',
    'disponible.boolean': 'La valeur du champ "disponible" doit être un booléen.',
    'latitude.required': 'La latitude est requise.',
    'longitude.required': 'La longitude est requise.',
    'max_mission.number': 'Le champ max_mission doit être un nombre.',
    'userId.exists': 'L\'utilisateur spécifié n\'existe pas.',
  };
}
