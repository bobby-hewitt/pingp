var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Rooms = new Schema({
	short: '',
	long: ''
});
 
var Me = module.exports = mongoose.model('Rooms', Rooms);