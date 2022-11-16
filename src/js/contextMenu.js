import basicContextMenuEjsTemplate from '../template/contextMenu/base.ejs'
import contextManuItemEjsTemplate from '../template/contextMenu/item.ejs'

class ContextMenu {
    constructor(mplayer) {
        this.mplayer = mplayer
        this.init()
    }

    init() {
        if (!this.mplayer.options.contextMenu) {
            // disabled context menu
            return
        }

        // call build in function: data-mplayer-context-menu-target="Function(args)"
        this.insertBasicContextMenu()
        this.mplayer.options.contextMenu.forEach(contextMenu => {
            this.insertContextMenuItem(contextMenu.title, `data-mplayer-context-menu-target-function="${contextMenu.targetFunction}" data-mplayer-context-menu-target-params="${contextMenu.params}"`)
        })
        this.getAllMenuItems()
        this.initEventListener()
    }

    insertBasicContextMenu() {
        let basicContextManu_htmlCode = basicContextMenuEjsTemplate()
        this.mplayer.template.mplayer_sizer.insertAdjacentHTML('afterbegin', basicContextManu_htmlCode)
        this.basicContextManu = document.querySelector('.mplayer_contextMenu')
        this.basicContextManu.style.display = 'none'
    }

    insertContextMenuItem(contents, dataset) {
        let contextMenuItem_htmlCode = contextManuItemEjsTemplate({
            dataset,
            contents
        })
        this.basicContextManu.insertAdjacentHTML('afterbegin', contextMenuItem_htmlCode)
    }

    toggleContextMenu() {
        this.basicContextManu.style.display === 'none' ? this.basicContextManu.style.display = 'flex' : this.basicContextManu.style.display = 'none'
    }

    closeContextMenu() {
        this.basicContextManu.style.display = 'none'
    }

    getAllMenuItems() {
        this.menuItems = document.querySelectorAll('[data-mplayer-context-menu-target-function]')
    }

    initEventListener() {
        // toggle context menu
        this.mplayer.template.mplayer_sizer.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            this.basicContextManu.style.top = e.layerY + 'px';
            this.basicContextManu.style.left = e.layerX + 'px';
            this.toggleContextMenu()
        })

        // close context menu
        this.mplayer.template.mplayer_sizer.addEventListener('click', (e) => {
            if (this.basicContextManu.style.display === 'none') {
                return;
            }
            this.closeContextMenu()
        })

        // trigger functions attached
        this.menuItems.forEach(menuItem => {
            menuItem.addEventListener('click', (e) => {
                try {
                    let targetFunction = e.target.dataset.mplayerContextMenuTargetFunction
                    let targetParams = e.target.dataset.mplayerContextMenuTargetParams
                    if(targetParams) {
                        this.mplayer[targetFunction](targetParams)
                    }else {
                        this.mplayer[targetFunction]()
                    }
                } catch (e) {
                    this.mplayer.notice.publish(this.mplayer.translate.trans('cant-resolve-function-of-undefined'), 5000)
                    console.log(e)
                }
            })
        })
    }
}

export default ContextMenu