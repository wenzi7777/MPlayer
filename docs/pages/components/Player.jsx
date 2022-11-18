import React from "react";
import Hls from "hls.js";

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mplayer: undefined
        }
    }

    componentDidMount() {
        window.Hls = Hls
        const MPlayer = require('@wenzi7777/mplayer')
        this.state.mplayer = new MPlayer(document.getElementById('mplayer'), {
            videos: [
                {
                    title: '【VOCALOID IA】Moon-Viewing Recital "オツキミリサイタル"【Animation MV】',
                    src: 'https://api.dogecloud.com/player/get.m3u8?vcode=ab3d12094107f381&userId=1132&flsign=014cc0ce63f0bd8ca24e2d1b8454b138&ext=.m3u8'
                }
            ]
        })
    }

    render() {
        return (
            <div id={'mplayer'}></div>
        );
    }
}

export default Player