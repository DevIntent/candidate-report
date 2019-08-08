import {Component, OnInit} from '@angular/core';
import {NavService} from '../nav.service';

@Component({
  selector: 'cr-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  constructor(public navService: NavService) {}

  ngOnInit() {}
}
