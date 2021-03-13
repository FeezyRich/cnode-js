//功能：距离现在时间换算
function getDate(date) {
  var time = Date.parse(new Date());
  var lasttime = Date.parse(date);
  var day = (time - lasttime) / 1000;
  if (day < 60) {
    return day = `${parseInt(day)}秒钟前`;
  }
  if (day < 3600) {
    return day = `${parseInt(day / 60)}分钟前`;
  }
  if (day < 86400) {
    return day = `${parseInt(day / (60 * 60))}小时前`;
  }
  if (day < 86400 * 30) {
    return day = `${parseInt(day / (60 * 60 * 24))}天前`;
  }
  if (day < 86400 * 30 * 12) {
    return day = `${parseInt(day / (60 * 60 * 24 * 30))}个月前`;
  }
  return day = `${parseInt(day / (60 * 60 * 24 * 30 * 12))}年前`;
}