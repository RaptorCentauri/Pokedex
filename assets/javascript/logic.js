$(document).ready(function() {
    var pokemon = {};
	var colorArray = [];
	var	typeArray = [];
	var	regionArray = [];
	var matchesArray = [];
	var count = 0;
	var originalResultsHTML = $("#results").html();

	var ajaxColor = $.Deferred();
	var ajaxType = $.Deferred();
	var ajaxRegion = $.Deferred();


	// function buildMiniList(){
	// 	$("#results").append(`<div class="miniResult">`);
	// 	$(".miniResult").append(`<img src="assets/images/pokemon.png" class="pokemon-img">`);
	// 	$(".miniResult").append(`<div class="miniInfo">`);
	// 	$(".miniInfo").append(`<h3><span class="pokeName"><span></h3>`);
	// 	$(".miniInfo").append(`<h3><span class="pokeNumber"><span></h3>`);
	// 	$(".miniResult").append(`<img src="assets/images/pokeball.png" class="pokeball-img">`);
	// }

	function simpleEntry(i){
		pokemon[i]={
			name: matchesArray[i],
			image: "assets/images/pokemon.png",
			number: i,
		}
	}


    function initalize() {
    	ajaxColor = $.Deferred();
		ajaxType = $.Deferred();
		ajaxRegion = $.Deferred();
		$("#results").html(originalResultsHTML);
		pokemon = {};
		colorArray = [];
		typeArray = [];
		regionArray = [];
		matchesArray = [];
		count = 0;
	};

	// $("#search-button").on("click", function() {
	// 	console.log("-------------------");
	// 	initalize();

	$("#search-button").on("click", function() {

		initalize();
		console.log("--------BEGIN SEARCH-----------");
		// var pokemon = $("#pokemon").val().trim(); //if searching single pokemon data
		var color = $("#colors").val();
		var type = $("#type").val();
		// var region = $("#region").val();
		// var queryURL = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
		var queryURL = "https://pokeapi.co/api/v2/pokemon-color/" + color;



//Ajax call for Pokemon Color
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(data) {
			console.log(data);
			for (var i = 0; i < data.pokemon_species.length; i++) {
				colorArray.push(data.pokemon_species[i].name);
			}
			console.log(colorArray);
			ajaxColor.resolve();
			// $("#pokePics").attr("src",data.sprites.front_default);
		});

//===========================================


//Ajax call for Pokemon Type
		$.ajax({
			url: "https://pokeapi.co/api/v2/type/" + type,
			method: "GET"
		}).done(function(data) {
			// console.log(data);
			for (var i = 0; i < data.pokemon.length; i++) {
				typeArray.push(data.pokemon[i].pokemon.name);
			}
			console.log(typeArray);
			ajaxType.resolve();
		});

//================================


//Ajax call for Pokemon Region
		// $.ajax({
		// 	url: "https://pokeapi.co/api/v2/generation/" + region,
		// 	method: "GET"
		// }).done(function(data) {
		// 	// console.log(data);
		// 	for (var i = 0; i < data.pokemon_species.length; i++) {
		// 		regionArray.push(data.pokemon_species[i].name);
		// 	}
		// 	console.log(regionArray);
		// 	ajaxRegion.resolve();
		// });		

//=====================================





		// need to delay intersection until its done running....
		var findMatches = $.when(ajaxColor,ajaxType);
		// var findMatches = $.when(ajaxColor,ajaxRegion,ajaxType);


		findMatches.done(function() {
			matchesArray = _.intersection(colorArray,typeArray);
			// matchesArray = _.intersection(colorArray,typeArray,regionArray);


			console.log(`Matches on next line meet all criteria!!!!`);
			console.log(matchesArray);
			$("#results").empty();


			for (var i = 0; i < matchesArray.length; i++) {
				simpleEntry(i);
				console.log(pokemon[i]);
				// pokeName = matchesArray[i];
				// pokeNumber = i; // this needs to be fixed. should get the actuall number of the pokemon.		
				// pokeImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + matchesArray[i] + ".png';				
			}


			for (var i = 0; i < matchesArray.length; i++){
				var miniDex = $(`<div class="miniResult">`);
				miniDex.append(`<img src="assets/images/pokemon.png" class="pokemon-img">`);
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


// });
// });














// image = $("<img>");
// pokePic = image.attr("src","https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+matchesArray[i]+".png")
// $("pokePics").append(pokePic);








	// https://pokeapi.co/api/v2/pokemon-species/{id or name}
// api/v2/pokemon/{id or name} ---> sprites


// it runs sooo..................... sloooooow.............

//basically create an array for all parameters and check which pokemon are in all arrays ???
//create new array with matching pokemon and loop through to get divs/images
//if field null then skip