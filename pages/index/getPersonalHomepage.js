//个人主页
//在localstorage获取personId值，请求并渲染数据
getPersonalHomepage(window.localStorage.getItem('personId'));

function getPersonalHomepage(personId) {
  myAjax({
    url: 'https://cnodejs.org/api/v1/user/' + personId,
    success: function (res) {
      var data = JSON.parse(res).data;
      showPersonalHomepage(data);
    }
  })
}

function showPersonalHomepage(data) {
  //1.获取主页数据
  var loginname = document.getElementById("loginname");
  loginname.innerHTML = data.loginname;

  var score = document.getElementById("score");
  score.innerHTML = `${data.score} 积分`;

  var github = document.getElementById("github");
  github.innerHTML = `@${data.githubUsername}`;

  var createTime = document.getElementById("create-time");
  createTime.innerHTML = `注册时间 ${getDate(data.create_at)}`;


  //2.渲染最近创建的话题（话题个数大于1时渲染）
  var createLength = data.recent_topics.length;
  if (createLength > 0) {
    //渲染头部
    var createTopicHead = `<div class="personal-header">
    <p>最新创建的话题</p>
    </div>`;
    var createHead = document.getElementById("create-topic-head");
    createHead.innerHTML = createTopicHead;

    //渲染话题列表
    var createTopic = '';
    for (var i = 0; i < createLength; i++) {
      createTopic += `<div class="section-list-topic">
        <a href="#" class="photo"><img src="./img/5453359.png" alt="" /></a>
        <span class="num">
          <span class="num-resp">90</span>/<span class="num-click">9900</span>
        </span>
        <a href="topicContent.html" class="title create">${data.recent_topics[i].title}</a>
        <a class="last right" href="#">
          <img src="./img/19264508.jpeg" alt="" />
          <span>${getDate(data.recent_topics[i].last_reply_at)}</span>
        </a>
      </div>`
    }
    var create = document.getElementById("create-topic");
    create.innerHTML = createTopic;

    //渲染查看更多
    var more = `<div class="more">
      <a href="">查看更多»</a>
    </div>`;
    var lookMore = document.getElementById("look-more-create");
    lookMore.innerHTML = more;
  }


  //3.渲染最近参与的话题（话题个数大于1时渲染）
  var joinLength = data.recent_replies.length;
  if (joinLength > 0) {
    //渲染头部
    var joinTopicHead = `<div class="personal-header">
      <p>最近参与的话题</p>
    </div>`;
    var joinHead = document.getElementById("join-topic-head");
    joinHead.innerHTML = joinTopicHead;

    //渲染话题列表
    var joinTopic = '';
    for (var i = 0; i < joinLength; i++) {
      joinTopic += `<div class="section-list-topic">
      <a href="#" class="photo"><img src="./img/5453359.png" alt="" /></a>
      <span class="num">
        <span class="num-resp">90</span>/<span class="num-click">9900</span>
      </span>
      <a href="topicContent.html" class="title join">${data.recent_replies[i].title}</a>
      <a class="last right" href="#">
        <img src="./img/19264508.jpeg" alt="" />
        <span>${getDate(data.recent_replies[i].last_reply_at)}</span>
      </a>
    </div>`
    }
    var join = document.getElementById("join-topic");
    join.innerHTML = joinTopic;

    //渲染查看更多
    var more = `<div class="more">
      <a href="">查看更多»</a>
    </div>`;
    var lookMore = document.getElementById("look-more-join");
    lookMore.innerHTML = more;
  }

  //4.渲染个人信息
  var rank = document.getElementById("user-rank");
  rank.innerHTML = `积分: ${data.score}`;
  var name = document.getElementById("user-name");
  name.innerHTML = `${data.loginname}`

  //点击话题，向localstorage保存话题Id和用户loginname
  var create = document.getElementsByClassName("create");
  for (let i = 0, len = create.length; i < len; i++) {
    create[i].onclick = function () {
      window.localStorage.setItem('topicId', data.recent_topics[i].id);
      window.localStorage.setItem('personId', data.loginname);
    }
  }
  var join = document.getElementsByClassName("join");
  for (let i = 0, len = join.length; i < len; i++) {
    join[i].onclick = function () {
      window.localStorage.setItem('topicId', data.recent_replies[i].id);
      window.localStorage.setItem('personId', data.loginname);
    }
  }
}