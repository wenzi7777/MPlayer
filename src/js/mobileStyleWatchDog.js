import {useMobileStyles} from "./utils";

class MobileStyleWatchDog {
    constructor(mplayer) {
        this.mplayer = mplayer

        this.screenSizeChangeHandler = () => {
            if(useMobileStyles()) {
                this.mplayer.useMobileStyle()
            }else {
                this.mplayer.cancelMobileStyle()
            }
        }

        this.init()
    }

    init() {
        this.screenSizeChangeHandler()
        window.addEventListener('resize', this.screenSizeChangeHandler)
    }

    destroy() {
        window.removeEventListener('resize', this.screenSizeChangeHandler)
    }
}

export default MobileStyleWatchDog