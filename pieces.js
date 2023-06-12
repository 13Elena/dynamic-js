// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

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

//gestion des boutons
//MANIPULATION DES LISTE AVEC .sort OU .filter

  const boutonTrier = document.querySelector(".btn-trier");

  boutonTrier.addEventListener("click", function () {
    //On crée une copie de l'array pieces
    const piecesOrdonnes = Array.from(pieces);

    piecesOrdonnes.sort(function (a, b) {
      return a.prix - b.prix;
    });
    console.log(piecesOrdonnes);
  });

  const boutonFiltre = document.querySelector(".btn-filter");

  boutonFiltre.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function(piece){
      return piece.prix <= 35;
    });
    console.log(piecesFiltrees)

  });

  const boutonPrixDecroissant = document.querySelector(".btn-prix-decroissant");
  boutonPrixDecroissant.addEventListener("click", function () {
    //On crée une copie de l'array pieces
    const piecesOrdonnes = Array.from(pieces);

    piecesOrdonnes.sort(function (a, b) {
      return b.prix - a.prix;
    });
    console.log(piecesOrdonnes);
  });

  const boutonDescription = document.querySelector(".btn-avec-description");
  boutonDescription.addEventListener("click", function (){
    const piecesFiltrees = pieces.filter(function(piece){
      return piece.description != null;
    });
    console.log(piecesFiltrees);
  });
