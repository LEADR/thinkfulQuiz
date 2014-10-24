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
  }

  var quiz = new Quiz();

  var currentQuestion = quiz.questions[quiz.currentQuestion];

  function nextQuestion() {
    $("label").remove();
    $('p').text(currentQuestion.question);

    for (var i in currentQuestion.choices) {
      var label = $("<label>").addClass("optionLabel").text(currentQuestion.choices[i]);
      var option = $("<input>").addClass("radioInput").attr("type", "radio").attr("name", "option").attr("value", currentQuestion.choices[i]);
      label.prepend(option);
      $(".quiz").append(label);
    }
  }

  $("#startQuiz").click(function(){
    this.remove();
    var submitButton = $("<a>").attr("id", "submitAnswer").addClass("button").text("Submit Answer");
    $(".quiz").append(submitButton);
    nextQuestion();

    $("#submitAnswer").on("click", function() {
      var checked = $(":checked");
      var choiceIndex = $(":radio").index(checked);
      if (currentQuestion.check(choiceIndex)) {
        quiz.currentQuestion++;
        nextQuestion();
      } else {
        console.log(false);
      }
    });
  });



});
