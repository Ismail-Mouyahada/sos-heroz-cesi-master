import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'missions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nomMession',120)
      table.string('typeIncident',100)
      table.text('Description')
      table.string('latitude',25)
      table.string('longitude',25)
      table.dateTime('dateIncident')
      table.string('statut',25)
      table.boolean('estConfirmee')
      table.integer('urgence')
      table.integer('superhero_id').unsigned().references('id').inTable('superheros').onDelete('CASCADE')
      table.integer('ville_id').unsigned().references('id').inTable('villes').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
