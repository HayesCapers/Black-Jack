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

		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');
	});

	$('.hit-button').click(function(){
		if (playersHand.length < 6){
			playersHand.push(theDeck.shift());
			placeCard('player',playersHand.length,playersHand[playersHand.length - 1]);
		}
		calculateTotal(playersHand,'player');
		calculateTotal(dealersHand,'dealer');
	});

	$('.stand-button').click(function(){
		// control goes tot eh dealer
		// if dealer has less than 17 delaer must hit-button
		// if dealer has more than 17 dealer must stand
		var dealerTotal = calculateTotal(dealersHand,'dealer');
		while (dealerTotal < 17){
			dealersHand.push(theDeck.shift());
			placeCard('dealer',dealersHand.length,dealersHand[dealersHand.length - 1]);
			dealerTotal = calculateTotal(dealersHand,'dealer');
		}
		checkWin();
	})

	function checkWin(){
		var playerTotal = calculateTotal(playersHand, 'player');
		var dealerTotal = calculateTotal(dealersHand, 'player');
		if playerTotal > 21 //player loses
		if dealerTotal > 21 //dealer loses
		if playersHand.length == 2 && playerTotal == 21 //blackjack!
		if dealersHand.length == 2 && dealerTotal == 21 //blackjack!
		if dealerTotal >= playerTotal //player wins
		else //tie
	}

	function calculateTotal(hand,who){
		// init total at 0
		var total = 0;
		// create a temp value fo rthis card's value
		var thisCardValue = 0;
		// loop through the hand
		// grab the number in the element and add it to the total
		for (let i = 0; i < hand.length; i++){
			thisCardValue = Number(hand[i].slice(0,-1));
			total += thisCardValue;
		}
		var classSelector = '.' + who + '-total-count';
		$(classSelector).html(total);
		return total;
	}

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



