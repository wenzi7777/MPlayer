import {formatDuration} from "./utils";
import Screenshot from "./screenshot";
import SettingsPanel from "./settingsPanel";
import Subtitles from './subtitles'
import Timeline from "./timeline";

class Controller {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.autoHideTimer = 0
        this.setAutoHideHandler = this.setAutoHide.bind(this);
        this.init()
    }

    init() {
        // if used timeline tool
        if (this.mplayer.options.tools.includes('timeline')) {
            this.initTimeline()
        }

        // if used playlist tool
        if (this.mplayer.options.tools.includes('enablePlaylist')) {
            this.initPlayPrevious()
            this.initPlayNext()
        }

        // if used play pause tool
        if (this.mplayer.options.tools.includes('playPause')) {
            this.initPlayPause()
        }

        // if used volume control tool
        if (this.mplayer.options.tools.includes('volumeControl')) {
            this.setVolumeIcon()
            this.initVolumeControl()
        }

        // if used duration viewer tool
        if (this.mplayer.options.tools.includes('durationViewer')) {
            this.initDurationViewer()
        }

        // if used screenshot tool
        if (this.mplayer.options.tools.includes('screenshot')) {
            this.initScreenshot()
        }

        // if used player settings tool
        if (this.mplayer.options.tools.includes('playerSettings')) {
            this.initPlayerSettings()
        }

        // if used subtitles tool
        if (this.mplayer.options.tools.includes('subtitles')) {
            this.initSubtitles()
        }

        // if used pip mode tool
        if (this.mplayer.options.tools.includes('miniPlayer')) {
            this.initPiP()
        }

        // if used theater mode tool
        if (this.mplayer.options.tools.includes('theaterMode')) {
            this.initTheaterMode()
        }

        // if used fullscreen tool
        if (this.mplayer.options.tools.includes('fullscreen')) {
            this.initFullscreen()
        }

        this.initAutoHide()

    }

    reload() {
        this.destroy()

        // if used subtitles tool
        if (this.mplayer.options.tools.includes('subtitles')) {
            this.initSubtitles()
        }


        // if used player settings tool
        if (this.mplayer.options.tools.includes('playerSettings')) {
            this.initPlayerSettings()
        }

        // if used timeline tool
        if (this.mplayer.options.tools.includes('timeline')) {
            this.initTimeline()
        }

    }

    initTimeline() {
        this.timeline = new Timeline(this.mplayer)
    }

    initPlayPrevious() {
        this.mplayer.template.mplayer_playPreviousButton.addEventListener('click', () => {
            this.mplayer.playlist.playPrevious()
        })
    }

    initPlayNext() {
        this.mplayer.template.mplayer_playNextButton.addEventListener('click', () => {
            this.mplayer.playlist.playNext()
        })
    }

    initPlayPause() {
        this.mplayer.template.mplayer_playPauseButton.addEventListener('click', () => {
            this.mplayer.togglePlayPause()
        })

        // add event listener
        this.mplayer.on('play', () => {
            this.mplayer.template.mplayer_sizer.classList.remove('paused')
        })
        this.mplayer.on('pause', () => {
            this.mplayer.template.mplayer_sizer.classList.add('paused')
        })
    }

    initVolumeControl() {
        // handle button
        this.mplayer.template.mplayer_muteButton.addEventListener('click', () => {
            this.mplayer.toggleMute()
        })

        // handle slider
        this.mplayer.template.mplayer_volumeSlider.addEventListener('input', (e) => {
            this.mplayer.template.mplayer_video.volume = e.target.value
        })

        // add event listener
        this.mplayer.on('volumechange', () => {
            this.setVolumeIcon()
        })
    }

    setVolumeIcon() {
        if (this.mplayer.template.mplayer_video.muted || this.mplayer.template.mplayer_video.volume === 0) {
            this.mplayer.template.mplayer_sizer.dataset.mplayerVolumeLevel = 'muted'
        } else {
            if (this.mplayer.template.mplayer_video.volume > .6) {
                this.mplayer.template.mplayer_sizer.dataset.mplayerVolumeLevel = 'high'
            } else {
                this.mplayer.template.mplayer_sizer.dataset.mplayerVolumeLevel = 'low'
            }
        }
    }

    initDurationViewer() {
        // add event listener
        this.mplayer.on('timeupdate', () => {
            this.mplayer.template.mplayer_currentTime.textContent = formatDuration(this.mplayer.template.mplayer_video.currentTime)
        })
        this.mplayer.on('loadeddata', () => {
            this.mplayer.template.mplayer_currentTime.textContent = formatDuration(this.mplayer.template.mplayer_video.currentTime)
            this.mplayer.template.mplayer_totalTime.textContent = formatDuration(this.mplayer.template.mplayer_video.duration)
        })
    }

    initScreenshot() {
        // screenshot class will automatically mount canvas
        // then do the capture.
        // finally ,will destroy self.
        this.screenshot = new Screenshot(this.mplayer)

        // add event listener.
        this.mplayer.template.mplayer_screenshotButton.addEventListener('click', () => {
            this.screenshot.shot()
        })
    }

    initPlayerSettings() {
        this.settingsPanel = new SettingsPanel(this.mplayer)
    }

    initSubtitles() {
        this.subtitles = new Subtitles(this.mplayer)
    }

    initPiP() {
        this.mplayer.on("enterpictureinpicture", () => {
            this.mplayer.template.mplayer_sizer.classList.add("miniPlayer")
            this.mplayer.notice.publish(this.mplayer.translate.trans('enter-pip'), 3000)
            if (!this.mplayer.infoLayer.existed()) {
                this.mplayer.infoLayer.staticLayer('pip')
            }
        })
        this.mplayer.on("leavepictureinpicture", () => {
            this.mplayer.notice.publish(this.mplayer.translate.trans('exit-pip'), 3000)
            this.mplayer.template.mplayer_sizer.classList.remove("miniPlayer")
            this.mplayer.infoLayer.destroy()
        })
        this.mplayer.template.mplayer_miniPlayerButton.addEventListener('click', () => {
            this.mplayer.toggleMiniPlayer()
        })
    }

    initTheaterMode() {
        this.mplayer.template.mplayer_theaterModeButton.addEventListener('click', () => {
            if (this.mplayer.template.mplayer_sizer.classList.contains('theater')) {
                this.mplayer.template.mplayer_sizer.classList.remove('theater')
                this.mplayer.notice.publish(this.mplayer.translate.trans('exit-theater-mode'), 3000)
            } else {
                this.mplayer.template.mplayer_sizer.classList.add('theater')
                this.mplayer.notice.publish(this.mplayer.translate.trans('enter-theater-mode'), 3000)
            }
        })
    }

    initFullscreen() {
        document.addEventListener("fullscreenchange", () => {
            this.mplayer.template.mplayer_sizer.classList.toggle("fullscreen", document.fullscreenElement)
        })
        this.mplayer.template.mplayer_fullscreenButton.addEventListener('click', () => {
            this.mplayer.toggleFullScreen()
        })
    }

    initAutoHide() {
        this.mplayer.template.mplayer_sizer.addEventListener('mousemove', this.setAutoHideHandler);
        this.mplayer.template.mplayer_sizer.addEventListener('click', this.setAutoHideHandler);
        this.mplayer.on('play', this.setAutoHideHandler);
        this.mplayer.on('pause', this.setAutoHideHandler);
    }

    setAutoHide() {
        if (this.mplayer.template.mplayer_sizer.classList.contains('hideControls')) {
            this.mplayer.template.mplayer_sizer.classList.remove('hideControls')
        }
        clearTimeout(this.autoHideTimer);
        this.autoHideTimer = setTimeout(() => {
            if (this.mplayer.template.mplayer_video.played.length && !this.mplayer.template.mplayer_video.paused) {
                this.mplayer.template.mplayer_sizer.classList.add('hideControls')
            }
        }, 3000);
    }

    destroy() {
        this.settingsPanel.destroy()
        this.subtitles.destroy()
        this.timeline.destroy()
        this.mplayer.template.mplayer_sizer.removeEventListener('mousemove', this.setAutoHideHandler);
        this.mplayer.template.mplayer_sizer.removeEventListener('click', this.setAutoHideHandler);
        clearTimeout(this.autoHideTimer);
    }

}

export default Controller