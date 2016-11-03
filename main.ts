import * as moment from 'moment';
console.log(moment().format('YYYY-MM-DD HH:mm:ss'));

//
// calculate "4:00:00 / 42.2" => 0:05:41.2
//
let y = 42.2;

// 4:00:00 => 14400
let x = 14400;

// 14400 / 42.2
let result = x / y;
console.log(result);

// X => 0:05:41.2
