$( document ).ready(function() {
//Api- key = 'a9a17bf634eb7ab8498dabf5969d0ea0'
console.log("Doc has loaded!");

$("#submit").click( function() {
      console.log("Submit button was clicked!");
      callAPI(getInput());

    });
function getInput() {
	console.log("Get input was called!");
	return $('#query').val();
}

// Event handler for calling the SoundCloud API using the user's search query
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

// This function will go through the data object and take out the album cover, title, artists name and url (for playing)
function processData(data){
	//Clears the table after each submit for a new artists search.
	// $('#bands').empty();
	// var style_div = document.getElementsByClassName("waterfall");
	var pin = document.getElementById("pin");
	var new_recipe = document.createElement("ul");
	// new_recipe.setAttribute("class" , "list-group")
	var new_list = document.createElement("li");
	// new_list.setAttribute("class" , "list-group-item")
	var new_img = document.createElement("img");
	
	console.log(new_recipe)
	console.log(new_list)

	for (var i = 10; i >= 0; i--) {
		// console.log(data)
		var title = data.recipes[i]['title'];
		var food_img = data.recipes[i]['image_url'];
		if (food_img == null) {
			food_img = 'img/1.jpg'
		}
		// new_img.src = food_img
		new_list.appendChild(new_img).src=food_img
		new_recipe.appendChild(new_list);
		// new_recipe.appendChild(pin);
		// document.body.appendChild(new_recipe);
		$("div.waterfall").append(new_recipe);
		$('#recipes').append("<tr><td> <img src='" + food_img +"'></td>");
	}
	
		// var ingredients = data.recipes[i]['ingredients'];
		// var recipe_link = data.recipes[i]['source_url'];


		
		// new_recipe.setAttribute("class" , "list-group-item")
		


		// $('.list-group').append("<li class='list-group-item'><img src='" + food_img + "'/></a></li>");
		// $('#recipes').append("<tr><td> <img src='" + food_img +"'></td>");
		// $('#recipes').append("<tr><td> <img src='" + food_img +"'></td><td>" + title + "</td><td>" + ingredients + "</td><td>");
	}



})