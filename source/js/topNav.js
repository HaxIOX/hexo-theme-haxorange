// 文章页顶部的收起式导航条（灯绳）：鼠标移入立即展开，移开后延迟再收回。
//
// 展开状态由 CSS 与 JS 并联提供（见 catalog-left.css）：
//   :hover        —— 鼠标在条上，负责「进来立刻展开」，零延迟
//   :focus-within —— 键盘 Tab，负责无障碍
//   .is-open      —— 点击 / 触摸固定展开，再点一次收起
//   .is-hover     —— 本文件维护：鼠标离开后继续保留 LEAVE_DELAY 毫秒
// 前三个 CSS 管不了「延迟收回」，因为 :hover 失效是即时的，所以要有 .is-hover 兜住。
//
// 这里用 mouseover / mouseout（会冒泡）而不是 mouseenter / mouseleave：
// 收起状态下整条 navbar 是 pointer-events: none，只有灯绳、灯泡和 .rail-hit
// 命中区能接收事件。它们的事件会正常冒泡到 navbar，而 mouseenter 是否派发到
// 一个 pointer-events: none 的祖先上并不可靠。
(function () {
  var nav = document.querySelector('.navbar--rail');
  if (!nav) return;

  // 鼠标离开后停留多久才收回。目的不是「让条多挂一会儿」，而是防住一种具体失误：
  // 悬浮展开后，鼠标正从灯绳斜着移向中间的菜单项，中途从条的下边缘划出去一下，
  // 结果还没点到菜单就收回去了。这条本身是整宽 56px 高，水平移动不会掉出去，
  // 只有这种垂直方向的一抖会。500ms 足够把鼠标拉回来，又不会让「真的离开了」
  // 显得拖沓。调大它只会让人觉得条赖着不走。
  var LEAVE_DELAY = 500;
  var closeTimer = null;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
  }

  function setHover(on) {
    nav.classList.toggle('is-hover', on);
  }

  function cancelClose() {
    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  }

  function scheduleClose() {
    cancelClose();
    closeTimer = window.setTimeout(function () {
      closeTimer = null;
      // 只摘 is-hover：它代表「鼠标仍处于停留窗口内」。
      // 若此时是点击固定展开（is-open），展开状态由 is-open 自己兜住，不受影响。
      setHover(false);
    }, LEAVE_DELAY);
  }

  nav.addEventListener('mouseover', function () {
    cancelClose();
    setHover(true);
  });

  nav.addEventListener('mouseout', function (event) {
    // 在条内部从灯绳移到灯泡这种，relatedTarget 仍在条内，不算离开
    var to = event.relatedTarget;
    if (to && nav.contains(to)) return;
    scheduleClose();
  });

  // 点击条内空白或灯绳/灯泡：切换固定展开。点到菜单项时照常跳转。
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) return;
    cancelClose();
    var next = !nav.classList.contains('is-open');
    setOpen(next);
    if (!next) setHover(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    cancelClose();
    setOpen(false);
    setHover(false);
  });

  document.addEventListener('click', function (event) {
    if (nav.contains(event.target)) return;
    cancelClose();
    setOpen(false);
    setHover(false);
  });
}());
