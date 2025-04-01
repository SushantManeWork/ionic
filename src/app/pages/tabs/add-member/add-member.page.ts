import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, getLocaleDateFormat } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar ,IonButtons,IonBackButton,IonCard,IonList,IonInput,
  IonItem,IonRadioGroup,IonLabel,IonSelect,IonSelectOption,IonRow,IonCol,IonRadio,
  IonText,IonButton} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, remove } from 'ionicons/icons';
import { PackageService } from 'src/app/services/package/package.service';
import { IPackage } from 'src/app/interface/IPackage';
import { TrainingTypeService } from 'src/app/services/trainingType/training-type.service';
import { ITrainingType } from 'src/app/interface/ITrainingType';
import { UserBatchService } from 'src/app/services/userBatch/user-batch.service';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { Router } from '@angular/router';
import { IUserBatchInfo } from 'src/app/interface/IUserBatchInfo';
import { IUser } from 'src/app/interface/IUser';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
  standalone: true,
  imports: [FormsModule,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonBackButton
    ,IonCard,IonList,IonInput,IonItem,IonRadioGroup,IonLabel,IonSelect,IonSelectOption,IonRow,
    IonCol,IonButton,IonRadio,IonText]
})
export class AddMemberPage implements OnInit {
  public eveningBatchTime: string[] = ['6PM - 7PM', '7PM - 8PM', '8PM - 9PM'];
  public morningBatchTime: string[] = ['7AM - 8AM', '8AM - 9AM'];
  public package: IPackage | null = null;
  public packages = signal<IPackage[] | null>(null);
  public trainingTypes = signal<ITrainingType[] | null>(null);
  public user:IUser={
    userId: 0,
    name: "",
    photo: "",
    phone: "",
    gender: "",
    address: "",
    trainer: 1,
    trainingPackage: this.package?.id || 0,
    userBatchInfo: 0,
    trainingType: 0,
    isActive: true
  }
  public userBatch:IUserBatchInfo={
    batchId: 0,
    planPurchaseDate: new Date(),
    planExpiryDate: new Date(),
    batchName: "",
    batchTime: "",
    paid: 0,
    dueAmount: 0
  }

  //service
  private packageService = inject(PackageService);
  private trainingService = inject(TrainingTypeService);
  private userBatchInfoService = inject(UserBatchService);
  private userService = inject(UserServiceService);

  constructor(private router: Router,private alertController: AlertController) { 
    this.user.trainer=parseInt(sessionStorage.getItem('trainerId') || '0');
    addIcons({add,remove})
    this.userBatch.planPurchaseDate=new Date(); 
  }

  ngOnInit() {
    this.getPackages();
    this.getTrainingTypes();
  }

  async showErrorAlert(message:string="Something went wrong!! \n Please try again.") {
    const alert=await this.alertController.create({
      header:"Error",
      message:message,
      buttons:['OK']
    });
    await alert.present();
  }

   submit(){
    this.userBatch.dueAmount=(this.package?.totalAmount || 0)-(this.userBatch.paid || 0)-(this.package?.discount || 0);
    this.setDates()
    this.user.trainingPackage=this.package?.id || 0;
    console.log(this.userBatch);
    console.log(this.user);
    if (!this.validateUserBatchInfo()) {
      this.showErrorAlert("Please insert valid details");
      return;
    }
    
    this.userBatchInfoService.create(this.userBatch).subscribe({
        next:(data)=>{
          console.log(data);
          this.user.userBatchInfo=parseInt(data.toString(), 10);
        },
        error:(error)=>{
          this.showErrorAlert(error.error);
          this.router.navigateByUrl("/tabs/members");
        }
    });

    if (!this.validateUser()) {
      this.showErrorAlert("Please insert valid details");
      return;
    }
    setTimeout(() => {
      this.userService.createUser(this.user).subscribe({
        next:(data)=>{console.log(data);
          this.router.navigateByUrl("/tabs/members")
        },
        error:(error)=>{
          this.userBatchInfoService.delete(this.user.userBatchInfo).subscribe({
            next:(val)=>console.log(val),
            error:(error)=>{
              this.showErrorAlert(error.error);
            }
          });
          this.showErrorAlert(error.error);
          this.router.navigateByUrl("/tabs/members");
        } 
      });
    }, 3000);
  }

  validateUserBatchInfo():boolean{
    if(!this.userBatch.planPurchaseDate || !this.userBatch.planExpiryDate || this.userBatch.batchName=='' || this.userBatch.batchTime=='' || this.userBatch.paid==0){
      return false;
    }
    return true;
  }

  validateUser():boolean{
    if (this.user.name=='' || this.user.phone=='' || this.user.photo=='' || this.user.address=='' || this.user.gender=='' || 
    this.user.trainingType==0 || this.user.trainingPackage==0 || this.user.userBatchInfo==0) {
      if (this.user.photo.length>255) {
        this.showErrorAlert("Image Link is too Long");
      }
      return false;
    }
    if (this.user.photo.length>255) {
      this.showErrorAlert("Image Link is too Long");
      return false;
    }
    return true;
  }

  getPackages(){
    this.packageService.getPackages().subscribe({
      next: (data) => {this.packages.set(data);
        console.log(data);
      },
      error: (error) => console.error(error)
    });
  }

  getTrainingTypes(){
    this.trainingService.getTrainingTypesByTrainer(this.user.trainer).subscribe({
      next: (data) => {this.trainingTypes.set(data);
        console.log(data);
      },
      error: (error) => console.error(error)
    });
  }

  setDates(){
    this.userBatch.planPurchaseDate=new Date();
    var days=this.package?.totalDays || 0;
    
    if (this.userBatch.planPurchaseDate!=null) {
      var a=new Date(this.userBatch?.planPurchaseDate);
      a.setDate(a.getDate()+days) 
      this.userBatch.planExpiryDate=new Date(a.toISOString());
    }
  }
}
