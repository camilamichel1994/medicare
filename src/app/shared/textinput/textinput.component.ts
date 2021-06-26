import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-textinput',
  templateUrl: './textinput.component.html',
  styleUrls: ['./textinput.component.scss'],
  encapsulation: ViewEncapsulation.None, // native input styles
})
export class TextinputComponent implements OnInit {
  @Input() label: String = '';
  @Input() width: String = '';

  constructor() {}

  ngOnInit(): void {}
}
