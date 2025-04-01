import { Component, input, OnInit } from '@angular/core';
import { IonItem, IonThumbnail, IonLabel, IonText, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { IMember } from 'src/app/interface/imember';

@Component({
  selector: 'app-member-personal-detail',
  templateUrl: './member-personal-detail.component.html',
  styleUrls: ['./member-personal-detail.component.scss'],
  imports:[IonItem,IonThumbnail,IonLabel,IonText,IonButton,IonIcon]
})
export class MemberPersonalDetailComponent  implements OnInit {
  public isList=input<boolean>();
  public member=input<IMember>();

  constructor() {
    addIcons({})
  }

  ngOnInit() {}

}
