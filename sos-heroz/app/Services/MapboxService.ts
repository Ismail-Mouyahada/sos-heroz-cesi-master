// import Env from '@ioc:Adonis/Core/Env';
// import axios from 'axios';

// class MapboxService {
//   public static async getGeocode(query: string) {
//     const accessToken = Env.get('MAPBOX_ACCESS_TOKEN');
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}`;

//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       console.error('Mapbox geocoding error:', error.message);
//       throw new Error('Failed to retrieve geocode information');
//     }
//   }
// }

// export default MapboxService;
// TODO: Install axois
