import moment from 'moment'
import pMap from 'p-map'
import getTrackId from './getTrackId'
import addToPlaylist from './addTrackToPlaylist'

export default function saveTracks(playlistId, items) {
  const mappingFn = track => getTrackId(track)
    .then(trackId => addToPlaylist(playlistId, trackId))
    .then((added) => {
      if (!added) return
      console.log(moment().format(), 'added', track.track)
    })
  return pMap(items, mappingFn, { concurrency: 5 })
}
