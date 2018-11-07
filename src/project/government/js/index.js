/* eslint-disable */
(function ($) {
  var menu = $('.menu');
  var header = $('.header');

  menu.on('click', 'li', function () {
    var li = $(this),
      id = li.data().id;

    var url = '/' + id + '.html';
    window.open(url);
  });

  header.on('click', function () {
    window.open('/apply.html');
  });

  var queryCard = function() {
    $.ajax({
      type: "post",
      url: "http://api.test.bechangedt.com:9090/api/erhcmember/erhcCardInfo",
      data: {
        // name,
        // idCardType: '01',
        // idCardValue: cardNo,
        // tel,
        // applyMode: '1', // 申请方式 固定1，APP在线申请
        // qcCodeType: '0', // 二维码类型 1:动态二维码， 0：静态二维码
      },
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.data.code === 1) {
          //
        } else if (code === 2) {
          // 无卡，跳转申领页
          location.href = './apply.html';
        } else {
          dd.device.notification.toast({
            message: res.data.msg,
            duration: 2,
          });
        }
      }
    });
  }

  queryCard();
})(jQuery);
