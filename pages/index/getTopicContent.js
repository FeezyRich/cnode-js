//话题正文
//在localstorage获取topicId值，请求并渲染数据

getTopicContent(window.localStorage.getItem('topicId'));

function getTopicContent(topicId) {
  myAjax({
    url: 'https://cnodejs.org/api/v1/topic/' + topicId,
    success: function (res) {
      var data = JSON.parse(res).data;
      showTopicContent(data);
    }
  })
}

function showTopicContent(data) {
  //tab转中文
  var tab = data.tab;
  switch (tab) {
    case "ask":
      tab = "问答"
      break;
    case "share":
      tab = "分享"
      break;
    case "job":
      tab = "招聘"
      break;
    default:
      tab = "测试";
  }

  //1.渲染标题
  var title = `<span>${data.title}</span>
    <div>
      <span>· 发布于 ${getDate(data.create_at)} </span>
      <span>· 作者 ${data.author.loginname}</span>
      <span>· ${data.visit_count} 次浏览</span>
      <span>· 来自 ${tab}</span>
    </div>`;
  var topicTitle = document.getElementById("topic-title");
  topicTitle.innerHTML = title;

  //2.渲染正文
  var content = `${data.content}`;
  var topicContent = document.getElementById("topic-content");
  topicContent.innerHTML = content;

  //3.渲染回复板块（回复数大于0时渲染）
  var len = data.replies.length;
  if (len > 0) {

    //渲染头部
    var head = ` <div id="reply-title">
      <p>${len} 回复</p>
    </div>`;
    var replyHead = document.getElementById("reply-head");
    replyHead.innerHTML = head;

    //渲染评论内容
    var reply = '';
    for (var i = 0; i < len; i++) {
      reply += `<div class="reply-content">
          <a href="">
            <img src="./img/5453359.png" alt="">
          </a>
          <div class="rep-info">
            <a href="">${data.replies[i].author.loginname}</a>
            <a href="">${i + 1}楼·${getDate(data.replies[i].create_at)}</a>
            ${data.id == data.replies[i].author.loginname ? "<span> 作者 </span>" : ""}
          </div>
          <div class="rep-text">
            <span>${data.replies[i].content}</span>
          </div>
        </div>`;
    }
    var replyContent = document.getElementById("reply-content-list");
    replyContent.innerHTML = reply;
  }
}
