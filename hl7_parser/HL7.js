exports.parse = function(hl7) {
  var hl7 = hl7.trim();
  
  // HL7 separator characters
  var fieldSeparator = hl7.substr(3, 1);
  var componentSeparator = hl7.substr(4, 1);
  var fieldRepeatSeparator = hl7.substr(5, 1);
  var escapeCharacter = hl7.substr(6, 1);
  var subcomponentSeparator = hl7.substr(7, 1);

  // Vars
  var segment;
  var fieldVals;
  var componentVals; 
  var temporaryObject;
  var pushFlag;

  // Counters
  var fieldCount;
  var componentCount; 
  var segmentTracker = {};

  var obj = {};

  var lines = hl7.split(/\r|\n/);
  for(var line in lines) {
    pushFlag = false;
    fieldVals = lines[line].split(fieldSeparator);
    segment = fieldVals[0];
    fieldCount = 0;   

    if(!segmentTracker[segment]) {
      obj[segment] = {};
      segmentTracker[segment] = 1;
    } else if(segmentTracker.hasOwnProperty(segment) &&
              segmentTracker[segment] == 1){
      // Convert segment in the returnable to an array
      temporaryObject = obj[segment];
      obj[segment] = [];
      obj[segment].push(temporaryObject);
      temporaryObject = {};
      temporaryObject[segment] = {};
      pushFlag = true;
      segmentTracker[segment]++;
    } else {
      temporaryObject = {};
      temporaryObject[segment] = {};
      pushFlag = true;
    }

    for(var fieldVal in fieldVals) {
      componentVals = fieldVals[fieldVal].split(componentSeparator);
      
      componentCount = 1; // non-zero indexing for components
      for(var componentVal in componentVals) {
        if(!pushFlag) {

          if(!obj[segment].hasOwnProperty(segment + '.' + fieldCount)){
            obj[segment][segment + '.' + fieldCount] = {};
          } 
       
          obj[segment]
             [segment + '.' + fieldCount]
             [segment + '.' + fieldCount + '.' + componentCount] =  
               componentVals[componentVal];
        } else {
          
          if(!temporaryObject[segment].hasOwnProperty(
            segment + '.' + fieldCount
          )){
            temporaryObject[segment][segment + '.' + fieldCount] = {};
          }
 
          temporaryObject[segment]
                         [segment + '.' + fieldCount]
                         [segment + '.' + fieldCount + '.' + componentCount] =
                           componentVals[componentVal];
        }

        componentCount++;
      } 

      if(pushFlag) {
        obj[segment].push(temporaryObject[segment]);
      }
     
      fieldCount++;
    } 
  }

  return obj;
};

exports.forEach = function(hl7, options, f) {

 if(hl7[options.segment].length > 1) {
    for(var seg in hl7[options.segment]) {
      hl7[options.segment][seg] = f(hl7[options.segment][seg]);
    }
  } else {
    hl7[options.segment] = f(hl7[options.segment]);
  }

  return hl7;
};

