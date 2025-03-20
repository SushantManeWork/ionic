import { Component, input, OnInit } from '@angular/core';
import { IonCard,IonItem,IonThumbnail,IonLabel,IonButton,IonIcon,IonText,IonRow,IonCol } from "@ionic/angular/standalone";
import { DatePipe } from "@angular/common";
import { IMember } from 'src/app/interface/imember';
import { RouterLink } from '@angular/router';
import { MemberPersonalDetailComponent } from "../member-personal-detail/member-personal-detail.component";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  imports:[IonCard,IonLabel,IonText,IonRow,IonCol,DatePipe,RouterLink,MemberPersonalDetailComponent]
})
export class MemberComponent  implements OnInit {

  member=input<IMember>();

  constructor() { 
  }

  ngOnInit() {}

}
