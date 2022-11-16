import floatPanelEjsTemplate from "../template/floatPanel/floatPanel.ejs";
import floatPanelItemEjsTemplate from '../template/floatPanel/floatPanelItem.ejs'

class Playlist {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.currentVideoObject = this.mplayer.options.videos[0]
        this.init()
    }

    init() {
        if (!this.mplayer.options.tools.includes('enablePlaylist')) {
            // playlist has been disabled
            return;
        }

        if (this.mplayer.options.index + 1 > this.mplayer.options.videos.length) {
            this.currentVideoObject = this.mplayer.options.videos[0]
        } else {
            this.currentVideoObject = this.mplayer.options.videos[this.mplayer.options.index]
        }

        this.handleButtonsDisplay()
        this.initList()
        this.initListItems()

    }

    handleButtonsDisplay() {
        if (this.mplayer.options.videos.length !== 1) {
            if (this.getCurrentVideoIndex() !== 0) {
                // show play previous button
                this.mplayer.template.mplayer_sizer.classList.remove('previous')
                this.mplayer.template.mplayer_sizer.classList.remove('next')
                this.mplayer.template.mplayer_sizer.classList.add('previous')
            }
            if (this.getCurrentVideoIndex() !== this.mplayer.options.videos.length - 1) {
                // show play next button
                this.mplayer.template.mplayer_sizer.classList.remove('previous')
                this.mplayer.template.mplayer_sizer.classList.remove('next')
                this.mplayer.template.mplayer_sizer.classList.add('next')
            }
            if (this.getCurrentVideoIndex() !== 0 && this.getCurrentVideoIndex() !== this.mplayer.options.videos.length - 1) {
                this.mplayer.template.mplayer_sizer.classList.remove('previous')
                this.mplayer.template.mplayer_sizer.classList.remove('next')
                this.mplayer.template.mplayer_sizer.classList.add('previous')
                this.mplayer.template.mplayer_sizer.classList.add('next')
            }
        }
    }

    getCurrentVideoObject() {
        return this.currentVideoObject
    }

    getCurrentVideoIndex() {
        let currentIndex = 0
        for (let i = 0; i < this.mplayer.options.videos.length; i++) {
            if (this.mplayer.options.videos[i] === this.currentVideoObject) {
                currentIndex = i
            }
        }
        return currentIndex
    }

    playPrevious() {
        if (this.currentVideoObject === this.mplayer.options.videos[0]) {
            // normally this option cant be reach!
            // already playing the first video
            return;
        }
        this.currentVideoObject = this.mplayer.options.videos[this.getCurrentVideoIndex() - 1]
        this.mplayer.notice.publish(this.mplayer.translate.trans('play-previous'), 3000)
        this.mplayer.reload()
        this.refreshPanel()
    }

    playNext() {
        if (this.currentVideoObject === this.mplayer.options.videos[this.mplayer.options.videos.length - 1]) {
            // normally this option cant be reach!
            // already playing the last video
            return;
        }
        this.currentVideoObject = this.mplayer.options.videos[this.getCurrentVideoIndex() + 1]
        this.mplayer.notice.publish(this.mplayer.translate.trans('play-next'), 3000)
        this.mplayer.reload()
        this.refreshPanel()
    }

    initList() {
        let floatPanel_htmlCode = floatPanelEjsTemplate()
        this.mplayer.template.mplayer_playlist.insertAdjacentHTML('afterbegin', floatPanel_htmlCode)
        this.playlistPanel = document.querySelector('.mplayer_playlist .mplayer_settingsPanel')
        // add event listener
        this.mplayer.template.mplayer_playlistButton.addEventListener('click', () => {
            this.playlistPanel.style.visibility === 'visible' ? this.playlistPanel.style.visibility = 'hidden' : this.playlistPanel.style.visibility = 'visible'
            this.playlistPanel.style.opacity === '1' ? this.playlistPanel.style.opacity = '0' : this.playlistPanel.style.opacity = '1'
        })
    }

    initListItems() {
        // panel items
        if(this.panelItems) {
            this.playlistPanel.innerHTML = ''
        }
        let panelItems_htmlCode = '';
        this.mplayer.options.videos.forEach(video => {
            panelItems_htmlCode += floatPanelItemEjsTemplate({
                selected: this.currentVideoObject === video,
                dataset: `data-mplayer-playlist-video-index="${this.mplayer.options.videos.indexOf(video)}"`,
                contents: video.title || this.mplayer.translate.trans('untitled')
            })
        })
        this.playlistPanel.insertAdjacentHTML('afterbegin', panelItems_htmlCode)
        this.panelItems = document.querySelectorAll('[data-mplayer-playlist-video-index]')

        // add event listener
        this.panelItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.currentVideoObject = this.mplayer.options.videos[e.target.dataset.mplayerPlaylistVideoIndex]
                this.mplayer.reload()
                this.refreshPanel()
            })
        })
    }

    refreshPanel() {
        if(!this.mplayer.options.tools.includes('enablePlaylist')){
            return;
        }
        this.handleButtonsDisplay()
        this.initListItems()
    }

    destroy() {
        if(this.playlistPanel){
            this.mplayer.template.mplayer_playlist.removeChild(this.playlistPanel)
        }
        this.playlistPanel = undefined
        this.panelItems = undefined
    }

}

export default Playlist