class BufferingWatchDog {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.buffering = false
        this.detector()
    }

    detector() {
        let lastPlayPos = 0;
        let currentPlayPos = 0;
        this.bufferingDetector = setInterval(() => {
            // whether the video is buffering
            currentPlayPos = this.mplayer.template.mplayer_video.currentTime;
            if (!this.buffering && currentPlayPos === lastPlayPos && !this.mplayer.template.mplayer_video.paused) {
                this.mplayer.template.mplayer_sizer.classList.add('loading');
                this.mplayer.infoLayer.staticLayer('loading')
                this.buffering = true;
            }
            if (this.buffering && currentPlayPos > lastPlayPos && !this.mplayer.template.mplayer_video.paused) {
                this.mplayer.template.mplayer_sizer.classList.remove('loading');
                this.mplayer.infoLayer.destroy()
                this.buffering = false;
            }
            lastPlayPos = currentPlayPos;
        }, 100);
    }

    destroy() {
        clearInterval(this.bufferingDetector)
    }
}

export default BufferingWatchDog