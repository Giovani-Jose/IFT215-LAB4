function soumettreConnexion(){
    /*Fermer les messages existants*/
    document.getElementById("error-alert").setAttribute("style","display:none");

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
            //INFO CONNEXION
            TOKEN_CLIENT = result.token;
            IDCLIENT = result.idClient;

            alert("Connexion réussie! Retour à l'accueil.")
            window.location.replace("#/")
        },
        error: function(result) {
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

