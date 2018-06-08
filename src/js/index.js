var tableColumn = [
  {
    title: '时间',
    name: 'time'
  },
  {
    title: '数量',
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
  }, {
    'time': '21:15',
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
let serviceDetails =[
{"time":"11:43","performance":[{"timeConsuming":"2.0", "number":"10", "service":"com.unj.dubbotest.provider.DemoService.getUsers"},{"costTimeAvg":"2.0", "number":"10", "service":"com.unj.dubbotest.provider.DemoService.sayHello"}]},
{"time":"11:44","performance":[{"timeConsuming":"2.0", "number":"13", "service":"com.unj.dubbotest.provider.DemoService.sayHello"},{"costTimeAvg":"1.0", "number":"10", "service":"com.unj.dubbotest.provider.DemoService.getUsers"}]},
{"time":"11:45","performance":[{"timeConsuming":"2.5", "number":"15", "service":"com.unj.dubbotest.provider.DemoService.getUsers"},{"costTimeAvg":"2.0", "number":"10", "service":"com.unj.dubbotest.provider.DemoService.sayHello"}]}
]
let performanceIndex = [{
  title:'服务',
  name:'service'
},{
  title:'数量',
  name:'number'
},{
  title:'耗时',
  name:'costTimeAvg'
}]
let interval
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

// 生成ServiceDetail的特定table
function createServiceDetailTable(id, performanceIndex, serviceDetails) {
  let table = document.getElementById(id)
  let str = `
  <thead>
    <th scope="col">时间</th>
    ${createTHeader4Detail(performanceIndex)}
	</thead>
	<tbody>
	   ${createTBody4Detail(performanceIndex, serviceDetails)}
  </tbody>`
  table.innerHTML = str
}
function createTBody4Detail(performanceIndex, serviceDetails) {
  let tbody = ''
  serviceDetails.forEach(function (item) {
    tbody += '<tr>'
    tbody += `<td rowspan=${item.performance.length}>${item.time}</td>`
    item.performance.forEach(function (performance, index) {
      if (index!==0) {
        tbody += '<tr>'
      }
      performanceIndex.forEach(function(obj) {
        console.log(obj)
        tbody += `
        <td>${performance[obj.name]}</td>
        `
      })
      tbody += `</tr>`
    })
  })
  return tbody
}
function createTHeader4Detail(performanceIndex) {
  let theader=''
  performanceIndex.forEach(function(item){
    theader += `<th>${item.title}</td>`
  })
  return theader
}
document.querySelector('#checkbox').onclick = function () {
  if (!this.checked && interval) {
    clearInterval(interval)
    interval = null
  } else if (this.checked && !interval) {
    interval = setInterval(function () {
      let temp = data.shift()
      temp.count = +temp.count + 10
      data.push(temp)
      createTable('simpleMsg', tableColumn, data)
      drawLineChart('chart', data)
    }, 1000)
  }
  console.log(this.checked)
}
$('#replay').on('click', function () {
  let time = $('#time').val()
  $('#projectName').html(time)
  console.log(time)
})
// createTable 生成普通table
createTable('simpleMsg', tableColumn, data)
// drawLineChart 生成统计图
drawLineChart('chart', data)
createTable('simpleMsg1', tableColumn, data)
drawLineChart('chart1', data)
interval = setInterval(function () {
  let temp = data.shift()
  temp.count = +temp.count + 10
  data.push(temp)
  createTable('simpleMsg', tableColumn, data)
  drawLineChart('chart', data)
}, 1000)
// createServiceDetailTable 详情table
createServiceDetailTable('serviceDetail', performanceIndex, serviceDetails)
createServiceDetailTable('serviceDetail1',performanceIndex, serviceDetails)