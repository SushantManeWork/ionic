import { Component, input, OnInit } from '@angular/core';
import { IonText, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
  imports: [IonText, IonLabel]
})
export class InfoCardComponent  implements OnInit {
  heading = input<string>('');
  value = input<any>();

  constructor() { }

  ngOnInit() {}
}
