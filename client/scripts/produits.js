$(function () {
    console.log("ift215");
});

function chargerproduit() {
    $.ajax({
        url: "/produits",
        success: function (result) {
            console.log(result);
        }
    });
}