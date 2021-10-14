import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../models/spotify-track.model'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() results!: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
