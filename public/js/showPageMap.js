mapboxgl.accessToken = mapboxAccessToken;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center:[-71,40],  //campgroundData["price"]
    zoom:9
});

console.log(campgroundData["price"])
console.log(campgroundData)
new mapboxgl.Marker().setLngLat([-71,40]).addTo(map);