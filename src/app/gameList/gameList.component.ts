import {Component, Input} from '@angular/core';


export class Game {
  constructor(public rankingowa: boolean, public limit: number, public lGraczy: number) {}
}

@Component({
  selector: 'app-game-list',
  templateUrl: './gameList.component.html',
  styleUrls: ['./gameList.component.scss']
})
export class GameListComponent {
  @Input() start: () => void;

  games: Game[];
  selectedGame: Game;

  constructor() {
    this.games = [];

    for(let i = 0; i < 40; i++) {
      this.games.push(new Game(Math.random() > 0.5, Math.floor(Math.abs((Math.random()* 1000)) / 100) * 100,
        Math.floor(Math.abs((Math.random()*8)))));
    }
  }

  gameClick(index: number){
    this.selectedGame = this.games[index];
  }
}
