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

### Changed

- Rebuilt the category index page as a page header plus a three-column grid matching the tag index, replacing a bare full-width list that had no header at all.
- Extracted the collapsed and expanded top navigation heights into `--topnav-height` and `--topnav-collapsed`, so the post body padding no longer repeats the literal `56px`.
- Split the post header meta into two lines (word count and dates, then tags and categories), shortened displayed dates to `YYYY-MM-DD`, and kept only the dates in the footer meta.
- Changed the light theme background to a subtle warm paper tone (`#fefcf8`).
- Renamed the `popular_tags` translation key to the semantically accurate `frequent_tags`.
- Sorted the tag index by post count and hid low-frequency tags by default.
- Made activity graph colors adapt to light and dark themes.

### Fixed

- Fixed the category detail list, whose `.post-list` wrapper sat inside the post loop: each row centred on its own, so the rows stopped sharing a left edge.
- Fixed the 30px left margin the date carried in the category detail list, which pushed the content off-centre inside its own centred block.
- Removed the extra blank area below highlighted code blocks caused by inherited table margins and trailing line breaks.
- Fixed footer and About runtime calculations for both quoted and unquoted YAML dates.
- Fixed category visibility checks for theme metadata where applicable.
