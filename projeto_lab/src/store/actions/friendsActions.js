var array = require('lodash/array')

export const addFriend = (user) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const friendsArray = getState().firebase.profile.friends;
        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                return firestore.collection("users").doc(uid).update({
                    friends: friendsArray.concat({
                        username: user.username,
                        avatar: user.avatar,
                        gender: user.gender
                    })
                });
            }).then(() => {
                dispatch({ type: 'ADD_FRIEND_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'ADD_FRIEND_ERROR' })
            })
    }
}

export const removeFriend = (user) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const friendsArray = getState().firebase.profile.friends;
        console.log(friendsArray)
        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                array.remove(friendsArray, (item) => {
                    return item.username === user.username;
                });
                return firestore.collection("users").doc(uid).update({
                    friends: friendsArray
                });
            }).then(() => {
                dispatch({ type: 'REMOVE_FRIEND_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'REMOVE_FRIEND_ERROR' })
            })
    }
}