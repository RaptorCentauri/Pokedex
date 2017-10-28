$(document).ready(function() {
    
	var colorArray = [];
	var	typeArray = [];
	var	regionArray = [];
	var matchesArray = [];
	var count = 0;

	var ajaxColor = $.Deferred();
	var ajaxType = $.Deferred();
	var ajaxRegion = $.Deferred();


    function initalize() {
    	ajaxColor = $.Deferred();
		ajaxType = $.Deferred();
		ajaxRegion = $.Deferred();
		colorArray = [];
		typeArray = [];
		regionArray = [];
		matchesArray = [];
		count = 0;
	};

	$("#search_button").on("click", function() {
		console.log("-------------------");
		initalize();

		var pokemon = $("#pokemon").val().trim(); //if searching single pokemon data
		var color = $("#colors").val();
		var type = $("#type").val();
		var region = $("#region").val();
		// var queryURL = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
		var queryURL = "https://pokeapi.co/api/v2/pokemon-color/" + color;

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(data) {
			// console.log(data);
			for (var i = 0; i < data.pokemon_species.length; i++) {
				colorArray.push(data.pokemon_species[i].name);
			}
			console.log(colorArray);
			ajaxColor.resolve();
			// $("#pokePics").attr("src",data.sprites.front_default);
		});

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

		$.ajax({
			url: "https://pokeapi.co/api/v2/generation/" + region,
			method: "GET"
		}).done(function(data) {
			// console.log(data);
			for (var i = 0; i < data.pokemon_species.length; i++) {
				regionArray.push(data.pokemon_species[i].name);
			}
			console.log(regionArray);
			ajaxRegion.resolve();
		});		

		// need to delay intersection until its done running....
		var findMatches = $.when(ajaxColor,ajaxRegion,ajaxType);

		findMatches.done(function() {
			matchesArray = _.intersection(colorArray,typeArray,regionArray);
			console.log(matchesArray);
		});
			
			// for (var i = 0; i < matchesArray.length; i++) {
			// 	image = $("<img>");
			// 	pokePic = image.attr("src","https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+matchesArray[i]+".png")
			// 	$("pokePics").append(pokePic);
			// }
		// });


	});


// https://pokeapi.co/api/v2/pokemon-species/{id or name}
// api/v2/pokemon/{id or name} ---> sprites


// it runs sooo..................... sloooooow.............

//basically create an array for all parameters and check which pokemon are in all arrays ???
//create new array with matching pokemon and loop through to get divs/images
//if field null then skip

});