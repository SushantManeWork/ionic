import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonIcon,IonSearchbar,
  IonRow,IonCol,IonSelect,IonSelectOption,IonList,IonItemDivider} from '@ionic/angular/standalone';
import { addCircle, chevronForwardCircle, menuOutline, notifications } from "ionicons/icons";
import { addIcons } from 'ionicons';
import { MemberComponent } from "../../../components/member/member.component";
import { IMember } from 'src/app/interface/imember';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { TrainingTypeService } from 'src/app/services/trainingType/training-type.service';
import { ITrainingType } from 'src/app/interface/ITrainingType';
import { IPackage } from 'src/app/interface/IPackage';
import { PackageService } from 'src/app/services/package/package.service';
import { AlertController } from "@ionic/angular";
import { TrainerService } from 'src/app/services/trainer/trainer.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonButton,
    IonIcon,IonSearchbar,IonRow,IonCol,IonSelect,IonSelectOption,IonList,IonItemDivider,MemberComponent,
    RouterLink]
})
export class MembersPage implements OnInit {
  public isActive: boolean = true;
  public members = signal<IMember[]>([]);
  public packages = signal<IPackage[] | null>([]);
  public searchQuery: string = '';
  public selectedBatchType: string = 'Select Batch';
  public selectedPackage: string = 'All Packages';
  public selectedTrainingType: string = 'All Training Types';
  public trainerId: number = 0;
  public trainingTypes = signal<ITrainingType[]>([]);

  //service
  private packageService = inject(PackageService);
  private trainingTypesService = inject(TrainingTypeService);
  private userService = inject(UserServiceService);
  private trainerService=inject(TrainerService);

  constructor(private alertController: AlertController, private router: Router) { 
    addIcons({addCircle, chevronForwardCircle, menuOutline, notifications});
  }

  ngOnInit() {
    this.trainerId=parseInt(sessionStorage.getItem('trainerId') || '0');

    if (this.trainerId==0) {
      this.router.navigateByUrl("/login")
    }
    this.updateUsers(this.trainerId);
    this.getMembers();
    this.getTrainingTypes();
    this.getPackages();
  }

  async showErrorAlert(message:string="Something went wrong!! \n Please try again.") {
    const alert=await this.alertController.create({
      header:"Error",
      message:message,
      buttons:['OK']
    });
    await alert.present();
  }

   getMembers(){
    this.userService.getUsers(this.trainerId).subscribe({
      next: (data) => {
        this.members.set(data);
      },
      error: (error) => this.showErrorAlert(error.error)
    });
  }

  getFilteredMembers():IMember[]{
    let members=this.members();

    if (this.searchQuery.trim()!='') {
      members=members.filter((member)=>{
        return member.name.toLowerCase().includes(this.searchQuery.trim().toLowerCase()) ||
        member.phone.includes(this.searchQuery.trim())
      });
    }    
    if(this.selectedBatchType!='Select Batch'){
      members=members.filter((member)=>member.batchName===this.selectedBatchType);
    }
    if(this.selectedTrainingType!='All Training Types'){
      members=members.filter((member)=>member.trainingType===this.selectedTrainingType);
    }
    if(this.selectedPackage!='All Packages'){
      members=members.filter((member)=>member.packageDTO.plan===this.selectedPackage);
    }
    return members;
  }

  getTrainingTypes(){
    this.trainingTypesService.getTrainingTypes().subscribe({
      next: (data) => {
        this.trainingTypes.set(data);
      },
      error: (error) => this.showErrorAlert(error.error)
    });
  }

  getPackages(){
    this.packageService.getPackages().subscribe({
      next: (data) => {
        this.packages.set(data);
      },
      error: (error) => this.showErrorAlert(error.error)
    });
  }

  updateUsers(trainerId:number){
    this.trainerService.updateUsers(trainerId).subscribe({}); 
  }

  ionViewWillEnter(){
    this.ngOnInit();
  }
}
