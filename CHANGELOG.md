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

### Changed

- Rebuilt the friends page as a page header plus a responsive avatar card grid that matches the tag and category index pages, and moved the markup into `_partial/friend-index.ejs` with its styles in `friends.css`.
- Added a compact friends list for long lists: entries drop the card padding (18px to 8px), the avatar shrinks to 32px, and the description clamps to one ellipsised line, taking an entry from about 110px to about 60px. The first attempt also narrowed the compact list to two columns, which gained only about 15% because dropping a column gave back most of the height it saved; both layouts now share the same three/two/one column breakpoints.
- Friend cards now link the nickname and show the bare host as a subtitle instead of printing the full URL, skip the description line when `meta` is empty, and carry `rel="noopener"` on their external links.
- Rebuilt the category index page as a page header plus a three-column grid matching the tag index, replacing a bare full-width list that had no header at all.
- Extracted the collapsed and expanded top navigation heights into `--topnav-height` and `--topnav-collapsed`, so the post body padding no longer repeats the literal `56px`.
- Split the post header meta into two lines (word count and dates, then tags and categories), shortened displayed dates to `YYYY-MM-DD`, and kept only the dates in the footer meta.
- Changed the light theme background to a subtle warm paper tone (`#fefcf8`).
- Renamed the `popular_tags` translation key to the semantically accurate `frequent_tags`.
- Sorted the tag index by post count and hid low-frequency tags by default.
- Made activity graph colors adapt to light and dark themes.

### Fixed

- Fixed the waline CDN option, which could never have worked: `_config.yml` supplied a single URL while `comments.ejs` reads `url.css` and `url.js`, so enabling it rendered an empty stylesheet link and an empty `import`. The entry now matches the gitalk shape and points at waline v2's ES module build plus its stylesheet, since the template loads waline with `import`.
- Fixed the gitalk `id` and `distractionFreeMode` options, which `_config.yml` exposed but `comments.ejs` ignored by hardcoding `location.pathname` and `false`; both now read from the config and the shipped defaults render byte-identically.
- Fixed the category detail list, whose `.post-list` wrapper sat inside the post loop: each row centred on its own, so the rows stopped sharing a left edge.
- Fixed the 30px left margin the date carried in the category detail list, which pushed the content off-centre inside its own centred block.
- Removed the extra blank area below highlighted code blocks caused by inherited table margins and trailing line breaks.
- Fixed footer and About runtime calculations for both quoted and unquoted YAML dates.
- Fixed category visibility checks for theme metadata where applicable.

### Removed

- Removed `source/js/search.js`, an orphaned copy of the local-search implementation: no template referenced it and `_partial/search.ejs` carries the live copy inline.
- Removed `source/css/_common/layout/header.styl`, an empty file that `_common/layout/index.styl` never imported.
- Removed the dead `.tag-list*` and `.post-item .title .post-top` rules from `base.css`; `list_tags()` is no longer called anywhere and the tag index has its own stylesheet.
