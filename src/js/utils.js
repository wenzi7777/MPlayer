const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
})

const formatDuration = (time) => {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)
    if (hours === 0) {
        return `${minutes}:${leadingZeroFormatter.format(seconds)}`
    } else {
        return `${hours}:${leadingZeroFormatter.format(
            minutes
        )}:${leadingZeroFormatter.format(seconds)}`
    }
}

const hexToRGB = (hex, alpha) => {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

const hexToRGBValue = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    return {
        r,
        g,
        b
    }
}

const useMobileStyles = () => {
    let screenSize = {
        width: 0,
        height: 0
    }
    screenSize.width = window.innerWidth
    screenSize.height = window.innerHeight

    return screenSize.width < 720;

}

const formatOptions = (options) => {
    let object = {
        lang: options.lang || 'en_US',
        playerMode: options.playerMode || 'normal',
        autoplay: options.autoplay || false,
        hints: options.hints || {
            enabled: false
        },
        spotlight: options.spotlight || {
            enabled: false,
            backgroundColor: '#FFFFFF'
        },
        theme: options.theme || '#39c5bb',
        tools: options.tools || ['timeline', 'playPause', 'volumeControl', 'durationViewer', 'screenshot', 'playerSettings', 'enablePlaylist', 'subtitles', 'miniPlayer', 'theaterMode', 'fullscreen'],
        hotkey: options.hotkey || true,
        preload: options.preload || true,
        volume: options.volume || 1,
        playbackRates: options.playbackRates || [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
        index: options.index || 0,
        infoPanel: options.infoPanel || ['basicVideoInfo', 'playerFPS', 'videoURL', 'connectionStatus', 'date', 'playerInfo'],
        contextMenu: options.contextMenu || [
            {
                title: 'MPlayer',
                targetFunction: 'openLink',
                params: `https://mplayer.1205.moe/`
            },
            {
                title: 'Player Info',
                targetFunction: 'toggleInfoPanel'
            }
        ],
        videos: options.videos || false
    }

    if (object.playerMode !== 'normal' && object.playerMode !== 'live') {
        return false
    }

    if (object.autoplay !== true && object.autoplay !== false) {
        return false
    }

    if (typeof object.tools !== 'object') {
        return false
    }

    if (object.hotkey !== true && object.hotkey !== false) {
        return false
    }

    if (object.preload !== true && object.preload !== false) {
        return false
    }

    if (object.volume > 1 || object.volume < 0) {
        options.volume = 1
    }

    if (typeof object.playbackRates !== 'object') {
        return false
    }

    if (typeof object.index !== 'number') {
        return false
    }

    if (typeof object.infoPanel !== 'object') {
        return false
    }

    if (typeof object.contextMenu !== 'object') {
        return false
    }

    if (!object.videos) {
        return false
    }

    if (typeof object.videos !== 'object') {
        return false
    }

    return object
}

const browserDetector = () => {
    return {
        firefox: /firefox/i.test(window.navigator.userAgent),
        chrome: /chrome/i.test(window.navigator.userAgent),
        safari: /safari/i.test(window.navigator.userAgent)
    }
}

const mobileDetector = () => {
    return {
        mobile: /mobile/i.test(window.navigator.userAgent)
    }
}

export {
    formatDuration,
    hexToRGB,
    useMobileStyles,
    formatOptions,
    hexToRGBValue,
    browserDetector,
    mobileDetector,
}