//export (pour rendre le fonction accesible dans le autres fichiers)
export function ajoutClientsAvis() {
  //On recupere tous le boutons Avis pour leur ajouter un eventListener click
    const piecesElements = document.querySelectorAll(".fiches article button")
    for(let i = 0; i >= piecesElements.length; i++){
      piecesElements.addEventListener("click", function(event){

        const id = event.target.dataset.id;
        fetch(`http://localhost:8081/pieces/${id}/avis`);
      });

    }
}
