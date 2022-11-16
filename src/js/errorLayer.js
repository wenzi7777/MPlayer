class ErrorLayer {
    constructor(mplayer) {
        this.mplayer = mplayer
    }

    mount() {
        if (this.mplayer.infoLayer.existed()) {
            this.mplayer.infoLayer.destroy()
        }
        this.mplayer.infoLayer.insertInfoLayer(this.mplayer.translate.trans('error'), 'mplayer_backgroundError', '','', 'data-mplayer-error-layer');
    }

    addTag(type, contents) {
        this.mplayer.infoLayer.addInfoTag(type, contents)
    }

    existed() {
        return document.querySelector('[data-mplayer-error-layer]')
    }

    destroy() {
        this.mplayer.infoLayer.destroy()
    }
}

export default ErrorLayer