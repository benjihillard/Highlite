if (window.File && window.FileReader && window.FileList && window.Blob){
  console.log("thumbs up emoji");
}else{
  alert('The File API is not supported by this browser.');
}

function handleFilesSelect(evt){
  evt.stopPropagation();
  evt.preventDefault();
  var files = evt.target.files;
  var reader = new FileReader();
  reader.onload = function(){
    console.log(reader.result);
  }
  reader.readAsDataURL(files.item(0));
}


var x = document.getElementById("files");

x.addEventListener('change',handleFilesSelect, false);
