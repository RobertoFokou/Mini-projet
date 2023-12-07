import { UPDATE_TACHE_STATUT } from "../actions/Types_Actions";

const initialState = {
    taches: [],
  };
  
  const tacheReducerProjet = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_TACHE_STATUT:
        const { taskId, newStatut } = action.payload;
        const updatedTaches = state.taches.map((tache) => {
          if (tache.id === taskId) {
            return {
              ...tache,
              statut: newStatut,
            };
          }
          return tache;
        });
        return {
          ...state,
          taches: updatedTaches,
        };
      default:
        return state;
    }
  };
  
  export default tacheReducerProjet;