import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader,IonTitle,IonToolbar,IonButtons,IonBackButton,IonCard,NavController,
  IonRow,IonCol,IonCardContent,IonLabel,IonCardHeader,IonItemDivider} from '@ionic/angular/standalone';
import { InfoCardComponent } from "../../../widgets/info-card/info-card.component";
import { MemberPersonalDetailComponent } from '../../../components/member-personal-detail/member-personal-detail.component';
import { IMember } from 'src/app/interface/imember';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from "@angular/common";
import { ActionButtonComponent } from 'src/app/widgets/action-button/action-button.component';
import { addCircle, ban, barbell, call, chatboxEllipses, logoWhatsapp, notifications, person } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.page.html',
  styleUrls: ['./member-details.page.scss'],
  standalone: true,
  imports: [DatePipe, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons,
     IonBackButton, IonCard, MemberPersonalDetailComponent, ActionButtonComponent, IonRow, IonCol, 
     RouterLink, InfoCardComponent, IonCardContent, IonLabel, IonCardHeader, IonItemDivider],
})
export class MemberDetailsPage implements OnInit {
  public id!: number;
  public member = signal<IMember | null>(null);
  private navCtrl = inject(NavController);
  private route = inject(ActivatedRoute);

  //service
  private userService = inject(UserServiceService);

  constructor(private alertController: AlertController,private router:Router) {
    addIcons({ addCircle, notifications, call, logoWhatsapp, chatboxEllipses, person, barbell, ban });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (!id) {
      this.navCtrl.back();
      return;
    }
    this.id = parseInt(id);
    this.getMemberById();
  }

  async showErrorAlert(message:string="Something went wrong!! \n Please try again.") {
    const alert=await this.alertController.create({
      header:"Error",
      message:message,
      buttons:['OK']
    });
    await alert.present();
  }

  getMemberById() {
    this.userService.findById(this.id).subscribe({
      next: (member) => {
        this.member.set(member);
        console.log(member);
      },
      error: (error) => {
        this.showErrorAlert(error.error)
        this.router.navigateByUrl('/tabs');
      }
    });
  }
}
