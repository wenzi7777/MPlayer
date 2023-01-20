import mplayerEjsTemplate from '../template/mplayer.ejs'

class Template {
    constructor(options) {
        this.options = options
    }

    htmlCode() {
        this.ejsRenderData = {
            lang: this.options.lang,
            playerMode: this.options.playerMode,
            autoplay: this.options.autoplay,
            theme: this.options.theme,
            loop: this.options.loop,
            tools: this.options.tools,
            hotkey: this.options.hotkey,
            preload: this.options.preload,
            volume: this.options.volume,
            playbackRates: this.options.playbackRates,
            floatImage: this.options.floatImage,
            videos: this.options.video,
            subtitle: this.options.subtitle
        }

        return mplayerEjsTemplate(this.ejsRenderData)
    }

    init() {
        this.options.player.innerHTML = this.htmlCode()
        this.getAllReachableElements()
    }

    getAllReachableElements() {
        // mplayer sizer and video element
        this.getElement('mplayer_sizer', '.mplayer_sizer')
        this.getElement('mplayer_video', '.mplayer_video')

        // mplayer tools
        this.getElement('mplayer_playPreviousButton', '.mplayer_playPreviousButton')
        this.getElement('mplayer_playNextButton', '.mplayer_playNextButton')
        this.getElement('mplayer_playPauseButton', '.mplayer_playPauseButton')
        this.getElement('mplayer_muteButton', '.mplayer_muteButton')
        this.getElement('mplayer_volumeSlider', '.mplayer_volumeSlider')
        this.getElement('mplayer_currentTime', '.mplayer_currentTime')
        this.getElement('mplayer_totalTime', '.mplayer_totalTime')
        this.getElement('mplayer_screenshotButton', '.mplayer_screenshotButton')
        this.getElement('mplayer_settings', '.mplayer_settings')
        this.getElement('mplayer_settingsButton', '.mplayer_settingsButton')
        this.getElement('mplayer_playlist', '.mplayer_playlist')
        this.getElement('mplayer_playlistButton', '.mplayer_playlistButton')
        this.getElement('mplayer_subtitles', '.mplayer_subtitles')
        this.getElement('mplayer_subtitlesButton', '.mplayer_subtitlesButton')
        this.getElement('mplayer_miniPlayerButton', '.mplayer_miniPlayerButton')
        this.getElement('mplayer_theaterModeButton', '.mplayer_theaterModeButton')
        this.getElement('mplayer_fullscreenButton', '.mplayer_fullscreenButton')
        this.getElement('mplayer_controlsContainer', '.mplayer_controlsContainer')
        this.getElement('mplayer_noticeList', '.mplayer_noticeList')
    }

    getElement(elementName, elementQueryString) {
        this[elementName] = document.querySelector(elementQueryString)
    }

}

export default Template