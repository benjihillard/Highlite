let url = 'http://localhost:8080/'
isloggedIn();
//sidebar-----------------------------------------------------------------------
$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  if( 'images/arrow.png' == $('#arrow').attr('src')){
    $("#arrow").attr('src','images/arrowback.png');
  }else{
    $("#arrow").attr('src','images/arrow.png');
  }
});
//------------------------------------------------------------------------------
//hover-------------------------------------------------------------------------
$(".h4").hover(function(){
  $("#upload").css("transform", "scale(1.1,1.1)");
  }, function(){
  $("#upload").css("transform", "scale(1,1)");
});
//------------------------------------------------------------------------------
//drag--------------------------------------------------------------------------
function dragOverHandler(ev) {
  $("#upload").css("transform", "scale(1.1,1.1)");
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}
//------------------------------------------------------------------------------
//drag leave--------------------------------------------------------------------
function dragLeaveHandler(ev) {
  $("#upload").css("transform", "scale(1,1)");
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

let dropArea = document.getElementById("drop-area");
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
  document.body.addEventListener(eventName, preventDefaults, false)
})
//------------------------------------------------------------------------------
// Handle dropped files---------------------------------------------------------
dropArea.addEventListener('drop', handleDrop, false);

function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDrop(e) {
  let dt = e.dataTransfer
  if(e.dataTransfer.items.length>1){
    alert("Sorry one file at a time please");
    return;
  }
  let files = dt.files
  handleFiles(files)
}

function handleFiles(files) {
  file = files[0];
  if(file.type != 'application/pdf'){
    alert('sorry PDFs only please');
  }
  uploadFile(file);
}
//------------------------------------------------------------------------------

// upload to server-------------------------------------------------------------
function uploadFile(file) {
  let route = 'filedrop'
  let xhr = new XMLHttpRequest();
  let formData = new FormData();
  xhr.open('POST', url+route, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      window.location.href = url + "read";
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      alert('sorry something went wrong');
    }
  });

  formData.append('upload_preset', 'ujpu6gyk')
  formData.append('file', file)
  xhr.send(formData)
}
//------------------------------------------------------------------------------

//Login-------------------------------------------------------------------------
function login(){
  let route = 'login';
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url+route, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let user = document.getElementById("userName").value;
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user))){
    document.getElementById("warning").innerHTML = "please put in a valid email";
    document.getElementById("warning").style.display = "block";
    return;
  }else{
    document.getElementById("warning").style.display = "none";
  }
  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      document.getElementById("displayName").innerHTML = user;
      document.getElementById("login").style.display = "none";
      document.getElementById("welcome").style.display = "block";

    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      document.getElementById("warning").innerHTML = "there is no account tied to this email";
      document.getElementById("warning").style.display = "block";
    }
  });
  let params = {'user' : user}
  xhr.send(JSON.stringify(params));
}
//------------------------------------------------------------------------------

//signUp------------------------------------------------------------------------
function signUp(){
  let route = 'signup';
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url+route, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let user = document.getElementById("userName").value;
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user))){
    document.getElementById("warning").innerHTML = "please put in a valid email";
    document.getElementById("warning").style.display = "block";
    return;
  }else{
    document.getElementById("warning").style.display = "none";
  }
  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      document.getElementById("greeting").innerHTML = "Welcome to Highlite";
      document.getElementById("displayName").innerHTML = user;
      document.getElementById("login").style.display = "none";
      document.getElementById("welcome").style.display = "block";

    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      document.getElementById("warning").innerHTML = "this email already exist";
      document.getElementById("warning").style.display = "block";
    }
  });
  let params = {'user': user}
  xhr.send(JSON.stringify(params));
}
//------------------------------------------------------------------------------

// check to see if logged in----------------------------------------------------
function isloggedIn(){
  let route = 'getSession';
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url+route, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      document.getElementById("displayName").innerHTML = xhr.response;
      document.getElementById("login").style.display = "none";
      document.getElementById("welcome").style.display = "block";
    }
    else if (xhr.readyState == 4 && xhr.status == 201) {
      console.log('user is not logged in');
    }
  });
  xhr.send();
}
//------------------------------------------------------------------------------

// Logout-----------------------------------------------------------------------

function logout(){
  let route = 'logout';
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url+route, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      window.location.href = url;
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      alert('There was a problem logging out')
    }
  });
  xhr.send();
}
//------------------------------------------------------------------------------
