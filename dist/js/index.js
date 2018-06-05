'use strict';

var tableColumn = [{
  title: '时间',
  name: 'time'
}, {
  title: '数量',
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
  'time': '18:15',
  'count': '123'
}, {
  'time': '18:15',
  'count': '123'
}, {
  'time': '18:15',
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
function drawLineChart(id, data) {
  var myChart = echarts.init(document.getElementById(id));
  // 指定图表的配置项和数据
  var option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value',
      name: '数量'
    },
    series: [{
      data: [],
      type: 'line',
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
  return myChart;
}
function createTable(id, columnName, data) {
  var headerTemplate = '\n    <thead>\n      <tr>\n        ' + createHeader(columnName) + '\n      </tr>\n    </thead>\n  ';
  var tbody = '\n    <tbody>\n      ' + createTBody(columnName, data) + '\n    </tbody>\n  ';
  document.getElementById(id).innerHTML = headerTemplate + tbody;
}
function createHeader(titles) {
  var template = '';
  titles.forEach(function (item) {
    template += '<th scope="col">' + item.title + '</th>';
  });
  return template;
}
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
createTable('simpleMsg', tableColumn, data);
var lintChart1 = drawLineChart('chart', data);
createTable('simpleMsg1', tableColumn, data);
drawLineChart('chart1', data);
setInterval(function () {
  var temp = data.shift();
  temp.count = +temp.count + 10;
  data.push(temp);
  createTable('simpleMsg', tableColumn, data);
  lintChart1.setOption({
    series: [{
      data: data
    }]
  });
}, 1000);