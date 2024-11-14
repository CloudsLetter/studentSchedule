async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
  await loadTool('AIScheduleTools');
  await AIScheduleAlert(`
  🎉导入流程🎉
  1. 请先在教务系统中选择学年学期。接着再选择好周数，通常来说为1-16/18周，具体请咨询同学、老师、教务处
  2. 点击查询
  3. 点击一键导入
  `);
  
  const element = dom.querySelector('.ant-spin-container');
  if (element) {
    return element.outerHTML;
  }
  await AIScheduleAlert('请先转至课程表详情页')
  return 'none';
}