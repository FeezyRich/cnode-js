window.onload = function () {
  isShow()
}

//点击"..."按钮显示或消失div
function isShow() {
  //刷新页面时不显示
  const show = document.getElementById("content-show");
  show.style.display = "none";

  // 点击按钮显示或消失
  const btn = document.getElementById("show-btn");
  var status = "ture";
  btn.onclick = function () {
    show.style.display = status ? "block" : "none";
    status = !status;
  }
}
