class Translation {
    constructor(options) {
        this.options = options
    }

    trans(key) {
        if (translations[this.options.lang] && translations[this.options.lang][key]) {
            return translations[this.options.lang][key];
        } else {
            return key;
        }
    };
}

// translations, if you want to add your own translation, edit this object.
const translations = {
    en_US: {
        'untitled': 'untitled',
        'empty': 'empty',
        'video-loading': 'Video is loading...',
        'initializing-mplayer': 'Initializing MPlayer',
        'initialized-mplayer': 'Initialized MPlayer',
        'loading-failed': 'Loading failed',
        'cant-resolve-function-of-undefined': 'Can not resolve function of undefined',
        'enter-pip': 'Enter pip',
        'exit-pip': 'Exit pip',
        'exit-theater-mode': 'Exit theater mode',
        'enter-theater-mode': 'Enter theater',
        'error': 'Error',
        'hints-enabled': 'Enable hints',
        'hints-disabled': 'Disable hints',
        'mplayer-info-panel': 'MPlayer info panel',
        'close': 'Close',
        'video-resolution': 'Video resolution',
        'player-fps': 'Player FPS',
        'video-url': 'Video URL',
        'buffer-health': 'Buffer health',
        'date': 'Date',
        'MPlayer': 'MPlayer',
        'enter-fullscreen': 'Enter fullscreen',
        'exit-fullscreen': 'Exit fullscreen',
        'play-previous': 'Play previous',
        'play-next': 'Play next',
        'created-screenshot-at': 'Created screenshot at',
        'hints': 'Hints',
        'playback-rate': 'Playback rate',
        'playback-rate-changed': 'Playback rate changed',
        'resolutions': 'Resolutions',
        'auto-select-resolutions': 'Auto select resolutions',
        'auto-resolution-selected': 'Auto resolution selected',
        'resolution-selected': 'Resolution selected',
        'subtitle-selected': 'Subtitle selected',
        'not-provide-subtitles': 'Not provide subtitles',
        'subtitles-closed': 'Subtitles closed',
        'browser-not-supported-hlsjs': 'This browser do not support HLS.js',
        'browser-not-supported-dashjs': 'This browser do not support DASH.js',
        'browser-not-supported-flvjs': 'This browser do not support FLV.js',
        'get-media-resource-type-successfully': 'Get media type successfully',
        'attempt-to-load-video': 'Try to load video',
        'spotlight': 'Spotlight Effect'
    },
    zh_CN: {
        'untitled': '无标题',
        'empty': '空内容',
        'video-loading': '视频正在载入...',
        'initializing-mplayer': '初始化MPlayer',
        'initialized-mplayer': '初始化MPlayer完毕',
        'loading-failed': '载入失败',
        'cant-resolve-function-of-undefined': '无法调用未定义的函数',
        'enter-pip': '进入画中画模式',
        'exit-pip': '退出画中画模式',
        'exit-theater-mode': '退出影院模式',
        'enter-theater-mode': '进入影院模式',
        'error': '错误',
        'hints-enabled': '启用提示',
        'hints-disabled': '禁用提示',
        'mplayer-info-panel': 'MPlayer信息面板',
        'close': '关闭',
        'video-resolution': '视频清晰度',
        'player-fps': '播放器FPS',
        'video-url': '视频地址',
        'buffer-health': '缓存健康',
        'date': '日期',
        'MPlayer': 'MPlayer',
        'enter-fullscreen': '进入全屏幕',
        'exit-fullscreen': '退出全屏幕',
        'play-previous': '上一个',
        'play-next': '下一个',
        'created-screenshot-at': '创建了屏幕截图',
        'hints': '提示',
        'playback-rate': '倍速',
        'playback-rate-changed': '倍速已变更',
        'resolutions': '清晰度',
        'auto-select-resolutions': '自动选择清晰度',
        'auto-resolution-selected': '启用自动选择清晰度',
        'resolution-selected': '已选择清晰度',
        'subtitle-selected': '已选择字幕',
        'not-provide-subtitles': '未提供字幕',
        'subtitles-closed': '字幕已关闭',
        'browser-not-supported-hlsjs': '这个浏览器不支持HLS.js',
        'browser-not-supported-dashjs': '这个浏览器不支持DASH.js',
        'browser-not-supported-flvjs': '这个浏览器不支持FLV.js',
        'get-media-resource-type-successfully': '获取视频类型成功',
        'attempt-to-load-video': '尝试载入视频',
        'spotlight': '聚光灯效果'
    },
    zh_TW: {
        'untitled': '無標題',
        'empty': '空內容',
        'video-loading': '影片正在載入...',
        'initializing-mplayer': '初始化MPlayer',
        'initialized-mplayer': '初始化MPlayer完成',
        'loading-failed': '載入失敗',
        'cant-resolve-function-of-undefined': '無法調用沒有定義的函式',
        'enter-pip': '進入PiP',
        'exit-pip': '離開PiP',
        'exit-theater-mode': '離開觀影模式',
        'enter-theater-mode': '進入觀影模式',
        'error': 'ERROR',
        'hints-enabled': '打開提示',
        'hints-disabled': '關閉提示',
        'mplayer-info-panel': 'MPlayer資訊面板',
        'close': '關閉',
        'video-resolution': '影片解析度',
        'player-fps': '播放器FPS',
        'video-url': '影片URL',
        'buffer-health': '快取健康',
        'date': '日期',
        'MPlayer': 'MPlayer',
        'enter-fullscreen': '進入全螢幕模式',
        'exit-fullscreen': '離開全螢幕模式',
        'play-previous': '上一個',
        'play-next': '下一個',
        'created-screenshot-at': '創建了螢幕截圖',
        'hints': '提示',
        'playback-rate': '倍速',
        'playback-rate-changed': '倍速已變更',
        'resolutions': '解析度',
        'auto-select-resolutions': '自動選擇解析度',
        'auto-resolution-selected': '打開自動選擇解析度',
        'resolution-selected': '已選擇解析度',
        'subtitle-selected': '已選擇字幕',
        'not-provide-subtitles': '沒有可用的字幕',
        'subtitles-closed': '字幕已關閉',
        'browser-not-supported-hlsjs': '此瀏覽器不支援HLS.js',
        'browser-not-supported-dashjs': '此瀏覽器不支援DASH.js',
        'browser-not-supported-flvjs': '此瀏覽器不支援FLV.js',
        'get-media-resource-type-successfully': '獲取影片類型成功',
        'attempt-to-load-video': '嘗試載入影片',
        'spotlight': '聚光燈效果'
    }
};

export default Translation;
