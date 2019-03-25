importScripts( "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js" )

if ( workbox ) {
    console.log( `Yay! Workbox is loaded 🎉` )
} else {
    console.log( `Boo! Workbox didn't load 😬` )
}

workbox.routing.registerRoute(
    /.*api.*/,
    new workbox.strategies.NetworkFirst( {
        cacheName: "api-pomodoro",
        plugins: [
            new workbox.cacheableResponse.Plugin( {
                statuses: [0, 200]
            } ),
            new workbox.expiration.Plugin( {
                maxAgeSeconds: 60 * 60 * 24,
                maxEntries: 30
            } )
        ]
    } )
)