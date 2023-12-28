import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Course } from 'src/app/models/courses.model'

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent implements OnInit {
  @Input() items = Array<Course>() 
  @Input() cardBgColor = '#fce1dd'
  @Output() categoryClickEvent = new EventEmitter<any>()
  constructor() {}

  ngOnInit() {}

  /**
   * Handle click event
   */
  courseClickAction(item: any) {
    this.categoryClickEvent.emit(item)
  }
}
