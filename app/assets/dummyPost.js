import USERS from './dummyUsers'

const POSTS = [
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmQqK6WAQw8doLm7W9VdVT62laX92kamhsGA&usqp=CAU",
        user: USERS[0].user,
        likes: 8231,
        caption: 'this is beautiful 🔥',
        profilePic: USERS[0].image,
        comments: [
            {
                user: 'thequazman',
                comment: 'wow! this is the beauty of nature'
            },
            {
                user: 'chuck',
                comment: 'how are you doing?'
            }
        ] 
    },
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVlG9mYPLZGqa042niIJPYq-Xs0BYUB6-eaA&usqp=CAU",
        user: USERS[1].user,
        likes: 8231,
        caption: 'stars ⭐⭐⭐⭐',
        profilePic: USERS[1].image,
        comments: [
            {
                user: 'thequazman',
                comment: 'wow! this is the beauty of nature'
            },
        ] 
    },
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNCtcGbeqqw5GpWJG0C0271mwvMhS8b_Co2A&usqp=CAU",
        user: USERS[4].user,
        likes: 8231,
        caption: 'this is beautiful 🔥',
        profilePic: USERS[4].image,
        comments: [] 
    },
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNCtcGbeqqw5GpWJG0C0271mwvMhS8b_Co2A&usqp=CAU",
        user: USERS[4].user,
        likes: 8231,
        caption: 'this is beautiful 🔥',
        profilePic: USERS[4].image,
        comments: [
            {
                user: 'thequazman',
                comment: 'wow! this is the beauty of nature'
            },
            {
                user: 'chuck',
                comment: 'how are you doing?'
            }
        ] 
    },
]

export default POSTS