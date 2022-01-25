window.onload = function() {
    mapboxgl.accessToken =
    'pk.eyJ1Ijoiam9lbG55bWFyayIsImEiOiJja3dhanhmcWUxMnNhMm9xbWVrczBjbXRrIn0.RkjM1Q1hRCJMJkgNjXNiFg';
    const pos1 = [17.645434131111752, 59.8584748398551];
    const pos2 = [17.635565820824436, 59.85340378431419]
    const pos3 = [17.639914575310478, 59.848696472545214]
    const pos4 = [17.649801703165753, 59.84012790068371]
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/joelnymark/ckyijeu1i4p1615o8ldlbo1x0',
    center: pos1,
    zoom: 13
    });



    // create the popup
    const popup1 = new mapboxgl.Popup({
    offset: 38
    }).setHTML(
    '<h3>UPPSALA CENTRALSTATION</h3><p>Laddartyp: AC1, AC2</p> <p>Tillgänglig : Ledig!</p> <button onclick="pinInfo(1);" style="width: 80px;, hight:60px;"id="view-full-information">View Full'
    )
    const popup2 = new mapboxgl.Popup({
    offset: 38
    }).setHTML(
    '<h3>UPPSALA SLOTT</h3><p>Laddartyp: AC2</p> <p>Tillgänglig : Ledig!</p> <button onclick="pinInfo(2);" style="width: 80px;, hight:60px;"id="view-full-information">View Full'
    )
    const popup3 = new mapboxgl.Popup({
    offset: 38
    }).setHTML(
    '<h3>UPPSALA SJUKHUS</h3><p>Laddartyp: ChaDemo</p> <p>Tillgänglig : UPTAGEN!</p> <button onclick="pinInfo(3);" style="width: 80px;, hight:60px;"id="view-full-information">View Full'
    )
    const popup4 = new mapboxgl.Popup({
    offset: 38
    }).setHTML(
    '<h3>NTI UPPSALA</h3><p>Laddartyp: AC2</p> <p>Tillgänglig : Ledig!</p> <button onclick="pinInfo(4);" style="width: 80px;, hight:60px;"id="view-full-information">View Full'
    )

    // create DOM element for the marker
    const el1 = document.createElement('div');
    el1.id = 'marker1';

    const el2 = document.createElement('div');
    el2.id = 'marker2'

    const el3 = document.createElement('div');
    el3.id = 'marker3'

    const el4 = document.createElement('div');
    el4.id = 'marker4'
    
    // create the marker
    new mapboxgl.Marker(el1)
    .setLngLat(pos1)
    .setPopup(popup1) // sets a popup on this marker
    .addTo(map);
    
    new mapboxgl.Marker(el2)
    .setLngLat(pos2)
    .setPopup(popup2) // sets a popup on this marker
    .addTo(map);

    new mapboxgl.Marker(el3)
    .setLngLat(pos3)
    .setPopup(popup3) // sets a popup on this marker
    .addTo(map);

    new mapboxgl.Marker(el4)
    .setLngLat(pos4)
    .setPopup(popup4) // sets a popup on this marker
    .addTo(map);
    
    const classthing = "marker"
    document.getElementById("marker1").classList.add(classthing)
    document.getElementById("marker2").classList.add(classthing)
    document.getElementById("marker3").classList.add(classthing)
    document.getElementById("marker4").classList.add(classthing)
}

function closeSideNav(){
    let open = document.getElementById("btn-nav");
    let navbar = document.getElementById("side-nav")

    if(open.getAttribute("data-open") == "false"){
        navbar.classList.add("active");
        open.setAttribute("data-open","true");
    }
    else if(open.getAttribute("data-open") == "true"){
        navbar.classList.remove("active");
        open.setAttribute("data-open","false");

        let chargerList = document.getElementsByClassName("chargerInfo");
        for (let i = 0; i < chargerList.length; i++){
            chargerList[i].setAttribute("data-open","true");
            chargerList[i].classList.remove("active_grid");
            if (document.getElementById(i + 1).getAttribute("data-arrow") == "down"){
                rotateIcon(i + 1)
            }
        }
    }
}




function openChargerInfo(id){
    let chargerinfo = document.getElementById(id).parentElement.parentElement.nextElementSibling

    if(chargerinfo.getAttribute("data-open") == "true"){
        chargerinfo.classList.add("active_grid");
        chargerinfo.setAttribute("data-open","false");
        
    }
    else if(chargerinfo.getAttribute("data-open") == "false"){
        chargerinfo.classList.remove("active_grid");
        chargerinfo.setAttribute("data-open","true");
    }
    rotateIcon(id)
}

function pinInfo(id){
    if(document.getElementById("btn-nav").getAttribute("data-open") == "false"){
        document.getElementById("side-nav").classList.add("active");
        document.getElementById("btn-nav").setAttribute("data-open","true");
    }
    openChargerInfo(id)
}

function rotateIcon(id){
    let arrowDirection = document.getElementById(id);
    if (arrowDirection.getAttribute("data-arrow") == "side"){
        arrowDirection.firstElementChild.classList.remove("rotateIcon");
        arrowDirection.setAttribute("data-arrow", "down");
    }
    else if (arrowDirection.getAttribute("data-arrow") == "down"){
        arrowDirection.firstElementChild.classList.add("rotateIcon");
        arrowDirection.setAttribute("data-arrow", "side");
    }
}