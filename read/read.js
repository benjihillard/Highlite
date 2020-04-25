let backgroundColor;
let fontColor;
let highlightColor;

//span cycling
let currentSpan=0;
document.addEventListener('keyup', function (e) { 
  if(e.defaultPrevented){
    return;
  }
  var key = e.keyCode;
  console.log('keypress detected: '+key);
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
    console.log('option1 selected');
    
    for(let i=0; i<array.length; ++i){
      array[i].style.backgroundColor="transparent";
    }
    document.getElementsByClassName('word'+(currentSpan+480))[0].style.backgroundColor=highlightColor;
  }
  if(document.getElementById('option2').checked){
    console.log('option2 selected');
    for(let i=0; i<array.length; ++i){
      array[i].style.backgroundColor="transparent";
    }
    document.getElementsByClassName('sentance'+currentSpan)[0].style.backgroundColor=highlightColor;
  }
});

//highlighting options radio button click detectors
$("#option1").click(function(e) {
  e.preventDefault();
  document.getElementById("bodytext").innerHTML = '<span class="word480"> Bonbon </span> <span class="word481"> jujubes </span> <span class="word482"> halvah </span> <span class="word483"> chocolate </span> <span class="word484"> cake </span> <span class="word485"> tart </span> <span class="word486"> halvah. </span> <span class="word487">Lollipop </span> <span class="word488"> powder </span> <span class="word489"> jelly </span> <span class="word490"> beans. </span> <span class="word491"> Cotton </span> <span class="word492"> candy </span><span class="word493"> sugar </span> <span class="word494"> plum </span> <span class="word495"> toffee </span> <span class="word496"> bear </span> <span class="word497"> claw </span> <span class="word498"> tart </span> <span class="word499"> cookie </span> <span class="word500"> fruitcake. </span> <span class="word501"> Candy </span> <span class="word502"> jelly </span> <span class="word503"> beans </span> <span class="word504"> halvah </span> <span class="word505"> dessert </span> <span class="word506"> tiramisu </span><span class="word507"> cheesecake </span> <span class="word508"> pastry </span> <span class="word509"> icing </span> <span class="word510"> apple </span> <span class="word511"> pie. </span> <span class="word512"> Candy </span> <span class="word513"> canes </span> <span class="word514"> sugar </span> <span class="word515"> plum </span> <span class="word516"> jujubes </span> <span class="word517"> jelly. </span> <span class="word518"> Drag&#xE9;e </span> <span class="word519"> candy </span> <span class="word520"> canes </span><span class="word521"> croissant </span> <span class="word522"> pastry. </span> <span class="word523"> Caramels </span> <span class="word524"> ice </span> <span class="word525"> cream </span> <span class="word526"> danish. </span> <span class="word527"> Powder </span> <span class="word528"> toffee </span> <span class="word529"> chocolate </span> <span class="word530"> icing </span> <span class="word531"> gummi </span> <span class="word532"> bears </span><span class="word533"> gummi </span> <span class="word534"> bears. </span> <span class="word535"> Gingerbread </span> <span class="word536"> chupa </span> <span class="word537"> chups </span> <span class="word538"> liquorice </span> <span class="word539"> ice </span> <span class="word540"> cream </span> <span class="word541"> cheesecake </span> <span class="word542"> halvah </span> <span class="word543"> marzipan </span><span class="word544"> powder. </span> <span class="word545"> Liquorice </span> <span class="word546"> liquorice </span> <span class="word547"> toffee </span> <span class="word548"> dessert </span> <span class="word549"> marshmallow. </span> <span class="word550"> Bear </span> <span class="word551"> claw </span> <span class="word552"> jelly </span> <span class="word553"> toffee </span> <span class="word554"> jelly </span> <span class="word555"> bear </span> <span class="word556"> claw </span> <span class="word557"> oat </span><span class="word558"> cake. </span> <span class="word559"> Tootsie </span> <span class="word560"> roll </span> <span class="word561"> pudding </span> <span class="word562"> carrot </span> <span class="word563"> cake </span> <span class="word564"> apple </span> <span class="word565"> pie. </span> <span class="word566"> Chocolate </span> <span class="word567"> cake </span> <span class="word568"> cookie </span> <span class="word569"> powder </span> <span class="word570"> souffl&#xE9; </span> <span class="word571"> pudding </span><span class="word572"> sweet </span> <span class="word573"> roll. </span> <span class="word574"> Jelly-o </span> <span class="word575"> danish </span> <span class="word576"> chocolate </span> <span class="word577"> cake </span> <span class="word578"> cupcake </span> <span class="word579"> icing </span> <span class="word580"> pudding </span> <span class="word581"> sweet. </span><span class="word582"> Cotton </span> <span class="word583"> candy </span> <span class="word584"> bonbon </span> <span class="word585"> cake. </span> <span class="word586"> Muffin </span> <span class="word587"> oat </span> <span class="word588"> cake </span> <span class="word589"> gummi </span> <span class="word590"> bears. </span> <span class="word591"> Pie </span>';
  currentSpan = 0;
});
$("#option2").click(function(e) {
  e.preventDefault();
  document.getElementById("bodytext").innerHTML = '<span class="sentance1">Lorem ipsum dolor sit amet, consect etura dipis cinge lit. Sed vel congue augue, eup retium magna.</span><span class="sentance2">Cura bitursol licit udin semquam, at ferment ummauris molest i enon.</span><span class="sentance3">Ali quami aculis fermentum quam. Praese ntacf elislacus.</span><span class="sentance4">eros rhoncus. Fuscema ximu sfringillami,quisco nsec teturn isl.</span><span class="sentance5">Sedidultricieselit,etvenenatisipsum.</span><span class="sentance6">seros, vel sceleris quen e queenima risus.</span><span class="sentance7">Cura bitur sed lorem ante. In iddi gniss imri sus.</span><span class="sentance8">Suspend is sean teen im, alique teget vehiculaat, congue sitametsem. Proi ninipsump osuere, auctorelitsi tamet, con guelibero.</span><span class="sentance9">iaculi svitaeipsumin, commodopos ueremagna.</span><span class="sentance10">Uteuen imsagit s, bibendumo rciet, e leifend. Sem etia mide lit turpis. Aliqua mete lement umma uris, tempusfacilisisenim.</span><span class="sentance11">eratacdictum.Aeneanlaoreetantequisquamconsecteturcommodo.</span><span class="sentance12">Nuncsodalesgravida egestas.</span> <span class="sentance13">elit placerat vitae.</span><span class="sentance14">Integerult ricestempormetus. Pra esentacaliquetturpis,intem pors em. Ututsemmauris.</span><span class="sentance15">Maecenasfeugiatlaor eetsuscipit. Nullaeurhoncus dui. Pellentesqueeudapibusmi.</span><span class="sentance16">Donec aliquam vel justo in vulputate.</span><span class="sentance17">lum tristique elit.</span><span class="sentance18"></span>';
  currentSpan = 0;
});
$("#option3").click(function(e) {
  e.preventDefault();
  alert("Paragraph highlighting is not currently supported.");
});

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

function getSettings() {
  let url = "http://localhost:8888/read/settingGet";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.addEventListener("readystatechange", function(e) {
    if (xhr.status == 200) {
      console.log(xhr.ressponse);
      //receive json from server
    }
  });
  xhr.send();
}

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
