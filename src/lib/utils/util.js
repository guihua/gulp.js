/**
 * 补零格式化
 *
 * @param {number|string} n 字符
 * @returns
 */
function fixedZero(n) {
  n = n.toString(); // eslint-disable-line

  return n[1] ? n : `0${n}`;
}

/**
 * 日期格式化
 * 不传递参数时，获取当前日期
 *
 * @param {string} t 日期
 * @returns yyyy-mm-dd hh:mm:ss
 */
function formatTime(t, s1 = '-', s2 = ':') {
  const date = t ? new Date(t) : new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(fixedZero).join(s1)} ${[hour, minute, second].map(fixedZero).join(s2)}`
}

/**
 * 用 * 号混淆字符串
 *
 * @param {string} str 混淆对象
 * @returns string
 */
function mixNumWithStar(str) {
  let val = '';

  if (str) {
    /* eslint-disable no-param-reassign */
    str = str.toString();

    val = `${str.substring(0, 4)}**********${str.substring(str.length - 4)}`
  }

  return val;
}

module.exports = {
  formatTime,
  mixNumWithStar,
};
