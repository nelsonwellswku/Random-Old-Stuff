var hl7 = require('./HL7');
var fs = require('fs');

fs.readFile('./oru.hl7', function (err, data) {
  if (err) throw err;
  var start = (new Date).getTime();

  var msg = hl7.parse(data.toString());
  msg = hl7.forEach(msg, {segment: 'OBX'}, function(seg) {
    seg['OBX.4']['OBX.4.1'] = 'NELSON';
    return seg;
  });

  //console.log(msg['OBX']);
  console.log((new Date).getTime() - start);
});
