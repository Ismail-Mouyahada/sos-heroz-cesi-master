import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('home')
}).as('home')


Route.get('/remerciement', async ({ view }) => {
  return view.render('others.thank')
}).as('merci')


Route.get('dashboard', async ({ view }) => {
  return view.render('dashboard')
})
  .as('dashboard')
  .middleware('auth')


Route.post('/geocode', 'GeolocationsController.index');
Route.get('superheros/public', 'SuperheroesController.list').as('superhero.list')
Route.get('mission/create/public', 'MissionsController.create').as('mission.create')
Route.post('mission/save/public', 'MissionsController.client').as('mission.client')

Route.group(() => {
  Route.group(() => {
    Route.get('register', 'RegisterController.create').as('inscription.debut')
    Route.post('register', 'RegisterController.store').as('inscription.fin')

    Route.get('verification/new', 'EmailVerificationController.create').as('verification.new')
    Route.post('verification', 'EmailVerificationController.store').as('verification.store')
    Route.get('verification/:email', 'EmailVerificationController.verify').as('verification.verify')
    Route.get('login', 'AuthController.create').as('connexion.debut')
    Route.post('login', 'AuthController.store').as('connexion.fin')

    Route.get('forgot-password', 'PasswordResetRequestController.create').as('motdepasse.debut')
    Route.post('forgot-password', 'PasswordResetRequestController.store').as('motdepasse.fin')
    Route.get('reset-password/:token', 'PasswordResetController.create').as('verification.token')
    Route.post('reset-password', 'PasswordResetController.store').as('verification.reset')


  }).middleware('guest')

  Route.group(() => {

    Route.get('confirm-password', 'ConfirmPasswordController.create').as('confirm.create')
    Route.post('confirm-password', 'ConfirmPasswordController.store').as('confirm.store')
    Route.post('logout', 'AuthController.destroy').as('deconnexion')

  }).middleware('auth')
}).namespace('App/Controllers/Http/Auth')


Route.group(() => {

  Route.get('incidents', 'IncidentsController.index').as('incident.index')
  Route.get('incident/create', 'IncidentsController.create').as('incident.create')
  Route.post('incident/save', 'IncidentsController.store').as('incident.store')
  Route.get('incident/:id/show', 'IncidentsController.show').as('incident.show')
  Route.get('incident/:id/edit', 'IncidentsController.edit').as('incident.edit')
  Route.post('incident/:id/update', 'IncidentsController.update').as('incident.update')
  Route.post('incident/:id/delete', 'IncidentsController.destroy').as('incident.delete')

  Route.get('villes', 'VillesController.index').as('ville.index')
  Route.get('ville/create', 'VillesController.create').as('ville.create')
  Route.post('ville/save', 'VillesController.store').as('ville.store')
  Route.get('ville/:id/show', 'VillesController.show').as('ville.show')
  Route.get('ville/:id/edit', 'VillesController.edit').as('ville.edit')
  Route.post('ville/:id/update', 'VillesController.update').as('ville.update')
  Route.post('ville/:id/delete', 'VillesController.destroy').as('ville.delete')

  Route.get('superheros', 'SuperheroesController.index').as('superhero.index')
  Route.get('superhero/create', 'SuperheroesController.create').as('superhero.create')
  Route.post('superhero/save', 'SuperheroesController.store').as('superhero.store')
  Route.get('superhero/:id/show', 'SuperheroesController.show').as('superhero.show')
  Route.get('superhero/:id/edit', 'SuperheroesController.edit').as('superhero.edit')
  Route.post('superhero/:id/update', 'SuperheroesController.update').as('superhero.update')
  Route.post('superhero/:id/delete', 'SuperheroesController.destroy').as('superhero.delete')


  Route.get('missions', 'MissionsController.index').as('mission.index')
  Route.post('mission/save', 'MissionsController.store').as('mission.store')

  Route.get('mission/:id/show', 'MissionsController.show').as('mission.show')
  Route.get('mission/:id/edit', 'MissionsController.edit').as('mission.edit')
  Route.post('mission/:id/update', 'MissionsController.update').as('mission.update')
  Route.post('mission/:id/delete', 'MissionsController.destroy').as('mission.delete')

  Route.get('utilisateurs', 'UtilisateursController.index').as('utilisateur.index')
  Route.get('utilisateur/create', 'UtilisateursController.create').as('utilisateur.create')
  Route.post('utilisateur/save', 'UtilisateursController.store').as('utilisateur.store')
  Route.get('utilisateur/:id/show', 'UtilisateursController.show').as('utilisateur.show')
  Route.get('utilisateur/:id/edit', 'UtilisateursController.edit').as('utilisateur.edit')
  Route.post('utilisateur/:id/update', 'UtilisateursController.update').as('utilisateur.update')
  Route.post('utilisateur/:id/delete', 'UtilisateursController.destroy').as('utilisateur.delete')

}).prefix('app/v1').middleware(['auth'])



