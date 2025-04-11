import time
from math import radians, sin, atan2, sqrt, cos
from flaskr.storage import get_users

R = 6373.0

def distance_between(lat, lng, b):

    lat_1_rad = radians(lat)
    lng_1_rad = radians(lng)
    lat_2_rad = radians(b.lat)
    lng_2_rad = radians(b.lng)

    delta_lng = lng_2_rad - lng_1_rad
    delta_lat = lat_2_rad - lat_1_rad

    a = sin(delta_lat / 2) ** 2 + cos(lat_1_rad) * cos(lat_2_rad) * sin(delta_lng / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c

def is_expired(user):
    return user.timestamp < time.time_ns() // 1_000_000 - 120000 #Two minutes ago

def find_nearby(lat, lng, radius):
    users_to_expire = []
    nearby_users = []

    for id, user in get_users().items():
        distance = distance_between(lat, lng, user)
        if is_expired(user):
            users_to_expire.append(user)
            continue

        if distance < radius:
            nearby_users.append(user)

    print("Expiring " + str(len(users_to_expire)) + " users")
    for user in users_to_expire:
        get_users().pop(user.id, None)

    return nearby_users
