// Returns an array of Taxonomy objects
// For example:
// [ 
//   { code: '251E00000X', state: 'MI', primary: false },
//   { code: '251G00000X', state: 'MI', primary: true }, 
//   { code: '245F00000Y', state: 'KY', licensenumber: '8754', primary: false } 
// ]
module.exports.parse = function(arr) {
  var taxonomies = [];
  var temp_taxonomy = {};
  for(var index = 0; index < arr.length; index++) {
    var switch_val = index % 4;
    switch(switch_val) {
      case 0:
        if(temp_taxonomy.code) {
          taxonomies.push(temp_taxonomy);
        }
        temp_taxonomy = {};
        if(arr[index] != "") {
          temp_taxonomy.code = arr[index];
        }
        else {
          continue;
        }
        break;
      case 1:
        if(arr[index] != "") {
          temp_taxonomy.licensenumber
        }
        break;
      case 2:
        if(arr[index] != "") {
          temp_taxonomy.state = arr[index];
        }
        break;
      case 3:
        if(arr[index] != "") {
          temp_taxonomy.primary = arr[index] == "Y" ? 
            true : false;
        }
        break;
    }
  }

  return taxonomies;

};

