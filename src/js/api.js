class Api {
    constructor(mplayer) {
        this.mplayer = mplayer
    }

    /**
     * @description Play video
     */
    play() {
        this.mplayer.play()
    }

    /**
     * @description Pause video
     */
    pause() {
        this.mplayer.pause()
    }

    /**
     * @description Toggle play pause
     */
    togglePlayPause() {
        this.mplayer.togglePlayPause()
    }

    /**
     * @description Reload MPlayer
     */
    reload() {
        this.mplayer.reload()
    }

    /**
     * @description Mute video
     */
    mute() {
        this.mplayer.mute()
    }

    /**
     * @description Unmute video
     */
    unmute() {
        this.mplayer.unmute()
    }

    /**
     * @description Toggle mute
     */
    toggleMute() {
        this.mplayer.toggleMute()
    }

    /**
     * @description Skip video by certain time
     * @param time
     */
    skip(time) {
        this.mplayer.skip(time)
    }

    /**
     * @description Enter PiP
     */
    enterPiP() {
        this.mplayer.enterPiP()
    }

    /**
     * @description Exit PiP
     */
    exitPiP() {
        this.mplayer.exitPiP()
    }

    /**
     * @description Toggle mini player
     */
    toggleMiniPlayer() {
        this.mplayer.toggleMiniPlayer()
    }

    /**
     * @description Enter fullscreen
     */
    enterFullscreen() {
        this.mplayer.enterFullscreen()
    }

    /**
     * @description Exit fullscreen
     */
    exitFullscreen() {
        this.mplayer.exitFullscreen()
    }

    /**
     * @description Toggle fullscreen
     */
    toggleFullscreen() {
        this.mplayer.toggleFullscreen()
    }

    /**
     * @description Get current video resolution
     */
    videoResolution() {
        this.mplayer.getVideoResolution()
    }

    /**
     * @description Get current video url
     */
    videoURL() {
        this.mplayer.getVideoURL()
    }

    /**
     * @description Get current video buffered time
     */
    buffered() {
        return this.mplayer.getBuffered()
    }

    /**
     * @description Get current video currentTime
     */
    currentTime() {
        return this.mplayer.getCurrentTime()
    }

    /**
     * @description Open link
     * @param URL
     */
    openLink(URL) {
        this.mplayer.openLink(URL)
    }

    /**
     * @description Toggle info panel
     */
    toggleInfoPanel() {
        this.mplayer.toggleInfoPanel()
    }

    /**
     * @description Apply mobile style
     */
    useMobileStyle() {
        this.mplayer.useMobileStyle()
    }

    /**
     * @description Cancel mobile style
     */
    cancelMobileStyle() {
        this.mplayer.cancelMobileStyle()
    }

    /**
     * @description Toggle mobile style
     */
    toggleMobileStyle() {
        this.mplayer.toggleMobile()
    }

    /**
     * @description Destroy plugins
     */
    destroyPlugins() {
        this.mplayer.destroyPlugins()
    }

    /**
     * @description Enter theater mode
     */
    enterTheaterMode() {
        this.mplayer.enterTheaterMode()
    }

    /**
     * @description Exit theater mode
     */
    exitTheaterMode() {
        this.mplayer.exitTheaterMode()
    }

    /**
     * @description Toggle theater mode
     */
    toggleTheaterMode() {
        this.mplayer.toggleTheaterMode()
    }

    /**
     * @description Destroy MPlayer instance
     */
    destroy() {
        this.mplayer.destroy()
    }

    /**
     * @description Get player container
     */
    playerContainer() {
        return this.mplayer.template.mplayer_sizer
    }

    /**
     * @description get player
     */
    player() {
        return this.mplayer.template.mplayer_video
    }

    /**
     * @description Play next
     */
    playNext() {
        this.mplayer.playlist.playNext()
    }

    /**
     * @description Play Previous
     */
    playPrevious() {
        this.mplayer.playlist.playPrevious()
    }

    /**
     * @description Publish new notice
     * @param contents
     * @param delay
     */
    publishNotice(contents, delay) {
        this.mplayer.notice.publish(contents, delay)
    }

    /**
     * @description Show hints
     */
    showHints() {
        this.mplayer.hints.showHints()
    }

    /**
     * @description Hide hints
     */
    hideHints() {
        this.mplayer.hints.hideHints()
    }

    /**
     * @description Toggle hints
     */
    toggleHints() {
        this.mplayer.hints.toggle()
    }

    /**
     * @description Show hints
     */
    showSpotlight() {
        this.mplayer.spotlight.show()
    }

    /**
     * @description Hide hints
     */
    hideSpotlight() {
        this.mplayer.spotlight.hide()
    }

    /**
     * @description Toggle hints
     */
    toggleSpotlight() {
        this.mplayer.spotlight.toggle()
    }

    /**
     * @description Attach event
     * @param name
     * @param callback
     */
    on(name, callback) {
        this.mplayer.on(name, callback)
    }

}

export default Api