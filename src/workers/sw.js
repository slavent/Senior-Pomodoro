workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.precaching.precacheAndRoute( self.__precacheManifest )

workbox.routing.registerRoute( /api/, new workbox.strategies.NetworkFirst( {
    plugins: [
        new workbox.cacheableResponse.Plugin( { statuses: [0, 200] } )
    ]
} ), "GET" )

workbox.routing.registerRoute(
    /api/,
    async( { url, event, params } ) => {
        const { request } = event

        return fetch( request.clone() )
            .then( response => response )
            .catch( error => onFail( request ) )
    },
    "POST"
)

const onFail = request => {
    const intervalId = setInterval( () => {
        console.log( "Connection is " + ( navigator.onLine ? "success" : "fail." ) )

        if ( navigator.onLine ) {
            fetch( request )
                .then( response => response )
                .catch( error => console.error( error ) )

            clearInterval( intervalId )
        }
    }, 1000 )
}
