FROM hypriot/rpi-node:latest
MAINTAINER Max Nowack <max@unsou.de>

ENV NODE_ENV production

WORKDIR /opt/spotify-radio-playlists
ADD package.json package.json
RUN npm install --production
ADD .env .env
ADD dist dist

CMD ["npm", "start"]
