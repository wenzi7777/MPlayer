import hintsLayerEjsTemplate from '../template/hints/hintsLayer.ejs'

class Hints {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.switch = true
        this.hintsTimer = 0
        this.hints = ''
        this.init()
    }

    init() {
        if(!this.mplayer.options.enabled) {
            return
        }
        let hintsLayer_htmlCode = hintsLayerEjsTemplate()
        this.mplayer.template.mplayer_sizer.insertAdjacentHTML('afterbegin', hintsLayer_htmlCode)
        this.hintsLayer = document.querySelector('.mplayer_hintsLayer')
        if (this.switch) {
            this.showHints()
        }
    }

    mount() {
        if(!this.hintsLayer) {
            return;
        }
        this.mplayer.options.hints.elements.forEach(element => {
            if(element.start > 0 && element.end < this.mplayer.template.mplayer_video.duration) {
                this.hintsLayer.insertAdjacentHTML('beforeend', `<div class="mplayer_hintsContainer" data-mplayer-hints-start="${element.start}" data-mplayer-hints-end="${element.end}" data-mplayer-hints="${this.mplayer.options.hints.elements.indexOf(element)}">${element.html}</div>`)
            }
        })
        this.hints = document.querySelectorAll('.mplayer_hintsContainer')
    }


    toggle() {
        this.switch = !this.switch
        if(this.switch){
            this.showHints()
        }else {
            this.hideHints()
        }
    }

    showHints() {
        this.hintsLayer.style.visibility = 'visible'
        this.render()
        this.mplayer.notice.publish(this.mplayer.translate.trans('hints-enabled') , 3000)
    }

    hideHints() {
        this.hintsLayer.style.visibility = 'hidden'
        clearInterval(this.hintsTimer)
        this.mplayer.notice.publish(this.mplayer.translate.trans('hints-disabled') , 3000)
    }

    render() {
        this.hintsTimer = setInterval(() => {
            if(this.hints) {
                this.hints.forEach(hint => {
                    hint.style.display = 'none'
                })
                this.hints.forEach(hint => {
                    if(parseInt(this.mplayer.template.mplayer_video.currentTime) >= parseInt(hint.dataset.mplayerHintsStart) && parseInt(this.mplayer.template.mplayer_video.currentTime) < parseInt(hint.dataset.mplayerHintsEnd)) {
                        hint.style.display = 'block'
                    }
                })
            }
        }, 1000)
    }

    reload() {
        this.destroy()
        this.init()
    }

    destroy() {
        if (this.hintsLayer) {
            this.mplayer.template.mplayer_sizer.removeChild(this.hintsLayer)
        }
    }
}

export default Hints