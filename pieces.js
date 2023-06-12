// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());

// Fonction qui génère toute la page web
function genererPieces(pieces) {
  for (let i = 0; i < pieces.length; i++) {
       // Création d’une balise dédiée à une pièce auto
       const pieceElement = document.createElement("article");
       // On crée l’élément img.
       const imageElement = document.createElement("img");
       // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
       imageElement.src = pieces[i].image;
       // On rattache l’image à pieceElement (la balise article)
       pieceElement.appendChild(imageElement);
       // Idem pour le nom, le prix et la catégorie ...
       // ...
       // On rattache la balise article au body
       document.body.appendChild(pieceElement);
  }

}

// Premier affichage de la page
genererPieces(pieces);

// Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
   const piecesOrdonnees = Array.from(pieces)
   piecesOrdonnees.sort(function (a, b) {
       return b.prix - a.prix;
   });
  // Effacement de l'écran et regénération de la page
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
});

// Ajout du listener pour filtrer les pièces non abordables
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.disponibilite;
   });
   // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
});

// CODE AVANT LA REFACTORISASION
//// Récupération des pièces depuis le fichier JSON
//     const reponse = await fetch("pieces-autos.json");
//     const pieces = await reponse.json();

//     for (let i = 0; i < pieces.length; i++) {

//       const article = pieces[i];

//// Récupération de l'élément du DOM qui accueillera les fiches
//       const sectionFiches = document.querySelector(".fiches");
//// Création d’une balise dédiée à une pièce automobile
//       const pieceElement = document.createElement("article");



////On crée les balises html:
//       const imageElement = document.createElement("img");
//       imageElement.src = article.image;
//       const nomElement = document.createElement("h2");
//       nomElement.innerText = article.nom;
//       const prixElement = document.createElement("p");
//       prixElement.innerText = `Prix ${article.prix} € (${article.prix >30 ? "€€€" : "€"})`; // Ternaire
//       const categorieElement = document.createElement("p");
//       categorieElement.innerText = article.categorie  ?? "(aucune catégorie)"; //Operatpr nullish
//       const descriptionElement = document.createElement("p");
//       descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
//       const dispoElement = document.createElement("p");
//       dispoElement.innerText = `${article.disponibilite? "En stock":"Rupture de stock"}`;


////On rattache les elements au document en utilisent un PARENT (dans ce cas la balise <section class = "fiches">)

//       sectionFiches.appendChild(pieceElement);
//   //On change du coup "sectionFiches" par "pieceElement":
//       pieceElement.appendChild(imageElement);
//       pieceElement.appendChild(nomElement);
//       pieceElement.appendChild(prixElement);
//       pieceElement.appendChild(categorieElement);
//       pieceElement.appendChild(descriptionElement);
//       pieceElement.appendChild(dispoElement);
// }

////gestion des boutons
////MANIPULATION DES LISTE AVEC .sort OU .filter

//       const boutonTrier = document.querySelector(".btn-trier");

//       boutonTrier.addEventListener("click", function () {
//         //On crée une copie de l'array pieces
//         const piecesOrdonnes = Array.from(pieces);

//         piecesOrdonnes.sort(function (a, b) {
//           return a.prix - b.prix;
//         });
//         console.log(piecesOrdonnes);
//       });

//       const boutonFiltre = document.querySelector(".btn-filter");

//       boutonFiltre.addEventListener("click", function () {
//         const piecesFiltrees = pieces.filter(function(piece){
//           return piece.prix <= 35;
//         });
//         console.log(piecesFiltrees)

//       });

//       const boutonPrixDecroissant = document.querySelector(".btn-prix-decroissant");
//       boutonPrixDecroissant.addEventListener("click", function () {
////On crée une copie de l'array pieces
//       const piecesOrdonnes = Array.from(pieces);

//       piecesOrdonnes.sort(function (a, b) {
//         return b.prix - a.prix;
//       });
//       console.log(piecesOrdonnes);
//     });

//       const boutonDescription = document.querySelector(".btn-avec-description");
//       boutonDescription.addEventListener("click", function (){
//         const piecesFiltrees = pieces.filter(function(piece){
//           return piece.description != null;
//         });
//         console.log(piecesFiltrees);
//       });
// //PIECES ABORDABLES:
////Supprimer les elements plus chers que 35 euro pour avoir un array de pieces abordables
//       const noms = pieces.map(piece => piece.nom);
//       for(let i = pieces.length -1 ; i >= 0; i--){
//         if(pieces[i].prix > 35){
//             noms.splice(i, 1);
//         }
//       }
////Création de la liste de piece abordables
//       const abordablesElements = document.createElement('ul');
////Ajout de chaque nom à la liste (i est l'index)
//       for(let i=0; i < noms.length ; i++){
//         const nomElement = document.createElement('li');
//         nomElement.innerText = noms[i];
//         abordablesElements.appendChild(nomElement)
//       }
//// Ajout de l'en-tête puis de la liste au bloc résultats filtres
//       document.querySelector('.abordables').appendChild(abordablesElements)

////PIECES DISPONIBLES:
////Noms pieces disponibles
//       const nomsDispo = pieces.map(piece => piece.nom);
//       const prixDispo = pieces.map(piece => piece.prix);
//       for (let i = pieces.length -1 ; i >= 0; i--){
//         if(pieces[i].disponibilite == false){
//           nomsDispo.splice(i, 1);
//           prixDispo.splice(i, 1);
//         }
//       }
////Création de la liste de pieces disponibles:
//       const disponiblesElements = document.createElement("ul");
////Ajout de chaque nom à la liste + PRIX (i est l'index)
//       for(let i=0; i < nomsDispo.length ; i++){
//         const nomElement = document.createElement('li');
//         nomElement.innerText = `${nomsDispo[i]} - ${prixDispo[i]} €`
//         disponiblesElements.appendChild(nomElement)
//       }
//       document.querySelector(".disponibles").appendChild(disponiblesElements)
