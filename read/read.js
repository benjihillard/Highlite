let backgroundColor;
let fontColor;
let highlightColor;

//sidebar toggle
$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  if( 'images/arrow.png' == $('#arrow').attr('src')){
    $("#arrow").attr('src','images/arrowback.png');
  }else{
    $("#arrow").attr('src','images/arrow.png');
  }
});

/* Old sidebar toggle
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}
*/

function storeSettings() {
  let ele = document.getElementsByName("highlight");
  let highlight = null;
  for (i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
          highlight = ele[i].value;
      }
  }
  let hcolor = document.getElementById("highlight").value;
  let tcolor = document.getElementById("text").value;
  let bcolor = document.getElementById("background").value;
  let fontsize = document.getElementById("fontsize").value;
  let letterspace = document.getElementById("letterspace").value;
  let wordspace = document.getElementById("wordspace").value;
  let lineheight = document.getElementById("lineheight").value;
  let url = "http://localhost:8888/read/settingSave";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.addEventListener("readystatechange", function(e) {
    if (xhr.status == 200) {
      console.log("success");
    }
  });
  let settings = {
    highlight,
    hcolor,
    tcolor,
    bcolor,
    fontsize,
    letterspace,
    wordspace,
    lineheight,
  };
  xhr.send(JSON.stringify(settings));
  let text = document.getElementById("bodytext");
  text.style.fontSize = fontsize + "px";
  text.style.letterSpacing = letterspace + "px";
  text.style.wordSpacing = wordspace + "px";
  text.style.lineHeight = lineheight + "px";
}
