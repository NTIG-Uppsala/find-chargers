
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