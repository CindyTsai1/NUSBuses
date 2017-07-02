const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema and Model

const BusSchema = new Schema({
  name: String,
  busStops: [String]
});

const BusStopSchema = new Schema({
  name: String, 
  buses: [BusSchema],
  description: String
});

const BusStop = mongoose.model('busStop', BusStopSchema);

module.exports = BusStop; 
