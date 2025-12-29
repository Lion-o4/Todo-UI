import { Component } from '@angular/core';
import { InfoCard } from '../../shared/info-card/info-card';

@Component({
  selector: 'app-dashboard',
  imports: [InfoCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
