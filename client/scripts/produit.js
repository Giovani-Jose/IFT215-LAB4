/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable camelcase */
/* eslint-disable space-before-blocks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
let TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k";
let IDCLIENT = -1;

function chargerproduit(){
  $.ajax({
    url: '/produits',
    success: function(result) {
      $.each(result, function (key, value) {
        item = item_to_html(value);
        $('#list_items').append(item);
      });
    }
  });
  $.ajax({
    url: "/clients/"+1+"/panier",
    method:"GET",
    beforeSend: function (xhr){
      xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
      },
    success: function(result) {
      val = result.items.length;
      $('#item_counter').text(val);
    }
   });
}

$(function () {
});

function item_to_html(item) {
  id = item.id;
  item_card = $('<div></div>')
    .addClass('card mb-4 rounded-3 shadow-sm');
  item_head = $('<div></div>')
    .addClass('card-header py-3')
    .append(`<h4 class="my-0 fw-normal">${item.nom}</h4>`);
  item_body = $('<div></div>')
    .addClass('card-body')
    .append([
      $(` <h1 class="card-title text-center"> $${item.prix}</h1>`),
      $(' <ul class="list-unstyled mt-3 mb-4">').append([$('<li>').append(`Qte dispo : ${item.qte_inventaire}`),
        $('<li>').append(`Categorie : ${item.categorie.nom}`),
        $('<br>'),
        $('<li>').append(item.categorie.description)]),
      $('<p class="w-100 display-6 text-center">').append([$('<button type="button" id="' + id + '" class="btn btn-primary position-relative" onclick="add_item(this.id)">').append($('<i class="bi bi-cart-plus"></i>'))])
      ]);

  item_card.append(item_head).append(item_body);
  return $('<div></div>').addClass('col-md-3').append(item_card);
}

function add_item(id_item)
{
    $.ajax({
        url: "/clients/"+1+"/panier",
        method:"POST",
        data: {"idProduit": id_item[0], "quantite": 1},
        beforeSend: function (xhr){
          xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
          },
        success: function(result) {
          val = result.items.length;
         $('#item_counter').text(val);
         console.log(result);

        }
       });
    }

    function chargerpanier()
    {
    $.ajax({
        url: "/clients/"+1+"/panier",
        method:"GET",
        beforeSend: function (xhr){
          xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
          },
        success: function(result) {
          console.log(result.items);
          addRow(result);
        }
       });
    }

    function addRow(result) {
      
      var tableRow = document.getElementById("tb");
 
      for(val in result.items)
      {
        var row = tableRow.insertRow(1);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = result.items[val].nomProduit;
        var cell2 = row.insertCell(1);
        cell2.innerHTML = result.items[val].prix;
        var cell3 = row.insertCell(2);
        cell3.innerHTML = result.items[val].quantite;
        var cell4 = row.insertCell(3);
        cell4.innerHTML = result.items[val].prix;
      }
      var cell5 = row.insertCell(4);
      cell5.innerHTML = result.valeur;

    }
