/***** CLASS PLAYER ******/

class Player {

    constructor(name, mark) {

        this.name = name;
        this.mark = mark;
        this.tab = [];
        this.count = 0;
    }
}

let container = document.querySelector('.container');
let countNull = 0;

/***** CLASS MORPION *****/

class Morpion{

    constructor(arrayPlayer) {

        this.Players = arrayPlayer;
        this.PlayerTurn = this.Players[0];
        this.winningCombi = [
            ['box1','box2','box3'],
            ['box4','box5','box6'],
            ['box7','box8','box9'],
            ['box3','box6','box9'],
            ['box2','box5','box8'],
            ['box1','box4','box7'],
            ['box3','box5','box7'],
            ['box1','box5','box9']
        ]
    }

    
    play(box) {
        box.innerHTML = this.PlayerTurn.mark;
        this.PlayerTurn.tab.push(box.id);
        this.PlayerTurn.count++;
        this.checkWin();
        this.countPoints();
        this.switchPlayer();
    }

    /* COUNT POINTS PLAYERS */
    countPoints(){
        let count1 = document.querySelector('#count1')
        count1.innerHTML = this.Players[0].count
        let count2 = document.querySelector('#count2')
        count2.innerHTML = this.Players[1].count
    }

    /* CHANGER DE JOUER A CHAQUE CLICK */
    switchPlayer(){
        if (this.PlayerTurn == this.Players[0]){
            this.PlayerTurn = this.Players[1]
        }
        else {
            this.PlayerTurn = this.Players[0]
        }
    }


    
    checkWin(){

        this.winningCombi.filter((elements)=>{
            let count = 0;
            this.PlayerTurn.tab.map((e)=>{
                if (elements.includes(e)){
                    count++
                    if(count == 3){
                        let modal = document.querySelector('.modal')
                        let modalBody = document.querySelector('.modal-body')
                        modal.style.display = 'block'
                        modal.style.color = 'black'
                        modal.classList.add('show')
                        modalBody.innerHTML = '🎉 ' + this.PlayerTurn.name + ' a gagné 🎉'
                        container.style.pointerEvents = 'none';
                    }
                   
                }
            })
        })
    }
}



/* INSTANCIER LES PLAYERS */
let Player1 = new Player('Jean', 'X');
let Player2 = new Player('Lelou', '0');

let Game = new Morpion([Player1, Player2]);

let boxes = document.querySelectorAll(".box");

boxes.forEach ((box) => {
    box.addEventListener("click", function(event) {

        Game.play(event.target);
        countNull++;

        if(countNull == 9) {
            let modal = document.querySelector('.modal')
            let modalBody = document.querySelector('.modal-body')
            let modalTitle = document.querySelector('.modal-title')
            modal.style.display = 'block';
            modal.style.color = 'black';
            modal.classList.add('show');
            modalBody.innerHTML = 'Match Null';
            modalTitle.innerHTML = 'TRY AGAIN';

        }
        console.log(countNull);
        box.style.pointerEvents = 'none'; //Pas rappuyer sur la mê box
    })
})