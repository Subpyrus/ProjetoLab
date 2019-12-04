const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

const createNotification = (notification) => {
    return admin.firestore().collection('notifications').add(notification).then(doc => console.log('notification added', doc))
}

// como fazer notifications momentâneas? e como resolver remover poké de favoritos se é update
exports.favoritePokemonAdded = functions.firestore
    .document('users/{userId}')
    .onUpdate(doc => {
        const user = doc.data();
        const notification = {
            content: 'Added new Pokémon to Favorites',
            user: `${user.username}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification)
    })

exports.userJoined = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).get().then(doc => {
        const newUser = doc.data();
        const notification = {
            content: 'Welcome to Pokéfavorite',
            user: `${newUser.username}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification)
    })
})

