// catalog js
(function () {
  const mobileBreakpoint = 1200
  const catalog = document.getElementById("catalog")
  const catalogButton = document.getElementById("btn-catalog")
  const catalogBackdrop = document.getElementById("catalog-backdrop")
  const tocElement = catalog && catalog.querySelector(".catalog-content")
  const postDetails = document.getElementById("post-details")
  const postContent = postDetails && postDetails.querySelector(".post-content")

  if (!catalog || !catalogButton || !tocElement || !postDetails) return

  postDetails.classList.add("has-catalog")

  let headingPairs = []
  let activeLink = null
  let ticking = false

  function findHeading(link, index) {
    const hash = link.hash || link.getAttribute("href")

    if (hash && hash.charAt(0) === "#") {
      try {
        const heading = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (heading) return heading
      } catch (error) {
        // Fall back to the rendered heading order for malformed legacy anchors.
      }
    }

    const headerLinks = postContent ? postContent.querySelectorAll(".headerlink") : []
    return headerLinks[index] && headerLinks[index].parentElement
  }

  function refreshHeadings() {
    const tocLinks = Array.from(tocElement.querySelectorAll(".toc-link"))
    headingPairs = tocLinks.map(function (link, index) {
      return { link: link, heading: findHeading(link, index) }
    }).filter(function (pair) {
      return pair.heading
    })
    updateActiveCatalog()
  }

  function setActiveLink(link) {
    if (activeLink === link) return
    if (activeLink) activeLink.classList.remove("active")

    activeLink = link
    if (!activeLink) return

    activeLink.classList.add("active")
    const contentRect = tocElement.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()

    if (linkRect.top < contentRect.top) {
      tocElement.scrollTop -= contentRect.top - linkRect.top
    } else if (linkRect.bottom > contentRect.bottom) {
      tocElement.scrollTop += linkRect.bottom - contentRect.bottom
    }
  }

  function updateActiveCatalog() {
    ticking = false
    if (!headingPairs.length) return

    const offset = 32
    let current = headingPairs[0]

    headingPairs.forEach(function (pair) {
      if (pair.heading.getBoundingClientRect().top <= offset) current = pair
    })

    setActiveLink(current.link)
  }

  function requestActiveUpdate() {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(updateActiveCatalog)
  }

  function isMobileCatalog() {
    return window.innerWidth <= mobileBreakpoint
  }

  function setCatalogOpen(open) {
    const mobile = isMobileCatalog()
    const shouldOpen = mobile && open
    catalog.classList.toggle("hidden", !shouldOpen)
    catalogButton.setAttribute("aria-expanded", String(shouldOpen))
    catalog.setAttribute("aria-hidden", String(mobile && !shouldOpen))
    document.body.classList.toggle("catalog-open", shouldOpen)
  }

  catalogButton.addEventListener("click", function () {
    setCatalogOpen(catalog.classList.contains("hidden"))
  })

  catalogBackdrop.addEventListener("click", function () {
    setCatalogOpen(false)
  })

  tocElement.addEventListener("click", function (event) {
    if (isMobileCatalog() && event.target.closest(".toc-link")) setCatalogOpen(false)
  })

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setCatalogOpen(false)
  })

  document.addEventListener("scroll", requestActiveUpdate, { passive: true })
  window.addEventListener("resize", function () {
    if (!isMobileCatalog()) {
      setCatalogOpen(false)
    } else {
      catalog.setAttribute("aria-hidden", String(catalog.classList.contains("hidden")))
    }
    requestActiveUpdate()
  })

  if (postContent && window.MutationObserver) {
    const observer = new MutationObserver(refreshHeadings)
    observer.observe(postContent, { childList: true, subtree: true })
  }

  refreshHeadings()
  setCatalogOpen(false)
}())
