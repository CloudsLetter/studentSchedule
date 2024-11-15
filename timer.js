/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({
  providerRes,
  parserRes
} = {}) {
  // 支持异步操作 推荐await写法

  // 这是一个示例函数，用于演示，正常用不到可以删掉
  // const someAsyncFunc = () => new Promise(resolve => {
  //   setTimeout(() => resolve(), 1)
  // })
  // await someAsyncFunc()

  // 这个函数中也支持使用 AIScheduleTools 譬如给出多条时间配置让用户选择之类的

  // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
  return {
    totalWeek: 18, // 总周数：[1, 30]之间的整数
    startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
    startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    showWeekend: true, // 是否显示周末
    forenoon: 5, // 上午课程节数：[1, 10]之间的整数
    afternoon: 4, // 下午课程节数：[0, 10]之间的整数
    night: 3, // 晚间课程节数：[0, 10]之间的整数
    sections: [{
      section: 1, // 节次，从1开始
      startTime: '08:00', // 开始时间
      endTime: '08:40',  // 结束时间
    },
    {
      section: 2, 
      startTime: '08:45', 
      endTime: '09:25', 
    },
    {
      section: 3, 
      startTime: '09:40', 
      endTime: '10:20', 
    },
     {
      section: 4, 
      startTime: '10:35', 
      endTime: '11:15', 
    },
      {
      section: 5, 
      startTime: '11:20', 
      endTime: '12:00', 
    },
      {
      section: 6, 
      startTime: '14:00', 
      endTime: '14:40', 
    },
      {
      section: 7, 
      startTime: '14:45', 
      endTime: '15:25', 
    },
      {
      section: 8, 
      startTime: '15:40', 
      endTime: '16:20', 
    },
      {
      section: 9, 
      startTime: '16:25', 
      endTime: '17:05', 
    },
      {
      section: 10, 
      startTime: '18:30', 
      endTime: '19:10', 
    },
      {
      section: 11, 
      startTime: '19:20', 
      endTime: '20:00', 
    },
      {
      section: 12, 
      startTime: '20:10', 
      endTime: '20:50', 
    }], 
  }
}