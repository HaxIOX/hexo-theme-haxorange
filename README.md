English | [简体中文](README-zh.md)

# HaxOrange

> A simple Hexo theme, independently maintained by HaxIOX.

This project is based on [zchengsite/hexo-theme-oranges](https://github.com/zchengsite/hexo-theme-oranges) and is now maintained independently. It is not affiliated with or endorsed by the original project.

## Installation

```bash
git submodule add https://github.com/HaxIOX/hexo-theme-haxorange.git themes/haxorange
```

To update the theme in the future, just execute the `git pull` command in the theme root directory.

## Usage

In order to update the theme more conveniently, it is recommended to install it by adding a Git submodule.Edit the `theme` field in the `_config.yml` file under the project root:

```yml
theme: haxorange
```

Copy the `_config.yml` file in the theme folder to the blog root directory and rename it to `_config.haxorange.yml`. Subsequent theme configuration is performed in `_config.haxorange.yml`.

## configuration

<details>
  <summary><b>tags page</b> (click to show)</summary>

  To add `tags page`:

  ```bash
  hexo new page tags
  ```

  Generate `tags` folder, edit the `index.md` file, make sure that `type` field is `tags`:

  ```markdown
  ---
  title: tags
  date: 2019-05-03 12:03:35
  type: "tags"
  ---
  ```

  Enable `tags` in the `_config.haxorange.yml` file:

  ```yml
  navbar:
    -
      name: tags
      enable: true
      path: /tags/
  ```

</details>

<details>
  <summary><b>categories page</b> (click to show)</summary>

  To add `categories page`:

  ```bash
  hexo new page categories
  ```

  Generate `categories` folder, edit the `index.md` file, make sure that `type` field is `categories`:

  ```markdown
  ---
  title: categories
  date: 2019-05-03 12:03:35
  type: "categories"
  ---
  ```

  Enable `categories` in the `_config.haxorange.yml` file:

  ```yml
  navbar:
    -
      name: categories
      enable: true
      path: /categories/
  ```

</details>

<details>
  <summary><b>friends page</b> (click to show)</summary>

  To add `friends page`:

  ```bash
  hexo new page friends
  ```

  Generate `friends` folder, edit the `index.md` file, make sure that `type` field is `friends`:

  ```markdown
  ---
  title: friends
  date: 2019-05-03 12:03:35
  type: "friends"
  ---
  ```

  Enable `friends` in the `_config.haxorange.yml` file:

  ```yml
  navbar:
    -
      name: friends
      enable: true
      path: /friends/
  ```

</details>

<details>
  <summary><b>about page</b> (click to show)</summary>

  To add `about page`:

  ```bash
  hexo new page about
  ```

  Generate `about` folder, edit the `index.md` file, make sure that `type` field is `about`:

  ```markdown
  ---
  title: about
  date: 2019-05-03 12:03:35
  type: "about"
  ---
  ```

  Enable `about` in the `_config.haxorange.yml` file:

  ```yml
  navbar:
    -
      name: about
      enable: true
      path: /about/
  ```

</details>

<details>
  <summary><b>catalog(contents)</b> (click to show)</summary>

  Enable `catalog` in the `_config.haxorange.yml` file:

  ```yml
  catalog:
    enable: true
  ```

</details>

<details>
  <summary><b>RSS</b> (click to show)</summary>

  Install the `hexo-generator-feed` [plugin](https://github.com/hexojs/hexo-generator-feed):

  ```bash
  npm install hexo-generator-feed --save
  ```

  add or edit configuration in your root `_config.yml`:

  ```yml
  feed:
    type: atom
    path: atom.xml
    limit: 20
    hub:
    content:
    content_limit: 140
    content_limit_delim: ' '
    order_by: -date
    icon: icon.png
    autodiscovery: true
    template:
  ```

  Display the RSS button on the page(currently only display in footer is supported):

  ```yml
  footer:
    social:
      -
        name: rss
        icon: rss
        path: /atom.xml
  ```

</details>

<details>
  <summary><b>Comments</b> (click to show)</summary>

  supported:

- [valine](https://valine.js.org/quickstart.html)
- [gitalk](https://github.com/gitalk/gitalk#usage)
- [disqus](https://disqus.com)

  First, Enable `Comments` in the `_config.haxorange.yml` file:

  ```yml
  comments:
    enable: true
  ```

  Then, select a comment system to use, take [valine](https://valine.js.org/quickstart.html) for example:

  View the official tutorial to get the `appId` & `appKey`:

  ```yml
  valine:
    enable: true
    appId: j73OlR7xxxxxPDrO-gzGzoHsz
    appKey: mhyUfuxxxxk41wc25
    placeholder: welcome!
    avatar: retro
  ```

</details>

<details>
  <summary><b>Google Analytics</b> (click to show)</summary>

  First, view [Google Analytics](https://analytics.google.com) to get the `gtagkey`:

  Then, enable `gtag` in the `_config.haxorange.yml` file:

  ```yml
  gtag:
    enable: true
    gtagkey: UA-xxxxxxx-x
  ```

</details>

<details>
  <summary><b>PREV & NEXT</b> (click to show)</summary>

  enable `prevnext` in the `_config.haxorange.yml` file:

  ```yml
  prevnext:
    enable: true
  ```

</details>

<details>
  <summary><b>lazy image loading</b> (click to show)</summary>

  Install the [hexo-lazyload-image](https://github.com/Troy-Yang/hexo-lazyload-image) plugin:

  ```bash
  npm install hexo-lazyload-image --save
  ```

  add or edit configuration in your root `_config.yml`:

  ```yml
  lazyload:
    enable: true
    onlypost: false # optional
    loadingImg: # optional eg ./images/loading.gif
    isSPA: false # optional
  ```

  more [hexo-lazyload-image](https://github.com/Troy-Yang/hexo-lazyload-image)

</details>

<details>
  <summary><b>search</b> (click to show)</summary>

  Install [hexo-generator-search](https://github.com/wzpan/hexo-generator-search) plugin:

  ```bash
  npm install hexo-generator-search --save
  ```

  add or edit configuration in your root `_config.yml`:

  ```yml
  search:
    path: search.xml
    field: post
    content: true
  ```

  more [hexo-generator-search](https://github.com/wzpan/hexo-generator-search)

  edit configuration in the `_config.haxorange.yml`

  ```yml
    search:
      enable: true
      placeholder: 搜索...
  ```

</details>

<details>
  <summary><b>pinned posts</b> (click to show)</summary>

  Remove default `hexo-generator-index` and Install the [hexo-generator-index-pin-top](https://github.com/netcan/hexo-generator-index-pin-top) plugin:

  ```bash
  npm uninstall hexo-generator-index --save
  npm install hexo-generator-index-pin-top --save
  ```

  add or edit configuration in your root `_config.yml`:

  ```yml
  index_generator:
    path: ''
    per_page: 10
    order_by: -date
  ```

  more [hexo-generator-index-pin-top](https://github.com/netcan/hexo-generator-index-pin-top)

  Add `top: true` to the top of the post you want

  ```markdown
    ---
    title: Hello World
    date: 2020-03-11 14:19:04
    top: true
    tags:
    - Welcome
    categories:
    - [Welcome, 欢迎]
    ---
  ```

</details>

<details>
  <summary><b>internationalization (i18n)</b> (click to show)</summary>

  You can use internationalization to present your site in different languages, add or edit configuration in your root `_config.yml`:

  Some examples:

  English:

  ```yml
  language: en
  ```

  Simplified Chinese:

  ```yml
  language: zh-CN
  ```

  Japanese:

  ```yml
  language: ja
  ```

  The default value is `en`，Optional in the 'languages' file under the theme。

</details>

<details>
  <summary><b>dark mode</b> (click to show)</summary>

  Pull up the latest repository, add or edit configuration in `_config.haxorange.yml`:

  ```yml
  colorSwitch:
    enable: true
  ```

The toggle option appears in the bottom right corner of the page.

</details>

<details>
  <summary><b>share</b> (click to show)</summary>

  Pull up the latest repository, add or edit configuration in `_config.haxorange.yml`:

  ```yml
  postShare:
    enable: true

    twitter:
      enable: true
  ```

The toggle option appears in the bottom right corner of the post page.

</details>

<details>
  <summary><b>Mac-style code blocks</b> (click to show)</summary>

  Configure the code block window style, language label, and copy button in `_config.haxorange.yml`:

  ```yml
  codeBlock:
    style: mac-black
    language: true
    copy:
      enable: true
  ```

</details>

<details>
  <summary><b>post encryption</b> (click to show)</summary>

  install the [hexo-blog-encrypt](https://github.com/D0n9X1n/hexo-blog-encrypt) plugin:

  ```bash
  npm install --save hexo-blog-encrypt
  ```

  add or edit Front-matter in your post:

  ```yml
    ---
    title: Hello World!
    date: 2020-09-27 10:42:38
    tags:
      - World
      - Hello
    password: hello
    ---
  ```

  more [hexo-blog-encrypt](https://github.com/D0n9X1n/hexo-blog-encrypt/blob/master/ReadMe.zh.md)

</details>

## To Do List

- [x] Custom navigation✔
- [x] post directories✔
  - [x] the directory follows the article scroll`[2020.5.24]`✔
- [x] Fancybox✔
- [x] back to top`[2020.5.4]`✔
- [x] RSS Feed`[2020.5.7]`✔
- [x] NEXT & PREV`[2020.5.10]`✔
- [x] H1 - h6 anchor`[2020.5.3]`✔
- [x] comments`[2020.5.7]`✔
- [x] share`[2021.8.22]`✔
- [x] word count `[2026.8.17]`✔
- [ ] traffic statistics
- [x] Google Analytics`[2020.5.8]`✔
- [x] post encryption`[2022.3.23]`✔
- [x] pinned posts`[2020.9.1]`✔
- [x] search`[2020.8.23]`✔
- [x] dark mode `[2021.7.10]`✔
- [x] smooth scrolling`[2020.5.4]`✔
- [ ] theme styles are customizable
- [x] Internationalization (i18n), multilanguage support`[2020.9.10]`✔
- [x] code copy `[2022.5.10]`✔

## End

If you have any questions, please submit the Issue. Fork is welcome.

🍻

## License

MIT
