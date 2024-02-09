/* eslint-disable */
const maps=document.querySelector('map')
    const locations=JSON.parse(document.getElementById('map').dataset.locations);

    mapboxgl.accessToken = 'pk.eyJ1IjoiYW51cmFnNDczIiwiYSI6ImNscm0zbjVqZjBxOWcya3FlN3Vua3oycHEifQ.xeAU1KNT6f_eiD62UxdY6g';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/anurag473/clrm5a2uz004501pn7uhr69vw',
    scrollZoom:false
    });
    const bounds=new mapboxgl.LngLatBounds();
    locations.forEach(loc=>{
        const el=document.createElement('div')
        el.className='marker'

        new mapboxgl.Marker({
            element: el,
            anchor:'bottom'
        }).setLngLat(loc.coordinates).addTo(map)

        new mapboxgl.Popup({
            offset:30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}:${loc.description}</p>`).addTo(map)

        bounds.extend(loc.coordinates)


    })
    map.fitBounds(bounds,{
        padding:{
            top:200,
            bottom:200,
            left:100,
            right:100
        }
})

