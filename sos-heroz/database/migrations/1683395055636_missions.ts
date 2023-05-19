import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { DateTime } from 'luxon'

export default class CreateMissionsTable extends BaseSchema {
  protected tableName = 'missions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nom_mission', 120)
      table.string('type_incident', 100)
      table.text('description')
      table.string('latitude', 25)
      table.string('longitude', 25)
      table.date('date_incident')
      table.string('statut', 25)
      table.boolean('est_confirmee')
      table.integer('urgence')
      table
        .integer('ville_id')
        .unsigned()
        .references('villes.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('superhero_id')
        .unsigned()
        .references('superheroes.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
