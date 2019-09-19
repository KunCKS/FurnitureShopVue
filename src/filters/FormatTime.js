export default function(timestamp) {
  let dates = new Date(timestamp * 1000);
  let year = dates.getFullYear();
  let month =
    dates.getMonth() < 10 ? `0${dates.getMonth() + 1}` : dates.getMonth() + 1;
  let date = dates.getDate() < 10 ? `0${dates.getDate()}` : dates.getDate();
  return `${year}-${month}-${date}`;
}
