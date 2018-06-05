var tableColumn = [
  {
    title: 'time',
    name: 'time'
  },
  {
    title: 'count',
    name: 'count'
  }
]
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
  }
];
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
  },{
    'time': '18:15',
    'count': '323'
  }
];
// 获取数据
// @param data "name=John&location=Boston"
function getDate (url, data) {
  $.ajax({
    type: "post",
    url: url,
    data: data,
    success: function (msg) {
      createTable('simpleMsg', tableColumn, data)
      drawLineChart('chart', data)
      createTable('simpleMsg1', tableColumn, data)
      drawLineChart('chart1', data)
    }
  })
}
// 渲染统计图
function drawLineChart (id, data) {
  let ele = document.getElementById(id)
  let myChart = echarts.getInstanceByDom(ele)
  if (!myChart) {
    myChart = echarts.init(ele);
  }
  // 指定图表的配置项和数据
  let option = {
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
    option.xAxis.data.push(item.time)
    option.series[0].data.push(item.count)
  })
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
// 渲染table
function createTable(id, columnName, data) {
  let headerTemplate = `
    <thead>
      <tr>
        ${createTHeader(columnName)}
      </tr>
    </thead>
  `
  let tbody = `
    <tbody>
      ${createTBody(columnName, data)}
    </tbody>
  `
  document.getElementById(id).innerHTML = headerTemplate + tbody
}
// 生成theader
function createTHeader (titles) {
	let template = ''
  titles.forEach(function (item) {
    template += `<th scope="col">${item.title}</th>`
  })
  return template
}
// 生成tbody
function createTBody (columnName, data) {
	let tBody = ''
  for (let i = 0;i<data.length;i++) {
    let temp = `<tr>`
    for (let j = 0;j<columnName.length;j++) {
      temp += `<td>${data[i][columnName[j].name]}</td>`
    }
    temp += `</tr>`
    tBody += temp
  }
  return tBody
}


let times = ['09:00','10:00']
let serviceDetails = [
  {
    'servicename': 'service1',
    'methods':'methods1',
    'performance':[{
      'timeConsuming': '10',
      'number': 100,
      'SuccessRate':'80%'
    },{
        'timeConsuming': '10',
        'number': 100,
        'SuccessRate': '80%'
      }]
  },
  {
    'servicename': 'service1',
    'methods':'methods1',
    'performance': [{
      'timeConsuming': '10',
      'number': 100,
      'SuccessRate': '80%'
    }, {
        'timeConsuming': '10',
        'number': 100,
        'SuccessRate': '80%'
      }]
  }
]
// 生成ServiceDetail的特定table
function createServiceDetailTable(times, serviceDetails) {
  let table = document.querySelector('.serviceDetail')
  let str = `
  <thead>
    ${createTHeader4Detail(times)}
	</thead>
	<tbody>
	   ${createTBody4Detail(times, serviceDetails)}
  </tbody>`
  table.innerHTML = str
}
function createTBody4Detail(times, serviceDetails) {
  let tbody = ''
  serviceDetails.forEach(function (item) {
    tbody += `<tr>
    <td>${item.servicename}</td>
    <td>${item.methods}</td>
    `
    item.performance.forEach(function (performance) {
      tbody += `
      <td>${performance.timeConsuming}</td>
      <td>${performance.number}</td>
      <td>${performance.SuccessRate}</td>
      `
    })
    tbody += '</tr>'
  })
  return tbody
}
function createTHeader4Detail(times) {
  let part_1 = ''
  times.forEach(function (item) {
    part_1 += `<th scope="col" colspan="3">${item}</th>`
  })
  let part_2 = `
      <th scope="col">耗时</th>
	    <th scope="col">数量</th>
      <th scope="col">成功率</th>
      `
  let theader = `
    <tr>
	    <th scope="col" rowspan="2">服务名</th>
	    <th scope="col" rowspan="2">方法</th>
	    ${part_1}
	  </tr>
	  <tr>
	    ${part_2.repeat(times.length)}
	  </tr>
  `
  return theader
}
// createTable 生成普通table
createTable('simpleMsg', tableColumn, data)
// drawLineChart 生成统计图
drawLineChart('chart', data)
createTable('simpleMsg1', tableColumn, data)
drawLineChart('chart1', data)
setInterval(function () {
  let temp = data.shift()
  temp.count = +temp.count + 10
  data.push(temp)
  createTable('simpleMsg', tableColumn, data)
  drawLineChart('chart', data)
}, 1000)
// createServiceDetailTable 详情table
createServiceDetailTable(times, serviceDetails)