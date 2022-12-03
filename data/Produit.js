class Produit {
  constructor (id, serial, nom, description, prix, quantiteInventaire, categorie, image) {
    this.id = id;
    this.serial = serial;
    this.nom = nom;
    this.description = description;
    this.prix = prix;
    this.qte_inventaire = quantiteInventaire;
    this.categorie = categorie;
    this.image = image;
  }
}

module.exports = Produit;
