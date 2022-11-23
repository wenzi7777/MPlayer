import floatPanelEjsTemplate from "../template/floatPanel/floatPanel.ejs";
import floatPanelItemEjsTemplate from '../template/floatPanel/floatPanelItem.ejs'

class Subtitles {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.showingSubtitles = false
        this.init()
    }

    init() {
        this.destroy()
        this.insertTrack()
        this.initBasicPanel()
        this.initPanelItem()
    }

    insertTrack() {
        if (this.mplayer.playlist.getCurrentVideoObject().tracks === undefined) {
            return
        }
        let tracks = []
        this.mplayer.playlist.getCurrentVideoObject().tracks.forEach(trackInfo => {
            let track = document.createElement('track')
            track.srclang = trackInfo.srclang
            track.src = trackInfo.src
            track.label = trackInfo.label
            track.kind = trackInfo.kind
            track.dataset.mplayerSubtitles = trackInfo.lang
            tracks.push(track)
        })
        tracks.forEach(track => {
            this.mplayer.template.mplayer_video.appendChild(track)
        })
        for (let i = 0; i < this.mplayer.template.mplayer_video.textTracks.length; i++) {
            this.mplayer.template.mplayer_video.textTracks[i].mode = 'disabled'
        }
        this.textTracks = this.mplayer.template.mplayer_video.textTracks
    }

    initBasicPanel() {
        let floatPanel_htmlCode = floatPanelEjsTemplate()
        this.mplayer.template.mplayer_subtitles.insertAdjacentHTML('afterbegin', floatPanel_htmlCode)
        this.subtitlesPanel = document.querySelector('.mplayer_subtitles .mplayer_settingsPanel')
        // add event listener
        this.mplayer.template.mplayer_subtitlesButton.addEventListener('click', () => {
            this.subtitlesPanel.style.visibility === 'visible' ? this.subtitlesPanel.style.visibility = 'hidden' : this.subtitlesPanel.style.visibility = 'visible'
            this.subtitlesPanel.style.opacity === '1' ? this.subtitlesPanel.style.opacity = '0' : this.subtitlesPanel.style.opacity = '1'
        })
        this.closeAllSubtitles()
    }

    closeAllSubtitles() {
        if (this.textTracks) {
            for (let i = 0; i < this.textTracks.length; i++) {
                this.textTracks[i].mode = 'disabled'
            }
        }
        this.toggleSubtitlesClass()
    }

    showSubtitles(label) {
        if (this.textTracks) {
            this.closeAllSubtitles()
            if (this.textTracks) {
                for (let i = 0; i < this.textTracks.length; i++) {
                    if (this.textTracks[i].label === label) {
                        this.textTracks[i].mode = 'showing'
                        this.mplayer.notice.publish(this.mplayer.translate.trans('subtitle-selected') + ':' + label, 3000)
                        this.toggleSubtitlesClass()
                    }
                }
            }
        }
    }

    toggleSubtitlesClass() {
        if(this.mplayer.playlist.getCurrentVideoObject().tracks === undefined){
            return;
        }
        this.showingSubtitles = false
        for (let i = 0; i < this.textTracks.length; i++) {
            if (this.textTracks[i].mode === 'showing') {
                this.showingSubtitles = true
            }
        }
        if (this.showingSubtitles) {
            this.mplayer.template.mplayer_sizer.classList.add('subtitles')
        } else {
            this.mplayer.template.mplayer_sizer.classList.remove('subtitles')
        }
    }

    initPanelItem() {
        if (this.mplayer.playlist.getCurrentVideoObject().tracks === undefined) {
            let panelItems_htmlCode = ''
            panelItems_htmlCode += floatPanelItemEjsTemplate({
                selected: false,
                dataset: 'data-mplayer-subtitles-menu-item="notProvide"',
                contents: this.mplayer.translate.trans('not-provide-subtitles')
            })
            this.subtitlesPanel.insertAdjacentHTML('afterbegin', panelItems_htmlCode)
        } else {
            let panelItems_htmlCode = floatPanelItemEjsTemplate({
                selected: true,
                dataset: 'data-mplayer-subtitles-menu-item="closed"',
                contents: this.mplayer.translate.trans('subtitles-closed')
            })
            for (let i = 0; i < this.textTracks.length; i++) {
                panelItems_htmlCode += floatPanelItemEjsTemplate({
                    selected: false,
                    dataset: `data-mplayer-subtitles-menu-item="${this.textTracks[i].label}"`,
                    contents: this.textTracks[i].label
                })
            }
            this.subtitlesPanel.insertAdjacentHTML('afterbegin', panelItems_htmlCode)
            this.panelItems = document.querySelectorAll('[data-mplayer-subtitles-menu-item]')

            // add event listener
            this.panelItems.forEach(panelItem => {
                panelItem.addEventListener('click', (e) => {
                    if (e.target.dataset.mplayerSubtitlesMenuItem === 'notProvide' || e.target.dataset.mplayerSubtitlesMenuItem === 'closed') {
                        this.closeAllSubtitles()
                        this.unselectAllPanelItems()
                        this.selectPanelItem(e.target.dataset.mplayerSubtitlesMenuItem);
                        return;
                    }
                    this.showSubtitles(e.target.dataset.mplayerSubtitlesMenuItem)
                    this.refreshPanel()
                })
            })
        }
    }

    unselectAllPanelItems() {
        this.panelItems.forEach(item => {
            item.classList.remove('selected')
        })
    }

    selectPanelItem(label) {
        if (label === 'notProvide' || label === 'closed') {
            this.panelItems.forEach(item => {
                if (item.dataset.mplayerSubtitlesMenuItem === 'notProvide' || item.dataset.mplayerSubtitlesMenuItem === 'closed') {
                    item.classList.add('selected')
                }
            })
            return;
        }
        this.panelItems.forEach(item => {
            if (item.dataset.mplayerSubtitlesMenuItem === label) {
                item.classList.add('selected')
            }
        })
    }

    refreshPanel() {
        this.unselectAllPanelItems()
        for (let i = 0; i < this.textTracks.length; i++) {
            if (this.textTracks[i].mode === 'showing') {
                this.selectPanelItem(this.textTracks[i].label)
            }
        }
    }

    existed() {
        return this.subtitlesPanel
    }

    destroy() {
        if (!this.subtitlesPanel) {
            return;
        }
        this.showingSubtitles = false
        let tracks = document.querySelectorAll('[data-mplayer-subtitles]')
        if (tracks) {
            tracks.forEach(track => {
                this.mplayer.template.mplayer_video.removeChild(track)
            })
        }
        this.textTracks = undefined
        this.mplayer.template.mplayer_subtitles.removeChild(this.subtitlesPanel)
    }
}

export default Subtitles