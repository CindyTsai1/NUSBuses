const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema and Model

const RouteSchema = new Schema({
  bus: String, 
  message: String,
  waitingTime: Number,
  travelTime: Number,
  description: String
});

const Route = mongoose.model('route', RouteSchema);

module.exports = Route; 
