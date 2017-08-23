import moment from 'moment'
import api from './api'
import { trackMapping } from './tracks'

export default function getTrackId({ id, track }) {
  if (trackMapping[id || track]) return new Promise(resolve => resolve(trackMapping[id || track]))
  return api.searchTracks(track).then((data) => {
    const { body: { tracks } } = data
    if (!tracks.items.length) {
      console.log(moment().format(), 'not found', track)
      return null
    }
    trackMapping[id || track] = tracks.items[0].id
    return tracks.items[0].id
  })
}
