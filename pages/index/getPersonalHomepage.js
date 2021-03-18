//个人主页
//在localstorage获取personId值，请求并渲染数据
getPersonalHomepage(window.localStorage.getItem('personId'));

function getPersonalHomepage(personId) {
  myAjax({
    url: 'https://cnodejs.org/api/v1/user/' + personId,
    success: function (res) {
      let data = JSON.parse(res).data;
      showPersonalHomepage(data);
    }
  })
}

function showPersonalHomepage(data) {
  //1.获取主页数据
  let loginname = document.getElementById("loginname");
  loginname.innerHTML = data.loginname;

  let score = document.getElementById("score");
  score.innerHTML = `${data.score} 积分`;

  let github = document.getElementById("github");
  github.innerHTML = `@${data.githubUsername}`;

  let createTime = document.getElementById("create-time");
  createTime.innerHTML = `注册时间 ${getDate(data.create_at)}`;

  //2.渲染最近创建的话题（话题个数大于1时渲染）
  let createLength = data.recent_topics.length;
  if (createLength > 0) {
    //渲染头部
    let createTopicHead = `<div class="personal-header">
    <p>最新创建的话题</p>
    </div>`;
    let createHead = document.getElementById("create-topic-head");
    createHead.innerHTML = createTopicHead;

    //渲染话题列表
    let createTopic = '';
    for (let i = 0; i < createLength; i++) {
      createTopic += `<div class="section-list-topic">
        <a href="#" class="photo"><img src="${data.avatar_url}" alt="" /></a>
        <span class="num">
          <span class="num-resp">90</span>/<span class="num-click">9900</span>
        </span>
        <a href="topicContent.html" class="title create">${data.recent_topics[i].title}</a>
        <a class="last right" href="#">
          <img src="${data.avatar_url}" alt="" />
          <span>${getDate(data.recent_topics[i].last_reply_at)}</span>
        </a>
      </div>`
    }
    let create = document.getElementById("create-topic");
    create.innerHTML = createTopic;

    //渲染查看更多
    let more = `<div class="more">
      <a href="">查看更多»</a>
    </div>`;
    let lookMore = document.getElementById("look-more-create");
    lookMore.innerHTML = more;
  }

  //3.渲染最近参与的话题（话题个数大于1时渲染）
  let joinLength = data.recent_replies.length;
  if (joinLength > 0) {
    //渲染头部
    let joinTopicHead = `<div class="personal-header">
      <p>最近参与的话题</p>
    </div>`;
    let joinHead = document.getElementById("join-topic-head");
    joinHead.innerHTML = joinTopicHead;

    //渲染话题列表
    let joinTopic = '';
    for (let i = 0; i < joinLength; i++) {
      joinTopic += `<div class="section-list-topic">
      <a href="#" class="photo"><img src="${data.recent_replies[i].author.avatar_url}" alt="" /></a>
      <span class="num">
        <span class="num-resp">90</span>/<span class="num-click">9900</span>
      </span>
      <a href="topicContent.html" class="title join">${data.recent_replies[i].title}</a>
      <a class="last right" href="#">
        <img src="${data.recent_replies[i].author.avatar_url}" alt="" />
        <span>${getDate(data.recent_replies[i].last_reply_at)}</span>
      </a>
    </div>`
    }
    let join = document.getElementById("join-topic");
    join.innerHTML = joinTopic;

    //渲染查看更多
    let more = `<div class="more">
      <a href="">查看更多»</a>
    </div>`;
    let lookMore = document.getElementById("look-more-join");
    lookMore.innerHTML = more;
  }

  //4.渲染个人信息
  let rank = document.getElementById("user-rank");
  rank.innerHTML = `积分: ${data.score}`;
  let name = document.getElementById("user-name");
  name.innerHTML = `${data.loginname}`
  let portrait = document.getElementsByClassName("head-portrait");
  portrait[0].src = data.avatar_url
  portrait[1].src = data.avatar_url

  //点击话题，向localstorage保存话题Id和用户loginname
  let create = document.getElementsByClassName("create");
  for (let i = 0, len = create.length; i < len; i++) {
    create[i].onclick = function () {
      window.localStorage.setItem('topicId', data.recent_topics[i].id);
      window.localStorage.setItem('personId', data.loginname);
    }
  }
  let join = document.getElementsByClassName("join");
  for (let i = 0, len = join.length; i < len; i++) {
    join[i].onclick = function () {
      window.localStorage.setItem('topicId', data.recent_replies[i].id);
      window.localStorage.setItem('personId', data.loginname);
    }
  }
}