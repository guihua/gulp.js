(function() {
  const uploadedDataURL = "http://192.168.1.54/zhejiang.json";

  const myChart = echarts.init(document.getElementById('main'));

  const areaData = [{
    name: '杭州市',
    value: 1350
  }, {
    name: '湖州市',
    value: 1190
  }, {
    name: '嘉兴市',
    value: 167
  }, {
    name: '绍兴市',
    value: 555
  }, {
    name: '宁波市',
    value: 743
  }, {
    name: '舟山市',
    value: 293
  }, {
    name: '台州市',
    value: 724
  }, {
    name: '金华市',
    value: 405
  }, {
    name: '衢州市',
    value: 451
  }, {
    name: '丽水市',
    value: 608
  }, {
    name: '温州市',
    value: 475
  }];

  const seriesData = [{
    name: '人口',
    type: 'map',
    map: '浙江',
    itemStyle: {
      normal: {
        label: {
          show: true,
        }
      },
      emphasis: {
        label: {
          show: true,
        }
      }
    },
    data: areaData
  }];

  function getOptions(max, min, vmp, unit) {
    const optn = {
      title: {
        text: '2016浙江省各市' + vmp,
        left: 'center',
        textStyle: {
          color: '#000'
        }
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['人口'],
      },
      visualMap: {
        min: min,
        max: max,
        text: [vmp, '单位：' + unit],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered']
        }
      },
      tooltip: {
        formatter: function (params) {
          return params.name + ": " + params.value + unit;
        }
      },
      series: seriesData
    };

    return optn;
  }

  const options = getOptions(1350, 167, '人口', '万');

  $.get(uploadedDataURL, function (gdMap) {
    echarts.registerMap('浙江', gdMap);

    myChart.setOption(options, true);
  });
})();
