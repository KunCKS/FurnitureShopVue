export default function(timestamp) {
  let dates = new Date(timestamp * 1000);
  let year = dates.getFullYear();
  let month =
    dates.getMonth() + 1 < 10
      ? `0${dates.getMonth() + 1}`
      : dates.getMonth() + 1;
  let date = dates.getDate() < 10 ? `0${dates.getDate()}` : dates.getDate();
  return `${year}-${month}-${date}`;
}

//將timestamp轉換一般日期格式
//月在取得時由於是return陣列的index，所以會少1，所以在判斷時要加1再判斷，過濾時也要加1呈現正確時間
