export const getInfoPokemonPage = (pokemon) => {
  return (dispatch, getState) => {
    dispatch({ type: 'API_REQUEST_START' });
    const urls = [
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
      `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`/*,
    `https://www.googleapis.com/youtube/v3/search?part=snippet%2C%20id&type=video&maxResults=3&order=relevance&q=${pokemon}&key=AIzaSyAoOgGNUDdI0oGGAQLoJOgomd5NwjoFelE`*/
    ]

    Promise.all(urls.map(url =>
      fetch(url).then((response) => {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      })))
      .then(async (data) => {
        dispatch({ type: 'POKEMONINFO_DATA_SUCCESS', payload: data })
        fetch(data[1].evolution_chain.url)
          .then(async (response) => {
            return response.json().then(function (json) {
              return response.ok ? json : Promise.reject(json);
            }).then(async (data) => dispatch({ type: 'POKEMONINFO_EVOLUTION_DATA_SUCCESS', payload: data }))
          }).catch((error) => dispatch({ type: 'POKEMONINFO_EVOLUTION_DATA_ERROR', error: error }))
      }).catch((error) => dispatch({ type: 'POKEMONINFO_DATA_ERROR', error: error }))
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

/* POKÉLIST ACTIONS */

export const getPokedex = (region) => {
  return (dispatch) => {
    dispatch({ type: 'API_REQUEST_START' });
    var url = `https://pokeapi.co/api/v2/pokedex/${region}/`

    fetch(url)
      .then(async (response) => {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then(async (data) => dispatch({ type: 'POKEDEX_DATA_SUCCESS', payload: data.pokemon_entries }))
      .catch((error) => dispatch({ type: 'POKEDEX_DATA_ERROR', error: error }))
  }
}

export const getDataPokeListPage = () => {
  return (dispatch) => {
    dispatch({ type: 'API_REQUEST_START' });
    const urls = [
      `https://pokeapi.co/api/v2/pokedex/`,
      `https://pokeapi.co/api/v2/type/`
    ]

    Promise.all(urls.map(url =>
      fetch(url).then(async (response) => {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      })))
      .then(async (data) => {
        dispatch({ type: 'POKELIST_PAGE_DATA_SUCCESS', payload: data })
      }).catch((error) => dispatch({ type: 'POKELIST_PAGE_DATA_ERROR', error: error }))
  }
}

/* PROFILE ACTIONS */

export const getPokemonForProfileIQ = (userCorrectAnswers, userWrongAnswers) => {
  return (dispatch) => {
    dispatch({ type: 'API_REQUEST_START' });
    var pokemon;
    let allAnswers = userCorrectAnswers + userWrongAnswers;
    let averageCorrectAnswers = userCorrectAnswers / allAnswers;
    averageCorrectAnswers *= 100;

    if (isNaN(averageCorrectAnswers)) {
      dispatch({ type: 'POKEPROFILEIQ_NOT_NEEDED' });
    } else if (averageCorrectAnswers >= 90) {
      pokemon = 'alakazam';
    } else if (averageCorrectAnswers >= 75) {
      pokemon = 'metagross';
    } else if (averageCorrectAnswers >= 50) {
      pokemon = 'beheeyem';
    } else if (averageCorrectAnswers >= 25) {
      pokemon = 'quagsire';
    } else if (averageCorrectAnswers >= 10) {
      pokemon = 'slowpoke';
    } else {
      pokemon = 'magikarp';
    }

    var url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`
    fetch(url)
      .then((response) => {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then((data) => dispatch({ type: 'POKEPROFILEIQ_DATA_SUCCESS', payload: data }))
      .catch((error) => dispatch({ type: 'POKEPROFILEIQ_DATA_ERROR', error }))
  }
}

