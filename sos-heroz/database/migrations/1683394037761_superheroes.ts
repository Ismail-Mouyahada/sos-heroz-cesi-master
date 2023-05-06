import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'superheroes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('profil', 225)
      table.string('nom', 25)
      table.string('prenom', 25)
      table.string('tel', 15)
      table.string('nom_heroique', 60)
      table.text('description_pouvoir')
      table.boolean('disponible')
      table.string('latitude', 25)
      table.string('langitude', 25)
      table.integer('max_mission', 3)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.integer('user_id')
        .unsigned()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
