import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

// Routes des vues pour le model "ville"
Route.get('/app/data/villes', 'VillesController.index')
Route.get('/app/data/ville/creer', 'VillesController.create')
Route.get('/app/data/ville/:id/details', 'VillesController.show')
Route.get('/app/data/ville/:id/editer', 'VillesController.edit')
// Routes des actions backend du model "ville"
Route.post('/app/data/ville/sauvgarder', 'VillesController.store')
Route.put('/app/data/ville/:id/modifier', 'VillesController.update')
Route.delete('/app/data/ville/:id/supprimer', 'VillesController.destroy')


// Routes des vues pour le model "Superhero"
Route.get('/app/data/Superheros', 'SuperheroesController.index')
Route.get('/app/data/Superhero/creer', 'SuperheroesController.create')
Route.get('/app/data/Superhero/:id/details', 'SuperheroesController.show')
Route.get('/app/data/Superhero/:id/editer', 'SuperheroesController.edit')
// Routes des actions backend du model "Superhero"
Route.post('/app/data/Superhero/sauvgarder', 'SuperheroesController.store')
Route.put('/app/data/Superhero/:id/modifier', 'SuperheroesController.update')
Route.delete('/app/data/Superhero/:id/supprimer', 'SuperheroesController.destroy')


// Routes des vues pour le model "Mission"
Route.get('/app/data/Missions', 'MissionsController.index')
Route.get('/app/data/Mission/creer', 'MissionsController.create')
Route.get('/app/data/Mission/:id/details', 'MissionsController.show')
Route.get('/app/data/Mission/:id/editer', 'MissionsController.edit')
// Routes des actions backend du model "Mission"
Route.post('/app/data/Mission/sauvgarder', 'MissionsController.store')
Route.put('/app/data/Mission/:id/modifier', 'MissionsController.update')
Route.delete('/app/data/Mission/:id/supprimer', 'MissionsController.destroy')


// Routes des vues pour le model "utilisateur"
Route.get('/app/data/utilisateurs', 'UtilisateursController.index')
Route.get('/app/data/utilisateur/creer', 'UtilisateursController.create')
Route.get('/app/data/utilisateur/:id/details', 'UtilisateursController.show')
Route.get('/app/data/utilisateur/:id/editer', 'UtilisateursController.edit')
// Routes des actions backend du model "utilisateur"
Route.post('/app/data/utilisateur/sauvgarder', 'UtilisateursController.store')
Route.put('/app/data/utilisateur/:id/modifier', 'UtilisateursController.update')
Route.delete('/app/data/utilisateur/:id/supprimer', 'UtilisateursController.destroy')
