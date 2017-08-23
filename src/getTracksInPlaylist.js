import { existingTracks } from './tracks'
import api from './api'

const getPlaylistTracks = (userId, playlistId, limit = 100, offset = 0, oldItems = []) =>
  api.getPlaylistTracks(userId, playlistId, { limit, offset }).then(({ body: { items } }) => {
    if (!Array.isArray(items)) return items
    if (!items || !items.length) return oldItems
    const idExists = !!oldItems.filter(item =>
      JSON.stringify(item) === JSON.stringify(items[0])).length
    if (idExists) return oldItems
    if (items.length >= limit) {
      const newOffset = offset + limit
      return getPlaylistTracks(userId, playlistId, limit, newOffset, oldItems.concat(items))
    }
    return oldItems.concat(items)
  })

export default function getTracksInPlaylist(playlistId) {
  if (!existingTracks[playlistId]) existingTracks[playlistId] = []
  return getPlaylistTracks(process.env.USER_ID, playlistId)
    .then(items => items.map((({ track: { id } }) => {
      existingTracks[playlistId].push(id)
      return id
    })))
}
