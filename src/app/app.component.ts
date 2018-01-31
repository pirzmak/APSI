import {Component, WrappedValue} from '@angular/core';


export class Hand {
  constructor(public l: Card, public r: Card) {}
}
export class Card {
  constructor(public value: number, public color: string, public free: boolean) {}
}
export class Player {
  constructor(public name: string, public hand: Hand, public money: number, public stock: number) {}
}
export class Log {
  constructor(public actor: string, public message: string) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  names = ['Jim', 'Adam', 'Mark', "Ty"];
  players: Player[];
  cards: Card[];
  colors = ['C','D','H','S'];
  stock = 0;
  tableCards: Card[];
  myStock: number = 0;
  messages: string[] = [];
  message: string = "";
  logs: Log[] = [];
  game: WrappedValue;

  constructor() {
    this.cards = [];
    this.players = [];
    this.tableCards = [];
    this.game = new WrappedValue(false);
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j<13; j++) {
        this.cards.push(new Card(j,this.colors[i],true));
      }
    }

    for(let i = 0; i < 4; i++) {
      this.players.push(new Player(this.names[i],new Hand(this.getCard(),this.getCard()), 1000, 0));
    }
    this.logs.push(new Log("System", "Gra rozpoczęta"));
  }

  getCard() {
    let card = this.cards[Math.floor(Math.random() * (52))];
    while(!card.free) {
      card = this.cards[Math.floor(Math.random() * (52))];
    }
    card.free = false;
    return card;
  }

  getCardNumber(card: Card) {
    if(card.value > 8) {
      switch (card.value) {
        case 9: return 'J';
        case 10: return 'D';
        case 11: return 'K';
        case 12: return 'A';
      }
    }
    return card.value + 2;
  }

  changeMyStock(value: number) {
    this.myStock = Number(value);

  }

  pay() {
    if(this.players[3].stock + this.myStock < this.players[3].money) {
      this.players[3].stock = this.players[3].stock + this.myStock;
      this.logs.push(new Log(this.players[3].name, "Podbijam"));
    }
    if(this.players[0].stock + this.myStock < this.players[0].money) {
      this.players[0].stock = this.players[0].stock + this.myStock;
      this.logs.push(new Log(this.players[0].name, "Podbijam"));
    }
    if(this.players[1].stock + this.myStock < this.players[1].money) {
      this.players[1].stock = this.players[1].stock + this.myStock;
      this.logs.push(new Log(this.players[1].name, "Podbijam"));
    }
    if(this.players[2].stock + this.myStock < this.players[2].money) {
      this.players[2].stock = this.players[2].stock + this.myStock;
      this.logs.push(new Log(this.players[2].name, "Podbijam"));
    }
    this.myStock = 0;
  }

  wait() {
    this.players.forEach(p => {
      p.money = p.money - p.stock;
      this.stock = this.stock + p.stock;
      this.logs.push(new Log(p.name, "Czekam"));
      p.stock = 0;
    });
    this.myStock = 0;
    this.tableCards.push(this.getCard());
  }

  changeMyMessage(value: string) {
    this.message = value;
  }


  textChange(event) {
    if(event.keyCode === 13) {
      this.messages.push(this.message);
      this.message = "";
    }
  }

  pass() {
    this.players.forEach(p => {
      p.money = p.money - p.stock;
      this.stock = this.stock + p.stock;
      this.logs.push(new Log(p.name, "Pasuję"));
      p.stock = 0;
    });
    this.myStock = 0;
    this.tableCards.push(this.getCard());
  }

  startGame() {
    this.game = new WrappedValue(true);
    console.log(this.game.wrapped);
  }

}
