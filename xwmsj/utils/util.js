//获取当前日期
export function format() {
  var time = new Date()
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  return y + '' + add0(m) + '' + add0(d)
}
function add0(m) { return m < 10 ? '0' + m : m }