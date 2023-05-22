import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Mission from './Mission'
import User from './User'
 


export default class Superhero extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public profil: string

  @column()
  public nom: string

  @column()
  public prenom: string

  @column()
  public tel: string

  @column()
  public nom_heroique: string

  @column()
  public description_pouvoir: string

  @column()
  public disponible: boolean

  @column()
  public latitude: string

  @column()
  public longitude: string

  @column()
  public max_mission: number

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Mission)
  public missions: HasMany<typeof Mission>

  @belongsTo(() => User)
  public User: BelongsTo<typeof User>

}
