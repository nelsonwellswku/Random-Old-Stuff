var taxonomyParser = require("./parsers/TaxonomyParser");

// var Convert a flat NPI array to the object representation 
// that will be stored in mongo 
exports.arrToObj= function(arr) {

  var obj = {};

  // NPI
  populateObj(obj, "npi", arr[0]);

  // Name
  populateObj(obj, "nameprefix", arr[8]);
  populateObj(obj, "firstname", arr[6]);
  populateObj(obj, "middlename", arr[7]);
  populateObj(obj, "lastname", arr[5]);
  populateObj(obj, "namesuffix", arr[9]);

  // Gender
  populateObj(obj, "gender", arr[41]);

  // Taxonomies
  var taxonomies = taxonomyParser.parse(arr.slice(47, 106)); 
  populateObj(obj, "taxonomies", taxonomies); 

  // Addresses
  var addresses = createAddresses(arr);
  populateObj(obj, "addresses", addresses); 

  // Phones
  var phones = [];
  // authorized official telephone number 
  if(available(arr[46])) {
    phones.push(arr[46]);
  }  
  // mailing address phone
  if(available(arr[26])) {
    phones.push(arr[26]);
  } 
  // practice address phone
  if(available(arr[34])) {
    phones.push(arr[34]);
  }

  if(phones.length > 0) {
    populateObj(obj, "phones", phones);
  }  

  // Enumeration date
  populateObj(obj, "enumerationdate", arr[36]);

  // Last update date
  populateObj(obj, "lastupdatedate", arr[37]);

  // Deactivation date
  populateObj(obj, "deactivationdate", arr[39]);

  // Reactivation date
  populateObj(obj, "reactivationdate", arr[40]);

  // Sole proprietor
  populateObj(obj, "soleproprietor", arr[307]);

  return obj;   

};

var populateObj = function(obj, prop, value) {
  if(value !== "0" && available(value))
  {
    obj[prop] = value;
  }
};

var isNullUndefinedEmpty = function(obj) {
  return obj == null || obj == undefined || obj == "";
};

var available = function(obj) {
  return !isNullUndefinedEmpty(obj);
}

var createAddresses = function(arr) {

  // Mailing address
  // indices 20 - 27
  var mailingAddress = createAddress(arr.slice(20, 25));
  var practiceAddress = createAddress(arr.slice(28, 33));

  if(mailingAddress === null && practiceAddress === null) {
    return null;
  }

  var addresses = {};
  addresses.mailing = mailingAddress;
  addresses.practice = practiceAddress;

  return addresses;
};

var createAddress = function(arrSlice) {
  var arr = arrSlice;
  var addr = {};
  var isNull = true;
  if(!isNullUndefinedEmpty(arr[0])) {
    addr.address = [arr[0]];
    isNull = false;
    if(available(arr[1])) {
      addr.address.push(arr[1]);
    }
  }

  if(available(arr[2])) {
    addr.city = arr[2];
    isNull = false;
  }
 
  if(available(arr[3])) {
    addr.state = arr[3];
    isNull = false;
  }

  if(available(arr[4])) {
    addr.zip = arr[4];
    isNull = false;
  }

  if(available(arr[5])) {
    addr.country = arr[5];
    isNull = false;
  }

  if(isNull === true) return null;

  return addr;

};
