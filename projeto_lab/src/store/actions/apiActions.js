var array = require('lodash/array')

export const getCountries = () => {
    var url = `https://restcountries.eu/rest/v2/all?fields=name`

    const handleResponse = (response) => {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    const handleData = (data) => {
      this.setState({ getPokedex: data.pokemon_entries, loading: false });
    }

    const handleError = (error) => {
      this.setState({ error: error });
    }

    fetch(url).then(handleResponse)
      .then(handleData)
      .catch(handleError);
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