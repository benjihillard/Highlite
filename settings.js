function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
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
    let spacing = document.getElementById("spacing").value;
    let kerning = document.getElementById("kerning").value;
    let fontsize = document.getElementById("fontsize").value;
}