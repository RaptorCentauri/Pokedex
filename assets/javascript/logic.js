$(document).ready(function() {
    
	var colorArray = [];
	var typeArray = [];

	$("#search-button").on("click", function() {
		var pokemon = $("#pokemon").val().trim(); //if searching single pokemon data
		var color = $("#colors").val().trim();
		var type = $("#type").val().trim();
		// var queryURL = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
		var queryURL = "https://pokeapi.co/api/v2/pokemon-color/" + color;

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(data) {
			console.log(data);
			for (var i = 0; i < data.pokemon_species.length; i++) {
				colorArray.push(data.pokemon_species[i].name);
			}
			console.log(colorArray);
			// $("#pokePic").attr("src",data.sprites.front_default);
		});

		$.ajax({
			url: "https://pokeapi.co/api/v2/type/" + type,
			method: "GET"
		}).done(function(data) {
			console.log(data);
			// console.log(data.pokemon[1].pokemon.name);
			for (var i = 0; i < data.pokemon.length; i++) {
				typeArray.push(data.pokemon[i].pokemon.name);
			}
			console.log(typeArray);
		});

	});


// https://pokeapi.co/api/v2/pokemon-species/{id or name}
// api/v2/pokemon/{id or name} ---> sprites
// api/v2/pokemon-color/{id or name}
// api/v2/pokemon-habitat/{id or name}
// api/v2/type/{id or name}


//basically create an array for all parameters and check which pokemon are in all arrays ???
//create new array with matching pokemon and loop through to get divs/images
//if field null then skip

});