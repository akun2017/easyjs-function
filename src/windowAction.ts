/**
 * @description 让指定的dom全屏显示
*/
export function requestFullScreen(id: string): void {
    var dom = document.getElementById(id) as any;//绑定想要全屏的组件
    if (dom.requestFullscreen) {
        dom.requestFullscreen();
    } else if (dom.mozRequestFullScreen) {
        dom.mozRequestFullScreen();
    } else if (dom.webkitRequestFullScreen) {
        dom.webkitRequestFullScreen();
    }
};

/**
 * @description 退出全拼
*/
export function exitFullscreen(): void {
    var dom = document as any;
    if (dom.exitFullscreen) {
        dom.exitFullscreen();
    } else if (dom.mozCancelFullScreen) {
        dom.mozCancelFullScreen();
    } else if (dom.webkitCancelFullScreen) {
        dom.webkitCancelFullScreen();
    }
};

/**
 * @description 监听屏幕是否全屏
*/
export function watchFull(callback: Function): void {
    let doc = document as any;
    window.addEventListener("resize", () => {
        if (
            doc.isFullScreen || doc.mozIsFullScreen || doc.webkitIsFullScreen
        ) {
            callback(true)
        } else {
            callback(false)
        }
    });
}

/**
 * @description 系统级别的通知栏
*/
export function WindowNote(title: string, body: string) {
    if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function (status) {
            var n = new Notification(title, { body });
        });
    }
}