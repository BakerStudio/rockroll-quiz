var selectedAnswer = null;

function initialSet() {
	var set = {
        items: [
                {q: 'The Beatles actively recorded and released records during which decade?',
                 	a0: '1960\'s - 1970',
               		a1: '1970\'s - 1980',
               		a2: '1980\'s - 1990',
               		a3: '1990\'s - 2000',
               		correct: 0, 
                  useranswer: "" },

               	{q: 'Which progressive rock group is a member of the Rock-and-Roll Hall of Fame?',
               		a0: 'Pink Floyd',
               		a1: 'Jethro Tull',
               		a2: 'Yes',
               		a3: 'Procol Harum',
               		correct: 2, 
                  useranswer: "" },

               	{q: 'Which is the best-selling single of all time?',
               		a0: 'Bohemian Rhapsody by Queen',
               		a1: 'White Christmas by Bing Crosby',
               		a2: 'Hey Jude by The Beatles',
               		a3: 'Stairway to Heaven by Led Zeppelin',
               		correct: 1,
                  useranswer: "" },

                {q: 'In 1976, George Harrison was sued for plagarism for his song My Sweet Lord. Which group and song was it claimed that he copied?',
                  a0: 'Steam, Na Na Hey Hey Kiss Him Goodbye',
                  a1: 'Sweet Caroline, Neil Diamond',
                  a2: 'Laura Nyro, Wedding Bell Blues',
                  a3: 'The Chiffons, He\'s So Fine',
                  correct: 3,
                  useranswer: "" },

                {q: 'Which reggae hit song was recorded at FAME Studios in Muscle Shoals, Alabama?',
                  a0: 'Bob Marley, Buffalo Soldier',
                  a1: 'UB40, Red Red Wine',
                  a2: 'Jimmy Cliff, The Harder They Come',
                  a3: 'Johnny Nash, I Can See Clearly Now',
                  correct: 2,
                  useranswer: "" },

                {q: 'Who is considered the Godfather of Soul?',
                  a0: 'Smokey Robinson',
                  a1: 'James Brown',
                  a2: 'Sam Cooke',
                  a3: 'Luther Vandross',
                  correct: 1,
                  useranswer: "" },

                {q: 'San Francisco was the Capital of Psychedelia in the late 1960s. Which famous group originated there?',
                  a0: 'The Beach Boys',
                  a1: 'The Doors',
                  a2: 'The Jefferson Airplane',
                  a3: 'Iron Butterfly',
                  correct: 2,
                  useranswer: "" },

                {q: 'Who is NOT considered to be a pop diva?',
                  a0: 'Beyonce Knowles',
                  a1: 'Mariah Carey',
                  a2: 'Grace Slick',
                  a3: 'Rihanna',
                  correct: 2,
                  useranswer: "" }
                ]
	}
	return set;
}


function randomCorrectRemark() {
  var array = [ "Excellent! You really know your stuff.",
                "Correct! You are on a roll...",
                "Wow! You are a born rock-n-roller.",
                "Correct! Are there any questions you don't know?",
                "Great! Is your name Casey Casem?",
                "Whoa! That's right. You have hidden depths.",
                "Perfect! You are a rock star.",
                "Correct...making room for you in the VIP lounge.",
                "Perfecto! You get a promotion from roadie to tour manager."
              ]

  return (array[Math.floor((Math.random() * 100) % array.length)]);
}


function randomWrongRemark(set, current) {
  var array = [ "Wrong. You don't listen to the radio very much, do you?",
                "Wrong. Better luck on the next question.",
                "Well...not really. Try the next one.",
                "Not quite. Keep your day job.",
                "Yikes. You didn't bet any money on this, did you?",
                "Whoa, dude. Step back.",
                "That\'s not it. Stick with listening to CSPAN or talk radio.",
                "Don't be ashamed. Some people just aren't musical.",
                "Nope. Were you paying attention during Rock School?",
                "Sorry. Maybe you know more about Lawerence Welk and the Big Band era?",
                "No way! Maybe you choke on tests."
              ];
  var t;

  switch (set.items[current].correct) {
    case 0:
      t = set.items[current].a0;
      break;
    case 1:
      t = set.items[current].a1;
      break;
    case 2:
      t = set.items[current].a2;
      break;
    case 3:
      t = set.items[current].a3;
    }      

  return (array[Math.floor((Math.random() * 100) % array.length)] + 
    " The correct answer is: " + t + ".");
}


function displayMessage(msg) { 
  //
  //  update with the results of answering
  //  the question. 
  //
  $('p.js-message-text').text(msg);
}


function displaySummary(msg) {
  //
  //  render with the calculated score
  //
  $('.js-summary').text(msg); 
}


function checkRadio(response) {
  //
  //  save the response that was clicked
  //
  selectedAnswer = response;
}


function displayQA(set, number) {
  //
  //  clear the radio buttons of their previous answer
  //
  $('#r0').prop('checked', false);
  $('#r1').prop('checked', false);
  $('#r2').prop('checked', false);
  $('#r3').prop('checked', false);
  //
  //  render the questions and answers from the question set
  //
  $('.question-container').text(set.items[number].q);
  $('label[for=r0]').html(set.items[number].a0);
  $('label[for=r1]').html(set.items[number].a1);
  $('label[for=r2]').html(set.items[number].a2);
  $('label[for=r3]').html(set.items[number].a3);
  //
  //  render the footer with the current question counter
  //
  $('.js-footer-counter').html('Question ' + (number+1) + ' of ' + set.items.length);
}


$(function() {
	'use strict';

	var set = initialSet();  //initialize the question set
  var successclip; // use to play the "ta-da" sound after correct answer
  var wrongclip;   // use to play the sad trombones after wrong answer


  //
  //  Display the first question
  //
  var currentquestion = 0;
  displayQA(set, currentquestion);
	
	//
	//  Event handler to fire when user clicks "check answer"
	// 
	$('.button-container').on('click', '.js-check', function(event) {
		event.preventDefault();
		//
    //  Check to see that some, any answer has been selected. 
    //  If not then display error message and let the user try again.
    //
    if (selectedAnswer == null) {
        // 
        //  Let the user try again 
        //
        displayMessage("Please select an answer...");
    } else {
        //
        //  An answer has been selected so check if it is correct
        //
        if (selectedAnswer == set.items[currentquestion].correct) {
            displayMessage(randomCorrectRemark());
            set.items[currentquestion].useranswer = true;
            //
            //  Play the success sound
            //
            successclip = document.getElementById("successclip").play(); 
            //
            //  change the button to "next"
            //
            $('.js-check').addClass('hidden');
            $('.js-next').removeClass('hidden');
        } else {
            // 
            //  user selected wrong answer
            //
            displayMessage(randomWrongRemark(set, currentquestion));
            set.items[currentquestion].useranswer = false;
            //
            //  Play the sad trombones
            //
            wrongclip = document.getElementById("wrongclip").play();
            //
            //  change the button to "next"
            //
            $('.js-check').addClass('hidden');
            $('.js-next').removeClass('hidden');
          } 
      }      
	});  // end of check answer button event handler

  //
  //  Event handler to fire when user presses the "next" button
  //
  $('.button-container').on('click', '.js-next', function() {
      //
      //  Clear the previous message and the radio buttons of the 
      //  previous answer.
      //
      displayMessage("");
      currentquestion += 1;
      selectedAnswer = null;
      if (currentquestion < set.items.length) {
        //
        //  Load and render the next question in the set
        //
        displayQA(set, currentquestion);
        //
        //  change the button to "check answer"
        //
        $('.js-check').removeClass('hidden');
        $('.js-next').addClass('hidden');
      } else {
        //
        //  End of the set list. Calculate the percentage of
        //  correct responses by iterating through the set. Display summary score. 
        //
        var correctcount = 0;
        for (var i=0; i<set.items.length; i++) {
          if (set.items[i].useranswer) {
            correctcount += 1;
          } 
        }
        var msg = "You answered " + correctcount + " out of " + set.items.length + 
          " correctly. Your score is: " + Math.round((correctcount / set.items.length) * 100) + "%";
        displaySummary(msg);
        //
        //  Hide both the action buttons and the
        //  footer and expose the 'play again' button 
        //
        $('.js-check').addClass('hidden');
        $('.js-next').addClass('hidden');
        // $('.js-again').removeClass('hidden');
        $('.js-footer-counter').addClass('hidden');
        // 
        //  clear the question and answer sections
        //
        $('.question-container').addClass('hidden');
        $('.answer-container').addClass('hidden');
      }
  }) // end of next button event handler

})  //end of function()