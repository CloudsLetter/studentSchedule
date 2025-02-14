function scheduleHtmlParser(html) {
  if (html === '') {
    return [];
  }
const regex = /(\d+)-(\d+)(?:\s*;\s*(\d+))?\s*(\S)?\s*周$/; 
let list = [];
// 解析表格
const $ = cheerio.load(html);
// On^5时间复杂度
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
               const weekss = div.eq(1).children("span").eq(0).text().trim();
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
               if (match && match[4] !== "单" && match[4] !== "双") {
                 for (
                   let i = parseInt(match[1], 10);
                   i <= parseInt(match[2], 10);
                   i++
                 ) {
                   weeks.push(i);
                 }

               } else if (match && match[4] === "单") {
                  for (
                    let i = parseInt(match[1], 10);
                    i <= parseInt(match[2], 10);
                    i++
                  ) {
                    if (i % 2 === 1) {
                      weeks.push(i);
                    }
                  }
                } else if (match && match[4] === "双") {
                  for (
                    let i = parseInt(match[1], 10);
                    i <= parseInt(match[2], 10);
                    i++
                  ) {
                    if (i % 2 === 0) {
                      weeks.push(i);
                    }
                  }
                }
                if (match[3]) {
                  weeks.push(parseInt(match[3], 10));
                }
               for (let ln = 0; ln < 12; ln++){
                      if (todayLesson.has(name + teacher + ln + weekss)) {
                        if ((section + 1) - todayLesson.get(name + teacher + ln + weekss).sections[todayLesson.get(name + teacher + ln + weekss).sections.length - 1] !== 1) {
                          continue;
                        } else {
                          todayLesson
                            .get(name + teacher + ln + weekss)
                            .sections.push(section + 1);
                          break;
                        }
                      } else {
                        todayLesson.set(name + teacher + ln + weekss, {
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
              });
      });
      todayLesson.forEach((value) => {
        list.push(value);
      });
});
return list;
}