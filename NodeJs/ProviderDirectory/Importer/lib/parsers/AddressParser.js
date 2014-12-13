module.exports.parse = function(arr) {

  var addr = {};

  if(!isNullUndefinedEmpty(arr[0])) {
    addr.address = [arr[0]];
    if(!isNullUndefinedEmpty(arr[1])) {
      addr.address.push(arr[1]);
    }
  }

  if(!isNullUndefinedEmpty(arr[2])) {
    addr.city = arr[2];
  }

  if(!isNullUndefinedEmpty(arr[3])) {
    addr.state = arr[3];
  }

  if(!isNullUndefinedEmpty(arr[4])) {
    addr.zip = arr[4];
  }

  if(!isNullUndefinedEmpty(arr[5])) {
    addr.country = arr[5];
  }

  return addr;

};
