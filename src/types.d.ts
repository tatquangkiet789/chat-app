type User = {
    uid: string,
    photoURL: string,
    displayName: string,
    email: string
}

type Message = {
    uid: string,
    text: string,
    senderID: string,
    usersInvolve: string[]
}