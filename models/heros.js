var express = require('express');
var fs = require("fs");

// Using Node.js `require()`
const mongoose = require('mongoose');



const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const contact = new Schema({
  //_id: ObjectId,
  name: String,
  PhoneNo: String
});
 


const myModel = mongoose.model('contact', contact);

let Heros= {}
Heros.getAll = function(){
	return new Promise(function (resolve, reject){

		// //Set up default mongoose connection
		const connection = mongoose.connect('mongodb://127.0.0.1:27017/MyDB');
		console.log(connection);
		myModel.find({},function(err,contact){
			if (err) {
				console.log(err);
				console.log('ERR :: fetching data from database..');
				reject();
			}
			else {
				//console.log(result);
				console.log(contact);

				resolve(contact);
			}

		});

	});
		
}

Heros.getSingle = function(contactData){
	return new Promise(function (resolve, reject){

		// //Set up default mongoose connection
		const connection = mongoose.connect('mongodb://127.0.0.1:27017/MyDB');
		//console.log(`${contactData._id}`);

		myModel.find({ _id: `${contactData._id}`}, function(err, contact){
			if (err) {
				console.log(err);
				console.log('ERR :: fetching data from database..');
				reject();
			}
			else {
				//console.log(result);
				console.log(contact);

				resolve(contact);
			}

		});

	});
		
}

Heros.insertRow = function(newContact){
	return new Promise(function (resolve, reject){

		// create a new contact
		var newRow = myModel({
		  name: `${newContact.name}`,
		  PhoneNo:`${newContact.PhoneNo}` 
		});

		// //Set up default mongoose connection
		const connection = mongoose.connect('mongodb://127.0.0.1:27017/MyDB');
		console.log(connection);

		// call the built-in save method to save to the database
		newRow.save(function(err){
			if (err) {
				console.log(err);
				console.log('ERR :: fetching data from database..');
				reject();
			}
			else {
				//console.log(result);
				console.log(contact);

				resolve(contact);
			}

		});
	});
}


Heros.deleteRow = function(newContact){
	return new Promise(function (resolve, reject){


		// //Set up default mongoose connection
		const connection = mongoose.connect('mongodb://127.0.0.1:27017/MyDB');
		console.log(connection);


		//console.log(`${newContact.name}`);
		myModel.findOneAndRemove({name :`${newContact.name}`}, function(err){
			if (err) {
				console.log(err);
				console.log('ERR :: fetching data from database..');
				reject();
			}
			else {
				//console.log(result);
				console.log(contact);

				resolve(contact);
			}

		});
	});
}

		
Heros.updateRow= function(newContact){
	return new Promise(function (resolve, reject){


		// //Set up default mongoose connection
		const connection = mongoose.connect('mongodb://127.0.0.1:27017/MyDB');


		myModel.findOneAndUpdate({ _id: `${newContact._id}`}, { name: `${newContact.contactName}`, PhoneNo: `${newContact.phoneNo}`}, function(err, con) {
		  if (err) {
				console.log(err);
				console.log('ERR :: fetching data from database..');
				reject();
			}
			else {
				//console.log(result);
				console.log('con.......'+ con);
				resolve(con);

			}
		});
		
	});
}



module.exports = Heros;