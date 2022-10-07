//Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.
// Symbols = [A,...Z] ( represents [1,... 26] )
// if n <= 26:
//    Symbols[n-1]
// if n > 26
//
// 1401 => BEAB
//    n % 10 => B
//    140 % 10 => A
//    14 % 10 => E
//    1 % 10 => B
// 101 = 5
//  10 = 2
//   1 = 1
/**
 * @param {number} columnNumber
 * @return {string}
 */
const A = "A".charCodeAt(0)
const Symbols = new Array(26)
  .fill("")
  .map((_, idx) => String.fromCharCode(A + idx))

var convertToTitle = function(columnNumber) {
  let s = ""
  let n = columnNumber
  while (n > 0) {
    s = Symbols[(--n) % 26] + s
    n = Math.floor(n / 26)
  }
  return s
};
