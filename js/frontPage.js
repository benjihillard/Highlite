$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  if( 'images/arrow.png' == $('#arrow').attr('src')){
    $("#arrow").attr('src','images/arrowback.png');
  }else{
    $("#arrow").attr('src','images/arrow.png');
  }
});

$(".h4").hover(function(){
  $("#upload").css("transform", "scale(1.1,1.1)");
  }, function(){
  $("#upload").css("transform", "scale(1,1)");
});

function dropHandler(ev) {
  loadDoc(ev.dataTransfer.items[0].getAsFile());
  console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    if(ev.dataTransfer.items.length == 1){
      var file = ev.dataTransfer.items[0].getAsFile();
      file.path = 'file:///C:/Users/benji/Documents/GitHub' + '/uploads/' + file.name;
    }

  }
}

function dragOverHandler(ev) {
  $("#upload").css("transform", "scale(1.1,1.1)");
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

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
  xhttp.open("POST", "highlite.js", true);
  xhttp.send();
}
