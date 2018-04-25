$( document ).ready(function() {
//Api- key = 'a9a17bf634eb7ab8498dabf5969d0ea0'
console.log("Doc has loaded!");

 
$("#submit").click( function() {
      console.log("Submit button was clicked!");
      callAPI(getInput());

    });
$(document).keypress(function(e) {
    if(e.which == 13) {
    console.log("You pressed enter!");
      callAPI(getInput());
    }
});
function getInput() {
	console.log("Get input was called!");
	return $('#query').val();
}

// Event handler for calling the API using the user's search query
function callAPI(query) {
	$.get("http://food2fork.com/api/search?key=a9a17bf634eb7ab8498dabf5969d0ea0",
		{'q': query,
		'limit': '200'},

		function(data) {
			console.log("Call API was called!");
			processData(data);
		},'json'
	);
}

//Should get list of ingredients for a specific Recipe using the ID.
function getIngredients(data) {
	$.get("http://food2fork.com/api/get?key=a9a17bf634eb7ab8498dabf5969d0ea0",
		{'rId': data,
		'limit': '200'},
		function(data) {
			console.log("Getting ingredients.");
			process(data);
		},'json'
	);
}

	$( ".food-item" ).click(function() {
    	console.log("Recipe was clicked!");
      	getIngredients(getRecipeId())
	});

function getRecipeId() {
	console.log("Getting recipe ID.");
	var recipeID = $(this).attr("alt");
	console.log(recipeID);
	return recipeID
}

function process(data) {
	for (var i = 5; i >= 0; i--) {
		console.log(data)
		console.log(data.recipes[i].ingredients)
		var title = data.recipes[i]['title'];
		var food_img = data.recipes[i]['image_url'];
		var recipe_ingredients = data.recipes[i]['ingredients'];
	}
}

function foodClicked() {
	console.log("Recipe was clicked!");
}



// This function will go through the data object and take out the image and recipe link.
function processData(data){
	//Clears the table after each submit for a new artists search.
	$('#recipes').empty();


	var htmlElements = "";

	for (var i = 29; i >= 0; i--) {
		var title = data.recipes[i]['title'];
		var food_img = data.recipes[i]['image_url'];
		var recipe_link = data.recipes[i]['source_url'];
		var recipe_id = data.recipes[i]['recipe_id'];

   		htmlElements += '<div><img id="food_image" id="' + recipe_id + '" src="' + food_img + '"></div><div><a href="'+ recipe_link +'"target="_blank"><img class="link" src="./static/img/link.png" style="width:20px !important;height:20px !important; border:none"></a></div>';

   		// htmlElements += '<div class="food-item"><img id="' + recipe_id + '" src="' + food_img + '"><br><a href="'+ recipe_link +'"target="_blank"><b>Recipe Link</b></a><br><br><a href=./templates/base.html>Save to profile.</a></div>';
   		
	}

	var container = document.getElementById("recipes");
	// var container = document.getElementsByTagName("section");
	console.log(container);
	container.innerHTML = htmlElements;

	}

});
