function soumettreInscr(){
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let age = document.getElementById("age").value;
    let adresse = document.getElementById("adresse").value;
    let pays = document.getElementById("pays").value;
    let courriel = document.getElementById("courriel").value;
    let mdp = document.getElementById("mot-de-passe").value;

    $.ajax({
        url: "/clients/",
        method:"POST",
        data: JSON.stringify({"prenom": prenom, "nom": nom, "age":age, "adresse":adresse, "pays": pays, "courriel": courriel, "mdp": mdp}),
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
async function chargerinscription (){

}

function validationPrenom(){
    let prenom = document.getElementById(`prenom`).value;
    let regX = new RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    let regXNombre = new RegExp(/[0-9]/);
    let specialChars = false;
    let nums = false;
    let vide = true;
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
    let vide = true;
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

function setInvalid(attribute){
    document.getElementById(attribute).setAttribute("class","form-control is-invalid")
}

function setValid(attribute){
    document.getElementById(attribute).setAttribute("class","form-control is-valid")
}

