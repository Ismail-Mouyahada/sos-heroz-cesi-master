import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

// Routes des vues pour le model "ville"
Route.get('/app/data/villes', 'VillesController.index').as('villes.index')
Route.get('/app/data/ville/creer', 'VillesController.create').as('ville.create')
Route.get('/app/data/ville/:id/details', 'VillesController.show').as('ville.show')
Route.get('/app/data/ville/:id/editer', 'VillesController.edit').as('ville.edit')
// Routes des actions backend du model "ville"
Route.post('/app/data/ville/sauvgarder', 'VillesController.store').as('ville.store')
Route.put('/app/data/ville/:id/modifier', 'VillesController.update').as('ville.update')
Route.delete('/app/data/ville/:id/supprimer', 'VillesController.destroy').as('ville.destroy')

// Routes des vues pour le model "Incident"
Route.get('/app/data/Incidents', 'IncidentsController.index').as('incidents.index')
Route.get('/app/data/Incident/creer', 'IncidentsController.create').as('incident.create')
Route.get('/app/data/Incident/:id/details', 'IncidentsController.show').as('incident.show')
Route.get('/app/data/Incident/:id/editer', 'IncidentsController.edit').as('incident.edit')
// Routes des actions backend du model "Incident"
Route.post('/app/data/Incident/sauvgarder', 'IncidentsController.store').as('incident.store')
Route.put('/app/data/Incident/:id/modifier', 'IncidentsController.update').as('incident.update')
Route.delete('/app/data/Incident/:id/supprimer', 'IncidentsController.destroy').as('incident.destroy')


// Routes des vues pour le model "Superhero"
Route.get('/app/data/Superheros', 'SuperheroesController.index').as('superheros.index')
Route.get('/app/data/Superhero/creer', 'SuperheroesController.create').as('superhero.create')
Route.get('/app/data/Superhero/:id/details', 'SuperheroesController.show').as('superhero.show')
Route.get('/app/data/Superhero/:id/editer', 'SuperheroesController.edit').as('superhero.edit')
// Routes des actions backend du model "Superhero"
Route.post('/app/data/Superhero/sauvgarder', 'SuperheroesController.store').as('superhero.store')
Route.put('/app/data/Superhero/:id/modifier', 'SuperheroesController.update').as('superhero.update')
Route.delete('/app/data/Superhero/:id/supprimer', 'SuperheroesController.destroy').as('superhero.destroy')


// Routes des vues pour le model "Mission"
Route.get('/app/data/Missions', 'MissionsController.index').as('missions.index')
Route.get('/app/data/Mission/creer', 'MissionsController.create').as('mission.create')
Route.get('/app/data/Mission/:id/details', 'MissionsController.show').as('mission.show')
Route.get('/app/data/Mission/:id/editer', 'MissionsController.edit').as('mission.edit')
// Routes des actions backend du model "Mission"
Route.post('/app/data/Mission/sauvgarder', 'MissionsController.store').as('mission.store')
Route.put('/app/data/Mission/:id/modifier', 'MissionsController.update').as('mission.update')
Route.delete('/app/data/Mission/:id/supprimer', 'MissionsController.destroy').as('mission.destroy')


// Routes des vues pour le model "utilisateur"
Route.get('/app/data/utilisateurs', 'UtilisateursController.index').as('utilisateurs.index')
Route.get('/app/data/utilisateur/creer', 'UtilisateursController.create').as('utilisateur.create')
Route.get('/app/data/utilisateur/:id/details', 'UtilisateursController.show').as('utilisateur.show')
Route.get('/app/data/utilisateur/:id/editer', 'UtilisateursController.edit').as('utilisateur.edit')
// Routes des actions backend du model "utilisateur"
Route.post('/app/data/utilisateur/sauvgarder', 'UtilisateursController.store').as('utilisateur.store')
Route.put('/app/data/utilisateur/:id/modifier', 'UtilisateursController.update').as('utilisateur.update')
Route.delete('/app/data/utilisateur/:id/supprimer', 'UtilisateursController.destroy').as('utilisateur.destroy')
