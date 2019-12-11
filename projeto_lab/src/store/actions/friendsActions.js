var array = require('lodash/array')

export const addFriend = (user) => {
    return (dispatch, getState, { getFirestore }) => {
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
            }).catch((error) => {
                dispatch({ type: 'ADD_FRIEND_ERROR', error: error })
            })
    }
}

export const removeFriend = (user) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const friendsArray = getState().firebase.profile.friends;
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
            }).catch((error) => {
                dispatch({ type: 'REMOVE_FRIEND_ERROR', error: error })
            })
    }
}