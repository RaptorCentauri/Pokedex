//Variable Declarations
var color;
var type;
var region;
var pokemon = {};
var colorArray = [];
var	typeArray = [];
var	regionArray = [];
var matchesArray = [];
var resultsArr = [];
var colorChoices = [];
var typeChoices = [];
var regionChoices = [];
var ajaxColor = $.Deferred();
var ajaxType = $.Deferred();
var ajaxRegion = $.Deferred();
var ajaxResult = $.Deferred();


//FUNCTION DECLARATIONS

//Search by specific color
function colorSearch(color){

	if (!color){
		console.log('no color');
		ajaxColor.resolve();
	}

	else{
		$.ajax({
			url: "https://pokeapi.co/api/v2/pokemon-color/" + color,
			method: "GET"
		}).done(function(data) {
			// console.log(data);
			for (var i = 0; i < data.pokemon_species.length; i++) {
				colorArray.push(data.pokemon_species[i].name);
			}
			console.log(colorArray);
			ajaxColor.resolve();
		}).fail(function(){
			$("#results").html("The API is not responding");
			$("#status-light").css("background-color", "#ff1c1c");
		});;
	}
}

//Search by specific type
function typeSearch(type){

	if (!type){
		console.log('no type');
		ajaxType.resolve();
	}

	else{
	$.ajax({
		url: "https://pokeapi.co/api/v2/type/" + type,
		method: "GET"
	}).done(function(data) {
		for (var i = 0; i < data.pokemon.length; i++) {
			typeArray.push(data.pokemon[i].pokemon.name);
		}
		console.log(typeArray);
		ajaxType.resolve();
		}).fail(function(){
			$("#results").html("The API is not responding");
			$("#status-light").css("background-color", "#ff1c1c");

		});;
	}
}

//Search by specific region (using pokedex api)
function regionSearch(region){

	if (!region){
		console.log('no region');
		ajaxRegion.resolve();
	}

	else {
	$.ajax({
		url: "https://pokeapi.co/api/v2/pokedex/" + region,
		method: "GET"
	}).done(function(data) {
		for (var i = 0; i < data.pokemon_entries.length; i++) {
			regionArray.push(data.pokemon_entries[i].pokemon_species.name);
		}
		// console.log(regionArray);
		ajaxRegion.resolve();
	}).fail(function(){
		$("#results").html("The API is not responding");
		$("#status-light").css("background-color", "#ff1c1c");

	});;
	}
}




//Create each Pokemon result
function simpleEntry(i, _name, _image, _num){
	// console.log(i);
	pokemon[i]={
		name: _name,
		image: _image,
		number: _num,
	}
}

//Dynamically Add Results to Page
function buildList(_name, _image, _num){
	var miniDex = $(`<button class="miniResult" data-name=${_name}>`);
	miniDex.append(`<img src="${_image}" class="pokemon-img">`);
	var miniInfo = $(`<div class="miniInfo">`);
	miniInfo.append(`<h3 class="pokeName">${_name}</h3>`);
	miniInfo.append(`<h3 class="pokeNumber">${_num}<span></h3>`);
	miniDex.append(miniInfo);
	miniDex.append(`<img src="assets/images/pokeball.png" class="pokeball-img">`);
	$("#results").append(miniDex);
}

//Reset variables
function initalize() {
	pokemon = {};
	ajaxColor = $.Deferred();
	ajaxType = $.Deferred();
	ajaxRegion = $.Deferred();
	colorArray = [];
	typeArray = [];
	regionArray = [];
	matchesArray = [];
	resultsArr = [];
	$("#results").empty();
}

//Determines which search pattern to run based on given parameters
function searchToRun(colorArray, typeArray, regionArray){

	if(colorArray.length == 0 && typeArray.length == 0 && regionArray.length == 0){
		$("#status-light").css("background-color", "#ff1c1c");
		$("#results").empty();
		$("#results").html("You must select at least one parameter!");
	}

	else if (colorArray.length == 0 && typeArray.length == 0){
		console.log('check this one');
		matchesArray = regionArray;
	}

	else if (regionArray.length == 0 && typeArray.length == 0){
		console.log('check this one');
		matchesArray = colorArray;
	}

	else if (colorArray.length == 0 && regionArray.length == 0){
		console.log('check this one');
		matchesArray = typeArray;
	}

	else if (colorArray.length == 0){
		console.log('check this one');
		matchesArray = _.intersection(typeArray, regionArray);
	}

	else if (typeArray.length == 0){
		console.log('check this one');
		matchesArray = _.intersection(colorArray, regionArray);
	}

	else if (regionArray.length == 0){
		console.log('check this one');
		matchesArray = _.intersection(colorArray, typeArray);
	}

	else{
		console.log('check this one');
		matchesArray = _.intersection(colorArray, typeArray, regionArray);
	}
}



function validateSearches(_color, _type, _region){
	console.log(colorChoices);
	// console.log(_color);

	console.log(typeChoices);

	console.log(regionChoices);

	if (!colorChoices.includes(_color) && _color != null){
		console.log('NOT A VALID COLOR!');
		return false;
	}

	else if (!typeChoices.includes(_type) && _type != null){
		console.log('NOT A VALID TYPE!');
		return false;

	}

	else if (!regionChoices.includes(_region) && _region != null){
		console.log('NOT A VALID REGION!');
		return false;
	}else{
		return true;
	}
}

//Get Color Choices from API
$.ajax({
	url: "https://pokeapi.co/api/v2/pokemon-color/",
	method: "GET"
}).done(function(data) {
	// console.log(data);
	for (i=0; i<data.results.length; i++ ){
		colorChoices.push(data.results[i].name);
	}
	console.log(colorChoices);
}).fail(function(){
	$("#results").html("The API is not responding");
				$("#status-light").css("background-color", "#ff1c1c");

});

//Get Type Choices from API
$.ajax({
	url: "https://pokeapi.co/api/v2/type/",
	method: "GET"
}).done(function(data) {
		for (i=0; i<data.results.length; i++ ){
			typeChoices.push(data.results[i].name);
		}
}).fail(function(){

	$("#results").html("The API is not responding");
				$("#status-light").css("background-color", "#ff1c1c");

});

//Get Pokedex Choices from API
$.ajax({
	url: "https://pokeapi.co/api/v2/pokedex/",
	method: "GET"
}).done(function(data) {
		for (i=0; i<data.results.length; i++ ){
			regionChoices.push(data.results[i].name);
		}
}).fail(function(){

	$("#results").html("The API is not responding");
				$("#status-light").css("background-color", "#ff1c1c");

});


$(document).ready(function() {
	var originalResultsHTML = $("#results").html();

	//Puts color choices on screen
	$(".color-button").on("click", function(){
		$("#results").empty();
		for (var i = 0; i < colorChoices.length; i++){
			$("#results").append(`<button class="color-selection parameter-button" data-color="${colorChoices[i]}">${colorChoices[i]}</button>`);
		}
	});

	//Puts type choices on screen
	$(".type-button").on("click", function(){
		$("#results").empty();

		for (var i = 0; i < typeChoices.length; i++){
			$("#results").append(`<button class="type-selection parameter-button" data-type="${typeChoices[i]}">${typeChoices[i]}</button>`);
		}
	});

	//Puts region choices on screen
	$(".region-button").on("click", function(){
		$("#results").empty();
		for (var i = 0; i < regionChoices.length; i++){
			$("#results").append(`<button class="region-selection parameter-button" data-region="${regionChoices[i]}">${regionChoices[i]}</button>`);
		}
	});

	//Sets color choice
	$(document.body).on("click", ".color-selection", function(){
		color = $(this).data("color");
		$(".color-button").html(color);
	});

	//Sets type choice
	$(document.body).on("click", ".type-selection", function(){
	   		type = $(this).data("type");
	   		console.log(type);
	   		$(".type-button").html(type);
	});

	//Sets region choice
	$(document.body).on("click", ".region-selection", function(){
		region = $(this).data("region");
		console.log(region);
		$(".region-button").html(region);
	});

	//Displays Gif related to the pokemon (note!!! This is using the random generator from Giphy, because of this, results may seem off topic at times.)
	$(document.body).on("click", ".miniResult", function(){

		  	$.ajax({
		        url: "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + $(this).data("name"),
		        method: 'GET'
		    }).done(function(response) {
		    	console.log(response);
		      var imageUrl = response.data.image_original_url;
		      console.log(imageUrl)
		      $("#results").empty();
		      $("#results").append(`<img id="gif-result" src="${imageUrl}">`);
		    });
	});

$(document.body).on("click", "#status-light", function(){
		console.log('button light workin');
		initalize();
});



	//Runs the search
$(document.body).on("click", "#search-button", function() {

		if(!validateSearches(color, type, region)){
			console.log('INVALID PARAMETERS');
			$("#results").empty();
			// $("#results").append("WORK NOW");
			$("#results").css("background-image", "url('assets/images/missingNo.png')");
			// $("#results").html('<img src="./assets/images/missingNo.png"');
		}

		else{

			$("#results").empty();

			console.log("--------BEGIN SEARCH-----------");
			$("#results").html("Searching for Matches");
			$("#status-light").css("background-color", "#f5a917");
			// var pokemon = $("#pokemon").val().trim(); //if searching single pokemon data

			colorSearch(color);

			typeSearch(type);

			regionSearch(region);

			console.log(`color= ` + color);
			console.log(`type= ` + type);
			console.log(`region= ` + region);

			// need to delay intersection until its done running....
			var findMatches = $.when(ajaxColor,ajaxRegion,ajaxType);


			findMatches.done(function() {


				searchToRun(colorArray, typeArray, regionArray);

				console.log(`Matches on next line meet all criteria!!!!`);
				console.log(matchesArray);

				var promises = [];

				for (var i = 0; i < matchesArray.length; i++) {
					var request = 	$.ajax({
										url: "https://pokeapi.co/api/v2/pokemon/" + matchesArray[i],
										method: "GET"
									}).done(function(data) {
										// console.log(data);
										resultsArr.push({name: data.name, image: data.sprites.front_default, num: data.id});
									}).fail(function(){
										$("#results").html("The API is not responding");
									});;

					promises.push(request);
				}

				$.when.apply(null, promises).done(function(){

					$("#status-light").css("background-color", "#1bb4ff");

					$("#results").empty();
					console.log('all done');
					console.log(resultsArr);

					for (i=0; i<resultsArr.length; i++){

						simpleEntry(i, resultsArr[i].name, resultsArr[i].image, resultsArr[i].num);
						console.log(pokemon[i]);
					}

					for (var i = 0; i < resultsArr.length; i++){

						buildList(pokemon[i].name, pokemon[i].image, pokemon[i].number);
					}
				});
			});

		}
	});
})
