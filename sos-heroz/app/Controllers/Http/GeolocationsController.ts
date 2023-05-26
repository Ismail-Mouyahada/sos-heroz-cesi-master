import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

export default class GeolocationsController {
  public async index({ params, request }: HttpContextContract) {
    const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN

    // Get the latitude and longitude from the request query
    const { lat, lon } = request.body()

    // Make an HTTP request to the Mapbox Geocoding API
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json`,
      {
        params: {
          access_token: mapboxAccessToken,
        },
      }
    )

    // Extract the location details from the API response
    const { features } = response.data
    const [place] = features

    // Extract the desired location details (e.g., city, street, etc.)
    const city = place.context.find((context) => context.id.startsWith('place.'))
    const street = place.address

    return [city, street]
  }

  public async create({ }: HttpContextContract) { }

  public async store({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
