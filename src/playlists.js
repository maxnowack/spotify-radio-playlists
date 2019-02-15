import fetch from 'node-fetch'

const fetchJson = url => fetch(url).then(res => res.json())
const clear = str => str
  .replace(/feat\. /gi, '')
  .replace(/ft\. /gi, '')
  .replace(/& /gi, '')
  .replace(/&amp; /gi, '')
  .replace(/\(PI\) /gi, '')

export default [{
  playlistId: '6gHJB62EMpfvlR6IKAlE7V',
  fetchTracks: () => fetchJson('http://www.n-joy.de/app/appplaylist100-app_station-njoy.json')
    .then(({ content }) => content.map(({ artist, title }) =>
      clear(`${artist} ${title}`)))
    .then(tracks => tracks.map(track => ({ id: track, track }))),
}, {
  playlistId: '4RsocehVUYsvKz0QVZwHuc',
  fetchTracks: () => fetchJson('http://www.sunshine-live.de/index.php?option=com_playhistory&task=current.track&format=json&stream=studio')
    .then(({ data: { artist, title } }) => clear(`${artist} ${title}`))
    .then(track => [{ id: track, track }]),
}, {
  playlistId: '3KqvELJ2mIqw8q1uSvTKhg',
  fetchTracks: () => fetchJson('http://www.radio21.de/playlist/current_play/index.php')
    .then(({ artist, song }) => clear(`${artist} ${song}`))
    .then(track => [{ id: track, track }]),
}]
