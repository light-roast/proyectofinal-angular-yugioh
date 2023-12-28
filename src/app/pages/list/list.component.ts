import { Component, OnInit, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { NgFor } from '@angular/common';
import { CardService } from '../../services/card.service';
import { HttpClientModule } from '@angular/common/http';
import { Card } from '../../interfaces/card.interface';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, NgFor, HttpClientModule, InfiniteScrollModule, ReactiveFormsModule],
  providers: [CardService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  cards: Card[] = [];
  offset = 0;
  cardTextFC = new FormControl('');
  cardService: CardService = inject(CardService);

  onScroll() {
    this.offset += 100;
    this.searchCards();
    }
  
    searchCards(cardName: string | null = null){
      this.cardService.getCards(cardName, this.offset).subscribe(res => {
        this.cards = [...this.cards, ...res];
  
      })
    }

    ngOnInit(): void {
      // Funcionalidad para la búsqueda, el debounce time retrasa la ejecución del evento value change y se asegura más adelante que el this.cards esté vacío para que solo muestre los resultados
      this.cardTextFC.valueChanges.pipe(
        debounceTime(1000)
      ).subscribe((res) => {
        this.cards=[];
        this.searchCards(res)
      });

      this.searchCards();
          }

  
}
