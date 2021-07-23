export function currentDateTime() {
  var d = new Date();
  var datestring =
    d.getDate() +
    "-" +
    (d.getMonth() + 1) +
    "-" +
    d.getFullYear() +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes();
  return datestring;
}

export function print(label, value) {
  console.log(`${currentDateTime()}::${label}:: ${value}`);
}

export function capitaliseFirstLetter(string) {
  let arr = [];
  if (string) {
    if (string[0] === string[0].toLowerCase()) {
      for (let index = 0; index < string.length; index++) {
        index === 0
          ? arr.push(string[0].toUpperCase())
          : arr.push(string[index]);
      }
      return arr.join("");
    } else {
      for (let index = 0; index < string.length; index++) {
        arr.push(string[index]);
      }
      return arr.join("");
    }
  }
}
