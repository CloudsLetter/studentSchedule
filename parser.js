function scheduleHtmlParser(html) {
  if(html === ''){
    return [];
  }
const regex = /(\d+)-(\d+)(?:\s*;\s*(\d+))?\s*周/; 
let list = [];
// 解析表格
const $ = cheerio.load(html);
$('tr').each((_, tr) => {

  const tds = $(tr).find('td');
  for (let i = 1; i < tds.length; i++) {

    const td = tds[i];

    const divsA = $(td).children('div');
    for(let k = 0; k < divsA.length; k++){
    let sections = [];
    let weeks = [];
    const divs = divsA[k];
    const div = $(divs).children('div');

    const name = $(div).eq(0).text().trim();
    if(name === ''){
      continue;
    }

// 正则解析周数
    const week = $(div).eq(1).children('span').first().text().trim(); 
    const teacher = $(div).eq(4).children('span').text().trim()
    const match = week.match(regex);
    if (match){
    for(let i = parseInt(match[1], 10); i <= parseInt(match[2], 10); i++){
      weeks.push(i);
    }
    if(match[3]){
      weeks.push(parseInt(match[3], 10));
    }
    }
// 遍历当天所有课程并归纳
    $('tr').each((trIndex2, tr) => {
     const tds = $(tr).children('td');
     const td = tds[i];
     const divsA = $(td).children('div');
     const divs = divsA[k];
     const div = $(divs).children('div');
     if($(div).eq(0).text().trim() === name && $(div).eq(4).text().trim() === teacher){
          sections.push(trIndex2 + 1);
    }
    })

   // 过滤当天重复课程
    let exitCruse = false;
    for(let j = 0; j < list.length; j++){
        if(list[j].name === name && list[j].day === i && list[j].teacher === teacher && list[j].sections.length === sections.length){
            if(list[j].weeks.length === weeks.length){
              exitCruse = true;
            }
        }
      }

    if(exitCruse){
      continue;
    }

    // 设置数据
    const data = {
    name: name, 
    position: $(div).eq(3).find('span').text().trim(),
    teacher: teacher,
    weeks: weeks,
    day: i, 
    sections: sections,
  }

    // 将该对象添加到数据数组中
    list.push(data);
    }

  }

});

return list;
}
