workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.precaching.precacheAndRoute( self.__precacheManifest )

workbox.routing.registerRoute( /api/, new workbox.strategies.NetworkFirst( {
    plugins: [
        new workbox.cacheableResponse.Plugin( { statuses: [0, 200] } )
    ]
} ), "GET" )

