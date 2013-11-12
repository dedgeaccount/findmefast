/*$(function(){*/ // on zappe jquery

var GAME=GAME||{};



GAME.gameStart = (function(){


	var pageCourante="#jeu";
	/*
	var pong; //le thread
	var width=800;
	var height=800;
	var but=100; // dimension d'un 1/2 but
	var speed=10;
	var ptmur=1;
	var ptbut=10;
	var drag=false;
	var joueur=0;

	var master=false;
	var raq=[];// les joueurs (le raq[0] n'existe pas)
	var ball={x:width/2,y:height/2,a:0,b:0,color:"rgb(255,0,0)"}

	var elapsedtime=0;

	$("#ready").attr('disabled', false);
	$("#go").attr('disabled', true);
	*/


	// ETAPE 1 : la connexion
	var sock= io.connect();

	//affiche l'ecran d'accueil



	//le reste est asynchrone
	/*******************************************************/

	// sock.emit("ballpos",{x:,y:,score:});
	// sock.emit("pseudo",{pseudo:monpseudo});

	/*
	function majscore(){
		//les scores
		//TODO faire la mise a jour uniquement en cas de changement de score...
		for(var i=1;i<=4;i++){
			if(raq[i]){
				$("#joueur"+i+" input").val(raq[i].score);
			}
		}
	}
	*/


	/****************** Partie socket **************************/


	sock.on("accuse",function(data){
		console.log(data);
	});


	sock.on("message",function(data){
		console.log(data);
	});

	// message reçu lorsqu'un joueur est prêt.
	sock.on("ready",function(data){
		console.log("Le joueur "+data.num+" est prêt!");
		console.log(data);
	});

	// message reçu par le master lorsque tous les joueur sont prêt
	sock.on("startable",function(data){
		console.log("Tout le monde est prêt");
		console.log(data);

	});

	// démarage du jeu
	//TODO : mettre en place un systeme d'attente mutuelle
	sock.on("start",function(data){
		console.log("le jeu commence");
		console.log(data);
	});



/* fonctions */

var switchPage = function(newpage){
	var courante = document.querySelector(pageCourante);
	courante.style.zIndex = 0;
	var nouvelle = document.querySelector(newpage);
	nouvelle.style.zIndex = 1;
	pageCourante=newpage;

}


/****************** Partie interraction *********************/



//page accueil
var liens = document.querySelectorAll('a');

console.log(liens);

for (var i = 0; i < liens.length; i++) {
 	liens[i].addEventListener("click",function(event){
 		event.preventDefault();
 		var target = event.currentTarget.attributes['href'].nodeValue || '#accueil';
		console.log(target)

		if(target=="#accueil"){
			switchPage(target);
		}
		if(target=="#creer_partie"){
			switchPage(target);
		}
		if(target=="#rejoindre_partie"){
			switchPage(target);
		}
		if(target=="#options"){
			switchPage(target);
		}
		if(target=="#accueil"){
			//switchPage(target);
		}

 	},false);
}


});


if(window.addEventListener){
    window.addEventListener('load', GAME.gameStart, false);
}else{
    window.attachEvent('onload', GAME.gameStart);
}
