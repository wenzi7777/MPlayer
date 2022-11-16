class Events {
    constructor() {
        this.events = {};

        this.videoEvents = [
            'abort',
            'canplay',
            'canplaythrough',
            'contextmenu',
            'durationchange',
            'emptied',
            'ended',
            'error',
            'loadeddata',
            'loadedmetadata',
            'loadstart',
            'mozaudioavailable',
            'pause',
            'play',
            'playing',
            'progress',
            'ratechange',
            'seeked',
            'seeking',
            'stalled',
            'suspend',
            'timeupdate',
            'volumechange',
            'waiting',
            'click',
            'enterpictureinpicture',
            'leavepictureinpicture',
        ];
        this.playerEvents = [
            'mplayer:reload',
            'mplayer:screenshot',
            'mplayer:error',
            'mplayer:recognizedMediaType',
            'mplayer:play',
            'mplayer:pause',
            'mplayer:muted',
            'mplayer:skipFailed',
            'mplayer:skipFailed',
            'mplayer:skip',
            'mplayer:exitPiP',
            'mplayer:enterPiP',
            'mplayer:enterFullscreen',
            'mplayer:exitFullscreen',
            'mplayer:openLink',
            'mplayer:useMobileStyle',
            'mplayer:cancelMobileStyle',
            'mplayer:pluginsDestroyed',
            'mplayer:exitTheaterMode',
            'mplayer:enterTheaterMode',
        ];
    }

    on(name, callback) {
        if (this.type(name) && typeof callback === 'function') {
            if (!this.events[name]) {
                this.events[name] = [];
            }
            this.events[name].push(callback);
        }
    }

    trigger(name, info) {
        if (this.events[name] && this.events[name].length) {
            for (let i = 0; i < this.events[name].length; i++) {
                this.events[name][i](info);
            }
        }
    }

    type(name) {
        if (this.playerEvents.indexOf(name) !== -1) {
            return 'player';
        } else if (this.videoEvents.indexOf(name) !== -1) {
            return 'video';
        }
        return null;
    }
}

export default Events;
