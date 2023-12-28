import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-view',
  templateUrl: './empty-view.component.html',
  styleUrls: ['./empty-view.component.scss'],
})
export class EmptyViewComponent implements OnInit {
  @Input() icon?: string;
  @Input() title?: string;
  @Input() hideRefreshButton = false;
  @Input() buttonTitle = 'Refresh';

  @Output() buttonClicked = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  /**
   * Handle click event
   */
  buttonClickAction() {
    this.buttonClicked.emit();
  }
}

export enum EmptyViewButtonType {
  refresh,
  navigator,
}
