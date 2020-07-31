import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';

declare function myListen(key:any): any;
declare function read(key:any): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notes = [];
  
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < localStorage.length; i++) {

      let date = localStorage.key(i);
      let content = localStorage.getItem(localStorage.key(i));
      this.notes.push(new Note(date, content));
    }
  }

  delete(key) {
    localStorage.removeItem(key);
    read('Note Deleted Successfully')
    location.reload();
  }

  listen(key) {
    myListen(key);
  }

}
