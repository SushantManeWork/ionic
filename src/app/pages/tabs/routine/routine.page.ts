import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonList,IonCard,IonLabel,IonIcon,
  IonText,IonThumbnail,IonItem} from '@ionic/angular/standalone';
import { RoutineService } from 'src/app/services/routine/routine.service';
import { IRoutine } from 'src/app/interface/IRoutine';
import { addIcons } from 'ionicons';
import { caretDownOutline, caretUpOutline } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-routine',
  templateUrl: './routine.page.html',
  styleUrls: ['./routine.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonList,IonCard,IonLabel,
    IonIcon,IonText,IonThumbnail,IonItem,RouterLink
  ]
})
export class RoutinePage implements OnInit {
  public fullTime = '';
  public routines = signal<Map<string, IRoutine[]> | null>(null);
  public trainerId = signal<number>(1);

  //service
  private routineService=inject(RoutineService);

  constructor(private router:Router,private alertController: AlertController) { 
    addIcons({caretDownOutline,caretUpOutline})
  }

  ngOnInit() {
    this.trainerId.set(parseInt(sessionStorage.getItem('trainerId') || '0'));

    if (this.trainerId() === 0) {
      this.showErrorAlert('Something went wrong!');
      this.router.navigate(['/tabs']);
    }
    
    this.routineService.getTrainerRoutine(this.trainerId()).subscribe({
      next:(data)=>{
        console.log(data);
        this.routines.set(data);
      },
      error:(error)=>{
        this.showErrorAlert(error.error);
        this.router.navigate(['/tabs/members']);
      }
    });
  }

  async showErrorAlert(message:string="Something went wrong!! \n Please try again.") {
    const alert=await this.alertController.create({
      header:"Error",
      message:message,
      buttons:['OK']
    });
    await alert.present();
  }
}
