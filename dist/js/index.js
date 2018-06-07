'use strict';

var tableColumn = [{
  title: 'time',
  name: 'time'
}, {
  title: 'count',
  name: 'count'
}];
var data = [{
  'time': '09:11',
  'count': '111'
}, {
  'time': '10:12',
  'count': '222'
}, {
  'time': '11:13',
  'count': '432'
}, {
  'time': '12:14',
  'count': '12'
}, {
  'time': '18:15',
  'count': '123'
}, {
  'time': '19:15',
  'count': '123'
}, {
  'time': '20:15',
  'count': '123'
}, {
  'time': '21:15',
  'count': '123'
}];
var data1 = [{
  'time': '10:12',
  'count': '222'
}, {
  'time': '11:13',
  'count': '432'
}, {
  'time': '12:14',
  'count': '12'
}, {
  'time': '18:15',
  'count': '123'
}, {
  'time': '18:15',
  'count': '123'
}, {
  'time': '18:15',
  'count': '123'
}, {
  'time': '18:15',
  'count': '123'
}, {
  'time': '18:15',
  'count': '323'
}];
var interval = void 0;
// 获取数据
// @param data "name=John&location=Boston"
function getDate(url, data) {
  $.ajax({
    type: "post",
    url: url,
    data: data,
    success: function success(msg) {
      createTable('simpleMsg', tableColumn, data);
      drawLineChart('chart', data);
      createTable('simpleMsg1', tableColumn, data);
      drawLineChart('chart1', data);
    }
  });
}
// 渲染统计图
function drawLineChart(id, data) {
  var ele = document.getElementById(id);
  var myChart = echarts.getInstanceByDom(ele);
  if (!myChart) {
    myChart = echarts.init(ele);
  }
  // 指定图表的配置项和数据
  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'category',
      data: [],
      axisTick: {
        'alignWithLabel': true
      }
    },
    yAxis: {
      type: 'value',
      name: '数量'
    },
    series: [{
      data: [],
      type: 'line',
      smooth: true,
      color: ['#759aa0'],
      name: '数量'
    }]
  };
  data.forEach(function (item) {
    option.xAxis.data.push(item.time);
    option.series[0].data.push(item.count);
  });
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
// 渲染table
function createTable(id, columnName, data) {
  var headerTemplate = '\n    <thead>\n      <tr>\n        ' + createTHeader(columnName) + '\n      </tr>\n    </thead>\n  ';
  var tbody = '\n    <tbody>\n      ' + createTBody(columnName, data) + '\n    </tbody>\n  ';
  document.getElementById(id).innerHTML = headerTemplate + tbody;
}
// 生成theader
function createTHeader(titles) {
  var template = '';
  titles.forEach(function (item) {
    template += '<th scope="col">' + item.title + '</th>';
  });
  return template;
}
// 生成tbody
function createTBody(columnName, data) {
  var tBody = '';
  for (var i = 0; i < data.length; i++) {
    var temp = '<tr>';
    for (var j = 0; j < columnName.length; j++) {
      temp += '<td>' + data[i][columnName[j].name] + '</td>';
    }
    temp += '</tr>';
    tBody += temp;
  }
  return tBody;
}

var times = ['09:00', '10:00', '11:00'];
var serviceDetails = [{
  'servicename': 'service1',
  'methods': 'methods1',
  'performance': [{
    'timeConsuming': '10',
    'number': 100,
    'SuccessRate': '80%'
  }, {
    'timeConsuming': '10',
    'number': 100,
    'SuccessRate': '80%'
  }, {
    'timeConsuming': '10',
    'number': 100,
    'SuccessRate': '80%'
  }]
}, {
  'servicename': 'service1',
  'methods': 'methods1',
  'performance': [{
    'timeConsuming': '10',
    'number': 100,
    'SuccessRate': '80%'
  }, {
    'timeConsuming': '10',
    'number': 100,
    'SuccessRate': '80%'
  }, {
    'timeConsuming': '10',
    'number': 100,
    'SuccessRate': '80%'
  }]
}];
// 生成ServiceDetail的特定table
function createServiceDetailTable(id, times, serviceDetails) {
  var table = document.getElementById(id);
  var str = '\n  <thead>\n    ' + createTHeader4Detail(times) + '\n\t</thead>\n\t<tbody>\n\t   ' + createTBody4Detail(times, serviceDetails) + '\n  </tbody>';
  table.innerHTML = str;
}
function createTBody4Detail(times, serviceDetails) {
  var tbody = '';
  serviceDetails.forEach(function (item) {
    tbody += '<tr>\n    <td>' + item.servicename + '</td>\n    <td>' + item.methods + '</td>\n    ';
    item.performance.forEach(function (performance) {
      tbody += '\n      <td>' + performance.timeConsuming + '</td>\n      <td>' + performance.number + '</td>\n      ';
    });
    tbody += '</tr>';
  });
  return tbody;
}
function createTHeader4Detail(times) {
  var part_1 = '';
  times.forEach(function (item) {
    part_1 += '<th scope="col" colspan="2">' + item + '</th>';
  });
  var part_2 = '\n      <th scope="col">\u8017\u65F6</th>\n\t    <th scope="col">\u6570\u91CF</th>\n      ';
  var theader = '\n    <tr>\n\t    <th scope="col" rowspan="2">\u670D\u52A1\u540D</th>\n\t    <th scope="col" rowspan="2">\u65B9\u6CD5</th>\n\t    ' + part_1 + '\n\t  </tr>\n\t  <tr>\n\t    ' + part_2.repeat(times.length) + '\n\t  </tr>\n  ';
  return theader;
}
document.querySelector('#checkbox').onclick = function () {
  if (!this.checked && interval) {
    clearInterval(interval);
    interval = null;
  } else if (this.checked && !interval) {
    interval = setInterval(function () {
      var temp = data.shift();
      temp.count = +temp.count + 10;
      data.push(temp);
      createTable('simpleMsg', tableColumn, data);
      drawLineChart('chart', data);
    }, 1000);
  }
  console.log(this.checked);
};
// createTable 生成普通table
createTable('simpleMsg', tableColumn, data);
// drawLineChart 生成统计图
drawLineChart('chart', data);
createTable('simpleMsg1', tableColumn, data);
drawLineChart('chart1', data);
interval = setInterval(function () {
  var temp = data.shift();
  temp.count = +temp.count + 10;
  data.push(temp);
  createTable('simpleMsg', tableColumn, data);
  drawLineChart('chart', data);
}, 1000);
// createServiceDetailTable 详情table
createServiceDetailTable('serviceDetail', times, serviceDetails);
createServiceDetailTable('serviceDetail1', times, serviceDetails);