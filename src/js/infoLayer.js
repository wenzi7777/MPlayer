import infoLayerEjsTemplate from "../template/infoLayer/infoLayer.ejs";
import infoTitleEjsTemplate from "../template/infoLayer/infoTitle.ejs";
import infoContentsEjsTemplate from "../template/infoLayer/infoContents.ejs";
import infoTagEjsTemplate from "../template/infoLayer/infoTag.ejs";
import loadingEjsTemplate from "../template/infoLayer/loading.ejs"
import pipEjsTemplate from "../template/infoLayer/pip.ejs"

class InfoLayer {
    constructor(mplayer) {
        this.options = mplayer.options
        this.mplayer_sizer = mplayer.template.mplayer_sizer
        this.translate = mplayer.translate.trans
    }

    getElement(elementName, elementQueryString) {
        this[elementName] = document.querySelector(elementQueryString)
    }

    insertInfoLayer(title, infoLayerClassName, infoTitleClassName, infoContentsClassName, dataset) {
        // insert info layer
        let infoLayer_htmlCode = infoLayerEjsTemplate({
            className: infoLayerClassName || 'mplayer_backgroundTheme',
            dataset: dataset
        })
        this.mplayer_sizer.insertAdjacentHTML('afterbegin', infoLayer_htmlCode)
        this.getElement('infoLayer', '.mplayer_infoLayer')

        // insert info title
        let infoTitle_htmlCode = infoTitleEjsTemplate({
            className: infoTitleClassName || 'mplayer_whiteColor',
            title: this.translate(title) || this.translate('untitled')
        })
        this.infoLayer.innerHTML = infoTitle_htmlCode

        // insert info contents
        let infoContents_htmlCode = infoContentsEjsTemplate({
            className: infoContentsClassName || 'mplayer_whiteColor'
        })
        this.infoLayer.insertAdjacentHTML('beforeend', infoContents_htmlCode)
        this.getElement('infoContents', '.mplayer_infoContents')
    }

    addInfoTag(type, contents) {
        let infoTag_htmlCode = infoTagEjsTemplate({
            type: type,
            contents: this.translate(contents) || this.translate('empty')
        })
        this.infoContents.innerHTML += infoTag_htmlCode
    }

    fadeLeave(target) {
        target.classList.add('mplayer_fadeLeave')
    }

    staticLayer(type) {
        // insert info layer
        let infoLayer_htmlCode = infoLayerEjsTemplate({
            className: 'mplayer_backgroundMask'
        })
        this.mplayer_sizer.insertAdjacentHTML('afterbegin', infoLayer_htmlCode)
        this.getElement('infoLayer', '.mplayer_infoLayer')
        if (type === 'loading') {
            // insert info contents
            let loading_htmlCode = loadingEjsTemplate()
            this.infoLayer.insertAdjacentHTML('beforeend', loading_htmlCode)
            this.getElement('infoTitle', '.mplayer_infoTitle')
        }else if(type === 'pip') {
            // insert info contents
            let loading_htmlCode = pipEjsTemplate()
            this.infoLayer.insertAdjacentHTML('beforeend', loading_htmlCode)
            this.getElement('infoTitle', '.mplayer_infoTitle')
        }
    }

    existed() {
        return this.infoLayer
    }

    destroy() {
        if (!this.infoLayer) {
            return;
        }
        this.fadeLeave(this.infoLayer)
        this.mplayer_sizer.removeChild(this.infoLayer)
        this.infoLayer = undefined
        this.infoContents = undefined
    }
}

export default InfoLayer