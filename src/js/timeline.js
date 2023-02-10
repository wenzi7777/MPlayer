import timelineEjsTemplate from '../template/timeline.ejs'

class Timeline {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.buffered = 0;
        this.played = 0;
        this.preview = 0;
        this.duration = 0;
        this.isScrubbing = false;
        this.wasPaused = false;
        this.init()
    }

    init() {
        this.mount()

        this.mplayer.on('loadedmetadata', () => {
            this.duration = this.mplayer.template.mplayer_video.duration
            this.played = this.mplayer.template.mplayer_video.currentTime
        })

        this.mplayer.on('timeupdate', () => {
            this.played = this.mplayer.template.mplayer_video.currentTime
            this.buffered = this.mplayer.getBuffered() / this.mplayer.template.mplayer_video.duration;
            this.mplayer_timelineContainer.style.setProperty('--mplayer-buffered-position', this.buffered)
            this.mplayer_timelineContainer.style.setProperty('--mplayer-played-position', this.played / this.duration)
        })

        this.scrubbing()
    }

    mount() {
        let timeline_htmlCode = timelineEjsTemplate(this.mplayer.options)
        this.mplayer.template.mplayer_controlsContainer.insertAdjacentHTML('afterbegin', timeline_htmlCode)
        this.mplayer_timelineContainer = document.querySelector('.mplayer_timelineContainer')
        this.mplayer_previewImage = document.querySelector('.mplayer_previewImage')
    }

    scrubbing() {
        if (this.mplayer.playlist.getCurrentVideoObject().images) {
            this.mplayer.template.mplayer_sizer.classList.add('images')
        } else {
            this.mplayer.template.mplayer_sizer.classList.remove('images')
        }
        let handleTimelineUpdate = (e) => {
            if(this.mplayer.bufferingWatchDog.buffering) {
                return;
            }
            const rect = this.mplayer_timelineContainer.getBoundingClientRect()
            const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
            if (this.mplayer.playlist.getCurrentVideoObject().images) {
                const previewImageIndex = Math.max(
                    1,
                    Math.floor((percent * this.duration) / (this.duration / this.mplayer.playlist.getCurrentVideoObject().images.length))
                )
                this.mplayer_previewImage.src = this.mplayer.playlist.getCurrentVideoObject().images[previewImageIndex - 1]
                this.mplayer_timelineContainer.style.setProperty("--mplayer-preview-image-position", percent)
            }

            if (this.isScrubbing) {
                e.preventDefault()
                // thumbnailImg.src = previewImgSrc
                this.mplayer_timelineContainer.style.setProperty("--mplayer-played-position", percent)
            }
        }
        let toggleScrubbing = (e) => {
            if(this.mplayer.bufferingWatchDog.buffering) {
                return;
            }
            const rect = this.mplayer_timelineContainer.getBoundingClientRect()
            const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
            this.isScrubbing = (e.buttons & 1) === 1
            this.mplayer.template.mplayer_sizer.classList.toggle("scrubbing", this.isScrubbing)
            if (this.isScrubbing) {
                this.wasPaused = this.mplayer.template.mplayer_video.paused
                this.mplayer.pause()
            } else {
                this.mplayer.template.mplayer_video.currentTime = percent * this.mplayer.template.mplayer_video.duration
                if (!this.wasPaused) this.mplayer.play()
            }

            handleTimelineUpdate(e)
        }
        this.mplayer_timelineContainer.addEventListener("mousemove", handleTimelineUpdate)
        this.mplayer_timelineContainer.addEventListener("mousedown", toggleScrubbing)
        document.addEventListener("mouseup", e => {
            if (this.isScrubbing) toggleScrubbing(e)
        })
        document.addEventListener("mousemove", e => {
            if (this.isScrubbing) handleTimelineUpdate(e)
        })
    }

    destroy() {
        this.isScrubbing = false;
        this.wasPaused = false;
        this.mplayer.template.mplayer_controlsContainer.removeChild(this.mplayer_timelineContainer)
    }

}

export default Timeline