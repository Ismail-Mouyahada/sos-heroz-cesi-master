import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateMissionsTable extends BaseSchema {
  protected tableName = 'missions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nom_mission', 120)
      table.string('type_incident')
      table.string('ville')
      table.string('code_postal')
      table.text('description')

      table.string('latitude', 25)
      table.string('longitude', 25)
      table.string('statut', 25).defaultTo('en_attente')
      table.boolean('est_confirmee').defaultTo(false)
      table.integer('urgence').defaultTo(1)

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
