import api from './api'
import { existingTracks } from './tracks'

export default function addTrackToPlaylist(playlistId, trackId) {
  if (!existingTracks[playlistId]) existingTracks[playlistId] = []
  if (!trackId || existingTracks[playlistId].includes(trackId)) {
    return new Promise(resolve => resolve())
  }
  return api.addTracksToPlaylist(process.env.USER_ID, playlistId, [`spotify:track:${trackId}`]).then(() => {
    existingTracks[playlistId].push(trackId)
    return true
  })
}
