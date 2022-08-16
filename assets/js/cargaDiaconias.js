window.onload = specialsDomIncial;


function specialsDomIncial()
{
    callservice();  
    
}

function alertaDeEnvio()
{
    alert("Formulario enviado exitosamente");
}
var rutaAbsoluta = self.location.href;   
var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
var datos;
var urlapi="https://isracmlda.github.io/ProyectoCate/diaconias.json";
/*var urlapi2="https://isracmlda.github.io/ProyectoCate/galeria.Json";*/
function callservice(){
   
if (rutaRelativa=="Diaconias.html") {
    $.ajax({
        url:urlapi,
        type: "get",
        datatype:"json",
        success: onSuccess,
        error: onError,
    }) 
}
/*if (rutaRelativa=="Galeria.html") {
  $.ajax({
      url:urlapi2,
      type: "get",
      datatype:"json",
      success: onSuccess,
      error: onError,
  }) 
}*/
}



function onSuccess(data){
datos=data;
if (rutaRelativa=="Diaconias.html") {
procesarDatos('Diaconia El Carmen');
}
/*if (rutaRelativa=="Galeria.html") {

  cargarGaleria();

}*/
}

function onError(jqXHR,tetStatus,errorThrow){
    alert("mensaje de error: "+errorThrow+"\nURL "+urlapi);
}

let map,mapMonse,mapMonte, marker,markerMonse,markerMonte, watchID, geoLoc;
let latgp;let longp;

function initMap() {

  const myLatLng = { lat: 10.012819, lng: -84.215739 };
  const myLatLngMonse = { lat: 10.0030273, lng: -84.2131863 };
  const myLatLngMonte = { lat: 10.0067507, lng: -84.2282626 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: myLatLng
  });
  marker = new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Catequesis del Carmen"
  });
  mapMonse = new google.maps.Map(document.getElementById("mapMonse"), {
    zoom: 15,
    center: myLatLngMonse
  });
  markerMonse = new google.maps.Marker({
    positionMonse: myLatLngMonse,
    mapMonse,
    title: "Catequesis de Monserrat"
  });
  mapMonte = new google.maps.Map(document.getElementById("mapMonte"), {
    zoom: 15,
    center: myLatLngMonse
  });
  markerMonte = new google.maps.Marker({
    positionMonte: myLatLngMonte,
    mapMonte,
    title: "Catequesis de Santa Rosa de Lima (Montecillos)"
  });
  getPosition();
}

function getPosition() {
  if(navigator.geolocation) {
    geoLoc = navigator.geolocation;
    watchID = geoLoc.watchPosition(showLocationOnMap, errorHandler);
  } else {
    alert("Lo sentimos, el navegador no soporta geolocalización");
  }
}

function showLocationOnMap(position,positionMonse) {
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsRendererMonse = new google.maps.DirectionsRenderer();
  const directionsRendererMonte = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();

  var latitud = position.coords.latitude;
  var longitud = position.coords.longitude;
  const myLatLng = {lat: latitud, lng: longitud};
  latgp=10.012819;longp=-84.215739;
  directionsRenderer.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsRenderer, myLatLng);

  latgp=10.0030273;longp=-84.2131863;
  directionsRendererMonse.setMap(mapMonse);
  calculateAndDisplayRoute(directionsService, directionsRendererMonse, myLatLng);

  latgp=10.0067507;longp=-84.2282626;
  directionsRendererMonte.setMap(mapMonte);
  calculateAndDisplayRoute(directionsService, directionsRendererMonte, myLatLng);
}

function errorHandler(err) {
  if(err.code == 1) {
    alert("Error: Acceso denegado!");
  } else if (err.code == 2) {
    alert("Error: Posición no existe o no se encuentra!");
  }
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, myLatLng) {

  directionsService.route(
    {
      origin: {lat: myLatLng.lat, lng: myLatLng.lng},
      destination: { lat: latgp, lng: longp },
      // tambien se puede usar de otro modo WALKING - BICYCLING - TRANSIT
      travelMode: google.maps.TravelMode["DRIVING"]
    },
    (response, status) => {
      if (status == "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}



function procesarDatos(nombreDiaconia){

    let menuContainer=document.getElementById("info-diaconia-id");
    let htmlContainer="";
    

    datos.diaconias.forEach(diaconia => {

        if (diaconia.nombre==nombreDiaconia) {
          htmlContainer+= "<div class='container'>";
            htmlContainer+= "<p class='tituloinside' data-aos='fade-up'>"+diaconia.nombre+" </p>";
            htmlContainer+= "<div class='row'>";
            htmlContainer+= "<div class='col-md-6'>";
            htmlContainer+= "<section id='about' class='notis'>";
            htmlContainer+= "<div id='demo' class='container-fluid carousel slide CarruselNivel text-center' data-aos='fade-up' data-bs-ride='carousel'>";
            htmlContainer+= "<div class='carousel-indicators'>";
            htmlContainer+= "<button type='button' data-bs-target='#demo' data-bs-slide-to='0' class='active'></button>";
            htmlContainer+= "<button type='button' data-bs-target='#demo' data-bs-slide-to='1'></button>";
            htmlContainer+= "<button type='button' data-bs-target='#demo' data-bs-slide-to='2'></button>";
            htmlContainer+= "</div>";
            htmlContainer+= "<div class='carousel-inner'>";
            htmlContainer+= "<div class='carousel-item active'>";
            htmlContainer+= "<img src= '../assets/img/"+ diaconia.imagen1+"' alt='Imagen 1' class='d-block w-100' style='border-radius: 10px;'>";
            htmlContainer+= "</div>";
            htmlContainer+= "<div class='carousel-item'>";
            htmlContainer+= "<img src= '../assets/img/"+ diaconia.imagen2+"' alt='Imagen 2' class='d-block w-100' style='border-radius: 10px;'>";
            htmlContainer+= "</div>";
            htmlContainer+= "<div class='carousel-item'>";
            htmlContainer+= "<img src= '../assets/img/"+ diaconia.imagen3+"' alt='Imagen 3' class='d-block w-100' style='border-radius: 10px;'>";
            htmlContainer+= "</div>";
            htmlContainer+= "</div>";
            htmlContainer+= "<button class='carousel-control-prev' type='button' data-bs-target='#demo' data-bs-slide='prev'>";
            htmlContainer+= "<span class='carousel-control-prev-icon'></span>";
            htmlContainer+= "</button>";
            htmlContainer+= "<button class='carousel-control-next' type='button' data-bs-target='#demo' data-bs-slide='next'>";
            htmlContainer+= "<span class='carousel-control-next-icon'></span>";
            htmlContainer+= "</button>";
            htmlContainer+= "</div>";
            htmlContainer+= "</section>";
            htmlContainer+= "</div>";
            htmlContainer+= "<div class='col-md-6'>";
            htmlContainer+= "<section id='about' class=''>";
            htmlContainer+= "<div class='container ' data-aos='fade-up'>";
            htmlContainer+= "<p class='tituloinside2 text-center'>Niveles que se imparten en esta diaconía</p>";
            htmlContainer+= "<div class='row gy-4'>";
            htmlContainer+= "<div class='d-flex align-items-middle' data-aos='fade-up' data-aos-delay='300'>";
            htmlContainer+= "<div class='content ps-0 ps-lg-5 formatoHover'>";
            htmlContainer+= "<ul>";
            if (diaconia.Primero!=undefined) {
                htmlContainer+= diaconia.Primero;  
            }
            if (diaconia.Segundo!=undefined) {
                htmlContainer+= diaconia.Segundo;  
            }
            if (diaconia.Tercero!=undefined) {
                htmlContainer+= diaconia.Tercero;  
            }
            if (diaconia.Cuarto!=undefined) {
                htmlContainer+= diaconia.Cuarto;  
            }
            if (diaconia.Quinto!=undefined) {
                htmlContainer+= diaconia.Quinto;  
            }
            if (diaconia.Sexto!=undefined) {
                htmlContainer+= diaconia.Sexto;  
            }
            if (diaconia.Confirma!=undefined) {
                htmlContainer+= diaconia.Confirma;  
            }
            htmlContainer+= "</ul>";
            htmlContainer+= "</div>";
            htmlContainer+= "</div>";
            htmlContainer+= "</div>";
            htmlContainer+= "</div>";
            htmlContainer+= "</div>";
            htmlContainer+= "</div>";
            htmlContainer+= "</section>";
            htmlContainer+= "<section id='about'>";
            htmlContainer+= "<div class='container text-center' data-aos='fade-down'>";
            htmlContainer+= "<p class='tituloinside'>Ubicación en Google Maps</p>";
            htmlContainer+= "</div>";
            htmlContainer+= "</section>";



            switch (diaconia.nombre) {
              case "Diaconia El Carmen":
                document.getElementById("map").style.display="block"
                map.setZoom(15);
                document.getElementById("mapMonse").style.display="none"
                document.getElementById("mapMonte").style.display="none"
                break;
            case "Diaconia de Monserrat":
                document.getElementById("map").style.display="none"
                document.getElementById("mapMonse").style.display="block"
                mapMonse.setZoom(15);
                document.getElementById("mapMonte").style.display="none"
                break;
            case "Diaconia de Santa Rosa de Lima":
                document.getElementById("map").style.display="none"
                document.getElementById("mapMonse").style.display="none"
                document.getElementById("mapMonte").style.display="block"
                mapMonte.setZoom(15);
                break;
              default:
                break;
            }
            htmlContainer+= "</div>";
        }
    });

    menuContainer.innerHTML = "";
    menuContainer.innerHTML = htmlContainer;
    console.log(htmlContainer);
}

/*function cargarGaleria(){

  let menuContainer=document.getElementById("galeriaJs");
    let htmlContainer="";
    
    datos.imagenes.forEach(imagen => {
      
        htmlContainer+= "<div class='col-xl-3 col-lg-4 col-md-6'>";
          htmlContainer+= "<div class='gallery-item h-100'>";
            htmlContainer+= "<img src= '../assets/img/Galeria/"+ imagen.ruta+"' class='img-fluid' alt=''>";
            htmlContainer+= "<div class='gallery-links d-flex align-items-center justify-content-center'>";
              htmlContainer+= "<a href='../assets/img/Galeria/"+ imagen.ruta+"' title='"+ imagen.nombre+"' class='glightbox preview-link'>";
                htmlContainer+= "<i class='bi bi-arrows-angle-expand'>";
                htmlContainer+= "</i>";
              htmlContainer+= "</a>";
            htmlContainer+= "</div>";
          htmlContainer+= "</div>";
        htmlContainer+= "</div>";
      
    });
    
    menuContainer.innerHTML = "";
    menuContainer.innerHTML = htmlContainer;
    console.log(htmlContainer);

}  */


if (rutaRelativa=="Diaconias.html") {
  window.initMap = initMap();
}


// inicia la Configuración





