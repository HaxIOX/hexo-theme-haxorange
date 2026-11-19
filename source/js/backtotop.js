// back to top js
function isHidden() {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 0) {
    document.querySelector(".back-to-top").className = "back-to-top";
  } else {
    document.querySelector(".back-to-top").className = "back-to-top hidden";
    // 隐藏会打断发射动画、收不到 animationend，这里摘掉，否则下次出现时会自己重播
    document.querySelector(".back-to-top > a").classList.remove("is-launching");
  }
}

const backToTop = () => {
  let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop,
    delay = 10,
    time = 200;
  let step = Math.ceil(scrollTop * delay / time);
  let timer = setInterval(() => {
    scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop - step <= 0) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      clearInterval(timer);
    } else {
      document.documentElement.scrollTop = scrollTop - step;
      document.body.scrollTop = scrollTop - step;
    }
  }, delay);
}

isHidden()
document.addEventListener("scroll", isHidden, false);
document.querySelector(".back-to-top").addEventListener("click", backToTop, false);

// 点击时给箭头加发射动画（样式在 pixel.css），动画结束摘掉，下次点击能重播
const backToTopLink = document.querySelector(".back-to-top > a");
backToTopLink.addEventListener("click", () => {
  backToTopLink.classList.remove("is-launching");
  void backToTopLink.offsetWidth; // 强制回流，连点时动画从头播
  backToTopLink.classList.add("is-launching");
}, false);
backToTopLink.addEventListener("animationend", (e) => {
  if (e.animationName === "pixel-launch") backToTopLink.classList.remove("is-launching");
}, false);
