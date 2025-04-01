import { Component, input, OnInit } from '@angular/core';
import { IonCard, IonLabel, IonText, IonRow, IonCol } from "@ionic/angular/standalone";
import { DatePipe } from "@angular/common";
import { RouterLink } from '@angular/router';
import { MemberPersonalDetailComponent } from "../member-personal-detail/member-personal-detail.component";
import { IMember } from 'src/app/interface/imember';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  imports:[IonCard,IonLabel,IonText,IonRow,IonCol,DatePipe,RouterLink,MemberPersonalDetailComponent]
})
export class MemberComponent  implements OnInit {

  public member=input<IMember>();

  constructor() { 
  }

  ngOnInit() {}

}
