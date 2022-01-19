window.onload = function() {
    mapboxgl.accessToken =
    'pk.eyJ1Ijoiam9lbG55bWFyayIsImEiOiJja3dhanhmcWUxMnNhMm9xbWVrczBjbXRrIn0.RkjM1Q1hRCJMJkgNjXNiFg';
    const pos0 = [17.645434131111752, 59.8584748398551];
    const pos1 = [17.635565820824436, 59.85340378431419]
    const pos2 = [17.639914575310478, 59.848696472545214]
    const pos3 = [17.649801703165753, 59.84012790068371]
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/joelnymark/ckyijeu1i4p1615o8ldlbo1x0',
    center: pos0,
    zoom: 14
    });



    // create the popup
    const popup = new mapboxgl.Popup({
    offset: 25
    }).setHTML(
    '<h3>TEST</h3><p>TEST</p><p>TEST</p> <button onclick="closeSideNav(); openChargerInfo(1);" style="width: 80px;, hight:60px;"id="view-full-information">View Full'
    )
    const popup1 = new mapboxgl.Popup({
    offset: 25
    }).setHTML(
    '<h3>TEST</h3><p>TEST</p><p>TEST</p> <button onclick="closeSideNav(); openChargerInfo(2);" style="width: 80px;, hight:60px;"id="view-full-information">View Full'
    )
    const popup2 = new mapboxgl.Popup({
    offset: 25
    }).setHTML(
    '<h3>TEST</h3><p>TEST</p><p>TEST</p> <button onclick="closeSideNav(); openChargerInfo(3);" style="width: 80px;, hight:60px;"id="view-full-information">View Full'
    )
    const popup3 = new mapboxgl.Popup({
    offset: 25
    }).setHTML(
    '<h3>TEST</h3><p>TEST</p><p>TEST</p> <button onclick="closeSideNav(); openChargerInfo(4);" style="width: 80px;, hight:60px;"id="view-full-information">View Full'
    )

    // create DOM element for the marker
    const el = document.createElement('div');
    el.id = 'marker0';

    const el1 = document.createElement('div');
    el1.id = 'marker1'

    const el2 = document.createElement('div');
    el2.id = 'marker2'

    const el3 = document.createElement('div');
    el3.id = 'marker3'
    
    // create the marker
    new mapboxgl.Marker(el)
    .setLngLat(pos0)
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);
    
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
    
    const classthing = "marker"
    document.getElementById("marker0").classList.add(classthing)
    document.getElementById("marker1").classList.add(classthing)
    document.getElementById("marker2").classList.add(classthing)
    document.getElementById("marker3").classList.add(classthing)
}

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

