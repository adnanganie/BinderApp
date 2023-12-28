import { Component, Input, OnInit } from '@angular/core'
import { PopoverController } from '@ionic/angular'

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent implements OnInit {
  @Input() title: string | undefined
  @Input() subTitle1: string | undefined
  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  async dismissPopOver(value?: any) {
    await this.popoverController.dismiss(value)
  }

  closeDialog() {
    this.dismissPopOver(null)
  }
}
