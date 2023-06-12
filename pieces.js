
//CODE AVANT LA REFACTORISASION
// Récupération des pièces depuis le fichier JSON
    const reponse = await fetch("pieces-autos.json");
    const pieces = await reponse.json();
    function genererPieces(pieces){
        for (let i = 0; i < pieces.length; i++) {

          const article = pieces[i];

    // Récupération de l'élément du DOM qui accueillera les fiches
          const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
          const pieceElement = document.createElement("article");



    //On crée les balises html:
          const imageElement = document.createElement("img");
          imageElement.src = article.image;
          const nomElement = document.createElement("h2");
          nomElement.innerText = article.nom;
          const prixElement = document.createElement("p");
          prixElement.innerText = `Prix ${article.prix} € (${article.prix >30 ? "€€€" : "€"})`; // Ternaire
          const categorieElement = document.createElement("p");
          categorieElement.innerText = article.categorie  ?? "(aucune catégorie)"; //Operatpr nullish
          const descriptionElement = document.createElement("p");
          descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
          const dispoElement = document.createElement("p");
          dispoElement.innerText = `${article.disponibilite? "En stock":"Rupture de stock"}`;


    //On rattache les elements au document en utilisent un PARENT (dans ce cas la balise <section class = "fiches">)

          sectionFiches.appendChild(pieceElement);
      //On change du coup "sectionFiches" par "pieceElement":
          pieceElement.appendChild(imageElement);
          pieceElement.appendChild(nomElement);
          pieceElement.appendChild(prixElement);
          pieceElement.appendChild(categorieElement);
          pieceElement.appendChild(descriptionElement);
          pieceElement.appendChild(dispoElement);
    }
  }


      genererPieces(pieces);

//gestion des boutons
//MANIPULATION DES LISTE AVEC .sort OU .filter


  //TRIER PRIX CROISSANT
      const boutonTrier = document.querySelector(".btn-trier");

      boutonTrier.addEventListener("click", function () {
        //On crée une copie de l'array pieces
        const piecesOrdonnees = Array.from(pieces);

        piecesOrdonnees.sort(function (a, b) {
          return a.prix - b.prix;
        });
        document.querySelector(".fiches").innerHTML = "";
        genererPieces(piecesOrdonnees);
      });


  //TRIER ABORDABLE
      const boutonFiltre = document.querySelector(".btn-filtrer");

      boutonFiltre.addEventListener("click", function () {
        const piecesFiltrees = pieces.filter(function(piece){
          return piece.prix <= 35;
        });
        document.querySelector(".fiches").innerHTML = "";
        genererPieces(piecesFiltrees);
      });


    //TRIER PRIX DECROISSANT
      const boutonPrixDecroissant = document.querySelector(".btn-prix-decroissant");

      boutonPrixDecroissant.addEventListener("click", function () {
    //On crée une copie de l'array pieces
        const piecesOrdonnees = Array.from(pieces);
        piecesOrdonnees.sort(function (a, b) {
          return b.prix - a.prix;
      });
      document.querySelector(".fiches").innerHTML = "";
      genererPieces(piecesOrdonnees);
    });


    //TRIER AVEC DESCRIPTION
      const boutonDescription = document.querySelector(".btn-avec-description");

      boutonDescription.addEventListener("click", function (){
        const piecesFiltrees = pieces.filter(function(piece){
          return piece.description != null;
        });
        document.querySelector(".fiches").innerHTML = "";
        genererPieces(piecesFiltrees);
      });
    //LISTE PIECES ABORDABLES:
    //Supprimer les elements plus chers que 35 euro pour avoir un array de pieces abordables
      const noms = pieces.map(piece => piece.nom);
      for(let i = pieces.length -1 ; i >= 0; i--){
        if(pieces[i].prix > 35){
            noms.splice(i, 1);
        }
      }

      const pElement = document.createElement('p')
      pElement.innerText = "Pièces abordables: ";
    //Création de la liste de piece abordables
      const abordablesElements = document.createElement('ul');
    //Ajout de chaque nom à la liste (i est l'index)
      for(let i=0; i < noms.length ; i++){
        const nomElement = document.createElement('li');
        nomElement.innerText = noms[i];
        abordablesElements.appendChild(nomElement)
      }
    // Ajout de l'en-tête puis de la liste au bloc résultats filtres
      document.querySelector('.abordables')
      .appendChild(pElement)
      .appendChild(abordablesElements)


    //LISTE PIECES DISPONIBLES:
    //Noms pieces disponibles
      const nomsDispo = pieces.map(piece => piece.nom);
      const prixDispo = pieces.map(piece => piece.prix);

      for (let i = pieces.length -1 ; i >= 0; i--){
        if(pieces[i].disponibilite == false){
          nomsDispo.splice(i, 1);
          prixDispo.splice(i, 1);
        }
      }

      const pElementsDisponibles = document.createElement('p')
      pElementsDisponibles.innerText = "Pièces disponibles: ";

    //Création de la liste de pieces disponibles:
      const disponiblesElements = document.createElement("ul");

    //Ajout de chaque nom à la liste + PRIX (i est l'index)
      for(let i=0; i < nomsDispo.length ; i++){
        const nomElement = document.createElement('li');
        nomElement.innerText = `${nomsDispo[i]} - ${prixDispo[i]} €`
        disponiblesElements.appendChild(nomElement)
      }

      document.querySelector(".disponibles")
      .appendChild(pElementsDisponibles)
      .appendChild(disponiblesElements)



      //RANGE INPUT PRIX MAX
      const inputPrixMax = document.querySelector('#prix-max')
      inputPrixMax.addEventListener('input', function(){
          const piecesFiltrees = pieces.filter(function(piece){
              return piece.prix <= inputPrixMax.value;
          });
          document.querySelector(".fiches").innerHTML = "";
          genererPieces(piecesFiltrees);
      })
