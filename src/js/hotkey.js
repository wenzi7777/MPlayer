class Hotkey {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.init()
    }

    init() {
        if (!this.mplayer.options.hotkey) {
            return;
        }
        this.hotKeyHandler = this.hotKey.bind(this)
        document.addEventListener('keydown', this.hotKeyHandler);
    }

    hotKey(e) {
        if (this.mplayer.focused) {
            let tag = document.activeElement.tagName.toUpperCase();
            let editable = document.activeElement.getAttribute('contenteditable');
            // when focused on input/textarea or other editable element, ignore.
            if (tag !== 'INPUT' && tag !== 'TEXTAREA' && editable !== '' && editable !== 'true') {
                switch (e.key.toLowerCase()) {
                    case " ":
                    case "k":
                        e.preventDefault()
                        this.mplayer.togglePlayPause()
                        break
                    case "f":
                        e.preventDefault()
                        this.mplayer.toggleFullScreen()
                        break
                    case "t":
                        e.preventDefault()
                        this.mplayer.toggleTheaterMode()
                        break
                    case "i":
                        e.preventDefault()
                        this.mplayer.toggleMiniPlayer()
                        break
                    case "m":
                        e.preventDefault()
                        this.mplayer.toggleMute()
                        break
                    case "arrowleft":
                    case "j":
                        e.preventDefault()
                        this.mplayer.skip(-5)
                        break
                    case "arrowright":
                    case "l":
                        e.preventDefault()
                        this.mplayer.skip(5)
                        break
                }
            }
        }
    }

    destroy() {
        document.removeEventListener('keydown', this.hotKeyHandler);
    }
}

export default Hotkey