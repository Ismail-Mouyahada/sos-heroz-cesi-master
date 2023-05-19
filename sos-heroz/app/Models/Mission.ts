import { DateTime } from 'luxon'

import Superhero from 'App/Models/Superhero';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Ville from './Ville';


export default class Mission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nom_mission: string

  @column()
  public type_incident: string

  @column()
  public description: string

  @column()
  public latitude: string

  @column()
  public longitude: string

  @column()
  public date_incident: Date

  @column()
  public statut: string

  @column()
  public est_confirmee: boolean

  @column()
  public urgence: number

  @column()
  public superheroId: Number
  @belongsTo(() => Superhero)
  public Superhero: BelongsTo<typeof Superhero>

  @column()
  public villeId: Number
  @belongsTo(() => Ville)
  public Ville: BelongsTo<typeof Ville>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
