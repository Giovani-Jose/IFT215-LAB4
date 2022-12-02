function soumettreInscr(){
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let age = document.getElementById("age").value;
    let adresse = document.getElementById("adresse").value;
    let pays = document.getElementById("pays").value;
    let courriel = document.getElementById("courriel").value;
    let mdp = document.getElementById("mot-de-passe").value;

    /*Fermer les messages existants*/
    document.getElementById("success-alert").setAttribute("style","display:none");
    document.getElementById("error-alert").setAttribute("style","display:none");
    $.ajax({
        url: "/clients/",
        method:"POST",
        data: JSON.stringify({"prenom": prenom, "nom": nom, "age":age, "adresse":adresse, "pays": pays, "courriel": courriel, "mdp": mdp}),
        contentType: "application/json",
        success: function(result) {
            document.getElementById("success-alert").setAttribute("style","display:block");
            console.log("success");
            console.log(result);
        },
        error: function(result) {
            if (result.responseText != "Il y a déjà un client avec cette adresse")
                document.getElementById("msg-erreur").innerHTML = "Erreur : veuillez vérifier les champs du formulaire."
            else
                document.getElementById("msg-erreur").innerHTML = "Erreur : " + result.responseText;
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
async function chargerinscription (){

}

function validationPrenom(){
    let prenom = document.getElementById(`prenom`).value;
    let regX = new RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    let regXNombre = new RegExp(/[0-9]/);
    let specialChars = false;
    let nums = false;
    let vide = false;
    document.getElementById("prenom-msg").innerHTML = "Invalide."

    if(regX.test(prenom)){
        specialChars = true
    }

    if(regXNombre.test(prenom)){
        nums = true;
    }

    if(prenom == "" || prenom == null){
        vide = true;
    }

    if (specialChars){
        setInvalid('prenom')
        let message = "Ne doit pas contenire de caractères spéciaux."
        document.getElementById("prenom-msg").innerHTML += "<br>" + message
    }

    if (nums) {
        setInvalid('prenom')
        let message = "Ne doit pas contenire de chiffres."
        document.getElementById("prenom-msg").innerHTML += "<br>" + message
    }

    else if (vide) {
        setInvalid('prenom')
        let message = "Ne peut pas être vide."
        document.getElementById("prenom-msg").innerHTML += "<br>" + message
    }

    else{
        setValid('prenom')
    }
}

function validationNom(){
    let nom = document.getElementById('nom').value;
    let regX = new RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    let regXNombre = new RegExp(/[0-9]/);
    let specialChars = false;
    let nums = false;
    let vide = false;
    document.getElementById("nom-msg").innerHTML = "Invalide."

    if(regX.test(nom)){
        specialChars = true
    }

    if(regXNombre.test(nom)){
        nums = true;
    }

    if(nom == "" || nom == null){
        vide = true;
    }

    if (specialChars){
        setInvalid('nom')
        let message = "Ne doit pas contenire de caractères spéciaux."
        document.getElementById("nom-msg").innerHTML += "<br>" + message
    }

    if (nums) {
        setInvalid('nom')
        let message = "Ne doit pas contenire de chiffres."
        document.getElementById("nom-msg").innerHTML += "<br>" + message
    }

    else if (vide) {
        setInvalid('nom')
        let message = "Ne peut pas être vide."
        document.getElementById("nom-msg").innerHTML += "<br>" + message
    }

    else{
        setValid('nom')
    }
}

function validationAdresse(){
    let adresse = document.getElementById('adresse').value;

    if(adresse == "" || adresse == null){
        setInvalid('adresse')
    }

    else {
        setValid('adresse')
    }
}

function validationPays(){
    let pays = document.getElementById('pays').value;

    if(pays == "" || pays == null){
        setInvalid('pays')
    }

    else {
        setValid('pays')
    }
}

function validationAge(){
    let age = document.getElementById('age').value;

    if(age == "" || age == null){
        setInvalid('age')
    }

    else {
        setValid('age')
    }
}

function validationCourriel() {var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regX = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var mail = document.getElementById('courriel').value;

    if (regX.test(mail)) {
        setValid('courriel')
    } else {
        setInvalid('courriel')
        document.getElementById("courriel-msg").innerHTML = "L'adresse courriel doit respecter le format suivant :" + "<br>" + "example@example.ca"
    }
}

function validationMdp(){
    let mdp = document.getElementById(`mot-de-passe`).value;
    let regXmin = new RegExp(/[a-z]/g);
    let regXmaj = new RegExp(/[A-Z]/g);
    let regXspecial = new RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    let regXNombre = new RegExp(/[0-9]/);
    let min = false;
    let maj =false;
    let specialChars = false;
    let nums = false;
    let vide = false;
    let long = false;
    let valide = true;
    document.getElementById("mdp-msg").innerHTML = "Le mot de passe doit contenir :"

    if (mdp.length >= 8){
        long = true;
    }
    if(regXmin.test(mdp)){
        min = true;
    }

    if(regXmaj.test(mdp)){
        maj = true;
    }

    if(regXspecial.test(mdp)){
        specialChars = true
    }

    if(regXNombre.test(mdp)){
        nums = true;
    }

    if(mdp == "" || mdp == null){
        vide = true;
    }

    if (!long){
        setInvalid('mot-de-passe')
        let message = "Au moins 8 caractères."
        document.getElementById("mdp-msg").innerHTML += "<br>" + message
        valide = false;
    }
    if (!min){
        setInvalid('mot-de-passe')
        let message = "Au moins une minuscule."
        document.getElementById("mdp-msg").innerHTML += "<br>" + message
        valide = false;
    }
    if (!maj){
        setInvalid('mot-de-passe')
        let message = "Au moins une majuscule."
        document.getElementById("mdp-msg").innerHTML += "<br>" + message
        valide = false;
    }
    if (!specialChars){
        setInvalid('mot-de-passe')
        let message = "Au moins un caractère spécial."
        document.getElementById("mdp-msg").innerHTML += "<br>" + message
        valide = false;
    }

    if (!nums) {
        setInvalid('mot-de-passe')
        let message = "Au moins un chiffre."
        document.getElementById("mdp-msg").innerHTML += "<br>" + message
        valide = false;
    }

    else if (vide) {
        setInvalid('mot-de-passe')
        let message = "Ne peut pas être vide."
        document.getElementById("mdp-msg").innerHTML = message
        valide = false;
    }

    if (valide){
        setValid('mot-de-passe')
    }
}
function setInvalid(attribute){
    document.getElementById(attribute).setAttribute("class","form-control is-invalid")
}

function setValid(attribute){
    document.getElementById(attribute).setAttribute("class","form-control is-valid")
}

