import spotlightEjsTemplate from '../template/spotlight/spotlight.ejs'
import {hexToRGBValue} from "./utils";

class Spotlight {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.drawingTimer = 0
        this.init()
    }

    init() {
        if(!this.mplayer.options.spotlight.enabled){
            return
        }
        this.insertHtml()
        this.show()
        this.setCanvasStyle()
    }

    insertHtml() {
        let spotlight_htmlCode = spotlightEjsTemplate()
        this.mplayer.template.mplayer_sizer.insertAdjacentHTML('afterbegin', spotlight_htmlCode)
        this.spotlightContainer = document.querySelector('.mplayer_spotlight')
        this.spotlightCanvas = document.querySelectorAll('.mplayer_spotlight canvas')[0]
        this.spotlightBackgroundCanvas = document.querySelectorAll('.mplayer_spotlight canvas')[1]
    }

    setCanvasStyle() {
        this.spotlightCanvas.width = 110
        this.spotlightCanvas.height = 75
        this.spotlightBackgroundCanvas.width = 110
        this.spotlightBackgroundCanvas.height = 110
        this.spotlightBackgroundCanvas.style.top = '50%';
        this.spotlightBackgroundCanvas.style.left = '50%';
        this.spotlightBackgroundCanvas.style.transform = 'translate(-50%, -50%)';
        this.spotlightCanvas.getContext('2d').filter = 'blur(1vw)'
        const gradient = this.spotlightBackgroundCanvas.getContext('2d').createRadialGradient(55, 55, 50, 55, 55, 5);
        gradient.addColorStop(0, `rgba(${hexToRGBValue(this.mplayer.options.spotlight.backgroundColor).r}, ${hexToRGBValue(this.mplayer.options.spotlight.backgroundColor).g}, ${hexToRGBValue(this.mplayer.options.spotlight.backgroundColor).b}, 1)`);
        gradient.addColorStop(.5, `rgba(${hexToRGBValue(this.mplayer.options.spotlight.backgroundColor).r}, ${hexToRGBValue(this.mplayer.options.spotlight.backgroundColor).g}, ${hexToRGBValue(this.mplayer.options.spotlight.backgroundColor).b}, 0)`);
        gradient.addColorStop(1, `rgba(${hexToRGBValue(this.mplayer.options.spotlight.backgroundColor).r}, ${hexToRGBValue(this.mplayer.options.spotlight.backgroundColor).g}, ${hexToRGBValue(this.mplayer.options.spotlight.backgroundColor).b}, 0)`);
        this.spotlightBackgroundCanvas.getContext('2d').fillStyle = gradient;
        this.spotlightBackgroundCanvas.getContext('2d').beginPath();
        this.spotlightBackgroundCanvas.getContext('2d').rect(0, 0, 110, 110);
        this.spotlightBackgroundCanvas.getContext('2d').fill();
    }

    active() {
        this.drawingTimer = setInterval(() => {
            this.spotlightCanvas.getContext('2d').drawImage(this.mplayer.template.mplayer_video, 0, 0, 110, 75);
                this.spotlightBackgroundCanvas.style.width = this.spotlightContainer.clientWidth * 1.1 + 'px';
                this.spotlightBackgroundCanvas.style.height = this.spotlightContainer.clientHeight * 1.1 + 'px';
        }, 100);
    }

    show() {
        this.mplayer.template.mplayer_sizer.classList.add('spotlight')
        this.active()
    }

    hide() {
        this.mplayer.template.mplayer_sizer.classList.remove('spotlight')
        clearInterval(this.drawingTimer)
    }

    toggle() {
        if (this.mplayer.template.mplayer_sizer.classList.contains('spotlight')) {
            this.hide()
        } else {
            this.show()
        }
    }

    getStatus() {
        return this.mplayer.template.mplayer_sizer.classList.contains('spotlight')
    }

    destroy() {
        this.hide()
        clearInterval(this.drawingTimer)
        this.mplayer.template.mplayer_sizer.removeChild(this.spotlightContainer)
        this.spotlightContainer = undefined
        this.spotlightCanvas = undefined
    }
}

export default Spotlight