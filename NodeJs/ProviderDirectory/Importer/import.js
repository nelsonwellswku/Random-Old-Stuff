var csv = require("fast-csv");
var converter = require("./lib/npi_converter");
var mongo = require("mongodb").MongoClient;

var count = 0;
var error_count = 0;

var parse_csv = function(db) {
  csv("../DataDissemination/npidata_20050523-20130908.csv")
  .on("validate", function(data) {
    // For now, just import individual provider data
    return data[1] == 1;
  })
  .on("data", function(data) {
    var prov = converter.arrToObj(data);
    //console.log(prov);
    if(count % 1000 == 0) console.log("At number " + count + "...");
    if(count == 0) {
      count++;
      return; // skip the column headers row
    }
    var collection = db.collection("september2013");
    collection.insert(prov, function(err, docs) { });
    count++;
  })
  .on("end", function() {
    console.log("There are " + count + " individual providers.");
    console.log("There were " + error_count + " errors.");
  })
  .on("error", function() {
    // Swallow the error; missing a few providers is "good enough" for now
    error_count++; 
  })
  .parse();
}

mongo.connect("mongodb://127.0.0.1:27017/nelsontest", function(err,db) {

  if(err) throw err;
  parse_csv(db);

});
