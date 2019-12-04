export const getNotifications = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('notifications').get()
            .then(content => {
                var returnContent = []
                content.docs.map(doc => {
                    returnContent.push(doc.data())
                })
                dispatch({ type: 'GET_NOTIFICATIONS_SUCCESS', payload: returnContent })
            }).catch((error) => {
                console.log(error)
                dispatch({ type: 'GET_NOTIFICATIONS_ERROR', payload: error })
            })
    }
}