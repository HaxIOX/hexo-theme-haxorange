(function () {
  'use strict'

  var root = document.querySelector('[data-tag-index]')
  if (!root) return

  var input = root.querySelector('[data-tag-filter]')
  var items = root.querySelectorAll('[data-tag-item]')
  var empty = root.querySelector('[data-tag-filter-empty]')
  if (!input || !items.length || !empty) return

  input.addEventListener('input', function () {
    var query = input.value.trim().toLowerCase()
    var visibleCount = 0

    Array.prototype.forEach.call(items, function (item) {
      var matches = !query || item.getAttribute('data-tag-name').indexOf(query) !== -1
      item.hidden = !matches
      if (matches) visibleCount += 1
    })

    empty.hidden = visibleCount !== 0
  })
})()
