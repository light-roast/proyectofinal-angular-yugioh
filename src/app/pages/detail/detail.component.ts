import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardService } from '../../services/card.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Card } from '../../interfaces/card.interface';
import { CommonModule, NgIf } from '@angular/common';
import { MarketNamePipe } from '../../pipes/market-name.pipe';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterModule, HttpClientModule, NgIf, CommonModule, MarketNamePipe],
  providers: [CardService],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit{
  id!: string;
  card$!: Observable<Card>;
  constructor(private route: ActivatedRoute, private cardService: CardService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.card$ = this.cardService.getCard(this.id);
  }
}
