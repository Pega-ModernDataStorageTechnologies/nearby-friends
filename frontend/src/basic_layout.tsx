import React from 'react'
import { AppTitle, Friend, FriendLayout, UserInfo } from './common_layouts'

const BasicLayout = (props: { userName: string, position: GeolocationPosition, friends: Friend[] }) => {
    return <div id={'app'} style={{
        backgroundColor: '#2b2b2b', display: 'flex', flexDirection: 'column',
        gap: 5,
    }}>
        <AppTitle />
        <UserInfo userName={props.userName} position={props.position} />
        <h2 style={{ color: 'white' }}>Your Friends Nearby</h2>
        <div style={{ display: 'flex', gap: 5, padding: 5 }}>
            {props.friends.filter(friend => friend.key !== props.userName)
                .map(friend => <FriendLayout key={friend.key} friend={friend} full={true} />)}
        </div>
    </div>
}

export default BasicLayout