var express = require('express');
var router = express.Router();
var Heroes = require('../models/heros.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Application' });
});

router.get('/viewData', function(req, res, next) {
  Heroes.getSingle(req.query)
	 .then(function(reVal){
	 	res.render('viewContact', {data : reVal})
	 })
    .catch(console.log('ERR :: is resolving the promise'))
});

router.get('/saveData', function(req, res, next) {
	Heroes.insertRow(req.query)
	 .then(function(){
	 	res.redirect('/getAllHeroes')
	 })
    .catch(console.log('ERR :: is resolving the promise'))
});

/*POST API */
/*router.post('/saveDataPostAPI', function(req, res, next) {
	Heroes.insertRow(req.query)
	 .then(function(){
	 	res.send(retVal);
	 })
    .catch(console.log('ERR :: is resolving the promise'))
});*/

router.get('/updateRow', function(req, res, next) {
	Heroes.updateRow(req.query)

	 .then(function(){
	 	res.redirect('/getAllHeroes')
	 })
    .catch(console.log('ERR :: is resolving the promise'))
});


router.get('/deleteRow', function(req, res, next) {
	Heroes.deleteRow(req.query)
	 .then(function(){
	 	res.redirect('/getAllHeroes')
	 })
    .catch(console.log('ERR :: is resolving the promise'))
});


router.get('/getAllHeroes', function(req, res, next) {
	Heroes.getAll()
	 .then(function(reVal){
	 	res.render('heros', {data : reVal})
	 })
    .catch(console.log('ERR :: is resolving the promise'))
});

router.get('/getAllValues', function(req, res, next) {
	Heroes.getAll()
	 .then(function(reVal){
	 	res.send(reVal)
	 })
    .catch(console.log('ERR :: is resolving the promise'))
});


router.get('/newContact', function(req, res, next) {
	res.render('contact', {title: 'New contact'})
});

module.exports = router;
