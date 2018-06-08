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
  'time': '19:15',
  'count': '123'
}, {
  'time': '20:15',
  'count': '123'
}, {
  'time': '21:15',
  'count': '123'
}, {
  'time': '21:15',
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
var serviceDetails = [{ "time": "11:43", "performance": [{ "timeConsuming": "2.0", "number": "10", "service": "com.unj.dubbotest.provider.DemoService.getUsers" }, { "costTimeAvg": "2.0", "number": "10", "service": "com.unj.dubbotest.provider.DemoService.sayHello" }] }, { "time": "11:44", "performance": [{ "timeConsuming": "2.0", "number": "13", "service": "com.unj.dubbotest.provider.DemoService.sayHello" }, { "costTimeAvg": "1.0", "number": "10", "service": "com.unj.dubbotest.provider.DemoService.getUsers" }] }, { "time": "11:45", "performance": [{ "timeConsuming": "2.5", "number": "15", "service": "com.unj.dubbotest.provider.DemoService.getUsers" }, { "costTimeAvg": "2.0", "number": "10", "service": "com.unj.dubbotest.provider.DemoService.sayHello" }] }];
var performanceIndex = [{
  title: '服务',
  name: 'service'
}, {
  title: '数量',
  name: 'number'
}, {
  title: '耗时',
  name: 'costTimeAvg'
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
      name: '时间',
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

// 生成ServiceDetail的特定table
function createServiceDetailTable(id, performanceIndex, serviceDetails) {
  var table = document.getElementById(id);
  var str = '\n  <thead>\n    <th scope="col">\u65F6\u95F4</th>\n    ' + createTHeader4Detail(performanceIndex) + '\n\t</thead>\n\t<tbody>\n\t   ' + createTBody4Detail(performanceIndex, serviceDetails) + '\n  </tbody>';
  table.innerHTML = str;
}
function createTBody4Detail(performanceIndex, serviceDetails) {
  var tbody = '';
  serviceDetails.forEach(function (item) {
    tbody += '<tr>';
    tbody += '<td rowspan=' + item.performance.length + '>' + item.time + '</td>';
    item.performance.forEach(function (performance, index) {
      if (index !== 0) {
        tbody += '<tr>';
      }
      performanceIndex.forEach(function (obj) {
        console.log(obj);
        tbody += '\n        <td>' + performance[obj.name] + '</td>\n        ';
      });
      tbody += '</tr>';
    });
  });
  return tbody;
}
function createTHeader4Detail(performanceIndex) {
  var theader = '';
  performanceIndex.forEach(function (item) {
    theader += '<th>' + item.title + '</td>';
  });
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
$('#replay').on('click', function () {
  var time = $('#time').val();
  $('#projectName').html(time);
  console.log(time);
});
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
createServiceDetailTable('serviceDetail', performanceIndex, serviceDetails);
createServiceDetailTable('serviceDetail1', performanceIndex, serviceDetails);