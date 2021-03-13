//用户信息
//在localstorage获取personId值，请求并渲染数据
getUserInformation(window.localStorage.getItem('personId'));

function getUserInformation(personId) {
  myAjax({
    url: 'https://cnodejs.org/api/v1/user/' + personId,
    success: function (res) {
      var data = JSON.parse(res).data;
      showUserInformation(data);
    }
  })
}

function showUserInformation(data) {
  //1.获取个人信息数据
  var rank = document.getElementById("user-rank");
  rank.innerHTML = `积分: ${data.score}`;
  var name = document.getElementById("user-name");
  name.innerHTML = `${data.loginname}`

  //2.渲染作者其他话题板块
  var len = data.recent_topics.length;
  if (len > 0) {

    //渲染头部
    var otherHead = `<div class="aside-title">
        <p>作者其他话题</p>
      </div>`;
    var head = document.getElementById("other-topic-head");
    head.innerHTML = otherHead;

    // 渲染列表
    var otherTopic = '';
    for (var i = 0; i < len; i++) {
      otherTopic += `<a href="topicContent.html" class="other">${data.recent_topics[i].title}</a>`;
    }
    var topic = document.getElementById("other-topic-list");
    topic.innerHTML = otherTopic;

    //点击话题，向localstorage存话题Id和用户loginnam
    var other = document.getElementsByClassName("other");
    for (let i = 0, len = other.length; i < len; i++) {
      other[i].onclick = function () {
        window.localStorage.setItem('topicId', data.recent_topics[i].id);
        window.localStorage.setItem('personId', data.loginname);
      }
    }

  }
}