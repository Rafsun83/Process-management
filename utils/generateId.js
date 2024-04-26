 function generate() {
    var add = 1,
      max = 12 - add;
  
    if (6 > max) {
      return generate(max) + generate(n - max);
    }
  
    max = Math.pow(10, 6 + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return ("" + number).substring(add);
  }
 module.exports = generate 