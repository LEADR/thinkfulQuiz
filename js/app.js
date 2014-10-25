$(document).ready(function(){

  function Quiz() {

    // Question Constructor
    function Question(question, choices, answer) {
      this.question = question;
      this.choices = choices;
      this.answer = answer;
      this.check = function(index) {
        return answer == index;
      };
    }
    this.questions = [
      new Question("Approximately how many square miles comprise the city limits of San Francisco?", [47, 29, 102, 60], 0),
      new Question("What bridge connects the city with the East Bay and suffered a partial collapse during the earthquake of 1989?", ["Golden Gate Bridge", "Richmond Bridge", "Bay Bridge", "Carquinez Straits"], 2),
      new Question("What is the only National Historic Landmark that isn't stationary?", ["Electric Streetcar Line", "San Francisco Cable Cars", "San Francisco Trolleys", "San Francisco 49ers"], 1),
      new Question("What is the other, lesser known name given to the neighborhood known as the Castro District?", ["Noe Valley", "Eureka Valley", "Mission District", "Northern Haight Ashbury"], 1),
      new Question("Which geographical feature marks the highest elevation in San Francisco?", ["Sutro Tower", "Twin Peaks", "Muir Woods", "Mount Davidson"], 3)
    ];
    this.currentQuestion = 0;
    this.initQuestion = function() {
      $("label").remove();
      if (quiz.currentQuestion === quiz.questions.length) {
        return;
      } else {
        $("h2").text("Question #" + (quiz.currentQuestion + 1));
        $('p').text(quiz.questions[quiz.currentQuestion].question);
        for (var i in this.questions[this.currentQuestion].choices) {
          var label = $("<label>").addClass("optionLabel").text(quiz.questions[quiz.currentQuestion].choices[i]);
          var option = $("<input>").addClass("radioInput").attr("type", "radio").attr("name", "option").attr("value", quiz.questions[quiz.currentQuestion].choices[i]);
          label.prepend(option);
          $(".quiz").append(label);
        }
      }
    };
  }

  var quiz = new Quiz();

  $("#startQuiz").click(function() {
    this.remove();
    var submitButton = $("<a>").attr("id", "submitAnswer").addClass("button").text("Submit Answer");
    $(".quiz").append(submitButton);
    quiz.initQuestion();

    function checkSubmission() {
      var checked = $(":checked");
      var choiceIndex = $(":radio").index(checked);
      if (quiz.questions[quiz.currentQuestion].check(choiceIndex)) {
        quiz.currentQuestion++;
        quiz.initQuestion();
        $("#feedback").text("Correct!").animate({color: "#FFFFFF"}, 1000, function() {
          if (quiz.currentQuestion >= quiz.questions.length) {
            $("#feedback").text("You win! Great job!");
          }
          $("#feedback").text("Question #" + (quiz.currentQuestion + 1));
        });
      } else {
        $("#feedback").text("Sorry, nope. Try again!").animate({color: "#FFFFFF"}, 1000, function() {
          $("#feedback").text("Question #" + (quiz.currentQuestion + 1));
        });
      }
      console.log(quiz.currentQuestion);
      if (quiz.currentQuestion >= quiz.questions.length) {
        $("#feedback").text("You win! Great job!");
        $("p").text("");
        $("#submitAnswer").off().text("Try again?").attr("id", "tryAgain");
        $("#tryAgain").click(function() {
          quiz = new Quiz();
          quiz.currentQuestion = 0;
          this.remove();
          var submitButton = $("<a>").attr("id", "submitAnswer").addClass("button").text("Submit Answer");
          $(".quiz").append(submitButton);
          $("#submitAnswer").click(checkSubmission);
          quiz.initQuestion();
        });
      }
    }
    $("#submitAnswer").click(checkSubmission);
  });
});
