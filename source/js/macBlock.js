// mac-block.js —— 为代码块注入苹果风标题栏（红黄绿三点 + 语言/标题标签）
// 配合 source/css/figcaption/mac-block.css 使用
// 语言标签显隐由主题配置控制：<%= theme.codeBlock.language %> 在 header 注入 window.__MAC_BLOCK_LANGUAGE__
(function () {
  function resolveLabel(figure) {
    // 优先取 figcaption（Hexo 代码块标题），否则从 className 提取语言
    var caption = figure.querySelector('figcaption')
    if (caption && caption.textContent.trim()) {
      return caption.textContent.trim()
    }
    var m = /highlight[ \t]+([\w-]+)/.exec(figure.className)
    return m ? m[1] : ''
  }

  function injectHead(figure) {
    if (figure.querySelector('.mac-head')) return

    var head = document.createElement('div')
    head.className = 'mac-head'

    var dots = ['red', 'yellow', 'green']
    for (var i = 0; i < dots.length; i++) {
      var dot = document.createElement('i')
      dot.className = 'mac-dot mac-dot-' + dots[i]
      head.appendChild(dot)
    }

    var showLang = window.__MAC_BLOCK_LANGUAGE__ !== false
    if (showLang) {
      var label = document.createElement('span')
      label.className = 'mac-lang'
      var text = resolveLabel(figure)
      label.textContent = text
      if (!text) label.setAttribute('data-empty', 'true')
      head.appendChild(label)
    }

    figure.insertBefore(head, figure.firstChild)
  }

  document.addEventListener('DOMContentLoaded', function () {
    var figures = document.querySelectorAll('figure.highlight')
    for (var i = 0; i < figures.length; i++) {
      injectHead(figures[i])
    }
  })
})()
