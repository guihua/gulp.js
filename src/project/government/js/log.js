import utils from '../../../lib/utils/util';

/* eslint-disable no-undef */
const pageWrapper = $('.page');
const logTemplate = $('#log-template');
let pageIndex = 0;
const pageSize = 10;
let isLoadAll = false;

showLoading();
queryUseLog(pageIndex);

function showLoading() {
  dd.device.notification.showPreloader({
    text: "加载中...",
    showIcon: true,
  });
}

$(window).scroll(() => {
  // 判断是否滑动到页面底部
  if($(window).scrollTop() === $(document).height() - $(window).height()){
    loadMore();
  }
});

function loadMore() {
  pageIndex += 1;

  queryUseLog(pageIndex);
}

function queryUseLog(page) {
  if (isLoadAll) {
    showToast('已经没有更多数据');

    return;
  }

  $.ajax({
    type: "post",
    url: "http://api.test.bechangedt.com:9090/api/erhc/useLog",
    data: {
      pageIndex: page,
      pageSize,
    },
    dataType: "json",
    success: (res) => {
      const { records } = res.data.data;

      if (records.length === 0 && page === 0) {
        showToast('暂无数据！');
        hideLoading();

        pageWrapper.empty().append('<div class="empty">暂无数据！</div>')
      } else {
        loadUseLog(records);

        if (records.length < pageSize) {
          isLoadAll = true;
        }
      }
    },
    fail: () => {
      hideLoading();
    },
  });
}

function showToast(msg) {
  dd.device.notification.toast({
    message: msg,
    duration: 2,
  });
}

function hideLoading() {
  dd.device.notification.hidePreloader();
}

function loadUseLog(source) {
  let logHtml = '';

  for (let i = 0; i < source.length; i += 1) {
    const temp = logTemplate;

    logHtml += temp.replace(/{url}/g, source[i].url)
      .replace(/{medorgname}/g, source[i].medorgname)
      .replace(/{depcode}/g, source[i].depcode)
      .replace(/{scardtime}/g, utils.formatTime(source[i].scardtime, '-', ':'));
  }

  hideLoading();

  page.empty().append(logHtml);
}
