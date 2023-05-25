import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Mission from './Mission'

export default class Ville extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nom_ville: string

  @column()
  public code_postal: string

  @column()
  public latitude: string

  @column()
  public longitude: string
 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Mission)
  public missions: HasMany<typeof Mission>
}
