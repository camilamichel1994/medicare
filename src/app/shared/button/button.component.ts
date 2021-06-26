import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() isDisabled: boolean = false;
  @Input() isSecondary: boolean = false;
  @Input() type: string = 'button';

  constructor() {}

  ngOnInit(): void {}
}
