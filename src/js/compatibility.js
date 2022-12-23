import {browserDetector} from "./utils";

class Compatibility {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.init();
    }

    init() {
        if (this.mplayer.options.spotlight.enabled) {
            this.resolveSpotlightEffectMusk()
        }

        if (this.mplayer.options.tools.includes('fullscreen')) {
            this.safariFullscreenIconHandler = this.manualToggleFullscreenIcon.bind(this)
            this.resolveFullscreenButtonChange()
        }

        if (this.mplayer.options.tools.includes('miniPlayer')) {
            this.resolvePiPInFirefox()
        }
    }

    resolveSpotlightEffectMusk() {
        // spotlight musk will block the display of controls
        // firefox, chrome: OK
        // safari: BAD
        if (browserDetector().safari) {
            this.mplayer.template.mplayer_sizer.classList.add('safari')
        }
    }

    resolveFullscreenButtonChange() {
        // fullscreenchange event will not be fired on safari
        // firefox, chrome: OK
        // safari: BAD
        if(browserDetector().safari) {
            this.mplayer.template.mplayer_fullscreenButton.addEventListener('click', this.safariFullscreenIconHandler)
        }
    }

    resolvePiPInFirefox() {
        // requestpictureinpicture API will not work when using firefox
        // chrome, safari: OK
        // firefox: BAD
        if(browserDetector().firefox) {
            this.mplayer.template.mplayer_sizer.classList.add('firefox')
        }
    }

    manualToggleFullscreenIcon() {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.webkitCurrentFullScreenElement) {
            this.mplayer.template.mplayer_sizer.classList.remove('fullscreen')
        } else {
            this.mplayer.template.mplayer_sizer.classList.add('fullscreen')
        }
    }

    destroy() {
        if(browserDetector().safari) {
            this.mplayer.template.mplayer_fullscreenButton.removeEventListener('click', this.safariFullscreenIconHandler)
        }
    }

}

export default Compatibility