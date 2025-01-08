async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
  await loadTool('AIScheduleTools');
  await AIScheduleAlert(`
  🎉导入流程🎉
  1. 请先进行登录操作，本次登录不会保存您的任何账户信息，所有信息均在您的设备上进行处理。
  1. 请先在教务系统中选择学年学期。接着再选择好周数，通常来说为1-16/18周，具体请咨询同学、老师、教务处
  2. 点击查询。
  3. 点击一键导入。
  4. 如遇查询失败请不要慌张，将界面滑动至右上角点击返回首页并出现重新登录弹窗，此时只需点击重新登录按钮即可。
  `);
  
  const element = dom.querySelector('.ant-spin-container');
  if (element) {
    return element.outerHTML;
  }
  await AIScheduleAlert('请先转至课程表详情页')
  return '';
}
