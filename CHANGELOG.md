# Changelog

## Unreleased

### Added

- Added a configurable GitHub-inspired About page with profile metadata, blog statistics, grouped skills, a build-time writing activity graph, and recent posts.
- Added configurable long-code folding with full-content copying and soft wrapping for long lines.
- Added Prism code-block compatibility, including `language-none`, copying, folding, and long-line wrapping.
- Added configurable footer post count and site runtime.
- Added a configurable minimum usage count for the tag index.

### Changed

- Changed the light theme background to a subtle warm paper tone (`#fefcf8`).
- Renamed the `popular_tags` translation key to the semantically accurate `frequent_tags`.
- Sorted the tag index by post count and hid low-frequency tags by default.
- Made activity graph colors adapt to light and dark themes.

### Fixed

- Removed the extra blank area below highlighted code blocks caused by inherited table margins and trailing line breaks.
- Fixed footer and About runtime calculations for both quoted and unquoted YAML dates.
- Fixed category visibility checks for theme metadata where applicable.
