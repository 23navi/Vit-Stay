mapboxgl.accessToken = mapboxAccessToken;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center:[-71,40],
        zoom:9
    });