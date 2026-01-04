import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  imports: [],
  templateUrl: './info-card.html',
  styleUrl: './info-card.scss',
})
export class InfoCard {
  @Input() title!: string;
  @Input() value!: number;
  @Input() sub!: string;
  @Input() color!: string;
}
