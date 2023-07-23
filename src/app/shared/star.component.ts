import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'um-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
})
export class StarComponent implements OnChanges {
  @Input() rating = 0;
  cropWidth = 75;

  ngOnChanges(): void {
    this.cropWidth = (this.rating * 75) / 5;
  }
}
