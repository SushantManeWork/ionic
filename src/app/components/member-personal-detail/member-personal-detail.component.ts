import { Component, input, OnInit } from '@angular/core';
import { IonItem,IonThumbnail,IonLabel,IonText,IonButton,IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronForwardCircle } from "ionicons/icons";
import { IMember } from 'src/app/interface/imember';

@Component({
  selector: 'app-member-personal-detail',
  templateUrl: './member-personal-detail.component.html',
  styleUrls: ['./member-personal-detail.component.scss'],
  imports:[IonItem,IonThumbnail,IonLabel,IonText,IonButton,IonIcon]
})
export class MemberPersonalDetailComponent  implements OnInit {

  member=input<IMember>();  

  constructor() {
    addIcons({})
   }

  ngOnInit() {}

}
