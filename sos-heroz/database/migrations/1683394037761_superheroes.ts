import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'superheroes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('profil')
      table.string('nom', 25)
      table.string('prenom', 25)
      table.string('tel', 30)
      table.string('nom_heroique', 60)
      table.text('description_pouvoir')
      table.boolean('disponible')
      table.string('latitude', 25)
      table.string('longitude', 25)
      table.integer('max_mission', 3).defaultTo(1)
      table.string('incidents_list').nullable().defaultTo(null)
      table.boolean('super_force').defaultTo(false)
      table.boolean('vol').defaultTo(false)
      table.boolean('super_vitesse').defaultTo(false)
      table.boolean('invulnerabilite').defaultTo(false)
      table.boolean('guerison_rapide').defaultTo(false)
      table.boolean('controle_des_elements').defaultTo(false)
      table.boolean('teleportation').defaultTo(false)
      table.boolean('invisibilite').defaultTo(false)
      table.boolean('controle_montal').defaultTo(false)
      table.boolean('precognition').defaultTo(false)
      table.boolean('super_intelligence').defaultTo(false)
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
