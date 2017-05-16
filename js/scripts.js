///////////////////////////////////
////////////////GLOBALS///////////
/////////////////////////////////



$(document).ready(function(){
	///////////////////////////////////
	//////////MAIN FUNC VARS//////////
	/////////////////////////////////
	const freshDeck = createDeck();
	var theDeck = freshDeck;
	var playersHand = [];
	var dealersHand = [];

	function createDeck(){
		// local var newDeck, no one else know about this
		var newDeck = [];
		// local var that will not be changed, noone can see it but me
		const suits = ['h','s','d','c'];
		// loop for suits (outter loop)
		for (let s = 0; s < suits.length; s++){
			// loop for card values (inner loop)
			for (let c = 1; c <= 13; c++){
				newDeck.push(c + suits[s]);
			}
		}
		return newDeck;
	}

	$('.deal-button').click(function(){
		console.log("User clicked deal!!!");
		// shuffle the deck
		theDeck = shuffleDeck();
		// update the player and dealers hand
		// the player always gets the first and third card in the deck
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		placeCard('player',1,playersHand[0]);
		placeCard('dealer', 1,dealersHand[0]);
		placeCard('player',2,playersHand[1]);
		placeCard('dealer', 2,dealersHand[1]);
	});

	function placeCard(who,where,cardToPlace){
		var classSelector = '.' + who + '-cards .card-' + where;
		$(classSelector).html('<img src="cards/' + cardToPlace + '.png">');
	}

	function shuffleDeck(){
		// loop a big number of times
		// each time through switch two numbers
		for (let i = 0; i < 50000; i++){
			var randomCard1 = Math.floor(Math.random() * theDeck.length);
			var randomCard2 = Math.floor(Math.random() * theDeck.length);
			// stash the value of theDeck[randomCard1] so it isnt lost after the first overwrite
			var tempCardHolder = theDeck[randomCard1];
			// switch theDeck[randomCard1] with theDeck[randomCard2]
			theDeck[randomCard1] = theDeck[randomCard2];
			theDeck[randomCard2] = tempCardHolder;
		}
		return theDeck;
	}
});



