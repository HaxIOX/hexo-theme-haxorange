// colorscheme.js
let switchHandle = document.querySelector('#switch-color-scheme')
let themeIcon = document.querySelector('#theme-icon')
var html = document.documentElement

const switchMode = () => {
    let attr = html.getAttribute('color-mode')
    let colorMode = 'light'
    if (attr === 'light') {
        html.setAttribute('color-mode', 'dark')
        themeIcon.classList = 'iconfont icon-sun'
        colorMode = 'dark'
    } else {
        html.setAttribute('color-mode', 'light')
        themeIcon.classList = 'iconfont icon-moon'
        colorMode = 'light'
    }
    localStorage.setItem('color-mode', colorMode)
}

switchHandle.addEventListener('click', switchMode, false)

// 图标跟随页面实际配色：header.ejs 只在存过时改写 color-mode，没存过就是 layout.ejs 里的 light。
// 原来按 localStorage 判断，没存过时被当成深色，浅色页面却显示太阳。
if (html.getAttribute('color-mode') === 'dark') {
    themeIcon.classList = 'iconfont icon-sun'
} else {
    themeIcon.classList = 'iconfont icon-moon'
}
