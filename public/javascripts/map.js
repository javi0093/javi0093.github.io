var map = L.map('main_map').setView([-34.891086, -56.187019], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/*var marker1 = L.marker([-34.891086, -56.187019]).addTo(map);
var marker2 = L.marker([-34.888445, -56.185814]).addTo(map);
var marker3 = L.marker([-34.887266, -56.183782]).addTo(map);

marker1.bindPopup("<b>palacio legislativo</b>").openPopup();
marker2.bindPopup("<b>Facultad de química</b><br>edificio central").openPopup();
marker3.bindPopup("<b>MAM</b><br>mercado agrícola montevideo").openPopup();*/

$.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function(result){
        console.log(result);
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion, {title: bici.id}).addTo(map);
        });
    }
})