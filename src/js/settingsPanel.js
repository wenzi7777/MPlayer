import floatPanelEjsTemplate from '../template/floatPanel/floatPanel.ejs'
import floatPanelItemEjsTemplate from '../template/floatPanel/floatPanelItem.ejs'
import switchEjsTemplate from '../template/widgets/switch.ejs'
import viewMoreEjsTemplate from '../template/widgets/viewMore.ejs'
import checkboxEjsTemplate from '../template/widgets/checkbox.ejs'

class SettingsPanel {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.init()
    }

    init() {
        // basic panel
        this.insertBasicPanel()

        // if enabled hints
        if (this.mplayer.options.hints.enabled) {
            this.initHintsItem()
        }

        // if playback rates is not equals to [1]
        if (this.mplayer.options.playbackRates !== [1]) {
            this.initPlaybackRatesItem()
        }

    }

    insertBasicPanel() {
        let floatPanel_htmlCode = floatPanelEjsTemplate()
        this.mplayer.template.mplayer_settings.insertAdjacentHTML('afterbegin', floatPanel_htmlCode)
        this.settingsPanel = document.querySelector('.mplayer_settings .mplayer_settingsPanel')
        // add event listener
        this.mplayer.template.mplayer_settingsButton.addEventListener('click', () => {
            this.settingsPanel.style.visibility === 'visible' ? this.settingsPanel.style.visibility = 'hidden' : this.settingsPanel.style.visibility = 'visible'
            this.settingsPanel.style.opacity === '1' ? this.settingsPanel.style.opacity = '0' : this.settingsPanel.style.opacity = '1'
            // not support changing resolution when using flv.js or play with native video tag
            if (this.mplayer.playlist.getCurrentVideoObject().type === 'hls' || this.mplayer.playlist.getCurrentVideoObject().type === 'dash') {
                if (this.resolutionsButton) {
                    document.querySelectorAll('[data-mplayer-resolutions-item]').forEach(item => {
                        this.settingsPanel.removeChild(item)
                    })
                    document.querySelectorAll('[data-mplayer-resolutions-group]').forEach(item => {
                        this.settingsPanel.removeChild(item)
                    })
                    this.resolutionsButton = undefined
                } else {
                    this.initResolutionsItem()
                }
            }
            this.reversePanelItem('data-mplayer-playback-rates-group', true)
            this.reversePanelItem('data-mplayer-resolutions-group', true)
        })
    }

    initHintsItem() {
        // switch template
        let switch_htmlCode = switchEjsTemplate({
            status: this.mplayer.hints.switch ? 'on' : 'off'
        })

        // float panel item template
        let floatPanelItem_htmlCode = floatPanelItemEjsTemplate({
            selected: false,
            dataset: 'data-mplayer-hints-item data-mplayer-panel-item',
            contents: `${this.mplayer.translate.trans('hints')} ${switch_htmlCode}`
        })


        // inject template code
        this.settingsPanel.insertAdjacentHTML('beforeend', floatPanelItem_htmlCode)

        // get element
        this.hintsSwitch = document.querySelector('[data-mplayer-hints-item]')

        // add event listener
        this.hintsSwitch.addEventListener('click', () => {
            // update switch status
            this.hintsSwitch.querySelector('.mplayer_switch').dataset.mplayerSwitch === 'on' ? this.hintsSwitch.querySelector('.mplayer_switch').dataset.mplayerSwitch = 'off' : this.hintsSwitch.querySelector('.mplayer_switch').dataset.mplayerSwitch = 'on'
            this.mplayer.hints.toggle()
        })
    }

    initPlaybackRatesItem() {
        // view more template
        let viewMore_htmlCode = viewMoreEjsTemplate()

        // float panel item template
        let floatPanelItem_htmlCode = floatPanelItemEjsTemplate({
            selected: false,
            dataset: 'data-mplayer-playback-rates-item data-mplayer-panel-item',
            contents: `${floatPanelEjsTemplate()} ${this.mplayer.translate.trans('playback-rate')} ${viewMore_htmlCode}`
        })

        // inject template code
        this.settingsPanel.insertAdjacentHTML('beforeend', floatPanelItem_htmlCode)

        // inject buttons code
        let floatPanelItems_htmlCode = ''
        this.mplayer.options.playbackRates.forEach(item => {
            let checkbox_htmlCode = checkboxEjsTemplate({
                status: item === this.mplayer.template.mplayer_video.playbackRate ? 'checked' : 'unchecked'
            })
            floatPanelItems_htmlCode += floatPanelItemEjsTemplate({
                selected: false,
                dataset: `data-mplayer-playback-rates-group data-mplayer-playback-rates-value=${item}`,
                contents: `${checkbox_htmlCode} ${item}`
            })
        })
        this.settingsPanel.insertAdjacentHTML('beforeend', floatPanelItems_htmlCode)

        this.reversePanelItem('data-mplayer-playback-rates-group', true)

        // add event listener
        document.querySelectorAll('[data-mplayer-playback-rates-group]').forEach(item => {
            item.addEventListener('click', (e) => {
                this.mplayer.template.mplayer_video.playbackRate = e.target.dataset.mplayerPlaybackRatesValue;
                this.mplayer.notice.publish(this.mplayer.translate.trans('playback-rate-changed') , 3000)
                this.checkItem('data-mplayer-playback-rates-group', 'mplayerPlaybackRatesGroup', e.target)
            })
        })

        // get elements
        this.playbackRatesButton = document.querySelector('[data-mplayer-playback-rates-item]')

        // add event listener
        this.playbackRatesButton.addEventListener('click', (e) => {
            this.reversePanelItem('data-mplayer-playback-rates-group', false)
        })
    }

    initResolutionsItem() {
        // insert change resolution option
        // view more template
        let viewMore_htmlCode = viewMoreEjsTemplate()
        // float panel item template
        let floatPanelItem_htmlCode = floatPanelItemEjsTemplate({
            selected: false,
            dataset: 'data-mplayer-resolutions-item data-mplayer-panel-item',
            contents: `${floatPanelEjsTemplate()} ${this.mplayer.translate.trans('resolutions')} ${viewMore_htmlCode}`
        })

        // hls resolutions
        if (this.mplayer.playlist.getCurrentVideoObject().type === 'hls') {
            // inject template code
            this.resolutions = this.mplayer.plugins.hls.levels
            if(this.resolutions.length <= 1) {
                return;
            }
            this.settingsPanel.insertAdjacentHTML('beforeend', floatPanelItem_htmlCode)
            let checkbox_htmlCode = checkboxEjsTemplate({
                status: this.mplayer.plugins.hls.autoLevelEnabled ? 'checked' : 'unchecked'
            })
            floatPanelItem_htmlCode = floatPanelItemEjsTemplate({
                selected: false,
                dataset: `data-mplayer-resolutions-group data-mplayer-resolutions-value="auto"`,
                contents: `${checkbox_htmlCode} ${this.mplayer.translate.trans('auto-select-resolutions')}`
            })
            // inject template code
            this.settingsPanel.insertAdjacentHTML('beforeend', floatPanelItem_htmlCode)

            // inject buttons code
            let floatPanelItems_htmlCode = ''
            this.resolutions.forEach(item => {
                let checkbox_htmlCode = checkboxEjsTemplate({
                    status: this.mplayer.plugins.hls.autoLevelEnabled ? 'unchecked' : (item.height === this.mplayer.template.mplayer_video.videoHeight ? 'checked' : 'unchecked')
                })
                floatPanelItems_htmlCode += floatPanelItemEjsTemplate({
                    selected: false,
                    dataset: `data-mplayer-resolutions-group data-mplayer-resolutions-value=${item.height}`,
                    contents: `${checkbox_htmlCode} ${item.height}p`
                })
            })
            this.settingsPanel.insertAdjacentHTML('beforeend', floatPanelItems_htmlCode)

            this.reversePanelItem('data-mplayer-resolutions-group', true)

            // add event listener
            document.querySelectorAll('[data-mplayer-resolutions-group]').forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target.dataset.mplayerResolutionsValue === 'auto') {
                        this.mplayer.plugins.hls.loadLevel = -1
                        this.mplayer.notice.publish(this.mplayer.translate.trans('auto-resolution-selected'), 3000)
                    } else {
                        this.mplayer.plugins.hls.levels.forEach(level => {
                            if (level.height === parseInt(e.target.dataset.mplayerResolutionsValue)) {
                                this.mplayer.plugins.hls.loadLevel = this.mplayer.plugins.hls.levels.indexOf(level)
                                this.mplayer.notice.publish(this.mplayer.translate.trans('resolution-selected') + ': ' + level.height + 'p', 3000)
                            }
                        })
                    }
                    console.log('changed resolution to ' + e.target.dataset.mplayerResolutionsValue + 'p')
                    this.checkItem('data-mplayer-resolutions-group', 'mplayerResolutionsGroup', e.target)
                })
            })

            // get elements
            this.resolutionsButton = document.querySelector('[data-mplayer-resolutions-item]')

            // add event listener
            this.resolutionsButton.addEventListener('click', (e) => {
                this.reversePanelItem('data-mplayer-resolutions-group', false)
            })
        }

        // dash resolutions
        if (this.mplayer.playlist.getCurrentVideoObject().type === 'dash') {
            // inject template code
            this.resolutions = this.mplayer.plugins.dash.getBitrateInfoListFor('video')
            if(this.resolutions.length <= 1) {
                return;
            }
            this.settingsPanel.insertAdjacentHTML('beforeend', floatPanelItem_htmlCode)
            let checkbox_htmlCode = checkboxEjsTemplate({
                status: this.mplayer.plugins.dash.getSettings().streaming.abr.autoSwitchBitrate.video ? 'checked' : 'unchecked'
            })
            floatPanelItem_htmlCode = floatPanelItemEjsTemplate({
                selected: false,
                dataset: `data-mplayer-resolutions-group data-mplayer-resolutions-value="auto"`,
                contents: `${checkbox_htmlCode} ${this.mplayer.translate.trans('auto-select-resolutions')}`
            })
            // inject template code
            this.settingsPanel.insertAdjacentHTML('beforeend', floatPanelItem_htmlCode)
            // inject buttons code
            let floatPanelItems_htmlCode = ''
            this.resolutions.forEach(item => {
                let checkbox_htmlCode = checkboxEjsTemplate({
                    status: this.mplayer.plugins.dash.getSettings().streaming.abr.autoSwitchBitrate.video ? 'unchecked' : (item.height === this.mplayer.template.mplayer_video.videoHeight ? 'checked' : 'unchecked')
                })
                floatPanelItems_htmlCode += floatPanelItemEjsTemplate({
                    selected: false,
                    dataset: `data-mplayer-resolutions-group data-mplayer-resolutions-value=${item.height}`,
                    contents: `${checkbox_htmlCode} ${item.height}p`
                })
            })
            this.settingsPanel.insertAdjacentHTML('beforeend', floatPanelItems_htmlCode)

            this.reversePanelItem('data-mplayer-resolutions-group', true)

            // add event listener
            document.querySelectorAll('[data-mplayer-resolutions-group]').forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target.dataset.mplayerResolutionsValue === 'auto') {
                        this.mplayer.plugins.dash.getSettings().streaming.abr.autoSwitchBitrate.video = true
                        this.mplayer.notice.publish(this.mplayer.translate.trans('auto-resolution-selected'), 3000)
                    } else {
                        for (let i = 0; i < this.mplayer.plugins.dash.getBitrateInfoListFor('video').length; i++) {
                            if (this.mplayer.plugins.dash.getBitrateInfoListFor('video')[i].height === parseInt(e.target.dataset.mplayerResolutionsValue)) {
                                this.mplayer.plugins.dash.setQualityFor('video', i)
                                this.mplayer.plugins.dash.getSettings().streaming.abr.autoSwitchBitrate.video = false
                                this.mplayer.notice.publish(this.mplayer.translate.trans('resolution-selected') + ': ' + level.height + 'p', 3000)
                            }
                        }
                    }
                    console.log('changed resolution to ' + e.target.dataset.mplayerResolutionsValue + 'p')
                    this.checkItem('data-mplayer-resolutions-group', 'mplayerResolutionsGroup', e.target)
                })
            })

            // get elements
            this.resolutionsButton = document.querySelector('[data-mplayer-resolutions-item]')

            if (this.resolutionsButton) {
                // add event listener
                this.resolutionsButton.addEventListener('click', (e) => {
                    this.reversePanelItem('data-mplayer-resolutions-group', false)
                })
            }
        }
    }

    checkItem(dataset, datasetString, target) {
        document.querySelectorAll(`[${dataset}]`).forEach(item => {
            item.querySelector('.mplayer_checkBox').dataset['mplayerCheckbox'] = 'unchecked'
        })
        target.querySelector('.mplayer_checkBox').dataset['mplayerCheckbox'] = 'checked'
    }

    reversePanelItem(dataset, direction) {
        document.querySelectorAll(`[${dataset}]`).forEach(item => {
            direction === true ? item.style.display = 'none' : item.style.display = 'block'
        })
        document.querySelectorAll('[data-mplayer-panel-item]').forEach(item => {
            direction === false ? item.style.display = 'none' : item.style.display = 'block'
        })
    }

    existed() {
        return this.settingsPanel
    }

    destroy() {
        if (!this.settingsPanel) {
            return;
        }
        this.mplayer.template.mplayer_settings.removeChild(this.settingsPanel)
    }

}

export default SettingsPanel