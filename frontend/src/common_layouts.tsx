import React from 'react'

export type Friend = { key: string, location: google.maps.LatLngLiteral, time: string, acc: number }

export const FriendLayout = (props: { friend: Friend, full : boolean }) => {
    return <div style={{
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
    }}>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
        }}>
            <div style={{
                backgroundColor: 'lime',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
            }} />
            <h4>{props.friend.key}</h4>
        </div>
        <em>{props.friend.time}</em>
        <div>{props.full && <small>Lat: {props.friend.location.lat}</small>}</div>
        <div>{props.full && <small>Lng: {props.friend.location.lng}</small>}</div>
        <small>Acc: {props.friend.acc}m</small>
    </div>
}

export const AppTitle = () => {
    return (
        <div style={{
            backgroundColor: 'white', padding: 5, borderRadius: 5, margin: 5, marginBottom: 0,
        }}>
            <h1>Nearby Friends</h1>
        </div>
    )
}

export const UserInfo = (props: { userName : string, position : GeolocationPosition }) => {
    return <div style={{
        backgroundColor: 'white', margin: 5, padding: 5, borderRadius: 5, display: 'flex',
        flexDirection: 'column',
    }}>
        <h4>{props.userName}</h4>
        {props.position && <>
            <em>Lat: {props.position.coords.latitude}</em>
            <em>Lng: {props.position.coords.longitude}</em>
            <em>Acc: {props.position.coords.accuracy}m</em>
        </>}
    </div>
}
