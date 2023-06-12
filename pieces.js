// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

//On crée les elements html:
const article = pieces[0];

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

const sectionFiches = document.querySelector(".fiches");
sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);
sectionFiches.appendChild(descriptionElement);
sectionFiches.appendChild(dispoElement);
