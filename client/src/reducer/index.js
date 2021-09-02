const initialState = {
  pokemons: [],
  allPokemons: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "POST_POKEMONS":
      return {
        ...state,
      };
      case 'FILTER_BY_TYPE':
      const allPokemons = state.allPokemons;
      const typesFiltered = 
      action.payload === 'All' 
      ?  allPokemons 
      : allPokemons.filter((el) => el.types?.filter(el => el.name === action.payload).length > 0)
      return {
        ...state,
        pokemons: typesFiltered
          }
  }
}

export default rootReducer;
