import time

class User:
    def __init__(self, id, lat, lng, acc, timestamp):
        self.id = id
        self.lat = lat
        self.lng = lng
        self.acc = acc
        self.timestamp = timestamp

registered_users = {}

def register_user_in_storage(id, lat, lng, acc):
    print("Registering user " + id + " in storage")
    registered_users[id] = User(id, lat, lng, acc,
                                time.time_ns() // 1_000_000)
    print("Current user count " + str(len(registered_users)))

def get_users():
    return registered_users