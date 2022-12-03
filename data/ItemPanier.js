class ItemPanier {
  constructor (id, idObjet, nomObjet, descriptionObjet, prix, quantite, image) {
    this.id = id;
    this.idProduit = idObjet;
    this.nomProduit = nomObjet;
    this.descriptionProduit = descriptionObjet;
    this.prix = prix;
    this.quantite = quantite;
    this.image = image;
  }
}

module.exports = ItemPanier;
