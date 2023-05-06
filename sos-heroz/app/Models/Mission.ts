import { DateTime } from 'luxon'

import Superhero from 'App/Models/Superhero';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Ville from './Ville';


export default class Mission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nomMission: string

  @column()
  public typeIncident: string

  @column()
  public description: string

  @column()
  public latitude: string

  @column()
  public longitude: string

  @column()
  public dateIncident: DateTime

  @column()
  public statut: string

  @column()
  public estConfirmee: boolean

  @column()
  public urgence: number

  @column()
  public superheroId: Number

  @column()
  public villeId: Number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Superhero)
  public Superhero: BelongsTo<typeof Superhero>

  @belongsTo(() => Ville)
  public Ville: BelongsTo<typeof Ville>


}
