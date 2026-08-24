// mac-block.js —— 为代码块注入苹果风标题栏（红黄绿三点 + 语言/标题标签）
// 配合 source/css/figcaption/mac-block.css 使用
// 语言标签显隐由主题配置控制：<%= theme.codeBlock.language %> 在 header 注入 window.__MAC_BLOCK_LANGUAGE__
(function () {
  function normalizeLabel(label) {
    var value = String(label || '').toLowerCase()
    return ['none', 'text', 'plain', 'plaintext'].indexOf(value) === -1 ? value : ''
  }

  function resolveLabel(figure) {
    // 优先取 figcaption，再识别 Prism / Hexo 的语言类名
    var caption = figure.querySelector('figcaption')
    if (caption && caption.textContent.trim()) {
      return caption.textContent.trim()
    }
    var prismCode = figure.querySelector('[class*="language-"]')
    var prismMatch = prismCode && /(?:^|\s)language-([\w-]+)/.exec(prismCode.className)
    if (prismMatch) return normalizeLabel(prismMatch[1])

    var m = /highlight[ \t]+([\w-]+)/.exec(figure.className)
    return normalizeLabel(m ? m[1] : '')
  }

  function wrapPrismBlocks() {
    var blocks = document.querySelectorAll('.markdown-body pre[class*="language-"]')
    for (var i = 0; i < blocks.length; i++) {
      var pre = blocks[i]
      if (pre.closest('figure.highlight')) continue

      var figure = document.createElement('figure')
      figure.className = 'highlight prism-highlight'
      pre.parentNode.insertBefore(figure, pre)
      figure.appendChild(pre)
    }
  }

  function getCodeInfo(figure) {
    var hexoCode = figure.querySelector('.code')
    var table = figure.querySelector('table')
    if (hexoCode && table) {
      return { target: table, lineCount: hexoCode.querySelectorAll('.line').length }
    }

    var prismPre = figure.querySelector('pre[class*="language-"]')
    var prismCode = prismPre && prismPre.querySelector('code')
    if (!prismPre || !prismCode) return null
    var content = prismCode.textContent.replace(/\r\n/g, '\n').replace(/\n$/, '')
    return { target: prismPre, lineCount: content ? content.split('\n').length : 0 }
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

  function injectCollapse(figure) {
    var config = window.__CODE_BLOCK_COLLAPSE__ || {}
    if (config.enable === false) return

    var info = getCodeInfo(figure)
    if (!info || info.target.parentNode.classList.contains('code-block-body')) return

    var lineCount = info.lineCount
    var threshold = Number(config.threshold) || 18
    var collapsedLines = Number(config.collapsedLines) || 10
    if (lineCount <= threshold) return

    var body = document.createElement('div')
    body.className = 'code-block-body'
    body.style.setProperty('--collapsed-height', (Math.min(collapsedLines, threshold) * 19.375 + 18) + 'px')
    info.target.parentNode.insertBefore(body, info.target)
    body.appendChild(info.target)

    var isChinese = /^zh(?:-|$)/i.test(document.documentElement.lang || '')
    var button = document.createElement('button')
    button.className = 'code-block-toggle'
    button.type = 'button'
    button.setAttribute('aria-expanded', 'false')
    button.innerHTML = '<i class="iconfont icon-chevronup" aria-hidden="true"></i><span></span>'

    function render(expanded) {
      figure.classList.toggle('is-expanded', expanded)
      button.setAttribute('aria-expanded', String(expanded))
      button.querySelector('span').textContent = expanded
        ? (isChinese ? '收起代码' : 'Collapse code')
        : (isChinese ? '展开全部 ' + lineCount + ' 行' : 'Show all ' + lineCount + ' lines')
    }

    button.addEventListener('click', function () {
      render(button.getAttribute('aria-expanded') !== 'true')
    })
    figure.appendChild(button)
    figure.classList.add('is-collapsible')
    render(false)
  }

  document.addEventListener('DOMContentLoaded', function () {
    wrapPrismBlocks()
    var figures = document.querySelectorAll('figure.highlight')
    for (var i = 0; i < figures.length; i++) {
      injectHead(figures[i])
      injectCollapse(figures[i])
    }
  })
})()
