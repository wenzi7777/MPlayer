import noticeEjsTemplate from '../template/notice/notice.ejs'

class Notice {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.notices = []
        this.count = 0
    }

    publish(contents, delay) {
        this.count += 1
        let index = this.count
        let notice_htmlCode = noticeEjsTemplate({
            contents,
            dataset: `data-mplayer-notice-index="${index}"`
        })
        this.mplayer.template.mplayer_noticeList.insertAdjacentHTML('beforeend', notice_htmlCode)
        this.notices[index] = document.querySelector(`[data-mplayer-notice-index="${index}"]`)
        this.notices[index].classList.add('enter')
        setTimeout(() => {
            this.notices[index].classList.remove('enter')
            this.notices[index].classList.add('leave')
            setTimeout(() => {
                this.mplayer.template.mplayer_noticeList.removeChild(this.notices[index])
                this.notices[index] = undefined
            }, 250)
        }, delay)
    }
}

export default Notice