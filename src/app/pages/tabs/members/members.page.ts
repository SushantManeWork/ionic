import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonIcon,IonSearchbar,IonLabel,IonRow,IonCol,IonSelect,IonSelectOption,
  IonList,IonItemDivider
 } from '@ionic/angular/standalone';
import { addCircle, chevronForwardCircle, menuOutline, notifications } from "ionicons/icons";
import { addIcons } from 'ionicons';
import { MemberComponent } from "../../../components/member/member.component";
import { IMember } from 'src/app/interface/imember';
import { MemberService } from 'src/app/services/member/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonButton,IonIcon,
    IonSearchbar,IonRow,IonCol,IonSelect,IonSelectOption,IonList,IonItemDivider,MemberComponent]
})
export class MembersPage implements OnInit {
  members=signal<IMember[]>([]);
  private memberService=inject(MemberService);

  constructor() { 
    addIcons({menuOutline,notifications,addCircle,chevronForwardCircle});
  }

  ngOnInit() {
    this.getMembers();
  }

  getMembers(){
    this.members.set(this.memberService.getMembers());
  }

}
