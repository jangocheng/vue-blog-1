export function getFormatDate (time) {
  let date = new Date(time)
  let yyyy = date.getFullYear()
  let moth = date.getMonth() + 1
  let MM = moth >= 10 ? moth : '0' + moth
  let dd = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
  let HH = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  let mm = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
  let ss = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
  return `${yyyy}-${MM}-${dd}  ${HH}:${mm}:${ss}`
}

export function getFormatDateSimple (time) {
  let date = new Date(time)
  let yyyy = date.getFullYear()
  let moth = date.getMonth() + 1
  let MM = moth >= 10 ? moth : '0' + moth
  let dd = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
  return `${yyyy}-${MM}-${dd}`
}
