'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const themeRoot = path.resolve(__dirname, '..');
const fixtureRoot = path.join(__dirname, 'fixture');
const rootModules = path.join(themeRoot, 'node_modules');
const pluginNames = [
  'hexo-generator-archive',
  'hexo-generator-category',
  'hexo-generator-index',
  'hexo-generator-tag',
  'hexo-renderer-ejs',
  'hexo-renderer-marked',
  'hexo-renderer-stylus'
];

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day} 12:00:00`;
}

function offsetDate(days) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - days);
  return formatDate(date);
}

function copyTheme(destination) {
  const excluded = new Set(['.git', '.github', 'blog-preview', 'node_modules', 'public', 'test']);
  fs.cpSync(themeRoot, destination, {
    recursive: true,
    filter(source) {
      const relative = path.relative(themeRoot, source);
      if (!relative) return true;
      return !excluded.has(relative.split(path.sep)[0]);
    }
  });
}

function prepareSite(mode) {
  const siteRoot = fs.mkdtempSync(path.join(os.tmpdir(), `haxorange-${mode}-`));
  fs.mkdirSync(path.join(siteRoot, 'themes'), { recursive: true });
  fs.cpSync(path.join(fixtureRoot, 'source'), path.join(siteRoot, 'source'), { recursive: true });
  copyTheme(path.join(siteRoot, 'themes', 'haxorange'));
  fs.symlinkSync(rootModules, path.join(siteRoot, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir');

  const dependencies = Object.fromEntries(pluginNames.map(name => [name, '*']));
  fs.writeFileSync(path.join(siteRoot, 'package.json'), JSON.stringify({
    private: true,
    dependencies,
    hexo: { version: '6.3.0' }
  }, null, 2));

  const config = [
    'title: HaxOrange Fixture',
    'author: Fixture',
    'language: en',
    'url: https://example.test',
    'permalink: :title/',
    'theme: haxorange',
    'highlight:',
    `  enable: ${mode === 'highlight'}`,
    '  line_number: true',
    '  wrap: true',
    '  hljs: false',
    'prismjs:',
    `  enable: ${mode === 'prism'}`,
    '  preprocess: true',
    '  line_number: true'
  ].join('\n');
  fs.writeFileSync(path.join(siteRoot, '_config.yml'), `${config}\n`);

  const themeConfig = [
    'avatar:',
    '  author_photo: /images/avatar.png',
    '  author_nickname: Fixture',
    'tagIndex:',
    '  minimumCount: 2',
    'about:',
    '  profile:',
    '    name: Fixture Author',
    '    bio: Fixture biography',
    '    avatar: /images/avatar.png',
    '    location: Test',
    '    links:',
    '      - name: Repository',
    '        url: https://example.test/repository',
    '  skills:',
    '    - name: Languages',
    '      items: [C, JavaScript]',
    '  activity:',
    '    enable: true',
    '    days: 365',
    '  recentPosts:',
    '    enable: true',
    '    limit: 3',
    'comments:',
    '  enable: false',
    'mathjax:',
    '  enable: false',
    'postShare:',
    '  enable: false',
    'footer:',
    '  stats:',
    '    enable: true',
    '    postCount: true',
    '    runtime:',
    '      enable: true',
    `      since: "${formatDate(new Date()).slice(0, 10)}"`
  ].join('\n');
  fs.writeFileSync(path.join(siteRoot, '_config.haxorange.yml'), `${themeConfig}\n`);

  const replacements = {
    '{{TODAY}}': offsetDate(0),
    '{{YESTERDAY}}': offsetDate(1),
    '{{TWO_DAYS_AGO}}': offsetDate(2)
  };
  const postsDir = path.join(siteRoot, 'source', '_posts');
  for (const file of fs.readdirSync(postsDir)) {
    const postPath = path.join(postsDir, file);
    let content = fs.readFileSync(postPath, 'utf8');
    for (const [token, value] of Object.entries(replacements)) content = content.replaceAll(token, value);
    fs.writeFileSync(postPath, content);
  }

  return siteRoot;
}

function assertGeneratedSite(siteRoot, mode) {
  const readPublic = relative => fs.readFileSync(path.join(siteRoot, 'public', relative), 'utf8');
  const about = readPublic(path.join('about', 'index.html'));
  const tags = readPublic(path.join('tags', 'index.html'));
  const post = readPublic(path.join('one', 'index.html'));
  const mainCss = readPublic(path.join('css', 'main.css'));
  const colorScheme = readPublic(path.join('css', 'color-scheme.css'));

  assert.match(about, /about-profile-card/);
  assert.match(about, /Blog statistics/);
  assert.match(about, /Writing Activity/);
  assert.match(about, /Recent Posts/);
  assert.doesNotMatch(about, /about_(?:blog|posts|tags|categories|runtime|writing|recent)/);

  const cells = [...about.matchAll(/class="about-activity-cell ([^"]+)"/g)];
  const visibleCells = cells.filter(match => !match[1].includes('is-outside-range'));
  assert.equal(visibleCells.length, 365, 'the configured 365-day range must contain exactly 365 visible cells');
  assert.doesNotMatch(about, /class="activity-cell/);
  assert.match(mainCss, /\.about-activity-cell/);
  assert.match(colorScheme, /--activity-level-4/);

  assert.equal((tags.match(/class="tag-directory-item"/g) || []).length, 2);
  assert.match(tags, />Shared</);
  assert.match(tags, />Triple</);
  assert.doesNotMatch(tags, />Single</);

  if (mode === 'highlight') assert.match(post, /<figure class="highlight (?:js|javascript)"/);
  if (mode === 'prism') assert.match(post, /class="[^"]*language-javascript/);
}

async function runMode(mode) {
  const siteRoot = prepareSite(mode);
  const tempRoot = path.resolve(os.tmpdir());
  assert.ok(path.resolve(siteRoot).startsWith(`${tempRoot}${path.sep}`));
  const copiedThemeRoot = path.join(siteRoot, 'themes', 'haxorange');
  assert.ok(fs.existsSync(path.join(copiedThemeRoot, 'layout', 'post.ejs')));
  assert.ok(!fs.existsSync(path.join(copiedThemeRoot, 'layout', 'page.ejs')));
  let passed = false;
  try {
    const hexoCli = require.resolve('hexo-cli/bin/hexo');
    execFileSync(process.execPath, [hexoCli, 'generate', '--bail'], {
      cwd: siteRoot,
      stdio: 'inherit'
    });
    const aboutOutput = path.join(siteRoot, 'public', 'about', 'index.html');
    if (!fs.existsSync(aboutOutput)) {
      throw new Error(`About output was not generated for ${mode}.`);
    }
    assertGeneratedSite(siteRoot, mode);
    passed = true;
  } finally {
    if (passed) {
      fs.rmSync(siteRoot, { recursive: true, force: true });
    } else {
      process.stderr.write(`Retained failed fixture: ${siteRoot}\n`);
    }
  }
}

async function main() {
  for (const script of ['activeNav.js', 'codeCopy.js', 'macBlock.js', 'tagFilter.js']) {
    execFileSync(process.execPath, ['--check', path.join(themeRoot, 'source', 'js', script)], { stdio: 'inherit' });
  }
  await runMode('highlight');
  await runMode('prism');
  process.stdout.write('HaxOrange smoke tests passed for Highlight and Prism.\n');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
