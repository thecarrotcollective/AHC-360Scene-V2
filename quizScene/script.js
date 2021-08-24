var currState = -1

var EXTROVERT = 0
var INTROVERT = 1
var FEELER = 2
var THINKER = 3

var images = {
    "baby"  : "quizScene/images/1-dog.jpg",
    "light" : "quizScene/images/1-mountain.jpg",
    "city" : "quizScene/images/1-city.jpg",
    "moon"   : "quizScene/images/1-math.jpg",
    "sea"   : "quizScene/images/2-beach.jpg",
    "plant"   : "quizScene/images/2-math.jpg",
    "shell"   : "quizScene/images/2-light.jpg",
    "mozai"   : "quizScene/images/2-tech.jpg",
    "color1"   : "quizScene/images/color1.jpg",
    "color2"   : "quizScene/images/color2.jpg",
    "color3"   : "quizScene/images/color3.jpg",
    "color4"   : "quizScene/images/color4.jpg"

    }
var myimages=new Array()
function preloadimages(){
  for (i=0;i<preloadimages.arguments.length;i++){
    myimages[i]=new Image()
    myimages[i].src=preloadimages.arguments[i]
  }
  console.log("loaded")
}
preloadimages("quizScene/images/1-dog.jpg",
"quizScene/images/1-mountain.jpg",
"quizScene/images/1-city.jpg",
"quizScene/images/1-math.jpg",
"quizScene/images/2-beach.jpg",
"quizScene/images/2-math.jpg",
"quizScene/images/2-light.jpg",
"quizScene/images/2-tech.jpg",
"quizScene/images/color1.jpg",
"quizScene/images/color2.jpg",
"quizScene/images/color3.jpg",
"quizScene/images/color4.jpg");


var option1Counter = 0
var option2Counter = 0
var option3Counter = 0
var option4Counter = 0

const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', startGame);


function startGame() {

  document.getElementById('fist-page').style.display = 'none';
  document.getElementById('quiz_id').style.display = 'block';
  document.getElementById('process_id').style.display = 'block';
  // document.getElementById('btnCSS2').style.display = 'none';

  document.body.style.background ="rgb(254, 245, 240)";
  populate();
}
var buttonID = document.getElementById("buttons_id");
function animationButton(getId,className){
  getId.addEventListener("click", function(e){
    e.preventDefault;
    getId.classList.remove(className);
    void getId.offsetWidth;
    getId.classList.add(className);
  }, false);
}
animationButton(buttonID,"buttons")



function populate() {
  if (quiz.isEnded()) {
    showScores();
  } else {

  var element = document.getElementById("question");
  element.innerHTML = quiz.getQuestionIndex().text;

  var choices = quiz.getQuestionIndex().choices;
  shuffle(choices);
  for (var i = 0; i < choices.length; i++) {
    var element = document.getElementById("choice" + i);
    element.innerHTML = images[choices[i]]? '<img id="choiceImage"src="'+images[choices[i]]+'"/>':choices[i];
    guess("btn" + i, choices[i]);

  }

  showProgress();
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess);
    populate();
  }
};

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element_process = document.getElementById("process_id");
  console.log(currentQuestionNumber);

  if(currentQuestionNumber == 1){
    var process_html1 = "<label for='i1' class='dots' style='background-color: rgb(0, 0, 0);'id='dot1'></label>"
    process_html1 += "<label for='i1' class='dots' id='dot2'></label>"
    process_html1 += "<label for='i1' class='dots' id='dot3'></label>"
    element_process.innerHTML = process_html1;
  }else if(currentQuestionNumber == 2){
    var process_html2 = "<label for='i1' class='dots' style='background-color: transparent;'id='dot1'></label>"
    process_html2 += "<label for='i1' class='dots' style='background-color: rgb(0, 0, 0);' id='dot2'></label>"
    process_html2 += "<label for='i1' class='dots' id='dot3'></label>"
    element_process.innerHTML = process_html2;
  }else{
    var process_html3 = "<label for='i1' class='dots' id='dot1'></label>"
    process_html3 += "<label for='i1' class='dots' style='background-color: transparent;' id='dot2'></label>"
    process_html3 += "<label for='i1' class='dots' style='background-color: rgb(0, 0, 0);' id='dot3'></label>"
    element_process.innerHTML = process_html3;
  }

};
var personiltyType;
function showScores() {
  var buttonColor;
  var imageurl;
  var spaText;
  var infoText;
  var finalOption = Math.max(option1Counter,option2Counter,option3Counter,option4Counter);
  console.log(finalOption)
  var optionChoice;
  if(option1Counter ==finalOption){
    optionChoice = 1
    personiltyType = "IT SEEMS LIKE YOU ARE AN"
    imageurl ="quizScene/images/arch2.png";
    spaText="EXTROVERT!";
    currState = EXTROVERT
    infoText="EXTROVERTS ARE LIKELY <br> OUTGOING AND ACTIVE!"
  }else if(option2Counter ==finalOption){
    optionChoice = 2
    personiltyType = "IT SEEMS LIKE YOU ARE AN"
    imageurl ="quizScene/images/arch4.png";
    spaText="INTROVERT!";
    currState = INTROVERT
    infoText="INTROVERTS ARE LIKELY <br> CALM AND RELIABLE!"
  }
  else if(option3Counter ==finalOption){
    optionChoice = 3
    personiltyType = "IT SEEMS LIKE YOU ARE A"
    imageurl ="quizScene/images/arch3.png";
    spaText="THINKER!";
    currState = THINKER
    infoText="THINKER ARE LIKELY <br> TO CREATE GREAT IDEAS!"
  }else if(option4Counter ==finalOption){
    optionChoice = 4
    personiltyType = "IT SEEMS LIKE YOU ARE A"
    imageurl ="quizScene/images/arch5.png";
    spaText="FEELER!";
    currState = FEELER
    infoText="FEELERS ARE LIKELY <br> ARTISTIC AND CONSIDERATE!"

  }
  console.log("last option = " + finalOption)
  document.getElementById('fist-page').style.display = 'grid';
  document.getElementById('quiz_id').style.display = 'none';
  document.getElementById('middleText2').style.display = 'none';
  document.getElementById('process_id').style.display = 'none';


  var personiltyTypeHtml = "<h2 id='question' >"+personiltyType+"</h2>";
  var  gameOverHTML = '';
  document.getElementById("middleText").style.top = "45%";
  gameOverHTML += "<h1 id='score'> Option: " + optionChoice + "</h1>";
  var spaText = "<h1 style='font-family:Pangram-Bold; font-size:70px'; top: 45%;>"+spaText+"</h1>";
  var element = document.getElementById("personality");
  element.innerHTML = spaText;
  var element2 = document.getElementById("question")
  element2.innerHTML = personiltyTypeHtml;


  var buttonText =" <button id='start-btn' class='bn3639 bn39' style='background-color:"+ buttonColor + ";' >TAKE ME TO MY SPA</button>";
  var element3 = document.getElementById("controls_id")
  element3.innerHTML = buttonText;

  var resultImg = "<img src="+ imageurl +" height='512'>";
  var element4 = document.getElementById("archid");
  element4.innerHTML = resultImg;
  var infoTextHtml = "<h2 id='infoText'>"+ infoText+"</h2>";
  var element5 = document.getElementById("infoText")
  element5.innerHTML = infoTextHtml;

  document.getElementById('start-btn').addEventListener('click', function(e) {
    if(currState === EXTROVERT){
      window.location.href="sceneFolder/indexEXTROVERT.html";
    } else if(currState === INTROVERT){
      window.location.href="sceneFolder/indexINTROVERT.html";
    }else if(currState === FEELER){
      window.location.href="sceneFolder/indexFEELER.html";
    }else if(currState === THINKER){
      window.location.href="sceneFolder/indexTHINKER.html";
    }


    // document.body.style.background ="rgbe(254, 245, 240,0)";
});

};

var questions = [
  new Question("CHOOSE AN IMAGE THAT <br> REPRESENTS YOU MORE", ["baby", "light", "city", "moon"], "baby"),
  new Question("CHOOSE AN IMAGE THAT <br> MAKES YOU FEEL MORE RELAXED", ["sea", "plant", "shell", "mozai"], "sea"),
  new Question("CHOOSE A COLOR THAT  <br> YOU LIKE THE MOST", ["color1", "color2", "color3",  "color4"], "color1")
];

function Question(text, choices, answer) {

  this.text = text;
  this.choices = choices;
  this.answer = answer;

}

function shuffle(o) {
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

Question.prototype.isCorrectAnswer = function(choice) {
  console.log(choice);
  if(choice === "baby"){
    option1Counter +=2
    console.log(option1Counter)
  }else if(choice == "light"){
    option2Counter +=2
  }
  else if(choice == "city"){
    option3Counter +=2
  }else if(choice == "moon"){
    option4Counter +=2
  }
  if(choice === "sea"){
    option1Counter +=2
    console.log(option1Counter)
  }else if(choice == "plant"){
    option2Counter +=4
  }
  else if(choice == "shell"){
    option3Counter +=2
  }else if(choice == "mozai"){
    option4Counter +=3
  }
  if(choice === "color1"){
    option1Counter +=2
    console.log(option1Counter)
  }else if(choice == "color2"){
    option2Counter +=3
  }
  else if(choice == "color3"){
    option3Counter +=3
  }else if(choice == "color4"){
    option4Counter +=4
  }
  return this.answer === choice;

}


function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}


var quiz = new Quiz(questions);
