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
                        this.mplayer.togglePlayPause()
                        break
                    case "f":
                        this.mplayer.toggleFullScreen()
                        break
                    case "t":
                        this.mplayer.toggleTheaterMode()
                        break
                    case "i":
                        this.mplayer.toggleMiniPlayer()
                        break
                    case "m":
                        this.mplayer.toggleMute()
                        break
                    case "arrowleft":
                    case "j":
                        this.mplayer.skip(-5)
                        break
                    case "arrowright":
                    case "l":
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