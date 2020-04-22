//sidebar

$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  if( 'images/arrow.png' == $('#arrow').attr('src')){
    $("#arrow").attr('src','images/arrowback.png');
  }else{
    $("#arrow").attr('src','images/arrow.png');
  }
});

//hover

$(".h4").hover(function(){
  $("#upload").css("transform", "scale(1.1,1.1)");
  }, function(){
  $("#upload").css("transform", "scale(1,1)");
});


//drop
function dropHandler(ev) {
  if(ev.dataTransfer.items.length>1){
    alert('Sorry one file at a time');
    ev.preventDefault();
    return;
  }
  loadDoc(ev.dataTransfer.items[0].getAsFile());
  console.log('File(s) dropped');
  ev.preventDefault();
}

//drag
function dragOverHandler(ev) {
  $("#upload").css("transform", "scale(1.1,1.1)");
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

//drag leave
function dragLeaveHandler(ev) {
  $("#upload").css("transform", "scale(1,1)");
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}





function loadDoc(doc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log("load");
  };
  console.log("ddd");
  xhttp.open("POST", "/filedrop", true);
  xhttp.send();
}
