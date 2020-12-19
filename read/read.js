let url = window.location.href;
let settings = getSettings()
getJSON(1);
// declairng buttons
let backgroundColor = document.getElementById('background');
let fontColor = document.getElementById('text');
let highlightColor = document.getElementById('highlight');
let fontsize = document.getElementById("fontsize");
let letterspace = document.getElementById("letterspace");
let wordspace = document.getElementById("wordspace");
let lineheight = document.getElementById("lineheight");

// declaring  page elements
let text = document.getElementById("bodytext");
let page = document.getElementById("page");
let pageBtn = document.getElementById("pageBtn");


// font selectors
function fontOne(){
  text.style.fontFamily = "'Faustina', serif";
}

function fontTwo(){
  text.style.fontFamily = "'Dosis', sans-serif";
}

function fontThree(){
  text.style.fontFamily = "'Roboto Slab', serif";
}

// color selectors
function changeBackgroundColor(){
  page.style.backgroundColor = backgroundColor.value;
  pageBtn.style.backgroundColor = backgroundColor.value;
}

function changeFontColor(){
  text.style.color = fontColor.value;
}

// text formating

function changeFontSize(){
  text.style.fontSize = (fontsize.value + "px");
}

function changeLetterSpacing(){
  text.style.letterSpacing = (letterspace.value + "px");
}

function changeWordSpacing(){
  text.style.wordSpacing = (wordspace.value + "px");
}

function changeLineSpacing(){
  text.style.lineHeight = (lineheight.value + "px");
}

// return user settings as a JSON object-----------------------------------------------------
function gatherSettings(){
  return {
    'fontFamily': text.style.fontFamily,
    'highlightColor' : highlightColor.value,
    'backgroundColor' : backgroundColor.value,
    'fontColor' : fontColor.value,
    'fontSize' : fontsize.value,
    'letterSpacing' : letterspace.value,
    'wordSpacing' : wordspace.value,
    'lineHeight' : lineheight.value
  }
}
//----------------------------------------------------------------------------------------

// apply some JSON settings----------------------------------------------------------

//-------------------------------------------------------------------------------------------

// apply some JSON settings----------------------------------------------------------
function set(setting) {
    text.style.fontFamily = setting.fontFamily;
    highlightColor.value = setting.highlightColor;
    backgroundColor.value = setting.backgroundColor;
    fontColor.value = setting.fontColor;
    fontsize.value = setting.fontSize;
    letterspace.value = setting.letterSpacing;
    wordspace.value = setting.wordSpacing;
    lineheight.value = setting.lineHeight;
    changeBackgroundColor();
    changeFontColor();
    changeFontSize();
    changeLetterSpacing();
    changeWordSpacing();
    changeLineSpacing();

}

//highlighting options radio button click detectors
$("#option1").click(function(e) {
  //e.preventDefault();
  getJSON(1);
  currentSpan = 0;
});
$("#option2").click(function(e) {
  //e.preventDefault();
  getJSON(2);
  currentSpan = 0;
});
$("#option3").click(function(e) {
  //e.preventDefault();
  getJSON(3);
  currentSpan = 0;
});
//-------------------------------------------------------------------------------------------

//span cycling-----------------------------------------------------------------------------
//document.getElementById("option1").checked = true;
let currentSpan=0;
let array = document.getElementById("bodytext").children;
document.getElementsByClassName('word'+currentSpan)[0].style.backgroundColor = highlightColor.value;
document.addEventListener('keyup', function (e) {
  if(e.defaultPrevented){
    return;
  }
  var key = e.keyCode;
  let array = document.getElementById("bodytext").children;
  if(key === 37){//keycode for left arrow
    if (!(currentSpan===0)){
      --currentSpan;
    }
  }
  if(key === 39 || key === 32){//keycodes for right arrow and spacebar
    if (!(currentSpan===array.length)){
      ++currentSpan;
    }
  }
  if(document.getElementById("option1").checked){

    for(let i=0; i<array.length; ++i){
      array[i].style.backgroundColor="transparent";
    }
    document.getElementsByClassName('word'+ currentSpan)[0].style.backgroundColor=highlightColor.value;
  }
  if(document.getElementById('option2').checked){
    for(let i=0; i<array.length; ++i){
      array[i].style.backgroundColor="transparent";
    }
    document.getElementsByClassName('sentance'+currentSpan)[0].style.backgroundColor=highlightColor.value;
  }
  if(document.getElementById('option3').checked){
    for(let i=0; i<array.length; ++i){
      array[i].style.backgroundColor="transparent";
    }
    document.getElementsByClassName('paragraph'+currentSpan)[0].style.backgroundColor=highlightColor.value;
  }
});



//------------------------------------------------------------------------------------------------------

//sidebar toggle----------------------------------------------------------------------------------------
$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  if( 'images/arrow.png' == $('#arrow').attr('src')){
    $("#arrow").attr('src','images/arrowback.png');
  }else{
    $("#arrow").attr('src','images/arrow.png');
  }
});

//-----------------------------------------------------------------------------------------------------
// retrive user settings from the database-------------------------------------------------------------
function getSettings() {
  let route = "settingGet";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url + route, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.addEventListener("readystatechange", function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      set(JSON.parse(xhr.response));
    }else if (xhr.readyState == 4 && xhr.status == 400) {

    }
  });
  xhr.send();
}
//-------------------------------------------------------------------------------------------
// store user settings in the database ------------------------------------------------------
function storeSettings() {
  let route = "settingSave";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url + route, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.addEventListener("readystatechange", function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      alert('Settings Saved')
      return;
    }else if (xhr.readyState == 4 && xhr.status == 400) {
      alert('Sorry this is a logged in feature only. Loggin or Sign Up if you want to save.');
      return;
    }
  });
  xhr.send(JSON.stringify(gatherSettings()));
}
//------------------------------------------------------------------------------

// store user settings in the database ------------------------------------------------------
async function getJSON(option) {

  let route = "getJSON";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url + route, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.addEventListener("readystatechange", await function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {

      if (option === 1) {
        text.innerHTML = JSON.parse(xhr.response).word;
      } else if (option === 2) {
        text.innerHTML = JSON.parse(xhr.response).sentance;
      } else if (option === 3) {
        text.innerHTML = JSON.parse(xhr.response).paragraph;
      } else {
        text.innerHTML = JSON.parse(xhr.response).word;
      }


      console.log(JSON.parse(xhr.response).word);


    }else if (xhr.readyState == 4 && xhr.status == 400) {
      alert('Sorry this is a logged in feature only. Loggin or Sign Up if you want to save.');
      return;
    }

  });
  xhr.send();
}
//------------------------------------------------------------------------------
function home(){
  window.location = "https://highlite1.herokuapp.com/"
}