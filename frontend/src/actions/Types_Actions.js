export const UPDATE_TACHE_STATUT = "UPDATE_TACHE_STATUT";

// GESTION DU DEPLACEMENT DES TACHES
export const updateTacheStatut = (taskId, newStatut) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_TACHE_STATUT,
      payload: {
        taskId,
        newStatut,
      },
    });
  };
};