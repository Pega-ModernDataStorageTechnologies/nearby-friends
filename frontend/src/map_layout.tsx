import React from 'react'
import { AdvancedMarker, APIProvider, ControlPosition, Map, MapControl } from '@vis.gl/react-google-maps'
import { AppTitle, Friend, FriendLayout, UserInfo } from './common_layouts'

const UserPosition = ({ position }) => {
    return (
        <AdvancedMarker position={{ lat: position.coords.latitude, lng: position.coords.longitude }}>
            <div style={{
                backgroundColor: '#539aff', borderRadius: '50%', height: 17, width: 17,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}>
                <div style={{ backgroundColor: '#0066ff', borderRadius: '50%', height: 12, width: 12 }} />
            </div>
        </AdvancedMarker>
    )
}

const Friends = (props: { friends: Friend[], userId: string }) => {
    return (
        <>
            {props.friends.filter(friend => friend.key !== props.userId).map((friend: Friend) => (
                <AdvancedMarker
                    key={friend.key}
                    position={friend.location}>
                    <FriendLayout friend={friend} />
                </AdvancedMarker>
            ))}
        </>
    )
}

const MapLayout = (props: { userName: string, position: GeolocationPosition, friends: Friend[] }) => {
    return <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}
                        onLoad={() => console.log('Maps API has loaded.')}>
        <Map
            defaultZoom={17}
            mapId={process.env.MAP_ID}
            colorScheme={'DARK'}
            disableDefaultUI={true}
            defaultCenter={{ lat: 50.026509445468164, lng: 379.9506013161122 }}>
            <MapControl position={ControlPosition.LEFT}>
                <div style={{ margin: 5 }}>
                    <AppTitle />
                </div>
            </MapControl>
            <MapControl position={ControlPosition.LEFT}>
                <div style={{ marginLeft: 5 }}>
                    <UserInfo userName={props.userName} position={props.position} />
                </div>
            </MapControl>
            <Friends friends={props.friends} userId={props.userName} />
            {props.position && <UserPosition position={props.position} />}
        </Map>
    </APIProvider>
}

export default MapLayout