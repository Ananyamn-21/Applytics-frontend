import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FlashcardService } from '../../services/flashcard';
import { Flashcard } from '../../models/flashcard.model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-flash-cards',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.scss']
})
export class FlashCardsComponent {
  flashcards: Flashcard[] = [];
  filteredFlashcards: Flashcard[] = [];
  tags: string[] = [];
  selectedTag = '';
  currentCardIndex = 0;
  isFlipped = false;

  constructor(private flashcardService: FlashcardService) {}

  ngOnInit(): void {
    this.loadFlashcards();
  }

  loadFlashcards(): void {
    this.flashcardService.getFlashcards().subscribe((cards: Flashcard[]) => {
      this.flashcards = cards;
      this.filteredFlashcards = [...cards];
      this.tags = [...new Set(cards.flatMap((card: Flashcard) => card.tags))];
    });
  }

  filterByTag(tag: string): void {
    this.selectedTag = tag;
    this.filteredFlashcards = tag 
      ? this.flashcards.filter(card => card.tags.includes(tag))
      : [...this.flashcards];
    this.currentCardIndex = 0;
    this.isFlipped = false;
  }

  nextCard(): void {
    if (this.currentCardIndex < this.filteredFlashcards.length - 1) {
      this.currentCardIndex++;
      this.isFlipped = false;
    }
  }

  prevCard(): void {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
      this.isFlipped = false;
    }
  }

  toggleFlip(): void {
    this.isFlipped = !this.isFlipped;
  }

  get currentCard(): Flashcard | null {
    return this.filteredFlashcards.length > 0 
      ? this.filteredFlashcards[this.currentCardIndex]
      : null;
  }
}