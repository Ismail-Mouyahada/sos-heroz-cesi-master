
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MissionValidator {
  constructor(protected ctx: HttpContextContract) { }
  public static schema = schema.create({
    nom_mission: schema.string({}, [
      rules.required(),
      rules.maxLength(255),
    ]),
    type_incident: schema.string({}, [
      rules.required(),
      rules.maxLength(255),
    ]),
    description: schema.string({}, [
      rules.required(),
    ]),
    latitude: schema.string({}, [
      rules.required(),
    ]),
    longitude: schema.string({}, [
      rules.required(),
    ]),
    ville: schema.string({}, [
      rules.required(),
    ]),
    code_postal: schema.string({}, [
      rules.required(),
    ]),

    statut: schema.enum(['nouvelle', 'en_cours', 'terminée', 'annulée', 'rapportée']),
    est_confirmee: schema.boolean(),
    urgence: schema.number(),
    superheroId: schema.number([
      rules.exists({ table: 'superheroes', column: 'id' }),
    ]),

  });

  public static messages = {
    'nom_mission.required': 'Le nom de la mission est requis.',
    'nom_mission.maxLength': 'Le nom de la mission ne doit pas dépasser 255 caractères.',
    'type_incident.required': 'Le type d\'incident est requis.',
    'type_incident.maxLength': 'Le type d\'incident ne doit pas dépasser 255 caractères.',
    'description.required': 'La description est requise.',
    'latitude.required': 'La latitude est requise.',
    'longitude.required': 'La longitude est requise.',
    'date_incident.date': 'La date de l\'incident doit être une date valide.',
    'statut.enum': 'Le statut doit être l\'une des valeurs suivantes : pending, in_progress, completed.',
    'est_confirmee.boolean': 'La valeur du champ "est_confirmee" doit être un booléen.',
    'urgence.number': 'Le champ urgence doit être un nombre.',
    'superheroId.exists': 'Le superhéros spécifié n\'existe pas.',
    'villeId.exists': 'La ville spécifiée n\'existe pas.',
  };
}
