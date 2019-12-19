/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gameplaying, lastDice, setScore, diffscore;

// initialize variables
init();

// anonymous function
document.querySelector('.btn-roll').addEventListener('click', function () {
    if(gameplaying) {
        //1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        /*
        var diceDOM = document.querySelector('#dice1');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice1 + '.png';

        diceDOM = document.querySelector('#dice2');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice2 + '.png';
        */
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //3. Update the round score if the rolled number is not a 1 and not another 6
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next Player
            nextPlayer();
        }
        /*
        if(dice1 === 6 && lastDice === 6) {
            //Player looses score
            scores[activePlayer] = 0;
            // Update the UI
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1;
            roundScore += dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next Player
            nextPlayer();
        }
        lastDice = dice1;
        */
    }
});

/*
function getInput(e) {
    if(e.keyCode === 13) {
        var x = document.getElementById("winning-score").value;
        setScore = x;
        diffscore = true;
        console.log(diffscore);
        console.log(setScore);
        return false;

    }
}
*/

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gameplaying) {
        // Add the current score to global score
        scores[activePlayer] += roundScore;
        lastDice[activePlayer] = roundScore;
        /*
        if(diffscore !== true) {
            setScore = 100;
        }
        */

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;

        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if(input) {
            var winnningScore = input;
        } else {
            winnningScore = 100;
        }

        // Check if the player won the game
        /*
        if(scores[activePlayer] >= setScore) {
        */
        if(scores[activePlayer] >= winnningScore) {
            // End game
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameplaying = false;
        } else if (lastDice[activePlayer] === 6) {
            init();
        } else {
            // Next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    // ternary operator // this is cool same as an if/else statement
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    lastDice = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gameplaying = true;
    setScore = 100;
    diffscore = false;

    // change the css to hide the dice
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// Math object
//var dice = Math.floor(Math.random() * 6) + 1;
//console.log(dice);

// Dom setter
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// Dom getter
//var x = document.querySelector('#score-' + activePlayer).textContent;





