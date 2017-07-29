

// VARIABLES

var topics = ['babies', 'happy', 'bubbles', 'surprise', 'disney', 'hooman'] // list of buttons to click 
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=af0d7cbc0cec43f59a53dbf3e26aa47a&q=" + searchItem + "&limit=10&offset=0&rating=PG&lang=en";
var searchItem = $('#input').val(); // this is the user input on the HTML form
var betaGifDiv; // this is the div inside of 'alphaGifDiv' and is created for each gif
var rating; // created <p> attribute for the rating
var imageStill; // link for the still image of the gif
var imageActive; // link for the animated gif
var imageState; // 'still' or 'active'; used for true or false

//========================================================
// CREATE BUTTONS

// -----default buttons-----:

// create buttons from the 'topics' array
function createButton() {
	// clear the div each time so there are no repeats
	$('#buttonDiv').empty();
	// for every item in array 'topics', make a button
	for (var i = 0; i < topics.length; i++) {
		$('#buttonDiv').append("<button class='button' value='" + topics[i] + "'>" + topics[i] + "</button>");
	}
}
// call 'createButton' when page loads
createButton();

// -----manual buttons-----:

// when the 'search button' is clicked... activate 'createButton' and 'getGIF' functions
$('#search').on('click', function(event) {
	// prevent default with 'submit' button
	event.preventDefault();
	// define searchItem as the value of the input form
	searchItem = $('#input').val();
	// add the value of the input (searchItem) to the 'topics' array
	topics.push(searchItem);
	// call the createButton function to refresh the list
	createButton();
	// empty out the input form
	getGIF();

})
//========================================================
// MANUAL BUTTON SEARCH

// when button is clicked, search in giphy
$('.button').on('click', function(event) {
	searchItem = $(this).val();
	getGIF();
})

//========================================================
// SHOW GIF

// set function 'getGIF' that can be called later
function getGIF() {
	// first, clear the div to prevent repeat
		$("#alphaGifDiv").empty();
	queryURL = "https://api.giphy.com/v1/gifs/search?api_key=af0d7cbc0cec43f59a53dbf3e26aa47a&q=" + searchItem + "&limit=10&offset=0&rating=PG&lang=en"
	$.ajax({
		url: queryURL
		, method: "GET"
	}).done(function(response) {
		console.log(this.url);

		// loop through this function to get all ten results on giphy
		for (var i = 0; i < 10; i++) {

			//CREATE AND GET GIFDIV
			// make a div to put the <img> and the rating
			betaGifDiv = document.createElement('div');
			// append it to the main <div> in the HTML
			document.getElementById("alphaGifDiv").appendChild(betaGifDiv);

			//CREATE AND GET RATING
			// make a <p> tag to put the rating
			rating = document.createElement('p', response.data[i].rating);
			// append to 'betaGifDiv'
			betaGifDiv.appendChild(rating);

			//CREATE AND GET IMAGE
			// make <img> tag to put the gif
			image = document.createElement('img');
				image.setAttribute("src", response.data[i].images.fixed_height_still.url);
				image.setAttribute("data-still", response.data[i].images.fixed_height_still.url);
				image.setAttribute("data-active", response.data[i].images.original.url);
				image.setAttribute("data-state", "still");
				image.setAttribute("width", "200");
			// append to 'betaGifDiv'
			betaGifDiv.appendChild(image);
//========================================================
// STILL / ACTIVE IMAGES

				$('img').on('click', function() {

					// set variables
					imageState = $(this).attr('data-state');
					imageStill = $(this).attr('data-still');
					imageActive = $(this).attr('data-active');

					// if the image is 'still', set src to 'active'
					if (imageState === 'still') {
						$(this).attr('src', imageActive);
						$(this).attr('data-state', 'active');
					} else if (imageState === 'active') {
						$(this).attr('src', imageStill);
						$(this).attr('data-state', 'still');
					}
				})
		}
	})
}


			











