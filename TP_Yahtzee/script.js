var DesDisplay = false;
var DesResults = [];
var checkBlocked = [];

var relancePossibleParTour = 3;
var relanceActuelle = 0;
var nombreDes = 5;

var totalAS = 0;
var totalDEUX = 0;
var totalTROIS = 0;
var totalQUATRE = 0;
var totalCINQ = 0;
var totalSIX = 0;

var totalASKeep = false;
var totalDEUXKeep = false;
var totalTROISKeep = false;
var totalQUATREKeep = false;
var totalCINQKeep = false;
var totalSIXKeep = false;

var brelan = 0;
var full = 0;
var full = 0;
var petiteSuite = 0;
var yahztee = 0;
var chance = 0;
var primeYahtzee = 0;

var brelanKeep = false;
var fullKeep = false;
var carreKeep = false;
var petiteSuiteKeep = false;
var yahzteeKeep = false;
var chanceKeep = false;
var primeYahtzeeKeep = false;

function
nouvellePartie(){
    DesDisplay = false;
DesResults = [];
checkBlocked = [];

relanceActuelle = 0;

totalAS = 0;
totalDEUX = 0;
totalTROIS = 0;
totalQUATRE = 0;
totalCINQ = 0;
totalSIX = 0;

totalASKeep = false;
totalDEUXKeep = false;
totalTROISKeep = false;
totalQUATREKeep = false;
totalCINQKeep = false;
totalSIXKeep = false;

brelan = 0;
full = 0;
full = 0;
petiteSuite = 0;
yahztee = 0;
chance = 0;
primeYahtzee = 0;

brelanKeep = false;
fullKeep = false;
carreKeep = false;
petiteSuiteKeep = false;
yahzteeKeep = false;
chanceKeep = false;
primeYahtzeeKeep = false;

Yahtzee.random();
}

//objet Yahtzee
Yahtzee = {

    /**
     * Fonction qui va trouver les numéros aléatoires pour les dés en fonction de :
     * -si c'est la première fois que les dés s'affichent
     * -si un ou plusieurs dés sont bloqués ou non
     */
    random:function(){
        //si le joueur peut encore relancer les dés dans ce tour
        if(relanceActuelle <= relancePossibleParTour){
            //on ajoute une relance
            relanceActuelle = relanceActuelle + 1;
            //génération des numéros possibles
            var numbers = [1,2,3,4,5]
            //si c'est la première fois que l'on affiche les dés
            if(!DesDisplay){
                //pour chaque dé
                for(var a = 0;a<nombreDes;a++){
                    //génération du numéro pour ce dé
                    var randomNumber = numbers[Math.floor(Math.random() * Math.floor(numbers.length))];
                    //on enregistre la valeur de ce dé et sa position
                    DesResults[a] = randomNumber;
                    //on affiche le dé
                    displayDes(DesResults[a],a);
                }
                //on précise que ce ne sera plus la première fois que les dés seront affichés
                DesDisplay = true;
            } //si ce n'est pas la première fois que l'on affiche les dés
            else {
                //on efface l'ensemble des dés
                $("#listeDes img").remove();
                //pour chaque dé
                for(var a = 0;a<nombreDes;a++){
                    //si l'ancien dé à cette position [a] était bloqué
                    if(checkBlocked[a] == true && relanceActuelle != 1){
                        //on réaffiche ce dé
                        displayDes(DesResults[a],a);
                    } //si l'ancien dé à cette position [a] n'était pas bloqué
                    else {
                        //génération du numéro pour ce nouveau dé
                        var randomNumber = numbers[Math.floor(Math.random() * Math.floor(numbers.length))];
                        //on enregistre la valeur de ce nouveau dé et sa position
                        DesResults[a] = randomNumber;
                        //on affiche le nouveau dé
                        displayDes(DesResults[a],a);
                    }
                }
            }
            checkCombinaisonsSuperieures();
            checkCombinaisonsInferieures();
        } //sinon il doit forcément enregistrer une combinaison
        else {
        } 
    },

}

/**
 * Fonction qui va afficher les dés en fonction du numéro et de son placement
 * @param {*} number numéro du dé à afficher
 * @param {*} id position du dé à afficher
 */
function 
displayDes(number,id){
    //si le dé précédent à la même position était bloqué
    if(checkBlocked[id] == true && relanceActuelle != 1){
        //on garde la même photo
        $("#listeDes").append('<img id="De'+id+'" src="des/'+number+'-blocked.png" onclick="clickDe('+number+','+id+')">');
        //on précise que ce nouveau dé est bloqué aussi
        checkBlocked[id] = true;
    } //si le dé précédent à la même position n'était pas bloqué
    else {
        //on affiche le nouveau dé
        $("#listeDes").append('<img id="De'+id+'" src="des/'+number+'.png" onclick="clickDe('+number+','+id+')">');
        //on précise que ce nouveau dé n'est pas bloqué
        checkBlocked[id] = false;
    }
}

/**
 * Fonction qui va gérer le clic sur un des dés pour le bloquer ou le débloquer
 * @param {*} number numéro du dé cliqué
 * @param {*} id position du dé cliqué
 */
function
clickDe(number,id){
    //si le dé n'est pas bloqué
    if(checkBlocked[id] == false){
        //on change l'image du dé
        $('#De'+id).attr('src', 'des/'+number+'-blocked.png');
        //on la bloque
        checkBlocked[id] = true;
    } //sinon
    else {
        //on change l'image du dé
        $('#De'+id).attr('src', 'des/'+number+'.png');
        //on la débloque
        checkBlocked[id] = false;
    }
}

/**
 * Fonction qui va vérifier les combinaisons possibles pour la section supérieure.
 */
function
checkCombinaisonsSuperieures(){
    //on supprime les boutons "Garder"
    $('#totalASLigneButton').remove();
    $('#totalDEUXLigneButton').remove();
    $('#totalTROISLigneButton').remove();
    $('#totalQUATRELigneButton').remove();
    $('#totalCINQLigneButton').remove();
    $('#totalSIXLigneButton').remove();
    
    //on initialise les valeurs pour ce tour
    var totalASLocal = 0;
    var totalDEUXLocal = 0;
    var totalTROISLocal = 0;
    var totalQUATRELocal = 0;
    var totalCINQLocal = 0;
    var totalSIXLocal = 0;

    //on parcours le tableau des numéros tirés
    DesResults.forEach(element => {
        //on compte le nombre de 1
        if(element == 1){
            totalASLocal = totalASLocal + 1;
        } else if(element == 2){
            totalDEUXLocal = totalDEUXLocal + 2;
        } else if(element == 3){
            totalTROISLocal = totalTROISLocal + 3;
        } else if(element == 4){
            totalQUATRELocal = totalQUATRELocal + 4;
        } else if(element == 5){
            totalCINQLocal = totalCINQLocal + 5;
        } else {
            totalSIXLocal = totalSIXLocal + 6;
        }
    });

    setTotalAS(totalASLocal);
    setTotalDEUX(totalDEUXLocal);
    setTotalTROIS(totalTROISLocal);
    setTotalQUATRE(totalQUATRELocal);
    setTotalCINQ(totalCINQLocal);
    setTotalSIX(totalSIXLocal);
}

/**
 * Fonction qui va afficher soit le résultat de la combinaison "Total des AS" pour ce tour si la combinaison n'a pas été gardée
 * par le joueur, soit le score de la combinaison "Total des AS" sauvegardée précedemment.
 * @param {*} totalASLocal 
 */
function
setTotalAS(totalASLocal){
    //si la combinaison "total des AS" n'a pas été gardée par le joueur, on n'affiche pas le reste
    if(!totalASKeep){
        //on ajoute le total des 1 pour cette partie dans la bonne case
        $('#totalAS').html(totalASLocal);
        //si le total est 1 est supérieur à 0
        if(totalASLocal != 0){
            //on ajoute le bouton "Garder" pour sauvegarder la combinaison qui, quand on cliquera 
            //dessus, lancera la fonction de sauvegarde de combinaison
            var totalAStype = "totalAS";
            //si le bouton est deja présent
            if (document.getElementById("#totalASLigneButton")) {
                $("#totalASLigneButton").replaceWith('<td id="totalASLigneButton"><button onclick="keepCombinaison(\''+totalAStype+'\')">Garder</button></td>');
              } //si le bouton n'existe pas encore
              else {
                $('#totalASLigne').append('<td id="totalASLigneButton"><button onclick="keepCombinaison(\''+totalAStype+'\')">Garder</button></td>');
              }
        }
    } //si la combinaison "total des AS" a été gardée précédemment par le joueur, 
    //on affiche la valeur sauvegardée
    else {
        $('#totalAS').html(totalAS);
    }
}

/**
 * Fonction qui va afficher soit le résultat de la combinaison "Total des DEUX" pour ce tour si la combinaison n'a pas été gardée
 * par le joueur, soit le score de la combinaison "Total des DEUX" sauvegardée précedemment.
 * @param {*} totalDEUXLocal 
 */
function
setTotalDEUX(totalDEUXLocal){
    //si la combinaison "total des AS" n'a pas été gardée par le joueur, on n'affiche pas le reste
    if(!totalDEUXKeep){
        //on ajoute le total des 1 pour cette partie dans la bonne case
        $('#totalDEUX').html(totalDEUXLocal);
        //si le total est 1 est supérieur à 0
        if(totalDEUXLocal != 0){
            //on ajoute le bouton "Garder" pour sauvegarder la combinaison qui, quand on cliquera 
            //dessus, lancera la fonction de sauvegarde de combinaison
            var totalDEUXtype = "totalDEUX";

            if (document.getElementById("#totalDEUXLigneButton")) {
                $("#totalDEUXLigneButton").replaceWith('<td id="totalDEUXLigneButton"><button onclick="keepCombinaison(\''+totalDEUXtype+'\')">Garder</button></td>');
              } //si le bouton n'existe pas encore
              else {
                $('#totalDEUXLigne').append('<td id="totalDEUXLigneButton"><button onclick="keepCombinaison(\''+totalDEUXtype+'\')">Garder</button></td>');
              }
        }
    } //si la combinaison "total des AS" a été gardée précédemment par le joueur, 
    //on affiche la valeur sauvegardée
    else {
        $('#totalDEUX').html(totalDEUX);
    }
}

/**
 * Fonction qui va afficher soit le résultat de la combinaison "Total des TROIS" pour ce tour si la combinaison n'a pas été gardée
 * par le joueur, soit le score de la combinaison "Total des TROIS" sauvegardée précedemment.
 * @param {*} totalTROISLocal 
 */
function
setTotalTROIS(totalTROISLocal){
    //si la combinaison "total des TROIS" n'a pas été gardée par le joueur, on n'affiche pas le reste
    if(!totalTROISKeep){
        //on ajoute le total des 1 pour cette partie dans la bonne case
        $('#totalTROIS').html(totalTROISLocal);
        //si le total est 1 est supérieur à 0
        if(totalTROISLocal != 0){
            //on ajoute le bouton "Garder" pour sauvegarder la combinaison qui, quand on cliquera 
            //dessus, lancera la fonction de sauvegarde de combinaison
            var totalTROIStype = "totalTROIS";

            if (document.getElementById("#totalTROISLigneButton")) {
                $("#totalTROISLigneButton").replaceWith('<td id="totalTROISLigneButton"><button onclick="keepCombinaison(\''+totalTROIStype+'\')">Garder</button></td>');
              } //si le bouton n'existe pas encore
              else {
                $('#totalTROISLigne').append('<td id="totalTROISLigneButton"><button onclick="keepCombinaison(\''+totalTROIStype+'\')">Garder</button></td>');
              }
        }
    } //si la combinaison "total des TROIS" a été gardée précédemment par le joueur, 
    //on affiche la valeur sauvegardée
    else {
        $('#totalTROIS').html(totalTROIS);
    }
}

/**
 * Fonction qui va afficher soit le résultat de la combinaison "Total des QUATRE" pour ce tour si la combinaison n'a pas été gardée
 * par le joueur, soit le score de la combinaison "Total des QUATRE" sauvegardée précedemment.
 * @param {*} totalQUATRELocal 
 */
function
setTotalQUATRE(totalQUATRELocal){
    //si la combinaison "total des QUATRE" n'a pas été gardée par le joueur, on n'affiche pas le reste
    if(!totalQUATREKeep){
        //on ajoute le total des 1 pour cette partie dans la bonne case
        $('#totalQUATRE').html(totalQUATRELocal);
        //si le total est 1 est supérieur à 0
        if(totalQUATRELocal != 0){
            //on ajoute le bouton "Garder" pour sauvegarder la combinaison qui, quand on cliquera 
            //dessus, lancera la fonction de sauvegarde de combinaison
            var totalQUATREtype = "totalQUATRE";

            if (document.getElementById("#totalQUATRELigneButton")) {
                $("#totalQUATRELigneButton").replaceWith('<td id="totalQUATRELigneButton"><button onclick="keepCombinaison(\''+totalQUATREtype+'\')">Garder</button></td>');
              } //si le bouton n'existe pas encore
              else {
                $('#totalQUATRELigne').append('<td id="totalQUATRELigneButton"><button onclick="keepCombinaison(\''+totalQUATREtype+'\')">Garder</button></td>');
              }
        }
    } //si la combinaison "total des QUATRE" a été gardée précédemment par le joueur, 
    //on affiche la valeur sauvegardée
    else {
        $('#totalQUATRE').html(totalQUATRE);
    }
}

/**
 * Fonction qui va afficher soit le résultat de la combinaison "Total des CINQ" pour ce tour si la combinaison n'a pas été gardée
 * par le joueur, soit le score de la combinaison "Total des CINQ" sauvegardée précedemment.
 * @param {*} totalCINQLocal 
 */
function
setTotalCINQ(totalCINQLocal){
    //si la combinaison "total des CINQ" n'a pas été gardée par le joueur, on n'affiche pas le reste
    if(!totalCINQKeep){
        //on ajoute le total des 1 pour cette partie dans la bonne case
        $('#totalCINQ').html(totalCINQLocal);
        //si le total est 1 est supérieur à 0
        if(totalCINQLocal != 0){
            //on ajoute le bouton "Garder" pour sauvegarder la combinaison qui, quand on cliquera 
            //dessus, lancera la fonction de sauvegarde de combinaison
            var totalCINQtype = "totalCINQ";

            if (document.getElementById("#totalCINQLigneButton")) {
                $("#totalCINQLigneButton").replaceWith('<td id="totalCINQLigneButton"><button onclick="keepCombinaison(\''+totalCINQtype+'\')">Garder</button></td>');
              } //si le bouton n'existe pas encore
              else {
                $('#totalCINQLigne').append('<td id="totalCINQLigneButton"><button onclick="keepCombinaison(\''+totalCINQtype+'\')">Garder</button></td>');
              }
        }
    } //si la combinaison "total des CINQ" a été gardée précédemment par le joueur, 
    //on affiche la valeur sauvegardée
    else {
        $('#totalCINQ').html(totalCINQ);
    }
}

/**
 * Fonction qui va afficher soit le résultat de la combinaison "Total des SIX" pour ce tour si la combinaison n'a pas été gardée
 * par le joueur, soit le score de la combinaison "Total des SIX" sauvegardée précedemment.
 * @param {*} totalSIXLocal 
 */
function
setTotalSIX(totalSIXLocal){
    //si la combinaison "total des SIX" n'a pas été gardée par le joueur, on n'affiche pas le reste
    if(!totalSIXKeep){
        //on ajoute le total des 1 pour cette partie dans la bonne case
        $('#totalSIX').html(totalSIXLocal);
        //si le total est 1 est supérieur à 0
        if(totalSIXLocal != 0){
            //on ajoute le bouton "Garder" pour sauvegarder la combinaison qui, quand on cliquera 
            //dessus, lancera la fonction de sauvegarde de combinaison
            var totalSIXtype = "totalSIX";

            if (document.getElementById("#totalSIXLigneButton")) {
                $("#totalSIXLigneButton").replaceWith('<td id="totalSIXLigneButton"><button onclick="keepCombinaison(\''+totalSIXtype+'\')">Garder</button></td>');
              } //si le bouton n'existe pas encore
              else {
                $('#totalSIXLigne').append('<td id="totalSIXLigneButton"><button onclick="keepCombinaison(\''+totalSIXtype+'\')">Garder</button></td>');
              }
        }
    } //si la combinaison "total des SIX" a été gardée précédemment par le joueur, 
    //on affiche la valeur sauvegardée
    else {
        $('#totalSIX').html(totalSIX);
    }
}

/**
 * Fonction qui va sauvegarder la combinaison choisie par le joueur
 * @param {*} type type de la combinaison à garder
 */
function
keepCombinaison(type){
    console.log("FUNCTION keepCombinaison");
    console.log("-- type "+type);
    //si la combinaison choisie est "Total des AS"
    if(type == "totalAS"){
        keepTotalAS();
    } else if(type == "totalDEUX"){
        keepTotalDEUX();
    } else if(type == "totalTROIS"){
        keepTotalTROIS();
    } else if (type == "totalQUATRE"){
        keepTotalQUATRE();
    } else if (type == "totalCINQ"){
        keepTotalCINQ();
    } else if(type == "totalSIX"){
        keepTotalSIX();
    } else if(type == "brelan"){
        keepBrelan();
    } else if(type == "full"){
        keepFull();
    } else if(type == "petiteSuite"){
        keepPetiteSuite();
    } else if(type == "yahztee"){
        keepYahztee();
    } else if(type == "chance"){
        keepChance();
    } else if(type == "primeYahtzee"){
        keepPrimeYahtzee();
    }
    console.log("END");
    //on calcule le total de la section supérieure
    calculateTotaldes123456();
    //verifie si la partie est finie
    checkIfGameIsOver();
    //on reinitialise le nombre de relances car nouveau tour
    relanceActuelle = 0;
    //on relance les dés
    Yahtzee.random();
}

/**
 * Fonction qui va sauvegarder la combinaison "Total des AS".
 */
function
keepTotalAS(){
    console.log("-- type totalAS ok");
    var totalASLocal = 0;
    //on retrouve la valeur de la combinaison "Total des AS" dans le tableau
    $('#sectionSuperieure tr').each(function() {
        // totalASLocal = $(this).find("#totalAS").html();  
        totalASLocal = $("#totalAS").html();  
        });
    //on sauvegarde le score de la combinaison sauvegardée
    totalAS = totalASLocal;
    console.log("total AS : "+totalAS);
    //on précise que la combinaison a été sauvegardée et donc qu'elle ne peut plus être
    //utilisée
    totalASKeep = true;
}

/**
 * Fonction qui va sauvegarder la combinaison "Total des DEUX".
 */
function
keepTotalDEUX(){
    console.log("-- type totalDEUX ok");
    var totalDEUXLocal = 0;
    //on retrouve la valeur de la combinaison "Total des AS" dans le tableau
    $('#sectionSuperieure tr').each(function() {
        // totalDEUXLocal = $(this).find("#totalDEUX").html(); 
        totalDEUXLocal = $("#totalDEUX").html();   
        });
    //on sauvegarde le score de la combinaison sauvegardée
    totalDEUX = totalDEUXLocal;
    console.log("total AS : "+totalDEUX);
    //on précise que la combinaison a été sauvegardée et donc qu'elle ne peut plus être
    //utilisée
    totalDEUXKeep = true;
}

/**
 * Fonction qui va sauvegarder la combinaison "Total des TROIS".
 */
function
keepTotalTROIS(){
    console.log("-- type totalTROIS ok");
    var totalTROISLocal = 0;
    //on retrouve la valeur de la combinaison "Total des AS" dans le tableau
    $('#sectionSuperieure tr').each(function() {
        // totalTROISLocal = $(this).find("#totalTROIS").html();   
        totalTROISLocal = $("#totalTROIS").html(); 
        });
    //on sauvegarde le score de la combinaison sauvegardée
    totalTROIS = totalTROISLocal;
    console.log("total TROIS : "+totalTROIS);
    //on précise que la combinaison a été sauvegardée et donc qu'elle ne peut plus être
    //utilisée
    totalTROISKeep = true;
}

/**
 * Fonction qui va sauvegarder la combinaison "Total des QUATRE".
 */
function
keepTotalQUATRE(){
    console.log("-- type totalQUATRE ok");
    var totalQUATRELocal = 0;
    //on retrouve la valeur de la combinaison "Total des QUATRE" dans le tableau
    $('#sectionSuperieure tr').each(function() {
        // totalQUATRELocal = $(this).find("#totalQUATRE").html();  
        totalQUATRELocal = $("#totalQUATRE").html();  
        });
    //on sauvegarde le score de la combinaison sauvegardée
    totalQUATRE = totalQUATRELocal;
    console.log("total QUATRE : "+totalQUATRE);
    //on précise que la combinaison a été sauvegardée et donc qu'elle ne peut plus être
    //utilisée
    totalQUATREKeep = true;
}

/**
 * Fonction qui va sauvegarder la combinaison "Total des CINQ".
 */
function
keepTotalCINQ(){
    console.log("FUNCTION keepTotalCINQ()");
    var totalCINQLocal = 0;
    //on retrouve la valeur de la combinaison "Total des CINQ" dans le tableau
    $('#sectionSuperieure tr').each(function() {
        // totalCINQLocal = $(this).find("#totalCINQ").html();    
        totalCINQLocal = $("#totalCINQ").html();
        });
    console.log("-- totalCINQ trouvé dans tabkeau : "+totalCINQLocal);
    //on sauvegarde le score de la combinaison sauvegardée
    totalCINQ = totalCINQLocal;
    console.log("total CINQ : "+totalCINQ);
    //on précise que la combinaison a été sauvegardée et donc qu'elle ne peut plus être
    //utilisée
    totalCINQKeep = true;
}

/**
 * Fonction qui va sauvegarder la combinaison "Total des SIX".
 */
function
keepTotalSIX(){
    console.log("-- type totalSIX ok");
    var totalSIXLocal = 0;
    //on retrouve la valeur de la combinaison "Total des SIX" dans le tableau
    $('#sectionSuperieure tr').each(function() {
        // totalSIXLocal = $(this).find("#totalSIX").html();
        totalSIXLocal = $("#totalSIX").html();    
        });
    //on sauvegarde le score de la combinaison sauvegardée
    totalSIX = totalSIXLocal;
    console.log("total SIX : "+totalSIX);
    //on précise que la combinaison a été sauvegardée et donc qu'elle ne peut plus être
    //utilisée
    totalSIXKeep = true;
}

/**
 * Fonction qui va donner le score total des "Total des X".
 */
function
calculateTotaldes123456(){
    console.log("FUNCTION calculateTotaldes123456()");
    console.log("-- total AS : "+totalAS);
    console.log("-- total DEUX : "+totalDEUX);
    console.log("-- total TROIS : "+totalTROIS);
    console.log("-- total QUATRE : "+totalQUATRE);
    console.log("-- total CINQ : "+totalCINQ);
    console.log("-- total SIX : "+totalSIX);
    var totalDes123456 = parseInt(totalAS,10) + parseInt(totalDEUX,10) + parseInt(totalTROIS,10) + 
        parseInt(totalQUATRE,10) + parseInt(totalCINQ,10) + parseInt(totalSIX,10);
    $('#total123456').html(totalDes123456);
    console.log("-- Total inséré : "+totalDes123456);
    console.log("END FUNCTION");
    checkIfTotalSupExceed63();
    checkifAllActionsInSuperiourHadDone();
}

/**
 * Fonction qui va vérifier si le total de la partie supérieure dépasse les 63 pts.
 */
function
checkIfTotalSupExceed63(){
    console.log("FUNCTION checkIfTotalSupExceed63()");
    //on retrouve la valeur du total de la partie Supérieure dans le tableau
    var totalDes123456 = 0;
    $('#sectionSuperieure tr').each(function() {
        totalDes123456 = parseInt($("#total123456").html()); 
        });
    console.log("-- Total trouvé : "+totalDes123456);
    if(totalDes123456 > 63){
        pointsBonus = 35;
        $('#prime63').html(pointsBonus);
        console.log("-- Points bonus accordés");
    } else {
        console.log("-- Points bonus non accordés");
    }
    console.log("END FUNCTION");
}

function
checkifAllActionsInSuperiourHadDone(){
    console.log("FUNCTION checkifAllActionsInSuperiourHadDone()");
    if(totalASKeep && totalDEUXKeep && totalTROISKeep && totalQUATREKeep && totalCINQKeep && totalSIXKeep){
        console.log("-- Toutes actions faites");
        var totalSansBonus = 0;
        var totalDefintif = 0;
        $('#sectionSuperieure tr').each(function() {
            // totalTROISLocal = $(this).find("#totalTROIS").html();   
            totalSansBonus = parseInt($("#total123456").html()); 
        });
        console.log("-- total sans bonus : "+totalSansBonus);
        if(parseInt(totalSansBonus) > 63){
            console.log("-- Points bonus accordés");
            totalDefintif = parseInt(totalSansBonus,10) + parseInt(35,10);
            $('#totalSectionSup').html(totalDefintif);
        } else {
            console.log("-- Points bonus non accordés");
            $('#prime63').html(0);
            $('#totalSectionSup').html(parseInt(totalSansBonus));
        }
        console.log("-- total : "+parseInt(totalDefintif));
    }
}








function
checkCombinaisonsInferieures(){
    //on supprime les boutons "Garder"
    $('#brelanLigneButton').remove();
    $('#carreLigneButton').remove();
    $('#fullLigneButton').remove();
    $('#petiteSuiteLigneButton').remove();
    $('#yahzteeLigneButton').remove();
    $('#chanceLigneButton').remove();
    $('#primeYahzteeLigneButton').remove();

    //on teste chaque combinaisons inférieures
    checkBrelan();
    checkCarre();
    checkFull();
    checkPetiteSuite();
    checkYahtzee();
    checkChance();
}

/**
 * Fonction qui va tester si un brelan est trouvé dans les dés 
 * et au cas où il y en ai deux, prend le plus grand
 */
function
checkBrelan(){
    console.log("FUNCTION checkBrelan()");
    //on initialise les compteurs
    var compteur1 = 0;
    var compteur2 = 0;
    var compteur3 = 0;
    var compteur4 = 0;
    var compteur5 = 0;
    var compteur6 = 0;

    //pour chaque élément du tableau
    DesResults.forEach(element => {
        //on compte le nombre de 1
        if(element == 1){
            compteur1++;
        } else if(element == 2){
            compteur2++;
        } else if(element == 3){
            compteur3++;
        } else if(element == 4){
            compteur4++;
        } else if(element == 5){
            compteur5++;
        } else {
            compteur6++;
        }
    });

    if(compteur6 >= 3){
        console.log("-- Brelan de 6");
        setBrelan(6);
    } else if (compteur5 >= 3){
        console.log("-- Brelan de 5");
        setBrelan(5);
    } else if (compteur4 >= 3){
        console.log("-- Brelan de 4");
        setBrelan(4);
    } else if (compteur3 >= 3){
        console.log("-- Brelan de 3");
        setBrelan(3);
    } else if (compteur2 >= 3){
        console.log("-- Brelan de 2");
        setBrelan(2);
    } else if (compteur1 >= 3){
        console.log("-- Brelan de 1");
        setBrelan(1);
    }
}

/**
 * Fonction qui va tester si un carré se trouve dans les dés
 */
function
checkCarre(){
    //on initialise les compteurs
    var compteur1 = 0;
    var compteur2 = 0;
    var compteur3 = 0;
    var compteur4 = 0;
    var compteur5 = 0;
    var compteur6 = 0;

    //pour chaque élément du tableau
    DesResults.forEach(element => {
        //on compte le nombre de 1
        if(element == 1){
            compteur1++;
        } else if(element == 2){
            compteur2++;
        } else if(element == 3){
            compteur3++;
        } else if(element == 4){
            compteur4++;
        } else if(element == 5){
            compteur5++;
        } else {
            compteur6++;
        }
    });

    if(compteur6 >= 4){
        console.log("-- Carré de 6");
        setCarre(6);
    } else if (compteur5 >= 4){
        console.log("-- Carré de 5");
        setCarre(5);
    } else if (compteur4 >= 4){
        console.log("-- Carré de 4");
        setCarre(4);
    } else if (compteur3 >= 4){
        console.log("-- Carré de 3");
        setCarre(3);
    } else if (compteur2 >= 4){
        console.log("-- Carré de 2");
        setCarre(2);
    } else if (compteur1 >= 4){
        console.log("-- Carré de 1");
        setCarre(1);
    }
}

/**
 * Fonction qui va testeri si un full se trouve dans les dés
 */
function
checkFull(){
    //on initialise les compteurs
    var compteur = [];
    compteur[1] = 0;
    compteur[2] = 0;
    compteur[3] = 0;
    compteur[4] = 0;
    compteur[5] = 0;
    compteur[6] = 0;

    //pour chaque élément du tableau
    DesResults.forEach(element => {
        //on compte le nombre de 1
        if(element == 1){
            compteur[1]++;
        } else if(element == 2){
            compteur[2]++;
        } else if(element == 3){
            compteur[3]++;
        } else if(element == 4){
            compteur[4]++;
        } else if(element == 5){
            compteur[5]++;
        } else {
            compteur[6]++;
        }
    });

    //si le compteur contient 3 dés identiques et 2 dés identiques
    if(compteur.includes(3) && compteur.includes(2) || compteur.includes(3) && compteur.includes(3)){
        setFull(25);
    }
    
}

/**
 * Fonction qui va testeri si une Petite Suite se trouve dans les dés
 */
function
checkPetiteSuite(){
    //on initialise les compteurs
    var compteur = [];
    compteur[1] = 0;
    compteur[2] = 0;
    compteur[3] = 0;
    compteur[4] = 0;
    compteur[5] = 0;
    compteur[6] = 0;

    //pour chaque élément du tableau
    DesResults.forEach(element => {
        //on compte le nombre de 1
        if(element == 1){
            compteur[1]++;
        } else if(element == 2){
            compteur[2]++;
        } else if(element == 3){
            compteur[3]++;
        } else if(element == 4){
            compteur[4]++;
        } else if(element == 5){
            compteur[5]++;
        } else {
            compteur[6]++;
        }
    });

    var petiteSuiteFind = false;
    var maxDes = 0;
    var i = 1;
    //si une combinaison est possible
    while(i<(nombreDes-2) && !petiteSuiteFind){
        if(compteur[i]==1 || compteur[i]==2){
            maxDes = compteur[i];
            if((compteur[i+1]==1 && maxDes+1 <= nombreDes) || (compteur[i+1]==2 && maxDes+2 <= nombreDes)){
                maxDes = maxDes + compteur[i+1];
                if((compteur[i+2]==1 && maxDes+1 <= nombreDes) || (compteur[i+2]==2 && maxDes+2 <= nombreDes)){
                    maxDes = maxDes + compteur[i+2];
                    if((compteur[i+3]==1 && maxDes+1 <= nombreDes) || (compteur[i+3]==2 && maxDes+2 <= nombreDes)){
                        console.log("petite suite trouvée avec : "+i+" "+(i+1)+" "+(i+2)+" "+(i+3));
                        petiteSuiteFind = true;
                        setPetiteSuite(30);
                    }
                }
            }
        }
        i++;
    }
}

function
checkYahtzee(){
    //on initialise les compteurs
    var compteur = [];
    compteur[1] = 0;
    compteur[2] = 0;
    compteur[3] = 0;
    compteur[4] = 0;
    compteur[5] = 0;

    //pour chaque élément du tableau
    DesResults.forEach(element => {
        //on compte le nombre de 1
        if(element == 1){
            compteur[1]++;
        } else if(element == 2){
            compteur[2]++;
        } else if(element == 3){
            compteur[3]++;
        } else if(element == 4){
            compteur[4]++;
        } else {
            compteur[5]++;
        }
    });

    //si le compteur contient 3 dés identiques et 2 dés identiques
    if((compteur[1] == 1) && (compteur[2] == 1) && (compteur[3] == 1) && (compteur[4] == 1) && (compteur[5] == 1)){
        console.log("yahztee trouvé")
        if(!yahzteeKeep){
            console.log("yahztee 50 trouvé")
            setYahztee(50);
        } else if(!primeYahtzeeKeep) {
            console.log("yahztee 100 trouvé")
            setPrimeYahtzee(100);
        }
    }
}

function
checkChance(){
    //on initialise les compteurs
    var compteur1 = 0;
    var compteur2 = 0;
    var compteur3 = 0;
    var compteur4 = 0;
    var compteur5 = 0;
    var compteur6 = 0;

    //pour chaque élément du tableau
    DesResults.forEach(element => {
        //on compte le nombre de 1
        if(element == 1){
            compteur1++;
        } else if(element == 2){
            compteur2++;
        } else if(element == 3){
            compteur3++;
        } else if(element == 4){
            compteur4++;
        } else if(element == 5){
            compteur5++;
        } else {
            compteur6++;
        }
    });

    var total = parseInt(compteur1,10)+(parseInt(compteur2,10)*2)+(parseInt(compteur3,10)*3)
    +(parseInt(compteur4,10)*4)+(parseInt(compteur5,10)*5)+(parseInt(compteur6,10)*6);
    console.log("chance total : "+total);
    setChance(total);
}

/**
 * Fonction qui va afficher soit le résultat de la combinaison "Brelan" pour ce tour si la combinaison n'a pas été gardée
 * par le joueur, soit le score de la combinaison "Brelan" sauvegardée précedemment.
 * @param {*} number numéro formant un brelan
 */
function
setBrelan(number){
    console.log("FUNCTION setBrelan()");
    //si la combinaison "Brelan" n'a pas été gardée par le joueur, on n'affiche pas le reste
    if(!brelanKeep){
        //on calcule les points pour le brelan de ce chiffre
        var brelan = parseInt(number,10)*3;
        //on ajoute le nombre de points de cette combinaison pour cette partie dans la bonne case
        $('#brelan').html(brelan);
        //si le total est 1 est supérieur à 0
        if(brelan != 0){
            //on ajoute le bouton "Garder" pour sauvegarder la combinaison qui, quand on cliquera 
            //dessus, lancera la fonction de sauvegarde de combinaison
            var brelanType = "brelan";
            //si le bouton est deja présent
            if (document.getElementById("#brelanLigneButton")) {
                $("#brelanLigneButton").replaceWith('<td id="brelanLigneButton"><button onclick="keepCombinaison(\''+brelanType+'\')">Garder</button></td>');
              } //si le bouton n'existe pas encore
              else {
                $('#brelanLigne').append('<td id="brelanLigneButton"><button onclick="keepCombinaison(\''+brelanType+'\')">Garder</button></td>');
              }
        }
    } //si la combinaison "total des AS" a été gardée précédemment par le joueur, 
    //on affiche la valeur sauvegardée
    else {
        $('#brelan').html(brelan);
    }
}

/**
 * Fonction qui va afficher soit le résultat de la combinaison "Carre" pour ce tour si la combinaison n'a pas été gardée
 * par le joueur, soit le score de la combinaison "Carre" sauvegardée précedemment.
 * @param {*} number numéro formant un carré
 */
function
setCarre(number){
    console.log("FUNCTION setCarre()");
    //si la combinaison "Brelan" n'a pas été gardée par le joueur, on n'affiche pas le reste
    if(!carreKeep){
        //on calcule les points pour le brelan de ce chiffre
        var carre = parseInt(number,10)*4;
        //on ajoute le nombre de points de cette combinaison pour cette partie dans la bonne case
        $('#carre').html(carre);
        //si le total est 1 est supérieur à 0
        if(carre != 0){
            //on ajoute le bouton "Garder" pour sauvegarder la combinaison qui, quand on cliquera 
            //dessus, lancera la fonction de sauvegarde de combinaison
            var carreType = "carre";
            //si le bouton est deja présent
            if (document.getElementById("#carreLigneButton")) {
                $("#carreLigneButton").replaceWith('<td id="carreLigneButton"><button onclick="keepCombinaison(\''+carreType+'\')">Garder</button></td>');
              } //si le bouton n'existe pas encore
              else {
                $('#carreLigne').append('<td id="carreLigneButton"><button onclick="keepCombinaison(\''+carreType+'\')">Garder</button></td>');
              }
        }
    } //si la combinaison "total des AS" a été gardée précédemment par le joueur, 
    //on affiche la valeur sauvegardée
    else {
        $('#carre').html(carre);
    }
}

/**
 * Fonction qui va afficher soit le résultat de la combinaison "Full" pour ce tour si la combinaison n'a pas été gardée
 * par le joueur, soit le score de la combinaison "Full" sauvegardée précedemment.
 * @param {*} fullpoints 25 pts pour un full
 */
function
setFull(fullpoints){
    //si la combinaison "Brelan" n'a pas été gardée par le joueur, on n'affiche pas le reste
    if(!fullKeep){
        //on calcule les points pour le brelan de ce chiffre
        var full = fullpoints;
        //on ajoute le nombre de points de cette combinaison pour cette partie dans la bonne case
        $('#full').html(full);
        //si le total est 1 est supérieur à 0
        if(full != 0){
            //on ajoute le bouton "Garder" pour sauvegarder la combinaison qui, quand on cliquera 
            //dessus, lancera la fonction de sauvegarde de combinaison
            var fullType = "full";
            //si le bouton est deja présent
            if (document.getElementById("#fullLigneButton")) {
                $("#fullLigneButton").replaceWith('<td id="fullLigneButton"><button onclick="keepCombinaison(\''+fullType+'\')">Garder</button></td>');
              } //si le bouton n'existe pas encore
              else {
                $('#fullLigne').append('<td id="fullLigneButton"><button onclick="keepCombinaison(\''+fullType+'\')">Garder</button></td>');
              }
        }
    } //si la combinaison "total des AS" a été gardée précédemment par le joueur, 
    //on affiche la valeur sauvegardée
    else {
        $('#full').html(full);
    }
}

function
setPetiteSuite(petiteSuitePoints){
    //si la combinaison "Brelan" n'a pas été gardée par le joueur, on n'affiche pas le reste
    if(!petiteSuiteKeep){
        //on calcule les points pour le brelan de ce chiffre
        var petiteSuite = petiteSuitePoints;
        //on ajoute le nombre de points de cette combinaison pour cette partie dans la bonne case
        $('#petiteSuite').html(petiteSuite);
        //si le total est 1 est supérieur à 0
        if(petiteSuite != 0){
            //on ajoute le bouton "Garder" pour sauvegarder la combinaison qui, quand on cliquera 
            //dessus, lancera la fonction de sauvegarde de combinaison
            var petiteSuiteType = "petiteSuite";
            //si le bouton est deja présent
            if (document.getElementById("#petiteSuiteLigneButton")) {
                $("#petiteSuiteLigneButton").replaceWith('<td id="petiteSuiteLigneButton"><button onclick="keepCombinaison(\''+petiteSuiteType+'\')">Garder</button></td>');
              } //si le bouton n'existe pas encore
              else {
                $('#petiteSuiteLigne').append('<td id="petiteSuiteLigneButton"><button onclick="keepCombinaison(\''+petiteSuiteType+'\')">Garder</button></td>');
              }
        }
    } //si la combinaison "total des AS" a été gardée précédemment par le joueur, 
    //on affiche la valeur sauvegardée
    else {
        $('#petiteSuite').html(petiteSuite);
    }
}

function
setYahztee(yahzteePoints){
    //si la combinaison "Brelan" n'a pas été gardée par le joueur, on n'affiche pas le reste
    if(!yahzteeKeep){
        //on calcule les points pour le brelan de ce chiffre
        var yahztee = yahzteePoints;
        //on ajoute le nombre de points de cette combinaison pour cette partie dans la bonne case
        $('#yahztee').html(yahztee);
        //si le total est 1 est supérieur à 0
        if(yahztee != 0){
            //on ajoute le bouton "Garder" pour sauvegarder la combinaison qui, quand on cliquera 
            //dessus, lancera la fonction de sauvegarde de combinaison
            var yahzteeType = "yahztee";
            //si le bouton est deja présent
            if (document.getElementById("#yahzteeLigneButton")) {
                $("#yahzteeLigneButton").replaceWith('<td id="yahzteeLigneButton"><button onclick="keepCombinaison(\''+yahzteeType+'\')">Garder</button></td>');
              } //si le bouton n'existe pas encore
              else {
                $('#yahzteeLigne').append('<td id="yahzteeLigneButton"><button onclick="keepCombinaison(\''+yahzteeType+'\')">Garder</button></td>');
              }
        }
    } //si la combinaison "total des AS" a été gardée précédemment par le joueur, 
    //on affiche la valeur sauvegardée
    else {
        $('#yahztee').html(yahztee);
    }
}

function
setChance(chancePoints){
    //si la combinaison "Brelan" n'a pas été gardée par le joueur, on n'affiche pas le reste
    if(!chanceKeep){
        //on calcule les points pour le brelan de ce chiffre
        var chance = chancePoints;
        //on ajoute le nombre de points de cette combinaison pour cette partie dans la bonne case
        $('#chance').html(chance);
        //si le total est 1 est supérieur à 0
        if(chance != 0){
            //on ajoute le bouton "Garder" pour sauvegarder la combinaison qui, quand on cliquera 
            //dessus, lancera la fonction de sauvegarde de combinaison
            var chanceType = "chance";
            //si le bouton est deja présent
            if (document.getElementById("#chanceLigneButton")) {
                $("#chanceLigneButton").replaceWith('<td id="chanceLigneButton"><button onclick="keepCombinaison(\''+chanceType+'\')">Garder</button></td>');
              } //si le bouton n'existe pas encore
              else {
                $('#chanceLigne').append('<td id="chanceLigneButton"><button onclick="keepCombinaison(\''+chanceType+'\')">Garder</button></td>');
              }
        }
    } //si la combinaison "total des AS" a été gardée précédemment par le joueur, 
    //on affiche la valeur sauvegardée
    else {
        $('#chance').html(chance);
    }
}

function
setPrimeYahtzee(primePoints){
    //si la combinaison "Brelan" n'a pas été gardée par le joueur, on n'affiche pas le reste
    if(!primeYahtzeeKeep){
        //on calcule les points pour le brelan de ce chiffre
        var primeYahtzee = primePoints;
        //on ajoute le nombre de points de cette combinaison pour cette partie dans la bonne case
        $('#primeYahtzee').html(primeYahtzee);
        //si le total est 1 est supérieur à 0
        if(primeYahtzee != 0){
            //on ajoute le bouton "Garder" pour sauvegarder la combinaison qui, quand on cliquera 
            //dessus, lancera la fonction de sauvegarde de combinaison
            var primeYahtzeeType = "primeYahtzee";
            //si le bouton est deja présent
            if (document.getElementById("#primeYahtzeeLigneButton")) {
                $("#primeYahtzeeLigneButton").replaceWith('<td id="primeYahtzeeLigneButton"><button onclick="keepCombinaison(\''+primeYahtzeeType+'\')">Garder</button></td>');
              } //si le bouton n'existe pas encore
              else {
                $('#primeYahtzeeLigne').append('<td id="primeYahtzeeLigneButton"><button onclick="keepCombinaison(\''+primeYahtzeeType+'\')">Garder</button></td>');
              }
        }
    } //si la combinaison "total des AS" a été gardée précédemment par le joueur, 
    //on affiche la valeur sauvegardée
    else {
        $('#primeYahtzee').html(primeYahtzee);
    }
}

/**
 * Fonction qui va sauvegarder la combinaison "Brelan".
 */
function
keepBrelan(){
    var brelanLocal = 0;
    //on retrouve la valeur de la combinaison dans le tableau
    $('#sectionInferieure tr').each(function() {
        // totalCINQLocal = $(this).find("#totalCINQ").html();    
        brelanLocal = $("#brelan").html();
        });
    //on sauvegarde le score de la combinaison sauvegardée
    brelan = brelanLocal;
    //on précise que la combinaison a été sauvegardée et donc qu'elle ne peut plus être
    //utilisée
    brelanKeep = true;
}

/**
 * Fonction qui va sauvegarder la combinaison "Carré".
 */
function
keepCarre(){
    var carreLocal = 0;
    //on retrouve la valeur de la combinaison dans le tableau
    $('#sectionInferieure tr').each(function() {
        // totalCINQLocal = $(this).find("#totalCINQ").html();    
        carreLocal = $("#carre").html();
        });
    //on sauvegarde le score de la combinaison sauvegardée
    carre = carreLocal;
    //on précise que la combinaison a été sauvegardée et donc qu'elle ne peut plus être
    //utilisée
    carreKeep = true;
}

/**
 * Fonction qui va sauvegarder la combinaison "Carré".
 */
function
keepFull(){
    var fullLocal = 0;
    //on retrouve la valeur de la combinaison dans le tableau
    $('#sectionInferieure tr').each(function() {
        // totalCINQLocal = $(this).find("#totalCINQ").html();    
        fullLocal = $("#full").html();
        });
    //on sauvegarde le score de la combinaison sauvegardée
    full = fullLocal;
    //on précise que la combinaison a été sauvegardée et donc qu'elle ne peut plus être
    //utilisée
    fullKeep = true;
}

/**
 * Fonction qui va sauvegarder la combinaison "Petite Suite".
 */
function
keepPetiteSuite(){
    var petiteSuiteLocal = 0;
    //on retrouve la valeur de la combinaison dans le tableau
    $('#sectionInferieure tr').each(function() {
        // totalCINQLocal = $(this).find("#totalCINQ").html();    
        petiteSuiteLocal = $("#petiteSuite").html();
        });
    //on sauvegarde le score de la combinaison sauvegardée
    petiteSuite = petiteSuiteLocal;
    //on précise que la combinaison a été sauvegardée et donc qu'elle ne peut plus être
    //utilisée
    petiteSuiteKeep = true;
}

/**
 * Fonction qui va sauvegarder la combinaison "Yahztee".
 */
function
keepYahztee(){
    var yahzteeLocal = 0;
    //on retrouve la valeur de la combinaison dans le tableau
    $('#sectionInferieure tr').each(function() {
        // totalCINQLocal = $(this).find("#totalCINQ").html();    
        yahzteeLocal = $("#yahztee").html();
        });
    //on sauvegarde le score de la combinaison sauvegardée
    yahztee = yahzteeLocal;
    //on précise que la combinaison a été sauvegardée et donc qu'elle ne peut plus être
    //utilisée
    yahzteeKeep = true;
}

function
keepChance(){
    var chanceLocal = 0;
    //on retrouve la valeur de la combinaison dans le tableau
    $('#sectionInferieure tr').each(function() {
        // totalCINQLocal = $(this).find("#totalCINQ").html();    
        chanceLocal = $("#chance").html();
        });
    //on sauvegarde le score de la combinaison sauvegardée
    chance = chanceLocal;
    //on précise que la combinaison a été sauvegardée et donc qu'elle ne peut plus être
    //utilisée
    chanceKeep = true;
}

function
keepPrimeYahtzee(){
    var primeYahtzeeLocal = 0;
    //on retrouve la valeur de la combinaison dans le tableau
    $('#sectionInferieure tr').each(function() {
        // totalCINQLocal = $(this).find("#totalCINQ").html();    
        primeYahtzeeLocal = $("#primeYahtzee").html();
        });
    //on sauvegarde le score de la combinaison sauvegardée
    primeYahtzee = primeYahtzeeLocal;
    //on précise que la combinaison a été sauvegardée et donc qu'elle ne peut plus être
    //utilisée
    primeYahtzeeKeep = true;
}

function
checkIfGameIsOver(){
    //si toutes les combi ont été enregistrées
    if(totalASKeep && totalDEUXKeep && totalTROISKeep && totalQUATREKeep && totalCINQKeep 
        && totalSIXKeep && brelanKeep && carreKeep && fullKeep && petiteSuiteKeep && yahzteeKeep && chanceKeep && primeYahtzeeKeep){
        //récupère le total des combi inf
            var totalDesCombiSup = 0;
        $('#sectionSuperieure tr').each(function() {
            totalDesCombiSup = parseInt($("#totalSectionSup").html()); 
        });
        $('#totalSectionSupGameOver').html(totalDesCombiSup);

        var totalDesCombiInf = 0;
        var totalDesCombiInf = parseInt(brelan,10) + parseInt(carre,10) + parseInt(full,10) + 
        parseInt(petiteSuite,10) + parseInt(yahztee,10) + parseInt(chance,10) + parseInt(primeYahtzee,10);
    $('#totalSectionInfGameOver').html(totalDesCombiInf);

    var totalPoints = parseInt(totalDesCombiInf,10)+parseInt(totalDesCombiSup,10);
    $('#totalGeneral').html(totalPoints);
        }
}

