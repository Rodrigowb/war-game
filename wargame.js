class GameOfWar {

  constructor() {
    this.numbers = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'king', 'queen'];
    this.symbols = ['hearts', 'spades', 'clubs', 'diamonds'];
    this.symbolsIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.cardDeck = [];
    this.cardIndexDeck = {};
    this.playersDeck = {};
    this.playerOneDeck = [];
    this.playerTwoDeck = [];
  };

  generateCardDeck() {
    /**
     * Generates a deck with all 52 cards.
     */
    for (let numbers = 0; numbers < this.numbers.length; numbers++) {
      for (let symbols = 0; symbols < this.symbols.length; symbols++) {
        this.cardDeck.push(`${this.numbers[numbers]} ${this.symbols[symbols]}`);
      }
    }
    return this.cardDeck;
  };

  generateCardIndexDeck() {
    /**
     * Generates an object with the index of each card on the deck.
     * Usefull to use, when the suit does not matter.
     */
    for (let numbers = 0; numbers < this.numbers.length; numbers++) {
      for (let symbols = 0; symbols < this.symbols.length; symbols++) {
        let key = `${this.numbers[numbers]} ${this.symbols[symbols]}`;
        let value = this.symbolsIndex[numbers];
        this.cardIndexDeck[key] = value;
      }
    }
    return this.cardIndexDeck;
  };

  getRandomInt(max) {
    /**
     * Generates a given random number, given a maximum (does not included)
     */
    return Math.floor(Math.random() * max);
  };

  generatePlayersDeck(cardDeck) {
    /**
     * Generates two random sets of cards for the two players.
     */
    this.playerOneDeck = cardDeck.slice();
    while (this.playerOneDeck.length > (cardDeck.length / 2)) {
      let card = cardDeck[this.getRandomInt(cardDeck.length + 1)];
      if (this.playerTwoDeck.indexOf(card) === -1) {
        this.playerTwoDeck.push(card);
        this.playerOneDeck.splice(this.playerOneDeck.indexOf(card), 1);
      }
    }
    this.playersDeck['playerTwo'] = this.playerTwoDeck;
    this.playersDeck['playerOne'] = this.playerOneDeck;
    return this.playersDeck;
  };

  printResult(winner, roundNumber, cardOne, cardTwo, deckOne, deckTwo) {
    /**
     * Generates customized logs for each possibility in the game.
     */
    if (winner === 'tie') {
      let output = `Round ${roundNumber}--TIE--P1: ${cardOne} P2: ${cardTwo}--DECKONE: ${deckOne.length} DECKTWO: ${deckTwo.length}`;
      return console.log(output);
    } else if (winner === 'one') {
      let output = `Round ${roundNumber}--P1 WINS--P1: ${cardOne} P2: ${cardTwo}--DECKONE: ${deckOne.length} DECKTWO: ${deckTwo.length}`;
      return console.log(output);
    } else if (winner === 'two') {
      let output = `Round ${roundNumber}--P2 WINS--P1: ${cardOne} P2: ${cardTwo}--DECKONE: ${deckOne.length} DECKTWO: ${deckTwo.length}`;
      return console.log(output);
    } else if (winner === 'tieWar') {
      let output = `Round ${roundNumber}--TIE ON WAR--P1: ${cardOne} P2: ${cardTwo}--DECKONE: ${deckOne.length} DECKTWO: ${deckTwo.length}`;
      return console.log(output);
    } else {
      return console.log('-----ERROR-----')
    }
  };

  playWar(deckOne, deckTwo, indexDeck) {
    /**
     * Runs the main logic to run the war game.
     * Runs until one of the players have zero cards.
     */
    // Start a round counting
    let roundCount = 1;
    while (deckOne.length !== 0 && deckTwo.length !== 0) {
      // Grab the cards of the round
      let cardOne = deckOne.pop();
      let cardTwo = deckTwo.pop();
      // Check if we continue play or have a war
      if (indexDeck[cardOne] !== indexDeck[cardTwo]) {
        // Player who has the bigger card gets the other players card
        if (indexDeck[cardOne] > indexDeck[cardTwo]) {
          // Player one gets the two cards. Adds the cards to the end of his deck
          deckOne.push(cardTwo, cardOne);
          // Print result
          this.printResult('one', roundCount, cardOne, cardTwo, deckOne, deckTwo);
          // Round ends
          roundCount += 1;
        } else {
          // Player two gets the two cards. Adds the cards to the end
          deckTwo.push(cardOne, cardTwo);
          // Print result
          this.printResult('two', roundCount, cardOne, cardTwo, deckOne, deckTwo);
          // Round ends
          roundCount += 1;
        }
      } else {
        // Add ecursiveness for when we have a tie in the war
        let warAgain = true;
        while (warAgain) {
          // When you have a tie, war.
          // Get the three starting cards of each player (we already get the first, 0 index above)
          let warCardsOne = deckOne.splice(0, 3);
          let warCardsTwo = deckTwo.splice(0, 3);
          // Check if the last card is not equal
          if (indexDeck[warCardsOne[2]] !== indexDeck[warCardsTwo[2]]) {
            // Stop the war agin loop
            warAgain = false;
            // Someone will win the war
            if (indexDeck[warCardsOne[2]] > indexDeck[warCardsTwo[2]]) {
              // Player one has the bigger fourth card
              // Player one wins all the cards. Add the cards to the end of his deck
              deckOne.push(cardTwo);
              warCardsTwo.forEach(element => deckOne.push(element));
              deckOne.push(cardOne);
              warCardsOne.forEach(element => deckOne.push(element));
              // Print the result
              this.printResult('one', roundCount, cardOne, cardTwo, deckOne, deckTwo);
              // Round ends
              roundCount += 1;
            } else {
              // Player two has the bigger fourth card
              // Player two wins all the cards. Add the cards to the end of his deck
              deckTwo.push(cardOne);
              warCardsOne.forEach(element => deckTwo.push(element));
              deckTwo.push(cardTwo);
              warCardsTwo.forEach(element => deckTwo.push(element));
              // Print the result
              this.printResult('two', roundCount, cardOne, cardTwo, deckOne, deckTwo)
              // Round ends
              roundCount += 1;
            }
          } else {
            // Fourth card is equal. Needs to run the war again
            // Get the cards of the player one to the end of his deck
            deckOne.push(cardOne);
            warCardsOne.forEach(element => deckOne.push(element));
            // Get the cards of the layer two to the end of his deck
            deckTwo.push(cardTwo);
            warCardsTwo.forEach(element => deckTwo.push(element));
            // Stops the execution
            this.printResult('tieWar', roundCount, cardOne, cardTwo, deckOne, deckTwo);
            // Round ends
            break;
          }
        }
      }
    }
  };
  executionMain() {
    let cardDeck = this.generateCardDeck();
    let indexDeck = this.generateCardIndexDeck();
    let playersDeck = this.generatePlayersDeck(cardDeck);
    this.playWar(playersDeck.playerOne, playersDeck.playerTwo, indexDeck);
  };
}

// Instatiate a class
let testWar = new GameOfWar();
testWar.executionMain();







