"use strict";

window.onload = function() {
    var canvas = document.getElementById("game_area");
    var context = canvas.getContext("2d");
        
/* Fonction pour créer le joueur*/  
function draw(color) {
    context.fillStyle = color;
    context.fillRect(x - 30 ,y - 90 , 60, 60);
    var vaisseau = new Image();
    vaisseau.src = "Faucon.png";
    context.drawImage(vaisseau,x - 20,y - 80);
        }
    
/* Fonction pour créer l'ennemi*/
function druw(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x - 5  , y - 5  , 10, 10);
        }
    
    
/* Fonction pour annimé nos ennemis */    
function animate(x, y, dx, dy, name) {
        druw(x, y, 'black', t + 1);
        x = x + dx; y = y + dy;
        if (x < 0 || x > canvas.width) { dx = -dx; }
        if (y < 0 || y > canvas.height-t) { dy = -dy; dy = dy+0.1*dy; } /*On augmente la vitesse quand ils touchant le sol ou le haut en modifiant 'dy'*/
        druw(x, y, '#33ffd1', t);
        if (name in liste_ennemis){
            liste_ennemis[name] = [x-2, y];
            window.setTimeout(function(){animate(x, y, dx, dy, name);}, 40);
        }
        else{druw(x, y, 'black', t+1);}
    }

/* Fonction qui permetde créer plusieurs ennemis , gràce à une liste */ 
function plusieursennemis(){
    if(vaisseau_détruit < 300){
            if(Object.keys(liste_ennemis).length < 30 && vaisseau_détruit <= 270){ /*On met le nombre de vaisseau détruit inférieur a 270 car l'on a deja fait apparaitre 30 vaisseau*/
                liste_ennemis[String(spawnalien)] = [];
                animate(pos[index], 0, pos[index+2], 1, String(spawnalien));
                index = 1 - index;
                spawnalien = spawnalien + 1;
            }
        }
    }
    
/* Fonction pour créer les balles*/    
function ball(xb, yb, color){
        context.fillStyle = color;
        context.fillRect(xb, yb, 4, 4);
        }
         

/* Fonction pour annimé nos balles */    
function animote() {
        var xb = x - 2; var yb = y + t;  /*On commence a tacer les balles en haut du vaisseau du joueur*/
        var accuracy = 7
        var newnum = num
        num = num + 1
        for(var sht = 1; sht < 42; sht++){  /*On utilse les coordonnées de notre player*/
            window.setTimeout(function(){yb = yb - accuracy;}, sht*20);
            window.setTimeout(function(){ball(xb, yb, 'black');}, (sht+1)*20);
            window.setTimeout(function(){ball(xb, yb, '#e533ff');}, sht*20);
            window.setTimeout(function(){coordonnée_b[newnum] = [xb, yb]}, sht*20);
        }
        /*On efface les anciennes coordonnées de notre player et on récupère les nouvelles*/
        window.setTimeout(function(){delete coordonnée_b[newnum];}, 840);
    }

/* Fonction pour la collision entre les alien et les balles */    
function collisionalien(){
        for(var key in coordonnée_b){
            for(var key2 in liste_ennemis){
                /*On regarde dans nos liste si les balles ou les ennemis se touche*/
                if(coordonnée_b[key][0] <= liste_ennemis[key2][0]+5 && 
                  coordonnée_b[key][0]+3 >= liste_ennemis[key2][0] &&
                  coordonnée_b[key][1] <= liste_ennemis[key2][1]+5 &&
                  coordonnée_b[key][1]+3 >= liste_ennemis[key2][1]){
                    delete liste_ennemis[key2];
                    vaisseau_détruit = vaisseau_détruit + 1
                }
            }
        }
    }
    
/* Fonction pour la collision entre le player et les ennemis */ 
function collisionplayer(){
        for(var key3 in liste_ennemis){
            /*On définie la hitbox pour savoir si les ennemies la touche*/
            if(x - 2 <= liste_ennemis[key3][0]+5 && 
              x + 3 >= liste_ennemis[key3][0] &&
              y - 5 <= liste_ennemis[key3][1]+5 &&
              y >= liste_ennemis[key3][1]){
                window.setTimeout(collisionplayer, 2000);
                fin = fin + 1
                
            }
        }
    }

/* ****************** Main loop ***********************/

    
/* On définie tout nos variable*/
var t = -75;         /*taille*/
var x = 300;         /*Coordonnées de base*/
var y = 640;
var liste_ennemis = {};        /*Liste de nos ennemies*/
var coordonnée_b = {};         /*Liste des coordonnées*/
var num = 1;
var pos = [ 0, canvas.width, 5, -5 ];
var index = 0;                 /*Index qui va nous permettre de nous balader dans la liste*/
var spawnalien = 1;
var vaisseau_détruit = 0;       /*Nombre de vaisseau détruit*/
var fin = 0;                    /*variable qui permet de récuperer le nombre de colision avec notre vaisseau*/
    

draw('black', t);
window.addEventListener('keydown', function(event) {
    var e = event.keyCode;
    draw('black', t+1);
    /* Tout les evenements de déplacemnts de notre player*/
    if (e == 37 && x > 25) { x = x - 7; }                     
    if (e == 38 && y > 80) { y = y - 7; }                     
    if (e == 39 && x <= canvas.width - 25) { x = x + 7; }        
    if (e == 40 && y <= canvas.height + 35) { y = y + 7; }       
    draw('black', t);
});
window.addEventListener('keyup', function(event) {
    /* evenement de la barre espace*/
    var e2 = event.keyCode;
    if (e2 == 32){ animote(); }                                           
});     
/* Avec cette boucle on récupère nos ennemis dans la liste est on les affiche a l'écran sur différentes coordonnées*/
for(var spawnalien = 0; spawnalien < 5; spawnalien++){
    liste_ennemis['a'+String(spawnalien)] = [];
    animate(0, spawnalien*80, 5, 1, 'a'+String(spawnalien));
    liste_ennemis['b'+String(spawnalien)] = [];
    animate(120, (spawnalien+0.5)*80, 5, 1, 'b'+String(spawnalien));
    liste_ennemis['c'+String(spawnalien)] = [];
    animate(240, spawnalien*80, 5, 1, 'c'+String(spawnalien));
    liste_ennemis['d'+String(spawnalien)] = [];
    animate(canvas.width, spawnalien*80, -5, 1, 'd'+String(spawnalien));
    liste_ennemis['e'+String(spawnalien)] = [];
    animate(canvas.width-120, (spawnalien+0.5)*80, -5, 1, 'e'+String(spawnalien));
    liste_ennemis['f'+String(spawnalien)] = [];
    animate(canvas.width-240, spawnalien*80, -5, 1, 'f'+String(spawnalien));
}
/*On éfface notre vaisseau*/
window.setInterval(function(){draw('black', t);},40)
/*On active les collisions et le rajout d'ennemi*/
window.setInterval(function(){collisionalien(); plusieursennemis();collisionplayer();}, 12);
};