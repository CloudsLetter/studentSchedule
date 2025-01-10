function scheduleHtmlParser(html) {
  if (html === '') {
    return [];
  }
const regex = /(\d+)-(\d+)(?:\s*;\s*(\d+))?\s*周/; 
let list = [];
// 解析表格
const $ = cheerio.load(html);
// O^n5时间复杂度
// 遍历行 
    $('tr').first().children('td').each((day, _) => {
      if (day === 0) {
        return;
      }
    // 今日课程暂存
    const todayLesson = new Map();
    //遍历列
    $("tr").each((section, _) => {
      // 遍历不同周相同节课程
        $("tr").eq(section).children("td").eq(day).children("div").each((_, elem) => {
               const div = $(elem).children("div");
               const name = div.eq(0).text().trim();
               const position = div.eq(3).children("span").text().trim();
               const teacher = div.eq(4).children("span").text().trim();
               const weeks = [];
               if (!name) {
                 return;
               }

               const match = div
                 .eq(1)
                 .children("span")
                 .eq(0)
                 .text()
                 .trim()
                 .match(regex);
               if (match) {
                 for (
                   let i = parseInt(match[1], 10);
                   i <= parseInt(match[2], 10);
                   i++
                 ) {
                   weeks.push(i);
                 }
                 if (match[3]) {
                   weeks.push(parseInt(match[3], 10));
                 }
               }

               if(todayLesson.has(name + teacher)){
                if ((section + 1) - todayLesson.get(name + teacher).sections[todayLesson.get(name + teacher).sections.length - 1] !== 1) {
                  for (let ln = 0; ln < 12; ln++){
                      if (todayLesson.has(name + teacher + ln)) {
                        if ((section + 1) - todayLesson.get(name + teacher + ln).sections[todayLesson.get(name + teacher + ln).sections.length - 1] !== 1) {
                          continue;
                        } else {
                          todayLesson.get(name + teacher + ln).sections.push(section + 1);
                          break;
                        }
                      
                      } else {
                        todayLesson.set(name + teacher + ln, {
                          name,
                          position,
                          teacher,
                          weeks: weeks,
                          day: day,
                          sections: [section + 1],
                        });
                        break;
                      } 
                    }
                  } else {
                      todayLesson.get(name + teacher).sections.push(section + 1);
                  }
               } else {
                  todayLesson.set(name + teacher, {
                    name,
                    position,
                    teacher,
                    weeks: weeks,
                    day: day,
                    sections: [section + 1],
                  });
               }
              });
      });
      todayLesson.forEach((value) => {
        list.push(value);
      });
});
return list;
}