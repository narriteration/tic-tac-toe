

    $(document).ready(function() {

      var player = 1;
        var board = $('#board');
      var messages = $('.messages');
      var turn = $('.turn'); //
      var anyBox = $('.col-xs-4');

/*
NOTES TO SELF:

replaced $('table') with $('#board') ?

replaced turn with isTurn
replaced table with board
replaced $('td') with $('.col-cs-4')
created new variable to be able to select individual boxes (var = anyBox)
*/

      displayNextPlayer(turn, player);

// THIS CHUNK OF CODE CONTROLS WHAT HAPPENS ON CLICK OF ANY BOX ON THE GAME BOARD

      $('.col-xs-4').click(function() { // hey jQuery, point to elements with the class of 'col-xs-4'. on click, run the function below:
        anyBox = $(this); // using jQuery point to THIS, and set THIS in jQuery as the value of javascript variable named anyBox TODO: lookup this in jQuery
        var state = getState(anyBox); // create and set the value of state variable to the getState function, with 'anyBox' as the single argument
        if(!state) { // if NOT state (i.e. state === False) then do the following:
            var pattern = definePatternForCurrentPlayer(player); // create and set a variable called pattern to the function of "definePatternForCurrentPlayer" with "player" as the single argument
            changeState(anyBox, pattern); // call function "changeState" with 2 arguments (parameters?): TODO: LOOKUP!
            if(checkIfPlayerWon(board, pattern)) { // if the function of "checkIfPlayerWon" on elements with the #board id, and patter TODO: LOOKUP what second argument does/means in this if statement
                messages.html('Player ' + player + ' has won.'); // on the messeges element, get the html and set to the contents of the parenthesis, this will display on the board for the players.
                turn.html(''); // on the turn element (object?), set the html to an empty string. This will display on the board for the players
            } else { // ELSE (checkIfPlayerWon is FALSE), then do the following:
                player = setNextPlayer(player); // update value of player variable using the function setNextPlayer (of player)
                displayNextPlayer(turn, player); // and run the function "displayNextPlayer", passing in the turn and player variables TODO: is this the right translation?
            }
        } else { // ELSE (if state === true to begin with), then do the following:
          messages.html('Sorry charlie, this box is already played.'); // on the messages object, set the (inner) HTML to the string specified in the parenthesis
        }

      });


// THIS CHUNK OF CODE CONTROLS ALL ELEMENTS WITH THE CLASS OF "RESET", and WHAT HAPPENS WHEN THEY ARE CLICKED

      $('.reset').click(function() { // hey jQuery, get elements with the class of "reset", and on click do the following:
        player = 1; // declare a variable named player and set its value to 1 (==>resets player count, starting with 1)
        messages.html(''); // on the messages object, point to the html and set it to an empty string (==>the user sees no value next to "turn")
        reset(board); // run the reset function, using the board variable as the only argument (pass in board to the function 'reset')
        displayNextPlayer(turn, player); // run the displayNextPlayer function with 2 arguments: turn, player
      });

    });

// BELOW ARE ALL THE FUNCTIONS! WOOHOO!
/*
- getState
- definePatternForCurrentPlayer
- changeState
- checkIfPlayerWon
- setNextPlayer
- displayNextPlayer
- reset
*/


    function getState(anyBox) { // declare a function called getState, it has one argument called anyBox
      if(anyBox.hasClass('cross') || anyBox.hasClass('circle')) { // IF one of the following === true, go to the next line:
        return 1; // for TRUE (box has a class of one of the players symbols), return 1 to the function's value
      } else { // FOR FALSE (box does not have a class assigned yet)
        return 0; // return 0 to the function's value
      }
    }

    function changeState(anyBox, pattern) { // declare a function called "changeState", set 2 variables as its arguments: anyBox, pattern
      return anyBox.addClass(pattern); // return: on the anyBox object, add the class specified by the pattern variable
    }

    function definePatternForCurrentPlayer(player) { //
      if(player == 1) { // if the value of player variable is LOOSELY EQUAL TO (ughk) the number 1, then do the following:
        return 'cross'; // return the string of 'cross' when the function evaluates
      } else { // ELSE if value of player evaluates to FALSEY
        return 'circle'; // return the string of 'circle' when the function evaluates
      }
    }

    function setNextPlayer(player) {
      if(player == 1) { // evaluate if truthy or falsey: player value is currently 1
        return player = 2; // if truthy: return player variable, now set to a value of 2
      } else { // if player value is currently NOT set to 1...
        return player = 1; // return the player variable, now set to a value of 1
      }
    }

    function displayNextPlayer(turn, player) { // declare a function called displayNextPlayer with 2 arguments: turn, player
      turn.html( 'Player turn: ' + player ); // on the turn object/element: point to the HTML and set it to read on the screen: "Player turn: " +
    }

    function checkIfPlayerWon(board, pattern) { // declare a function called "checkIfPlayerWon" with 2 arguments: board, pattern (evaluate if there is a winning combination of patterns on the current board)

      var won = 0; // declare a variable named won and set its value equal to 0

      if(board.find('#box1').hasClass(pattern) && board.find('#box2').hasClass(pattern) && board.find('#box3').hasClass(pattern)) {
        won = 1;
      } else if (board.find('#box1').hasClass(pattern) && board.find('#box4').hasClass(pattern) && board.find('#box7').hasClass(pattern)) {
        won = 1;
      } else if (board.find('#box1').hasClass(pattern) && board.find('#box5').hasClass(pattern) && board.find('#box9').hasClass(pattern)) {
        won = 1;
      } else if (board.find('#box4').hasClass(pattern) && board.find('#box5').hasClass(pattern) && board.find('#box6').hasClass(pattern)) {
        won = 1;
      } else if (board.find('#box7').hasClass(pattern) && board.find('#box8').hasClass(pattern) && board.find('#box9').hasClass(pattern)) {
        won = 1;
      } else if (board.find('#box2').hasClass(pattern) && board.find('#box5').hasClass(pattern) && board.find('#box8').hasClass(pattern)) {
        won = 1;
      } else if (board.find('#box3').hasClass(pattern) && board.find('#box6').hasClass(pattern) && board.find('#box9').hasClass(pattern)) {
        won = 1;
      } else if (board.find('#box3').hasClass(pattern) && board.find('#box5').hasClass(pattern) && board.find('#box7').hasClass(pattern)) {
        won = 1;
      }
      return won;
    }

    function reset(board) { // declare a function called reset with one argument: board
      board.find('.col-xs-4').each(function() { // on the board object, use jQuery to point to all elements containing the class of ".col-xs-4", and for each of those elements run the following function:
        $(this).removeClass('circle').removeClass('cross'); // hey jQuery, for "THIS" element that you're currently pointing to, removeClass of .circle and removeClass of .cross
      }); // all elements on board will be cleared of all circle or cross classes
    }




    /*
    // wait for the DOM to finish loading
    $(document).ready(function() {
      // all code to manipulate the DOM
      // goes inside this function

        // print to console that app.js is connected successfully
        console.log("sanity check: app.js is connected! phew.");

        // GET all divs with the class of col-xs-4 and set the inner HTML to "BLANK"
        $(  "div[class='col-xs-4 box']"  ).html("BLANK")
        console.log("inner html of ALL boxes on playing board = blank");


        // ALERT the player that the game is ready to begin
        alert("Click on any blank box to start your game.");
        console.log("User has been prompted to click anywhere to start the game");

        // LISTEN for a click to happen on any of the divs with class col-xs-4; and on CLICK, do something
        $(  "div[class='col-xs-4 box']"  ).on('click').addClass('.isClicked');

        $('.isClicked').html("I've been clicked!");

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // set values of all id's (or all values w/in board?) to ""
        // true or false: existEmptyPlayingSpaces?
            // if F ===> function gameIsOver. If hasWinner, alert userSymbol "has won". Else, alert ("no winner this time, click reset to try again")
            // if T ===>

            // listen on the #board for an event: click USE jQuery
            // true or false: click event has happened on #board
                // F ===> loop again through algorithm
                // T ===> on click :
                      // 1. GET the #id of event parent (?)
                      // 2. IF userSymbol is equal to X, SET contents of div #id with X; ELSE, SET contents of div #id with O
                      // 3. console.log("Great play. Who goes next?")

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        /*

                      var boardArea = $('#upper-left');
                      // #upper-center upper-right center-left center-center center-right bottom-left bottom-center bottom-right');

                      boardArea.on('click', hasBeenClicked);



                      $( "div.col-xs-4 box" ).html(function() {
                        var isSetToX = "<em>" + $( "p" ).length + " paragraphs!</em>";
                        return "<p>All new content for " + emphasis + "</p>";
                      });

                      function addClassOfIsclicked() {
                          $('div').on('click', function(){
                              $('col-xs-4 box').addClass('.isClicked');
                              addClassOfIsClicked();
                          });
                      });

        */
