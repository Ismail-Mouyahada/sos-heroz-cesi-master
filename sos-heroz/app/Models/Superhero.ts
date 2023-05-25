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
  public incidents_list: string

  @column()
  public super_force: boolean

  @column()
  public vol: boolean

  @column()
  public super_vitesse: boolean

  @column()
  public invulnerabilite: boolean

  @column()
  public guerison_rapide: boolean

  @column()
  public controle_des_elements: boolean

  @column()
  public teleportation: boolean

  @column()
  public invisibilite: boolean

  @column()
  public controle_montal: boolean

  @column()
  public precognition: boolean

  @column()
  public super_intelligence: boolean

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
