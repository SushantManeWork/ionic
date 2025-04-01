import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonCard,IonList,IonItem,IonLabel,IonText,IonButton,
  IonCardHeader,IonCardTitle,IonCardContent,IonButtons,IonIcon} from '@ionic/angular/standalone';
import { ITrainer } from 'src/app/interface/ITrainer';
import { TrainerService } from 'src/app/services/trainer/trainer.service';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { create } from 'ionicons/icons';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonCard,IonList,IonItem,
    IonLabel,IonText,IonButton,IonCardHeader,IonCardTitle,IonCardContent,RouterLink,IonButtons,IonIcon
  ]
})
export class AccountPage implements OnInit {
  public trainer=signal<ITrainer|null>(null);
  public trainerId=signal<number>(1);
  
  //service
  private trainerService=inject(TrainerService);

  constructor(private alertController: AlertController,private router:Router) {
    addIcons({create});
  }

  async showErrorAlert(message:string="Something went wrong!! \n Please try again.") {
    const alert=await this.alertController.create({
      header:"Error",
      message:message,
      buttons:['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    this.trainerId.set(parseInt(sessionStorage.getItem('trainerId') || '0'));

    if (this.trainerId() === 0) {
      this.showErrorAlert();
      this.router.navigate(['/tabs']);
    }
    
    this.trainerService.getTrainer(this.trainerId()).subscribe({
      next:(data)=>{
        this.trainer.set(data);
      },
      error:(error)=>{
        this.showErrorAlert(error.error);
        this.router.navigate(['/tabs']);
      }
    });
  }

  logOut(){
    sessionStorage.removeItem('trainerId');
    this.router.navigate(['/']);
  }

  ionViewWillEnter(){
    this.ngOnInit();
  }
}
