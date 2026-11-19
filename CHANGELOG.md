# Changelog

## Unreleased

### Added

- Added a collapsible site navigation to post pages: a cord and bulb hang from the top-right corner, hovering near either one expands the full navbar, the bulb lights up while it is open, and the panel holds for half a second after the pointer leaves so a click still lands.
- Added `postTaxonomy.tags` and `postTaxonomy.categories` to show or hide the tag and category lines under a post title independently of the matching navbar entries.
- Added accessibility labels for the floating tools (back to top, search, color mode).
- Added publish and update times to the post header and footer meta, hiding the update time when it matches the publish time.
- Added a configurable GitHub-inspired About page with profile metadata, blog statistics, grouped skills, a build-time writing activity graph, and recent posts.
- Added configurable long-code folding with full-content copying and soft wrapping for long lines.
- Added Prism code-block compatibility, including `language-none`, copying, folding, and long-line wrapping.
- Added configurable footer post count and site runtime.
- Added a configurable minimum usage count for the tag index.
- Added an optional `avatar` field to `friends` entries; a card without one falls back to a muted initial badge, so no entry renders an empty circle.
- Added `friendIndex.compactFrom` so a long friends list switches from the card grid to a compact list; `0` keeps the cards at any length.
- Added a `friends` translation key for the friends page header across all bundled languages.
- Added the three newest interface labels (back to top, search, color mode) to the ten language files that were missing them.
- Added `mathjax.per_page`: when it is `true`, only pages with `mathjax: true` in their front-matter load MathJax, so posts without formulas skip the 1.1MB `tex-chtml.js`. It defaults to `false`, which keeps loading MathJax on every post as before.
- Added `avatar.motto`, a line under the header nickname. It shows on every page so the header keeps one height and the navbar never jumps between pages; on the first home page it is typed out character by character, and hovering it runs a wave across the characters. Empty hides it.
- Added `pixel.enable` (on by default) for pixel accents loaded from `pixel.css` after every other stylesheet: About panels, the profile card, friend cards and code windows get two-step pixel corners whose 1px outline follows the steps, a small orange pixel cursor blinks after the header nickname, and a 6×6 pixel orange replaces the grey highlighter bar on the current header navbar item and hops when hovered, and the back-to-top, search, color-scheme (sun/moon) and share buttons in the tools bar are drawn as 8×8 pixel icons that follow the text color and hop on hover. The share menu's brand icons are untouched, and the tools-bar icons no longer depend on the external iconfont loading. With a motto set, the blinking cursor moves to the end of the motto line. On post pages the navigation cord becomes a striped orange cat tail with a curled tip that flicks now and then and wags while the navbar is open; its position, hit area and behaviour are unchanged. Card geometry is unchanged, the orange sits in the item's own margin so the navbar does not shift between pages, and all animations are off under `prefers-reduced-motion: reduce`. Turning the switch off restores the previous look.
- Added more pixel accents under `pixel.enable`: a sleeping pixel tabby cat with floating Z's at the end of every post body (posts only, not About or Friends), a light orange text selection color, a pixel hop when hovering the header or sidebar avatar, and a crouch-and-launch animation on the back-to-top arrow when it is clicked. Animations stay off under `prefers-reduced-motion: reduce`.

### Changed

- Light-mode Markdown blocks keep a light warm tint on the white background: inline code, `pre` and table rules use warm tones instead of GitHub's cool grays. Tables drop the 2px cell grid and zebra stripes for book-style 1px row rules with a heavier rule under the header. Blockquotes get a faint orange tint with an orange left border in both color modes, and horizontal rules follow the color scheme. The blockquote border no longer follows `themeColor`.
- Inline code and links in post bodies now use cool colors so they stand apart from the warm decoration: inline code is slate blue on a cool gray chip, links are blue with a soft underline, with matching lighter shades in dark mode. Neither follows `themeColor` any more, and search keyword highlights share the inline code color.
- The About profile card no longer repeats the avatar the site header already shows, and its content is centred on the header's axis. The blog stats moved from their own box into the bottom row of the card. `about.profile.avatar` is no longer read. The card title is just the name, with no greeting or motto. The header itself is unchanged, so the navbar sits at the same height on every page.
- Aligned the `mac-black` code colors with VS Code's One Dark Pro for both Highlight.js and Prism output: operators and regexes are cyan, class names and built-ins such as `console` are yellow, C base types and preprocessor lines are purple, and comments are `#7f848e` italic instead of `#5c6370`, which reached only about 2.5:1 on the `#282c34` window. Tokens that had no color before (attributes, booleans, diff lines, template interpolation) are covered too.
- Left-aligned the home post list so the rows share one left edge instead of shrinking to their content and centring. The shrunken block was centred on the longest title, so the whole list jumped sideways between pages. The rows now fill the column's text box, matching upstream's `padding: 0 40px` relationship. The home pagination is right-aligned and keeps upstream's 90px inset from the column edge, so it sits 50px inside the list's right edge. The category detail page keeps its shrink-centred list.
- Rebuilt the friends page as a page header plus a responsive avatar card grid that matches the tag and category index pages, and moved the markup into `_partial/friend-index.ejs` with its styles in `friends.css`.
- Added a compact friends list for long lists: entries drop the card padding (18px to 8px), the avatar shrinks to 32px, and the description clamps to one ellipsised line, taking an entry from about 110px to about 60px. The first attempt also narrowed the compact list to two columns, which gained only about 15% because dropping a column gave back most of the height it saved; both layouts now share the same three/two/one column breakpoints.
- Friend cards now link the nickname and show the bare host as a subtitle instead of printing the full URL, skip the description line when `meta` is empty, and carry `rel="noopener"` on their external links.
- Rebuilt the category index page as a page header plus a three-column grid matching the tag index, replacing a bare full-width list that had no header at all.
- Extracted the collapsed and expanded top navigation heights into `--topnav-height` and `--topnav-collapsed`, so the post body padding no longer repeats the literal `56px`.
- Split the post header meta into two lines (word count and dates, then tags and categories), shortened displayed dates to `YYYY-MM-DD`, and kept only the dates in the footer meta.
- Changed the light theme background to plain white (`#ffffff`); an earlier warm paper tone (`#fefcf8`) read as a faint yellow cast.
- Renamed the `popular_tags` translation key to the semantically accurate `frequent_tags`.
- Sorted the tag index by post count and hid low-frequency tags by default.
- Made activity graph colors adapt to light and dark themes.

### Fixed

- Fixed Highlight.js code blocks showing a blank line after every line: each `<span class="line">` is already a block and Hexo still emits a `<br>` after it. The `<br>` is now hidden and empty lines keep their height.
- On a first visit with no saved color scheme the page is light but the color-scheme button showed the sun; the icon now follows the page's actual `color-mode`.
- Fixed the writing activity legend showing five identical squares: `.about-activity-legend i` outranked the single-class level colors, so every legend square fell back to level 0.
- Fixed a wrapped navbar on narrow screens keeping its second row flush left under the centred avatar; the list is now centred.
- Fixed the MathJax config being written after the async loader: a cached `tex-chtml.js` could run before `MathJax = {...}` was set, and inline `$...$` formulas then stayed unrendered. The config now comes first.
- Fixed sites deployed under a subpath (`root: /blog/`): the stylesheet, jQuery, fancybox, clipboard, comment plugins, MathJax, the search index, the avatar, the favicon, navbar and footer links were written as root-absolute paths and returned 404. They now go through `url_for`, and the navbar's `data-path` does too so the active item still highlights. External URLs pass through unchanged.
- Fixed the waline CDN option, which could never have worked: `_config.yml` supplied a single URL while `comments.ejs` reads `url.css` and `url.js`, so enabling it rendered an empty stylesheet link and an empty `import`. The entry now matches the gitalk shape and points at waline v2's ES module build plus its stylesheet, since the template loads waline with `import`.
- Fixed the gitalk `id` and `distractionFreeMode` options, which `_config.yml` exposed but `comments.ejs` ignored by hardcoding `location.pathname` and `false`; both now read from the config and the shipped defaults render byte-identically.
- Fixed the category detail list, whose `.post-list` wrapper sat inside the post loop: each row centred on its own, so the rows stopped sharing a left edge.
- Fixed the 30px left margin the date carried in the category detail list, which pushed the content off-centre inside its own centred block.
- Removed the extra blank area below highlighted code blocks caused by inherited table margins and trailing line breaks.
- Fixed footer and About runtime calculations for both quoted and unquoted YAML dates.
- Fixed category visibility checks for theme metadata where applicable.

### Removed

- Removed the Google Fonts request for Raleway. Every rule that used the font was already commented out, so the render-blocking request downloaded nothing that was used, and it often stalls in mainland China.
- Removed `source/js/search.js`, an orphaned copy of the local-search implementation: no template referenced it and `_partial/search.ejs` carries the live copy inline.
- Removed `source/css/_common/layout/header.styl`, an empty file that `_common/layout/index.styl` never imported.
- Removed the dead `.tag-list*` and `.post-item .title .post-top` rules from `base.css`; `list_tags()` is no longer called anywhere and the tag index has its own stylesheet.
