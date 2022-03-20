
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

var todayRow = getTodaysRow();
gameId.textContent="#"+String(todayRow) +" "+ gameId.textContent;

var attempts = 0;
var currGuess = 1;  
var lastGuess ="";
var wonFlag = 0;

var dat; 

fetch('lst.csv')
  .then(response => response.text())
  .then(data => {
  	// Do something with your data  	
    var jsonDataParsed = JSON.parse(csvJSON(data));
    var todayData = jsonDataParsed[todayRow];    
    dat = todayData;
    console.log(dat.season1);
    console.log(dat.club1);    
    startGame(dat);
    //drawSeasons(dat);
  });


// --------------------------------------

function startGame(dat)
{
  
  drawSeasons(dat); 
  
  /*
  while(attempts<6)
  {
    // Code here
    // wait for input

    // if last input ok
      // wonFlag = 1;
      // break;
    // else
      // increase attempts and currGuess
    if (attempts == 3) setHint1();
    if (attempts == 4) setHint2();
    if (attempts == 5) setHint3();
  }

  if (!wonFlag)
  {
    // TBD
  }
  else
  {
    // TBD
  }

  */
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}


function getTodaysRow()
{
  var todayRow = 0;
  return todayRow;
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
  hint1.style.backgroundColor="#E8E8E8";
  hint2.style.backgroundColor="#E8E8E8";
  hint3.style.backgroundColor="#E8E8E8";
  hintIcon1.textContent = String.fromCodePoint("0x1F4CB");
  hintIcon2.textContent = String.fromCodePoint("0x1F520");    
  hintIcon3.textContent = String.fromCodePoint("0x1F30D"); 
  hintCont1.textContent = "???";   
  hintCont2.textContent = "???";
  hintCont3.textContent = "???";
  //setHint1(); // doesnt belong here - test only
  //setHint2(); // doesnt belong here - test only
  //setHint3(); // doesnt belong here - test only
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


