import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Role {
  public async handle({ auth, response, view }: HttpContextContract, next: () => Promise<void>, allowedRoles: string[]) {
    // Check if the user is authenticated
    if (auth.isAuthenticated) {
      const userRole = auth.user?.role

      // Check if the user's role is allowed
      if (userRole && allowedRoles.includes(userRole)) {
        // User's role is allowed, proceed to the next middleware
        await next()
      } else {
        // User's role is not allowed, redirect to an error page or any other appropriate route
        return view.render('errors.unauthorized')
      }
    } else {
      // User is not authenticated, redirect to the login page or any other appropriate route
      return response.redirect().toRoute('home')
    }
  }
}
