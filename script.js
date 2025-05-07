// Panier avec localStorage
function ajouterAuPanier(nom, prix, image) {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  panier.push({ nom, prix, image });
  localStorage.setItem("panier", JSON.stringify(panier));
  alert(nom + " ajouté au panier !");
}

// Affichage du panier
if (document.getElementById("liste-panier")) {
  const liste = document.getElementById("liste-panier");
  const total = document.getElementById("total");
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  let somme = 0;

  panier.forEach((article, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <img src="${article.image}" alt="${article.nom}" style="width:80px; height:auto; margin-right:10px; vertical-align:middle;">
      <strong>${article.nom}</strong> - ${article.prix.toFixed(2)} DT
      <button onclick="supprimer(${index})">❌</button>
    `;
    liste.appendChild(item);
    somme += article.prix;
  });

  total.textContent = "Total : " + somme.toFixed(2) + " DT";
}

// Suppression d'un article
function supprimer(index) {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  panier.splice(index, 1);
  localStorage.setItem("panier", JSON.stringify(panier));
  location.reload();
}

// Confirmation commande
const form = document.getElementById("form-commande");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nom = document.getElementById("nom").value;
    const adresse = document.getElementById("adresse").value;
    const email = document.getElementById("email").value;
    const msg = document.getElementById("confirmation-message");

    if (nom && adresse && email) {
      msg.textContent = "Merci " + nom + "! Votre commande est confirmée 💖";
      localStorage.removeItem("panier");
      form.reset();
    } else {
      msg.textContent = "Veuillez remplir tous les champs.";
    }
  });
  ajouterAuPanier("Bougie Lavande", 25, "/bougie.jpg");
}

