function soumettreConnexion(){
    let courriel = document.getElementById("courriel").value;
    let mdp = document.getElementById("mot-de-passe").value;

    $.ajax({
        url: "/connexion/",
        method:"POST",
        data: JSON.stringify({"courriel": courriel, "mdp": mdp}),
        contentType: "application/json",
        success: function(result) {
            console.log("success");
            console.log(result);
        },
        error: function(result) {
            document.getElementById("msg-erreur").innerHTML = "Erreur :" + '\n' + result.responseText;
            document.getElementById("error-alert").setAttribute("style","display:block");

            console.log(result.responseText);
            console.log(result);
        }
    });
}

/**
 * Fonction qui initie le lancement des fonctions de ce script. Appelée par "chargerSousContenu" dans navigation.js.
 * Remplace le DOMContentLoaded qui est lancé bien avant que le contenu associé à ce script ne soit dans l'écran.
 * @returns {Promise<void>}
 */
async function chargerconnexion (){

}

