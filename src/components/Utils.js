//Generate Account Number
export function generateAccNums() {
  return Math.floor(Math.random() * 10e4);
}

//Check if account num exsit
export function CheckAccNums(acc, num) {
  return acc.includes(num) ? CheckAccNums(acc, generateAccNums()) : num;
}
