// 获取窗口宽度
function getWindowWidth () {
    return document.body.clientWidth;
}

// 获取窗口可视范围的高度
function getWindowHeight () {
    return document.body.clientHeight || document.documentElement.clientHeight;
}

// 获取滚动条高度
function getScrollTop () {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

// 获取文档内容高度
function getDocumentHeight () {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

export {
    getWindowWidth,
    getWindowHeight,
    getDocumentHeight,
    getScrollTop
}