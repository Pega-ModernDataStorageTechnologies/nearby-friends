import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import dockerNames from 'docker-names'
import { AppTitle, Friend, UserInfo } from './common_layouts'
import MapLayout from './map_layout'
import BasicLayout from './basic_layout'


const App = () => {

    const [friends, setFriends] = useState<Friend[]>([])
    const [position, setPosition] = useState<GeolocationPosition>()
    const [userName] = useState<string>(() => {
        const storedName = localStorage.getItem('userName')
        if (storedName) {
            console.log('Found existing username', storedName)
            return storedName
        }
        console.log('Generating new name')
        const generatedName = dockerNames.getRandomName().split('_').join(' ')
        localStorage.setItem('userName', generatedName)
        return generatedName
    })

    const getLocation = (success) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                success(position)
            }, () => {
                console.log('Failed to get location')
            })
        } else {
            console.log('Geolocation is not supported.')
        }
    }

    const updateFriends = () => {
        console.debug('Updating friends')
        if (!position) {
            return
        }
        fetch(`${process.env.URL}/get_nearby?lat=${position.coords.latitude}&lng=${position.coords.longitude}`)
            .then((res) => {
                res.json().then(result => {
                    setFriends(result.map(friend => {
                        return {
                            key: friend.id,
                            location: {
                                lat: friend.lat,
                                lng: friend.lng,
                            },
                            acc: friend.acc,
                            time: new Date().toLocaleTimeString(),
                        }
                    }))
                })
            })
    }

    const registerLocation = () => {
        getLocation((position: GeolocationPosition) => {
            setPosition(position)
            fetch(`${process.env.URL}/register`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    id: userName,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    acc: position.coords.accuracy,
                }),
            })
        })
    }

    useEffect(() => {
        updateFriends()
        const interval = setInterval(updateFriends, 5000)
        return () => {
            clearInterval(interval)
        }
    }, [position])

    useEffect(() => {
        console.debug('Registering user', userName)
        registerLocation()
        const interval = setInterval(registerLocation, 30000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    if (process.env.GOOGLE_MAPS_API_KEY) {
        return <MapLayout userName={userName} position={position} friends={friends} />
    } else {
        return <BasicLayout userName={userName} position={position} friends={friends} />
    }
}

const root = createRoot(document.getElementById('app'))
root.render(<App />)

export default App