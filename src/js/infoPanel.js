import basicDialogEjsTemplate from '../template/dialog/basicDialog.ejs'
import dialogTitleEjsTemplate from '../template/dialog/dialogTitle.ejs'
import dialogListEjsTemplate from '../template/dialog/dialogList.ejs'
import dialogListItemEjsTemplate from '../template/dialog/dialogListItem.ejs'
import dialogActionsEjsTemplate from '../template/dialog/dialogActions.ejs'
import dialogButtonEjsTemplate from '../template/dialog/dialogButton.ejs'

class InfoPanel {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.timers = []
    }

    mount() {

        if (this.mplayer.options.infoPanel.length <= 0) {
            return
        }

        // basic dialog
        let basicDialog_htmlCode = basicDialogEjsTemplate({
            dataset: 'data-mplayer-info-panel'
        })
        this.mplayer.template.mplayer_sizer.insertAdjacentHTML('afterbegin', basicDialog_htmlCode)
        this.infoPanel = document.querySelector('[data-mplayer-info-panel]')

        // insert title
        let dialogTitle_htmlCode = dialogTitleEjsTemplate({
            contents: this.mplayer.translate.trans('mplayer-info-panel')
        })
        this.infoPanel.insertAdjacentHTML('afterbegin', dialogTitle_htmlCode)

        // insert dialog list container
        let dialogList_htmlCode = dialogListEjsTemplate()
        this.infoPanel.insertAdjacentHTML('beforeend', dialogList_htmlCode)
        this.infoPanelList = document.querySelector('[data-mplayer-info-panel] .mplayer_detailsList')

        // insert dialog list item included:
        // video resolution and fps
        // player fps
        // video url
        // buffer health
        // date
        // player version
        if (this.mplayer.options.infoPanel.includes('basicVideoInfo')) {
            this.insertDialogListItem({dataset: 'data-mplayer-basic-video-info', name: 'infoPanelBasicVideoInfo'})
        }
        if (this.mplayer.options.infoPanel.includes('playerFPS')) {
            window.requestAnimationFrame = (() =>
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                })();
            this.insertDialogListItem({dataset: 'data-mplayer-player-fps', name: 'infoPanelPlayerFPS'})
        }
        if (this.mplayer.options.infoPanel.includes('videoURL')) {
            this.insertDialogListItem({dataset: 'data-mplayer-video-url', name: 'infoPanelVideoURL'})
        }
        if (this.mplayer.options.infoPanel.includes('connectionStatus')) {
            this.insertDialogListItem({dataset: 'data-mplayer-connection-status', name: 'infoPanelConnectionStatus'})
        }
        if (this.mplayer.options.infoPanel.includes('date')) {
            this.insertDialogListItem({dataset: 'data-mplayer-date', name: 'infoPanelDate'})
        }
        if (this.mplayer.options.infoPanel.includes('playerInfo')) {
            this.insertDialogListItem({dataset: 'data-mplayer-player-info', name: 'infoPanelPlayerInfo'})
        }

        // insert actions container
        let dialogActions_htmlCode = dialogActionsEjsTemplate()
        this.infoPanel.insertAdjacentHTML('beforeend', dialogActions_htmlCode)
        this.infoPanelActionsContainer = document.querySelector('[data-mplayer-info-panel] .mplayer_dialogActions')

        // insert buttons
        this.insertButton(`[${this.mplayer.translate.trans('close')}]`, 'destroy', '')

        // add event listener
        document.querySelectorAll('[data-mplayer-dialog-button-target]').forEach(button => {
            button.addEventListener('click', (e) => {
                if (e.target.dataset.mplayerDialogButtonParams) {
                    this[e.target.dataset.mplayerDialogButtonTarget](e.target.dataset.mplayerDialogButtonParams)
                } else {
                    this[e.target.dataset.mplayerDialogButtonTarget]()
                }
            })
        })

        // update all
        this.updateAll()
    }

    insertDialogListItem({dataset, contents, name}) {
        let dialogListItem_htmlCode = dialogListItemEjsTemplate({
            dataset,
            contents
        })
        this.infoPanelList.insertAdjacentHTML('beforeend', dialogListItem_htmlCode)
        this[name] = document.querySelector(`[${dataset}]`)
    }

    insertButton(title, targetFunction, targetParams) {
        let dialogButton_htmlCode = dialogButtonEjsTemplate({
            title,
            dataset: `data-mplayer-dialog-button-target=${targetFunction} data-mplayer-dialog-button-params=${targetParams}`
        })
        this.infoPanelActionsContainer.insertAdjacentHTML('beforeend', dialogButton_htmlCode)
    }

    updateAll() {
        if (this.mplayer.options.infoPanel.length <= 0) {
            return
        }
        if (this.mplayer.options.infoPanel.includes('basicVideoInfo')) {
            this.updateBasicVideoInfo()
        }
        if (this.mplayer.options.infoPanel.includes('playerFPS')) {
            this.updatePlayerFPS()
        }
        if (this.mplayer.options.infoPanel.includes('videoURL')) {
            this.updateVideoURL()
        }
        if (this.mplayer.options.infoPanel.includes('connectionStatus')) {
            this.updateConnectionStatus()
        }
        if (this.mplayer.options.infoPanel.includes('date')) {
            this.updateDate()
        }
        if (this.mplayer.options.infoPanel.includes('playerInfo')) {
            this.updatePlayerInfo()
        }
    }

    updateBasicVideoInfo() {
        let interval = setInterval(() => {
            this.infoPanelBasicVideoInfo.innerHTML = `${this.mplayer.translate.trans('video-resolution')}: ${this.mplayer.getVideoResolution().width}px*${this.mplayer.getVideoResolution().height}px@${this.mplayer.getVideoResolution().height}p`
        }, 1000)
        this.timers.push(interval)
    }

    updatePlayerFPS() {
        if (this.infoPanel) {
            window.requestAnimationFrame(() => {
                this.updatePlayerFPS();
                if (!this.fpsStart) {
                    this.fpsStart = new Date();
                    this.fpsIndex = 0;
                } else {
                    this.fpsIndex++;
                    const fpsCurrent = new Date();
                    if (fpsCurrent - this.fpsStart > 1000) {
                        this.infoPanelPlayerFPS.innerHTML = `${this.mplayer.translate.trans('player-fps')}: ${(this.fpsIndex / (fpsCurrent - this.fpsStart)) * 1000}`
                        this.fpsStart = new Date();
                        this.fpsIndex = 0;
                    }
                }
            });
        }
    }

    updateVideoURL() {
        let interval = setInterval(() => {
            this.infoPanelVideoURL.innerHTML = `${this.mplayer.translate.trans('video-url')}: ${this.mplayer.getVideoURL()}`
        }, 1000)
        this.timers.push(interval)
    }

    updateConnectionStatus() {
        let interval = setInterval(() => {
            this.infoPanelConnectionStatus.innerHTML = `${this.mplayer.translate.trans('buffer-health')}: ${this.mplayer.getBuffered() - this.mplayer.getCurrentTime()}s`
        }, 1000)
        this.timers.push(interval)
    }

    updateDate() {
        let interval = setInterval(() => {
            this.infoPanelDate.innerHTML = `${this.mplayer.translate.trans('date')}: ${new Date()}`
        }, 1000)
        this.timers.push(interval)
    }

    updatePlayerInfo() {
        let interval = setInterval(() => {
            this.infoPanelPlayerInfo.innerHTML = `${this.mplayer.translate.trans('MPlayer')} v${MPLAYER_VERSION} ${GIT_HASH}`
        }, 1000)
        this.timers.push(interval)
    }

    toggle() {
        if (this.mplayer.options.infoPanel.length <= 0) {
            return
        }
        if (this.infoPanel) {
            this.destroy()
        } else {
            this.mount()
        }
    }

    destroy() {
        this.mplayer.template.mplayer_sizer.removeChild(this.infoPanel)
        this.infoPanel = undefined
        for (let i = 0; i < this.timers.length; i++) {
            clearInterval(this.timers[i])
        }
        this.timers = []
    }

}

export default InfoPanel