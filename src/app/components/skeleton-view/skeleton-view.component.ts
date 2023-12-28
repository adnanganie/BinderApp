import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-view',
  templateUrl: './skeleton-view.component.html',
  styleUrls: ['./skeleton-view.component.scss'],
})
export class SkeletonViewComponent implements OnInit {
  @Input() hasThumbnail = false;
  @Input() skeletonSize = 10;
  constructor() {}

  ngOnInit() {}

  /**
   * Get length of skeleton view
   */
  getSkeleltonArray(): Array<number> {
    const skeletonArray = new Array<number>();
    for (let i = 0; i < this.skeletonSize; i++) {
      skeletonArray.push(i);
    }
    return skeletonArray;
  }
}
