import 'babel-polyfill'
import dotenv from 'dotenv'
import pMap from 'p-map'
import playlists from './playlists'
import getTracksInPlaylist from './getTracksInPlaylist'
import saveTracks from './saveTracks'
import { refreshToken } from './api'

dotenv.config()

async function start() {
  const fetchPlaylists = async () => {
    await refreshToken()
    await pMap(playlists, async ({ playlistId, fetchTracks }) => {
      const items = await fetchTracks()
      return saveTracks(playlistId, items)
    })
    setTimeout(() => fetchPlaylists(), 1000 * 60)
  }

  await refreshToken()
  await pMap(playlists, ({ playlistId }) => getTracksInPlaylist(playlistId))
  return fetchPlaylists()
}

console.log('starting …')
if (process.env.NODE_ENV === 'production') {
  start()
} else {
  setTimeout(() => start(), 10000)
}


process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error.message);
  process.exit(1)
})
