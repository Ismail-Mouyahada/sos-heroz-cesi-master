import { DateTime } from 'luxon'

import Superhero from 'App/Models/Superhero';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';


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
  public statut: string

  @column()
  public est_confirmee: boolean

  @column()
  public urgence: number

  @column()
  public ville: string

  @column()
  public code_postal: string

  @column()
  public superheroId: Number
  @belongsTo(() => Superhero)
  public Superhero: BelongsTo<typeof Superhero>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
