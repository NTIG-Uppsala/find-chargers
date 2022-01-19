
function closeSideNav(){
    let open = document.getElementById("btn-nav");
    let navbar = document.getElementById("side-nav")


    if(open.getAttribute("data-open") == "true"){
        document.getElementById("map").style.width = "80%";
        navbar.classList.add("active");
        open.setAttribute("data-open","false");
        
    }
    else if(open.getAttribute("data-open") == "false"){
        document.getElementById("map").style.width = "100%";
        navbar.classList.remove("active");
        open.setAttribute("data-open","true");

    }
}



function openChargerInfo(id){
    let chargerinfo = document.getElementById(id).parentElement.parentElement.nextElementSibling

    if(chargerinfo.getAttribute("data-open") == "true"){
        chargerinfo.classList.add("active");
        chargerinfo.setAttribute("data-open","false");
        
    }
    else if(chargerinfo.getAttribute("data-open") == "false"){
        chargerinfo.classList.remove("active");
        chargerinfo.setAttribute("data-open","true");

    }
}