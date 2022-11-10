$(function () {
    console.log("ift215");
});

$.ajax({
    url: "/produits",
    success: function( result ) {
    console.log(result);
    }
   });

function chargerproduit() {
    $.ajax({
        url: "/produits",
        success: function (result) {
            console.log(result);
        }
    });
}