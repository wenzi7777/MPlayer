class Theme {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.init()
    }

    init() {
        // if used timeline tool
        if (this.mplayer.options.tools.includes('timeline')) {
            this.initTimeline()
        }

        // if switches existed
        if (document.querySelector('.mplayer_switch')) {
            this.initSwitches()
        }

        // if settingsPanel existed
        if (document.querySelector('.mplayer_settingsPanel')) {
            this.initSettingsPanel()
        }
    }

    reload() {
        this.destroy()
        this.init()
    }

    initTimeline() {
        const styles = `
        .mplayer_thumbIndicator {
            background-color: ${this.mplayer.options.theme.main} !important;
            box-shadow: 0 0 16px ${this.mplayer.options.theme.main} !important;
        }
        .mplayer_timeline::after {
            background-color: ${this.mplayer.options.theme.main} !important;
        }`
        document.head.insertAdjacentHTML("beforeend", `<style data-mplayer-theme>${styles}</style>`)

        // if timeline tool is used, the container of preview image will be created even if there's no
        // preview image existed.
        this.initPreviewImage()

    }

    initPreviewImage() {
        const styles = `
        .mplayer_previewImage {
            box-shadow: 0 0 0 3px ${this.mplayer.options.theme.light} !important;
        }`
        document.head.insertAdjacentHTML("beforeend", `<style data-mplayer-theme>${styles}</style>`)
    }

    initSwitches() {
        const styles = `
        .mplayer_switch[data-mplayer-switch="on"] {
            background-color: ${this.mplayer.options.theme.main} !important;
        }
        .mplayer_switchHandle {
            background-color: ${this.mplayer.options.theme.main} !important;
            box-shadow: 0 0 3px ${this.mplayer.options.theme.light} !important;
        }`
        document.head.insertAdjacentHTML("beforeend", `<style data-mplayer-theme>${styles}</style>`)
    }

    initSettingsPanel() {
        const styles = `
        .mplayer_settingsItem.selected {
            border-left: 2px solid ${this.mplayer.options.theme.main} !important;
            color: ${this.mplayer.options.theme.main} !important;
        }`
        document.head.insertAdjacentHTML("beforeend", `<style data-mplayer-theme>${styles}</style>`)
    }

    destroy() {
        // select head tag
        const head = document.querySelector('head')

        // select theme style tag
        const styles = document.querySelectorAll('style[data-mplayer-theme]')

        // remove them
        styles.forEach(style => {
            head.removeChild(style)
        })
    }
}

export default Theme