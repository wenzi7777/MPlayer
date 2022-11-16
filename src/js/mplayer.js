import Template from './template'
import Events from "./events"
import InfoLayer from "./infoLayer";
import Translation from "./translation";
import Playlist from "./playlist";
import Controller from "./controller";
import Hints from "./hints";
import ContextMenu from "./contextMenu";
import InfoPanel from "./infoPanel";
import {formatOptions, hexToRGB} from "./utils";
import MobileStyleWatchDog from "./mobileStyleWatchDog";
import Notice from "./notice";
import LoadingWatchDog from "./bufferingWatchDog";
import BufferingWatchDog from "./bufferingWatchDog";
import ErrorLayer from "./errorLayer";
import Hotkey from "./hotkey";
import Api from "./api";

class MPlayer {
    constructor(element, options) {
        this.player = element
        this.options = formatOptions(options)
        this.options.player = element
        this.plugins = {}
        this.template = new Template(this.options)
        this.events = new Events()
        this.translate = new Translation(options)
        this.template.init()
        this.infoLayer = new InfoLayer(this)
        this.notice = new Notice(this)
        this.playlist = new Playlist(this)
        if (this.options.hints.enabled) {
            this.hints = new Hints(this)
        }
        this.controller = new Controller(this)
        this.infoPanel = new InfoPanel(this)
        this.contextMenu = new ContextMenu(this)
        this.mobileStyleWatchDog = new MobileStyleWatchDog(this)
        this.bufferingWatchDog = new BufferingWatchDog(this)
        this.errorLayer = new ErrorLayer(this)
        this.documentClickHandler = this.documentClick.bind(this)
        this.playerClickHandler = this.playerClick.bind(this)
        this.hotKey = new Hotkey(this)
        this.initThemeColor()
        this.create()
        this.initVideo()
    }

    create() {
        this.attachEvents()
    }

    attachEvents() {
        for (let i = 0; i < this.events.videoEvents.length; i++) {
            this.template.mplayer_video.addEventListener(this.events.videoEvents[i], () => {
                this.events.trigger(this.events.videoEvents[i]);
            });
        }

        this.on('loadedmetadata', () => {
            if (this.infoLayer) {
                this.infoLayer.destroy()
            }
            if (this.hints) {
                this.hints.mount()
                this.hints.render()
            }
        })

        if (this.options.tools.includes('playPause')) {
            this.template.mplayer_video.addEventListener('click', () => {
                this.togglePlayPause()
            })
        }

        this.on('mplayer:reload', () => {
            this.controller.reload()
            this.playlist.refreshPanel()
        })

        this.on('mplayer:error', (e) => {
            if (!this.errorLayer.existed()) {
                this.errorLayer.mount()
            }
            this.errorLayer.addTag('error', e)
        })

        this.on('error', (e) => {
            if (!this.errorLayer.existed()) {
                this.errorLayer.mount()
            }
            this.errorLayer.addTag('error', e)
        })

        document.addEventListener('click', this.documentClickHandler, true)
        this.template.mplayer_sizer.addEventListener('click', this.playerClickHandler, true)

    }

    on(name, callback) {
        this.events.on(name, callback);
    }

    reload() {
        // stop playing video
        this.template.mplayer_video.pause()
        this.destroyPlugins()
        this.initVideo()
        this.events.trigger('mplayer:reload');
    }

    initVideo() {
        this.infoLayer.insertInfoLayer('video-loading', '', '', '', 'data-mplayer-info-layer')
        this.infoLayer.addInfoTag('info', 'initializing-mplayer')
        this.getMediaType(this.options)
        this.infoLayer.addInfoTag('success', 'initialized-mplayer')
        this.infoLayer.addInfoTag('success', 'get-media-resource-type-successfully')
        this.infoLayer.addInfoTag('info', 'attempt-to-load-video')
        switch (this.playlist.getCurrentVideoObject().type) {
            case 'hls':
                try {
                    if (!window.Hls.isSupported()) {
                        // error
                        this.events.trigger('mplayer:error', 'cant-find-hlsjs')
                        return;
                    }
                    let hls = new window.Hls()
                    this.plugins.hls = hls
                    hls.loadSource(this.playlist.getCurrentVideoObject().src)
                    hls.attachMedia(this.template.mplayer_video)

                } catch (e) {
                    // error
                    console.log(e)
                    this.events.trigger('mplayer:error', 'error-occurred-when-initializing-hlsjs')
                }
                break;
            case 'dash':
                try {
                    if (!window.dashjs) {
                        // error
                        this.events.trigger('mplayer:error', 'cant-find-dashjs')
                        return;
                    }
                    let dash = dashjs.MediaPlayer().create()
                    this.plugins.dash = dash
                    dash.initialize(this.template.mplayer_video, this.playlist.getCurrentVideoObject().src, this.options.autoplay)
                } catch (e) {
                    // error
                    console.log(e)
                    this.events.trigger('mplayer:error', 'error-occurred-when-initializing-dashjs')
                }
                break;
            case 'flv':
                try {
                    if (!window.flvjs) {
                        // error
                        this.events.trigger('mplayer:error', 'cant-find-flvjs')
                        return;
                    }
                    let flv = window.flvjs.createPlayer({
                        type: 'flv',
                        url: this.playlist.getCurrentVideoObject().src
                    });
                    this.plugins.flv = flv
                    flv.attachMediaElement(this.template.mplayer_video);
                    flv.load()
                } catch (e) {
                    // error
                    console.log(e)
                    this.events.trigger('mplayer:error', 'error-occurred-when-initializing-flvjs')
                }
                break;
            default:
                try {
                    this.template.mplayer_video.src = this.playlist.getCurrentVideoObject().src
                } catch (e) {
                    // error
                    console.log(e)
                    this.events.trigger('mplayer:error', 'error-occurred-when-initializing-native-video')
                }
                break;
        }
        this.events.trigger('mplayer:videoInit');
    }

    getMediaType() {
        let src = this.playlist.getCurrentVideoObject().src;
        if (/m3u8(#|\?|$)/i.exec(src)) {
            this.options.videos[this.playlist.getCurrentVideoIndex()].type = 'hls';
        } else if (/.flv(#|\?|$)/i.exec(src)) {
            this.options.videos[this.playlist.getCurrentVideoIndex()].type = 'flv';
        } else if (/.mpd(#|\?|$)/i.exec(src)) {
            this.options.videos[this.playlist.getCurrentVideoIndex()].type = 'dash';
        } else {
            this.options.videos[this.playlist.getCurrentVideoIndex()].type = 'normal';
        }
        this.events.trigger('mplayer:recognizedMediaType');
    }

    play() {
        this.template.mplayer_video.play()
        this.events.trigger('mplayer:play');
    }

    pause() {
        this.template.mplayer_video.pause()
        this.events.trigger('mplayer:pause');
    }

    togglePlayPause() {
        if (this.template.mplayer_video.paused) {
            this.play()
        } else {
            this.pause()
        }
    }

    mute() {
        this.template.mplayer_video.muted = true
        this.events.trigger('mplayer:muted')
    }

    unmute() {
        this.template.mplayer_video.muted = false
    }

    toggleMute() {
        this.template.mplayer_video.muted ? this.unmute() : this.mute()
    }

    skip(time) {
        if (this.template.mplayer_video.currentTime + time > this.template.mplayer_video.duration) {
            this.events.trigger('mplayer:skipFailed')
            return;
        }
        if (this.template.mplayer_video.currentTime + time < 0) {
            this.events.trigger('mplayer:skipFailed')
            return;
        }
        this.template.mplayer_video.currentTime += time
        this.events.trigger('mplayer:skip')
    }

    enterPiP() {
        this.template.mplayer_video.requestPictureInPicture()
        this.events.trigger('mplayer:enterPiP')
    }

    exitPiP() {
        document.exitPictureInPicture()
        this.events.trigger('mplayer:exitPiP')
    }

    toggleMiniPlayer() {
        if (this.template.mplayer_sizer.classList.contains("miniPlayer")) {
            this.exitPiP()
        } else {
            this.enterPiP()
        }
    }

    enterFullscreen() {
        this.template.mplayer_sizer.requestFullscreen()
        this.notice.publish(this.translate.trans('enter-fullscreen'), 3000)
        this.events.trigger('mplayer:enterFullscreen')
    }

    exitFullscreen() {
        document.exitFullscreen()
        this.notice.publish(this.translate.trans('exit-fullscreen'), 3000)
        this.events.trigger('mplayer:exitFullscreen')
    }

    toggleFullScreen() {
        if (document.fullscreenElement === null) {
            this.enterFullscreen()
        } else {
            this.exitFullscreen()
        }
    }

    getVideoResolution() {
        return {
            width: this.template.mplayer_video.videoWidth,
            height: this.template.mplayer_video.videoHeight
        }
    }

    getVideoURL() {
        return this.template.mplayer_video.src
    }

    getBuffered() {
        let value = 0
        try {
            value = this.template.mplayer_video.buffered.end(
                this.template.mplayer_video.buffered.length - 1
            )
            return value
        } catch {
            return 0;
        }
    }

    getCurrentTime() {
        return this.template.mplayer_video.currentTime
    }

    openLink(url) {
        window.open(url)
        this.events.trigger('mplayer:openLink')
    }

    toggleInfoPanel() {
        this.infoPanel.toggle()
    }

    initThemeColor() {
        if (!this.options.theme) {
            return;
        }
        if (this.options.theme.indexOf('rgb') !== -1) {
            // error
            return;
        }
        this.template.mplayer_sizer.style.setProperty('--themeColor', this.options.theme)
        this.template.mplayer_sizer.style.setProperty('--lightThemeColor', hexToRGB(this.options.theme, .9))
    }

    toggleMobile() {
        if (this.template.mplayer_sizer.classList.contains('mobile')) {
            this.cancelMobileStyle()
        } else {
            this.useMobileStyle()
        }
    }

    useMobileStyle() {
        if (this.template.mplayer_sizer.classList.contains('mobile')) {
            return;
        }
        this.template.mplayer_sizer.classList.add('mobile')
        this.events.trigger('mplayer:useMobileStyle')
    }

    cancelMobileStyle() {
        if (!this.template.mplayer_sizer.classList.contains('mobile')) {
            return;
        }
        this.template.mplayer_sizer.classList.remove('mobile')
        this.events.trigger('mplayer:cancelMobileStyle')
    }

    destroyPlugins() {
        if (this.plugins.hls) {
            this.plugins.hls.destroy()
        }
        if (this.plugins.dash) {
            this.plugins.dash.destroy()
        }
        this.events.trigger('mplayer:pluginsDestroyed')
    }

    documentClick() {
        this.focused = false
    }

    playerClick() {
        this.focused = true
    }

    exitTheaterMode() {
        this.template.mplayer_sizer.classList.remove('theater')
        this.events.trigger('mplayer:exitTheaterMode')
    }

    enterTheaterMode() {
        this.template.mplayer_sizer.classList.add('theater')
        this.events.trigger('mplayer:enterTheaterMode')
    }

    toggleTheaterMode() {
        if (this.template.mplayer_sizer.classList.contains('theater')) {
            this.exitTheaterMode()
        } else {
            this.enterTheaterMode()
        }
    }

    // to be finished
    destroy() {
        this.mobileStyleWatchDog.destroy()
        this.bufferingWatchDog.destroy()
        document.removeEventListener('click', this.documentClickHandler)
        this.template.mplayer_sizer.removeEventListener('click', this.playerClickHandler)
    }

}

export default MPlayer