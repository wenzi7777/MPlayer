import screenshotEjsTemplate from "../template/widgets/screenshot.ejs"

class Screenshot {
    constructor(mplayer) {
        this.mplayer = mplayer
    }

    mount() {
        let screenshot_htmlCode = screenshotEjsTemplate()
        this.mplayer.template.mplayer_sizer.insertAdjacentHTML('beforeend', screenshot_htmlCode)
        this.mplayer_screenshotSuit = document.querySelector('.mplayer_screenshotSuit')
        this.mplayer_imageCapture = document.querySelector('.mplayer_imageCapture')
        this.mplayer_imageCaptureAnchor = document.querySelector('.mplayer_imageCaptureAnchor')
    }

    shot() {
        this.mount()
        this.mplayer_imageCapture.width = this.mplayer.template.mplayer_video.videoWidth;
        this.mplayer_imageCapture.height = this.mplayer.template.mplayer_video.videoHeight;
        this.mplayer_imageCapture.getContext('2d').drawImage(this.mplayer.template.mplayer_video, 0, 0, this.mplayer_imageCapture.width, this.mplayer_imageCapture.height);
        let dataURL;
        this.mplayer_imageCapture.toBlob((blob) => {
            dataURL = URL.createObjectURL(blob);
            this.mplayer_imageCaptureAnchor.href = dataURL;
            this.mplayer_imageCaptureAnchor.download = 'capture.png';
            this.mplayer_imageCaptureAnchor.style.display = 'none';
            this.mplayer_imageCaptureAnchor.click();
            URL.revokeObjectURL(dataURL);
            this.mplayer.notice.publish(this.mplayer.translate.trans('created-screenshot-at') + this.mplayer.template.mplayer_video.currentTime, 3000)
            this.mplayer.events.trigger('mplayer:screenshot', dataURL);
            this.destroy()
        });
    }

    destroy() {
        if(!this.mplayer_screenshotSuit) {
            return;
        }
        this.mplayer.template.mplayer_sizer.removeChild(this.mplayer_screenshotSuit)
        this.mplayer_screenshotSuit = undefined
        this.mplayer_imageCapture = undefined
        this.mplayer_imageCaptureAnchor = undefined
    }
}

export default Screenshot