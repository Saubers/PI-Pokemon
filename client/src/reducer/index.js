const initialState = {
  pokemons: [],
  allPokemons: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "RELOAD_POKEMONS":
      return {
        ...state,
        pokemons: state.allPokemons,
      };
    case "GET_NAME_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "POST_POKEMONS":
      return {
        ...state,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "FILTER_BY_TYPE":
      const allPokemons = state.allPokemons;
      const typeFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter(
              (el) =>
                el.types.filter((el) => el.name === action.payload).length > 0
            );
      return {
        ...state,
        pokemons: typeFiltered,
      };
    case "FILTER_CREATED":
      const allPokemons2 = state.allPokemons;
      const creationFiltered =
        action.payload === "created"
          ? allPokemons2?.filter((el) => el.createdInDB)
          : allPokemons2?.filter((el) => !el.createdInDB);
      return {
        ...state,
        pokemons: action.payload === "All" ? allPokemons2 : creationFiltered,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "ascAlf"
          ? state.pokemons?.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons?.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArr,
      };
    case "ORDER_BY_ATTACK":
      let sortedArr2 =
      action.payload === "ascStr"
        ? state.pokemons?.sort(function (a, b) {
            if (a.attack > b.attack) {
              return -1;
            }
            if (a.attack < b.attack) {
              return 1;
            }
            return 0;
          })
        : state.pokemons?.sort(function (a, b) {
            if (a.attack > b.attack) {
              return 1;
            }
            if (a.attack < b.attack) {
              return -1;
            }
            return 0;
          });
      let allPokemons4 = state.pokemons;
      let allOptions = action.payload === "All" ?
      allPokemons4
      : sortedArr2;

      return {
        ...state,
        pokemons: sortedArr2,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }


}

export default rootReducer;
