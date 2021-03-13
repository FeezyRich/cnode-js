//功能：回到顶部
window.onscroll = function () {
  // 监听滚动，显示“回到顶部”按钮
  var top = document.documentElement.scrollTop || document.body.scrollTop;
  var toTop = document.getElementById("to-top");
  toTop.className = top > 200 ? "totop-block" : "totop-none";

  // 点击按钮，回到顶部
  toTop.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
}