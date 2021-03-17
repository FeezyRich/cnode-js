// 获取没人回复的话题
myAjax({
  url: 'https://cnodejs.org/api/v1/topics',
  success: function (res) {
    var data = JSON.parse(res).data;
    //循环渲染话题列表
    var list = ``;
    var topic = [];
    var user = []
    for (var i = 0, len = data.length; i < len; i++) {
      if (data[i].reply_count == 0) {
        list += `<a class="no-reply" href="./pages/index/topicContent.html">${data[i].title}</a>`; //TODO 跳转路径
        topic.push(data[i].id);
        user.push(data[i].author.loginname)
      }
    }
    var norespList = document.getElementById("aside-noresp-list");
    norespList.innerHTML = list;

    //点击话题，向localStorage存储话题ID，跳转页面，渲染相应内容
    var noReply = document.getElementsByClassName("no-reply");
    for (let i = 0, len = noReply.length; i < len; i++) {
      noReply[i].onclick = function () {
        window.localStorage.setItem('topicId', topic[i])
        window.localStorage.setItem('personId', user[i])
      }
    }
  }
})