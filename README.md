
# ![MPlayer](./docs/mplayer.png)

MPlayer is a powerful, colorful and lovely html5 video player.

# ![Preview](./docs/preview.png)

## Try it! 

- [Demo]('https://mplayer.1205.moe')

## Documentation
- [中文文档]('https://mplayer.1205.moe/')
- [English]('https://mplayer.1205.moe/')


## Features
### MPlayer supports:
Streaming formats:
- [HLS](https://github.com/video-dev/hls.js)
- [MPEG DASH](https://github.com/Dash-Industry-Forum/dash.js)
- [FLV](https://github.com/Bilibili/flv.js)

Media formats:
- MP4 H.264 
- WebM 
- Ogg Theora Vorbis

Spotlight: 
- Subtitle switching 
- Playlist support, including play next, play previous, playlist panel.
- Screenshot 
- Hotkeys 
- Quality switching 
- Hints 
- Preview images

## Build you own one

```sh
git clone https://github.com/wenzi7777/MPlayer.git
cd Mplayer
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

Prepackaged builds are included [with each release](https://github.com/wenzi7777/MPlayer/releases). Or install the hls.js as a dependency
of your project:

```sh
npm install --save @wenzi7777/mplayer
```

### Embedding MPlayer

```html

<script src="https://cdn.jsdelivr.net/wenzi7777/mplayer"></script>
<div id="mplayer"></div>
<script>
  let mplayer = new MPlayer(document.querySelector('#mplayer'), {
    lang: 'en_US',
    tools: ['timeline', 'playPause', 'volumeControl', 'durationViewer', 'screenshot', 'playerSettings', 'enablePlaylist', 'subtitles', 'miniPlayer', 'theaterMode', 'fullscreen'],
    hotkey: true,
    preload: false,
    volume: 1,
    playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    index: 0,
    infoPanel: ['basicVideoInfo', 'playerFPS', 'videoURL', 'connectionStatus', 'date', 'playerInfo'],
    contextMenu: [
      {
        title: 'Player Info',
        targetFunction: 'toggleInfoPanel'
      }
    ],
    videos: [
      {
        title: '?',
        src: '?',
        tracks: [
          {
            srclang: 'en',
            src: '?',
            label: "English(USA)",
            kind: "captions"
          },
        ],
        images: ['?']
      }
    ]
  })
</script>
```

## License
MPlayer is released under Mozilla Public License 2.0

