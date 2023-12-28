import { Component, OnInit, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { NgFor } from '@angular/common';
import { CardService } from '../../services/card.service';
import { HttpClientModule } from '@angular/common/http';
import { Card } from '../../interfaces/card.interface';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, NgFor, HttpClientModule, InfiniteScrollModule],
  providers: [CardService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  cards: Card[] = [];
  offset = 0;
  cardService: CardService = inject(CardService);

  onScroll() {
    this.offset += 100;
    this.searchCards();
    }
  
    searchCards(){
      this.cardService.getCards(this.offset).subscribe(res => {
        this.cards = [...this.cards, ...res];
  
      })
    }

    ngOnInit(): void {
      this.searchCards();
    }

  
}
