import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'superheroes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('profil',225)
      table.string('nom',25)
      table.string('prenom',25)
      table.string('tel',15)
      table.string('nomHeroique',60)
      table.text('descriptionPouvoir')
      table.boolean('disponible')
      table.string('latitude',25)
      table.string('langitude',25)
      table.integer('maxMission',3)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
