const veryLightGray  = "#E8E8E8";
const wonBackground  = "#329a77";
const wonColor       = "white";
const lostBackground = "lightgray";//"lightpink";
const lostColor      = "firebrick";//"maroon";

const clubSeason1 = document.getElementById("club1-season");
const clubName1 = document.getElementById("club1-name");
const clubSeason2 = document.getElementById("club2-season");
const clubName2 = document.getElementById("club2-name");
const clubSeason3 = document.getElementById("club3-season");
const clubName3 = document.getElementById("club3-name");

const gameId = document.getElementById("game-id");

const hint1 = document.getElementById("hint1-container");
const hint2 = document.getElementById("hint2-container");
const hint3 = document.getElementById("hint3-container");

const hintIcon1 = document.getElementById("hint1-icon");
const hintIcon2 = document.getElementById("hint2-icon");
const hintIcon3 = document.getElementById("hint3-icon");
const hintCont1 = document.getElementById("hint1-content");
const hintCont2 = document.getElementById("hint2-content");
const hintCont3 = document.getElementById("hint3-content");

const guessFields = new Array();
guessFields[0] = document.getElementById("guess1-input");
guessFields[1] = document.getElementById("guess2-input");
guessFields[2] = document.getElementById("guess3-input");
guessFields[3] = document.getElementById("guess4-input");
guessFields[4] = document.getElementById("guess5-input");
guessFields[5] = document.getElementById("guess6-input");

const helpIcon  = document.getElementById("help-icon");
const statsIcon = document.getElementById("stats-icon");

const gameOutcome  = document.getElementById("game-outcome");
const gameSolution = document.getElementById("game-solution");
const gameMore     = document.getElementById("game-more");

var todayRow = getTodaysRow();
gameId.textContent="#"+String(todayRow) +" "+ gameId.textContent;

var attempts  = 0;
var currGuess = 1;  
var lastGuess ="";
var wonFlag   = 0;
var digited   = 0;

var dat; 

fetch('lst.csv')
  .then(response => response.text())
  .then(data => {
  	// Do something with your data  	
    var jsonDataParsed = JSON.parse(csvJSON(data));
    var todayData = jsonDataParsed[todayRow];    
    dat = todayData; 
    startGame(dat);
  });


// --------------------------------------

function getTodaysRow()
{
  var todayRow = 0;
  return todayRow;
}

function startGame(dat)
{
  
  statsIcon.textContent=""; // TO BE REMOVED

  gameOutcome.hidden = true;
  gameSolution.hidden = true;
  gameMore.hidden = true;

  drawSeasons(dat); 
  for (i=currGuess ; i<6 ; i++) 
  {
    guessFields[i].value="";
    guessFields[i].disabled=true;
    guessFields[i].style.backgroundColor = veryLightGray;
  }

  // Everything else is handled in the callback of the "zero" input field
  updateFieldZero(currGuess);  
}

// --------------------------------------

function checkGuess()
{
  guessFields[0].value = replaceUmlauts(guessFields[0].value).toUpperCase();
  lastGuess = guessFields[0].value;
  console.log(lastGuess);
  console.log(dat.name);
  console.log(lastGuess.toUpperCase()==dat.name.toUpperCase());
  console.log(String(currGuess));

  if (lastGuess.toUpperCase()==dat.name.toUpperCase())
  {
    wonFlag = 1;    
    gameWon();
  }
  else
  {
    attempts++;
    currGuess++;
    if (currGuess == 4) setHint1();
    if (currGuess == 5) setHint2();
    if (currGuess == 6) setHint3();
    if (currGuess>6)
    {
      gameOver();
    }
    else
    {
      updateFieldZero(currGuess);
    }
  }

};

function gameWon()
{
  guessFields[0].disabled=true;
  guessFields[0].style.backgroundColor=wonBackground;
  guessFields[0].style.color=wonColor;

  gameOutcome.hidden=false;
  gameOutcome.textContent = "WELL DONE!";
  gameOutcome.style.color = wonBackground;
}

function gameOver()
{
  guessFields[0].disabled=true;
  guessFields[0].style.backgroundColor=lostBackground;    
  guessFields[0].style.color=lostColor;
  
  gameOutcome.hidden=false;
  gameOutcome.textContent = "GAME OVER";
  gameOutcome.style.color = lostColor;  

  gameSolution.hidden=false;
  gameSolution.textContent = "The answer was " + dat.name.toUpperCase();
}

function updateFieldZero(currGuess)
{
  if (currGuess>1)
  {
    for (i=5;i>0;i--)
    {
      guessFields[i].value = guessFields[i-1].value      
      if (guessFields[i].value!="")
      {
        guessFields[i].style.backgroundColor=lostBackground;    
        guessFields[i].style.color=lostColor;       
      } 
    }
  }

  digited = 0;
  guessFields[0].style.backgroundColor="white";
  guessFields[0].style.color="lightgray";
  guessFields[0].value = "GUESS " + currGuess + " OF 6";
  guessFields[0].focus();  
  guessFields[0].onkeydown = function(){
    if (digited==0)
    { 
      guessFields[0].value="";
      digited=1;
      guessFields[0].style.color="black";
    }
  };
  guessFields[0].onchange = checkGuess;  
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function drawSeasons(dat)
{

  clubSeason1.textContent = dat.season1;
  clubName1.textContent = dat.club1;
  clubSeason2.textContent = dat.season2;
  clubName2.textContent = dat.club2;
  clubSeason3.textContent = dat.season3;
  clubName3.textContent = dat.club3; 
  initHints();
}

function initHints()
{
  hint1.style.backgroundColor=veryLightGray;
  hint2.style.backgroundColor=veryLightGray;
  hint3.style.backgroundColor=veryLightGray;
  hintIcon1.textContent = String.fromCodePoint("0x1F4CB");
  hintIcon2.textContent = String.fromCodePoint("0x1F520");    
  hintIcon3.textContent = String.fromCodePoint("0x1F30D"); 
  hintCont1.textContent = "???";   
  hintCont2.textContent = "???";
  hintCont3.textContent = "???";
}

function setHint1()
{
  hint1.style.backgroundColor = clubSeason1.style.backgroundColor;
  hintCont1.textContent = dat.pos;
}

function setHint2()
{
  hint2.style.backgroundColor = clubSeason2.style.backgroundColor;
  hintCont2.textContent = dat.letters;
}

function setHint3()
{
  hint3.style.backgroundColor = clubSeason3.style.backgroundColor;
  hintIcon3.textContent = getFlagEmoji(dat.countryCode); 
  hintCont3.textContent = dat.country;
}

//var csv is the CSV file with headers
function csvJSON(csv){

    var lines=csv.split("\n");  
    var result = [];  
    var headers=lines[0].split(",");  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }  
        result.push(obj);  
    }    
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  function replaceUmlauts(str) {
    return str    
      .replace(/\u00c0/g, 'A')
      .replace(/\u00c1/g, 'A')
      .replace(/\u00c2/g, 'A')
      .replace(/\u00c3/g, 'A')
      .replace(/\u00c4/g, 'A')
      .replace(/\u00c5/g, 'A')
      .replace(/\u00c6/g, 'AE')
      .replace(/\u00c7/g, 'C')
      .replace(/\u00c8/g, 'E')
      .replace(/\u00c9/g, 'E')
      .replace(/\u00cA/g, 'E')
      .replace(/\u00cB/g, 'E')
      .replace(/\u00cc/g, 'I')
      .replace(/\u00cd/g, 'I')
      .replace(/\u00ce/g, 'I')
      .replace(/\u00cf/g, 'I')
      .replace(/\u00d0/g, 'DJ')
      .replace(/\u00d1/g, 'N')
      .replace(/\u00d2/g, 'O')
      .replace(/\u00d3/g, 'O')
      .replace(/\u00d4/g, 'O')
      .replace(/\u00d5/g, 'O')
      .replace(/\u00d6/g, 'O')
      .replace(/\u00d8/g, 'O')
      .replace(/\u00d9/g, 'U')
      .replace(/\u00da/g, 'U')
      .replace(/\u00db/g, 'U')
      .replace(/\u00dc/g, 'U')
      .replace(/\u00dd/g, 'Y')
      .replace(/\u00df/g, 'ss')
      .replace(/\u00e0/g, 'a')
      .replace(/\u00e1/g, 'a')
      .replace(/\u00e2/g, 'a')
      .replace(/\u00e3/g, 'a')
      .replace(/\u00e4/g, 'a')
      .replace(/\u00e5/g, 'a')
      .replace(/\u00e6/g, 'ae')
      .replace(/\u00e7/g, 'c')
      .replace(/\u00e8/g, 'e')
      .replace(/\u00e9/g, 'e')
      .replace(/\u00ea/g, 'e')
      .replace(/\u00eb/g, 'e')
      .replace(/\u00ec/g, 'i')
      .replace(/\u00ed/g, 'i')
      .replace(/\u00ee/g, 'i')
      .replace(/\u00ef/g, 'i')
      .replace(/\u00f0/g, 'dj')
      .replace(/\u00f1/g, 'n')
      .replace(/\u00f2/g, 'o')
      .replace(/\u00f3/g, 'o')
      .replace(/\u00f4/g, 'o')
      .replace(/\u00f5/g, 'o')
      .replace(/\u00f6/g, 'o')
      .replace(/\u00f8/g, 'o')
      .replace(/\u00f9/g, 'u')
      .replace(/\u00fa/g, 'u')
      .replace(/\u00fb/g, 'u')
      .replace(/\u00fc/g, 'u')
      .replace(/\u00fd/g, 'y')
      .replace(/\u00ff/g, 'y')
  }

  $( function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "blind",
        duration: 1000
      }
    }); 
    $( "#help-icon" ).on( "click", function() {
      $( "#dialog" ).dialog( "open" );
    });
  } );