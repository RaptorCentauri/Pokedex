

var pokemon = {};
var colorArray = [];
var	typeArray = [];
var	regionArray = [];
var matchesArray = [];
var ajaxColor = $.Deferred();
var ajaxType = $.Deferred();
var ajaxRegion = $.Deferred();
var ajaxResult = $.Deferred();
var resultsArr = [];
var color;
var type;
var region;
var colorChoices = [];
var typeChoices = [];
var regionChoices = [];

	console.log(`colors available`);

		$.ajax({
			url: "https://pokeapi.co/api/v2/pokemon-color/",
			method: "GET"
		}).done(function(data) {
			// console.log(data);
			for (i=0; i<data.results.length; i++ ){
				colorChoices.push(data.results[i].name);
			}
			console.log(colorChoices);
		});

//====================================================
		console.log(`types available`);

	$.ajax({
		url: "https://pokeapi.co/api/v2/type/",
		method: "GET"
	}).done(function(data) {
		// console.log(data);
			for (i=0; i<data.results.length; i++ ){
				typeChoices.push(data.results[i].name);
			}
		console.log(typeChoices);
	});


//======================================================


	$.ajax({
		url: "https://pokeapi.co/api/v2/pokedex/",
		method: "GET"
	}).done(function(data) {
		// console.log(data);
			for (i=0; i<data.results.length; i++ ){
				regionChoices.push(data.results[i].name);
			}
		console.log(regionChoices);
	});





function simpleEntry(i, _name, _image, _num){
	// console.log(i);
	pokemon[i]={
		name: _name,
		image: _image,
		number: _num,
	}
}

function initalize() {
	pokemon = {};
	// $("#results").html(originalResultsHTML);
	ajaxColor = $.Deferred();
	ajaxType = $.Deferred();
	ajaxRegion = $.Deferred();
	colorArray = [];
	typeArray = [];
	regionArray = [];
	matchesArray = [];
}

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
		});
	}
}

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
		});
	}
}

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
	});	
	}
}

function searchToRun(colorArray, typeArray, regionArray){

	if (colorArray.length == 0 && typeArray.length == 0){
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


$(document).ready(function() {
   var originalResultsHTML = $("#results").html();

   $(".color-button").on("click", function(){
   		$("#results").empty();
   		console.log(`color button works`);
   		// console.log(colorChoices);

   		for (var i = 0; i < colorChoices.length; i++){
			$("#results").append(`<button class="color-selection" data-color=${colorChoices[i]} style="color: ${colorChoices[i]}">${colorChoices[i]}</button>`);
   		}

   });

    $(".type-button").on("click", function(){
    	$("#results").empty();
   		console.log(`type button works`);
   		// console.log(colorChoices);

   		for (var i = 0; i < typeChoices.length; i++){
			$("#results").append(`<button class="type-selection" data-type="${typeChoices[i]}">${typeChoices[i]}</button>`);
   		}
   });

    $(".region-button").on("click", function(){
    	$("#results").empty();
   		console.log(`region button works`);
   		// console.log(colorChoices);

   		for (var i = 0; i < regionChoices.length; i++){
			$("#results").append(`<button class="region-selection" data-region="${regionChoices[i]}">${regionChoices[i]}</button>`);
   		}
   });

   $(document.body).on("click", ".color-selection", function(){
   		color = $(this).data("color");
   		console.log(color);

   		$(".color-button").html(color);
   		// return color;
   });

  	$(document.body).on("click", ".type-selection", function(){
   		type = $(this).data("type");
   		console.log(type);
   		$(".type-button").html(type);
   });


  	$(document.body).on("click", ".region-selection", function(){
   		region = $(this).data("region");
   		console.log(region);
   		$(".region-button").html(region);
   });


  	$(document.body).on("click", ".miniResult", function(){

  	$.ajax({
        url: "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + $(this).data("name"),
        method: 'GET'
    }).done(function(response) {
    	console.log(response);
      var imageUrl = response.data.image_original_url;
      console.log(imageUrl)
      $("#results").empty();
      $("#results").append(`<img src="${imageUrl}">`);
    });



   		// region = $(this).data("region");
   		// console.log(region);
   		// $(".region-button").html(region);
   });

	$(document.body).on("click", "#search-button", function() {
		$("#results").empty();

		initalize();

		console.log("--------BEGIN SEARCH-----------");
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
								});

				promises.push(request);
			}

			$.when.apply(null, promises).done(function(){
				console.log('all done');
				console.log(resultsArr);

				for (i=0; i<resultsArr.length; i++){
					simpleEntry(i, resultsArr[i].name, resultsArr[i].image, resultsArr[i].num);
					console.log(pokemon[i]);
				}


				for (var i = 0; i < resultsArr.length; i++){
					var miniDex = $(`<button class="miniResult" data-name=${pokemon[i].name}>`);
					miniDex.append(`<img src="${pokemon[i].image}" class="pokemon-img">`);
					var miniInfo = $(`<div class="miniInfo">`);
					miniInfo.append(`<h3><span class="pokeName"><span></h3>`);
					miniInfo.append(`<h3><span class="pokeNumber"><span></h3>`);
					miniDex.append(miniInfo);
					miniDex.append(`<img src="assets/images/pokeball.png" class="pokeball-img">`);
					$("#results").append(miniDex);
				}

				$(".pokeName").each(function(i){
					$(this).html(pokemon[i].name);
				})

				$(".pokeNumber").each(function(i){
					$(this).html(pokemon[i].number);
				})	

			});
		});
	});			
})