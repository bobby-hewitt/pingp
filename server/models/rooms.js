var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Rooms = new Schema({
	short: '',
	long: '',
	players:[]
});
 
var Me = module.exports = mongoose.model('Rooms', Rooms);