export const getInfoPokemonPage = (pokemon) => {
  return (dispatch) => {
    dispatch({ type: 'API_REQUEST_START' });
    const urls = [
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
      `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
    ]

    Promise.all(urls.map(url =>
      fetch(url).then((response) => {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      })))
      .then((data) => {
        dispatch({ type: 'POKEMONINFO_DATA_SUCCESS', payload: data })
        fetch(data[1].evolution_chain.url)
          .then((response) => {
            return response.json().then(function (json) {
              return response.ok ? json : Promise.reject(json);
            }).then((data) => dispatch({ type: 'POKEMONINFO_EVOLUTION_DATA_SUCCESS', payload: data }))
          }).catch((error) => dispatch({ type: 'POKEMONINFO_EVOLUTION_DATA_ERROR', error: error }))
      }).catch((error) => dispatch({ type: 'POKEMONINFO_DATA_ERROR', error: error }))
  }
}

export const getYoutubeVideo = (pokemon) => {
  return (dispatch) => {
    dispatch({ type: 'API_REQUEST_START' });
    var url = `https://www.googleapis.com/youtube/v3/search?part=snippet%2C%20id&type=video&maxResults=3&order=relevance&q=${pokemon}&key=AIzaSyAoOgGNUDdI0oGGAQLoJOgomd5NwjoFelE`

    fetch(url)
      .then((response) => {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then((data) => dispatch({ type: 'YOUTEBE_DATA_SUCCESS', payload: data.items }))
      .catch((error) => dispatch({ type: 'YOUTEBE_DATA_ERROR', errorYtData: error }))
  }
}

export const getSignUpData = () => {
  return (dispatch) => {
    dispatch({ type: 'API_REQUEST_START' });
    const urls = [
      `https://restcountries.eu/rest/v2/all?fields=name`,
      `https://pokeapi.co/api/v2/version-group/`,
      `https://pokeapi.co/api/v2/region/`]

    Promise.all(urls.map(url =>
      fetch(url).then(async (response) => {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      })))
      .then(async (data) => {
        dispatch({ type: 'SIGNUP_DATA_SUCCESS', payload: data })
      }).catch((error) => dispatch({ type: 'SIGNUP_DATA_ERROR', error: error }))
  }
}

export const getPokedex = (region) => {
  return (dispatch) => {
    dispatch({ type: 'API_REQUEST_START' });
    var url = `https://pokeapi.co/api/v2/pokedex/${region}/`

    fetch(url)
      .then((response) => {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then((data) => dispatch({ type: 'POKEDEX_DATA_SUCCESS', payload: data.pokemon_entries }))
      .catch((error) => dispatch({ type: 'POKEDEX_DATA_ERROR', error: error }))
  }
}

/*export const getPokedexChangeValue = (param, secondParam, region, types) => {
  return (dispatch) => {
    dispatch({ type: 'API_REQUEST_START' });
    var url, pokemonData, defineSelectList;
    secondParam === 'Region' ?
      (url = `https://pokeapi.co/api/v2/pokedex/${param}/`) :
      (url = `https://pokeapi.co/api/v2/type/${param}/`);

    fetch(url)
      .then(async (response) => {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        })
      }).then((data) => {
        secondParam === 'Region' ? (pokemonData = data.pokemon_entries) : (pokemonData = data.pokemon);
        secondParam === 'Region' ? (defineSelectList = regions) : (defineSelectList = types);

        const indexOfLastResults = 1 * 24;
        const indexOfFirstResults = indexOfLastResults - 24;
        const currentResults = pokemonData.slice(indexOfFirstResults, indexOfLastResults);

        dispatch({
          type: 'POKEDEX_DATA_SUCCESS',
          payload: { items: currentResults, allPokedexEntries: pokemonData, selectValue: param, selectList: defineSelectList }
        })
      })
      .catch((error) => dispatch({ type: 'POKEDEX_CHANGE_DATA_ERROR', error: error }));
  }
}*/

export const getDataPokeListPage = () => {
  return (dispatch) => {
    dispatch({ type: 'API_REQUEST_START' });
    const urls = [
      `https://pokeapi.co/api/v2/pokedex/`,
      `https://pokeapi.co/api/v2/type/`
    ]

    Promise.all(urls.map(url =>
      fetch(url).then((response) => {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      })))
      .then((data) => {
        dispatch({ type: 'POKELIST_PAGE_DATA_SUCCESS', payload: data })
      }).catch((error) => dispatch({ type: 'POKELIST_PAGE_DATA_ERROR', error: error }))
  }
}

/* PROFILE ACTIONS */

export const getUserAndPokemonForProfileIQ = (user) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    dispatch({ type: 'API_REQUEST_START' });
    const firebase = getFirebase();
    firebase.firestore().collection('users').where("username", "==", user).get()
      .then((data) => {
        var userInfo
        data.forEach(doc => {
          userInfo = doc.data();
          if (userInfo.triviaRecord.pokemonIQ) {
            var url = `https://pokeapi.co/api/v2/pokemon-species/${userInfo.triviaRecord.pokemonIQ}/`
            fetch(url)
              .then((response) => {
                return response.json().then(function (json) {
                  return response.ok ? json : Promise.reject(json);
                });
              })
              .then((data) => dispatch({ type: 'POKE_PROFILE_IQ_DATA_SUCCESS', payload: { user: userInfo, pokemonIQ: data } }))
              .catch((error) => dispatch({ type: 'POKE_PROFILE_IQ_DATA_ERROR', payload: { user: userInfo, pokemonIQ: error } }))
          } else {
            dispatch({ type: 'POKE_PROFILE_IQ_DATA_SUCCESS', payload: { user: userInfo, pokemonIQ: null } })
          }
        });
      }).catch((error) => {
        dispatch({ type: 'POKE_PROFILE_IQ_DATA_ERROR', payload: { user: error.error, pokemonIQ: error.error } })
      })
  }
}

export const getAllUsers = (loggedUser) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    dispatch({ type: 'API_REQUEST_START' });
    const firebase = getFirebase();
    firebase.firestore().collection('users').get()
      .then((data) => {
        var returnData = [];
        data.forEach(doc => {
          let docInfo = doc.data();
          docInfo.username !== loggedUser && returnData.push(docInfo)
        });
        dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: returnData })
      }).catch((error) => {
        dispatch({ type: 'GET_ALL_USERS_ERROR', error: error })
      })
  }
}