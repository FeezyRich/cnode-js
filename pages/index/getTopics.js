// 获取首页话题数据
//打开页面，获取第一页数据
getData(1)

function getData(page, tab) {
  myAjax({
    url: 'https://cnodejs.org/api/v1/topics',
    data: {
      tab: tab || "all",
      page: page,
      limit: 40
    },
    success: function (res) {
      var data = JSON.parse(res).data;
      //处理、渲染数据
      showData(data);
      //动态创建翻页按钮
      turnPage({
        currentPage: page,
        allPage: 18
      })
    }
  })
}

//1.处理数据、渲染话题列表
function showData(data) {
  var topic = ``;

  //遍历data，处理数据
  for (var i = 0, len = data.length; i < len; i++) {
    //tab转中文标签
    var tab = data[i].tab
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

    //判断置顶
    if (data[i].top) {
      tab = "置顶";
    }

    //判断精华
    if (data[i].good) {
      tab = "精华"
    }

    //循环添加话题
    topic += `<div class="section-list-topic">
            <!-- 1.photo-->
            <a class="photo" href="./index/personalHomepage.html" class="photo"><img src="./index/img/5453359.png" alt="" /></a>
            <!-- 2.num -->
            <span class="num">
              <span class="num-resp">${data[i].reply_count}</span>/<span class="num-click">${data[i].visit_count}</span>
            </span>
            <!-- 3 文字图标-->
            <span class=${tab == "精华" || tab == "置顶" ? "icon-highlight" : "icon"}>${tab}</span>
            <!-- 4 标题链接-->
            <a href="./index/topicContent.html" class="title">${data[i].title}</a>
            <!-- 5 后缀时间-->
            <a class="last right" href="#">
              <img src="./index/img/19264508.jpeg" alt="" />
              <span>${getDate(data[i].last_reply_at)}</span>
            </a>
          </div>`;
  }
  //将数据插在页面中
  var list = document.getElementById("section-list");
  list.innerHTML = topic;

  //在localstorage存数据
  var title = document.getElementsByClassName("title");
  var photo = document.getElementsByClassName("photo")
  for (let i = 0, len = title.length; i < len; i++) {
    //点击话题，向localstorage存话题ID和用户loginname
    title[i].onclick = function () {
      window.localStorage.setItem('topicId', data[i].id);
      window.localStorage.setItem('personId', data[i].author.loginname);
    }
    //点击头像，向localstorage存用户loginname
    photo[i].onclick = function () {
      window.localStorage.setItem('personId', data[i].author.loginname);
    }
  }
}


//2.2.动态渲染翻页按钮
function turnPage(opt) {
  opt.currentPage = opt.currentPage || 1;
  opt.allPage = opt.allPage || 1;

  var page = document.getElementById('click-btns');
  page.innerHTML = '';

  //创建首页按钮
  var oLi = document.createElement("li");
  oLi.innerHTML = '«';
  page.appendChild(oLi);

  //添加前面的省略号
  if (opt.currentPage - 2 > 2) {
    var oLi = document.createElement("li");
    oLi.innerHTML = '...';
    page.appendChild(oLi);
  }

  //初始状态：显示5个按钮
  if (opt.currentPage < 3 && opt.allPage > 5) {
    for (var i = 0; i < 5; i++) {
      var oLi = document.createElement("li");
      oLi.innerHTML = i + 1;
      if (opt.currentPage == i + 1) {
        oLi.classList.add('page-current');
      }
      page.appendChild(oLi);
    }
  }

  //创建中间的5页
  if (opt.currentPage > 2) {
    for (var i = opt.currentPage - 2; i <= opt.currentPage + 2; i++) {
      if (i >= 1 && i <= opt.allPage) {
        var oLi = document.createElement("li");
        oLi.innerHTML = i;
        if (opt.currentPage == i) {
          oLi.classList.add('page-current');
        }
        page.appendChild(oLi);
      }
    }
  }

  //创建后面的省略号
  if (opt.currentPage + 2 < opt.allPage) {
    var oLi = document.createElement("li");
    oLi.innerHTML = '...';
    page.appendChild(oLi);
  }

  //创建尾页按钮
  var lastLi = document.createElement("li");
  lastLi.innerHTML = '»';
  page.appendChild(lastLi);

  //通过here类判断当前在哪个板块上
  var nav = document.getElementById("section-nav");
  var block = nav.getElementsByTagName("a");
  var text = ['all', 'good', 'share', 'ask', 'job', 'dev']
  for (var i = 0; i < block.length; i++) {
    if (block[i].className == "here") {
      var tab = text[i];
    }
  }

  //添加板块点击事件，并添加here类
  for (let i = 0; i < block.length; i++) {
    block[i].onclick = function () {
      //获取该板块首页数据
      var tab = text[i];
      getData(1, tab);
      //清除所有here类，给当前点击添加here类
      for (let j = 0; j < block.length; j++) {
        block[j].className = '';
      }
      block[i].className = "here";
    }
  }

  //点击翻页按钮，获取相应板块中页码数据
  var li = page.getElementsByTagName("li")
  for (let i = 0; i < li.length; i++) {
    li[i].onclick = function () {
      if (i == 0) {
        getData(1, tab);
        return;
      }
      if (i == li.length - 1) {
        getData(opt.allPage, tab);
        return;
      }
      if (li[i].innerText == '...') {
        return;
      }
      getData(parseInt(li[i].innerText), tab);
    }
  }
}

