
# ![MPlayer](./images/logo.png)

MPlayer is a powerful, colorful and lovely html5 video player.

[![npm](https://img.shields.io/npm/dt/@wenzi7777/mplayer)](https://www.npmjs.com/package/@wenzi7777/mplayer)
[![npm](https://img.shields.io/npm/l/@wenzi7777/mplayer)](https://github.com/wenzi7777/MPlayer/blob/master/LICENSE)
[![](https://data.jsdelivr.com/v1/package/npm/@wenzi7777/mplayer/badge?style=rounded)](https://cdn.jsdelivr.net/npm/@wenzi7777/mplayer@latest/dist/mplayer.bundle.min.js)

# ![Preview](./images/mplayer.png)

## Try it! 

- [Demo](https://mplayer.1205.moe/)

## Documentation
- [中文文档](https://mplayer.1205.moe/)
- [English](https://mplayer.1205.moe/en)


## MPlayer supports:
Streaming formats:
- [HLS](https://github.com/video-dev/hls.js)
- [MPEG DASH](https://github.com/Dash-Industry-Forum/dash.js)
- [FLV](https://github.com/Bilibili/flv.js)

Media formats:
- MP4 H.264 
- WebM 
- Ogg Theora Vorbis

## Features
- Subtitle switching 
- Playlist support, including play next, play previous, playlist panel.
- Screenshot 
- Hotkeys 
- Quality switching 
- Hints 
- Preview images
- Spotlight effect.

## Build you own one

```sh
git clone https://github.com/wenzi7777/MPlayer.git
cd MPlayer
npm i
npm run build
```

## Compatibility

- Chrome 39+ for Android
- Chrome 39+ for Desktop
- Firefox 41+ for Android
- Firefox 42+ for Desktop
- Edge for Windows 10+
- Safari 8+ for MacOS 10.10+
- Safari for ipadOS 13+

## Using MPlayer

### Installation

Prepackaged builds are included [with each release](https://github.com/wenzi7777/MPlayer/releases). Or install the MPlayer.js as a dependency
of your project:

```sh
npm install --save @wenzi7777/mplayer
```

### Embedding MPlayer

```html

<script src="https://cdn.jsdelivr.net/npm/@wenzi7777/mplayer@latest/dist/mplayer.bundle.min.js"></script>
<div id="mplayer"></div>
<script>
  let mplayer = new MPlayer(document.querySelector('#mplayer'), {
    videos: [
      {
        title: '?', // required
        src: '?' // required
      }
    ]
  })
</script>
```

## License
MPlayer is released under the Mozilla Public License 2.0

