import moment from 'moment'
import dotenv from 'dotenv'
import SpotifyWebApi from 'spotify-web-api-node'

dotenv.config()

const credentials = {
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
}

const spotifyApi = new SpotifyWebApi()
spotifyApi.setCredentials(credentials)
export default spotifyApi


let lastRefresh = null
export function refreshToken() {
  if (!lastRefresh || moment(lastRefresh).add(30, 'minutes') <= moment()) {
    return spotifyApi.refreshAccessToken()
      .then((data) => {
        lastRefresh = moment()
        console.log('The access token has been refreshed!');
        spotifyApi.setAccessToken(data.body.access_token);
      }, (err) => {
        console.log('Could not refresh access token', err);
      })
  }
  return new Promise(r => r())
}
