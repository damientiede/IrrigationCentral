import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-status-widget',
  templateUrl: './status-widget.component.html',
  styleUrls: ['./status-widget.component.css']
})
export class StatusWidgetComponent implements OnInit {
  @Input() LastSeen: Date;
  @Input() Radius: Number = 30;
  @Input() MarginTop: Number = 0;
  constructor() { }

  ngOnInit() {
  }

  loaded() {
    // console.log(`${this.LastSeen} is date: ${moment(this.LastSeen).isValid()}`);
    return (moment(this.LastSeen).isValid());
  }
  getImageSrc() {
    const now = moment.utc();
    const ls = moment.utc(this.LastSeen);
    if (now.diff(ls) > (30000)) {
      return `../../assets/redled.jpg`;
    }
    return '../../assets/greenled.jpg';
  }
}
