import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,NavController,IonCard,
  IonList,IonItem,IonSelect,IonSelectOption,IonRow,IonCol,
  IonButton,IonLabel,IonRadio,IonRadioGroup ,IonInput} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { IMember } from 'src/app/interface/imember';
import { IPackage } from 'src/app/interface/IPackage';
import { ITrainingType } from 'src/app/interface/ITrainingType';
import { PackageService } from 'src/app/services/package/package.service';
import { TrainingTypeService } from 'src/app/services/trainingType/training-type.service';
import { UserBatchService } from 'src/app/services/userBatch/user-batch.service';
import { addIcons } from 'ionicons';
import { add, remove } from 'ionicons/icons';
import { IUser } from 'src/app/interface/IUser';
import { IUserBatchInfo } from 'src/app/interface/IUserBatchInfo';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-renew-member',
  templateUrl: './renew-member.page.html',
  styleUrls: ['./renew-member.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonBackButton,
    IonCard,IonList,IonItem,IonSelect,IonSelectOption,IonRow,IonCol,
    IonLabel,IonRadio,IonRadioGroup,IonInput,IonButton
  ]
})
export class RenewMemberPage implements OnInit {
  public eveningBatchTime: string[] = ['6PM - 7PM', '7PM - 8PM', '8PM - 9PM'];
  public id!: number;
  public member = signal<IMember | null>(null);
  public morningBatchTime: string[] = ['7AM - 8AM', '8AM - 9AM'];
  public navCtrl = inject(NavController);
  public package: IPackage | null = null;
  public packages = signal<IPackage[] | null>(null);
  public route = inject(ActivatedRoute);
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

  constructor(private router:Router,private alertController: AlertController) { 
    addIcons({add,remove})
        this.userBatch.planPurchaseDate=new Date();
  }

  ngOnInit() {
    this.user.trainer=parseInt(sessionStorage.getItem('trainerId') || '0');
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (!id) {
      this.showErrorAlert();
      this.navCtrl.back();
      return;
    }
    this.id = parseInt(id);
    this.getMemberById();
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
    this.setPlanExpiryDate()
    this.user.trainingPackage=this.package?.id || 0;
    
    this.userBatchInfoService.update(this.id,this.userBatch).subscribe({
      next:(data)=>{
        this.user.userBatchInfo=parseInt(data.toString(), 10);
      },
      error:(error)=>{
        this.showErrorAlert(error.error);
        this.router.navigateByUrl('/tabs/members')
      }
    });

    setTimeout(() => {
      this.userService.updateUser(this.user.userId,this.user).subscribe({
        next:(data)=>{
          this.router.navigateByUrl("/tabs/members")
        },
        error:(error)=>{
          this.showErrorAlert(error.error);
          this.router.navigateByUrl('/tabs/members')
        }
      });
    }, 3000);
  }

  getMemberById() {
    this.userService.findById(this.id).subscribe({
      next: (member) => {
        this.member.set(member);
        if (member.isActive) {
          this.showErrorAlert("Member Currently is active");
          this.navCtrl.back();
        }
        this.setMemeberDetails();
      },
      error: (error) => {
        this.showErrorAlert(error.error);
        this.router.navigateByUrl('/tabs/members');
      }
    });
  }

  setMemeberDetails(){
    this.user.userId=this.member()?.id || 0;
    this.user.name=this.member()?.name || '';
    this.user.phone=this.member()?.phone || '';
    this.user.photo=this.member()?.photo || '';
    this.user.address=this.member()?.address || '';
    this.user.gender=this.member()?.gender || '';
    this.user.trainer=1;
  }

  getPackages(){
    this.packageService.getPackages().subscribe({
      next: (data) => {
        this.packages.set(data);
      },
      error: (error) => {
        this.showErrorAlert(error.error);
        this.router.navigateByUrl('/tabs/members');
      }
    });
  }

  getTrainingTypes(){
    this.trainingService.getTrainingTypes().subscribe({
      next: (data) => {
        this.trainingTypes.set(data);
      },
      error: (error) => {
        this.showErrorAlert(error.error);
        this.router.navigateByUrl('/tabs/members');
      }
    });
  }

  setPlanExpiryDate(){
    this.userBatch.planPurchaseDate=new Date();
    var days=this.package?.totalDays || 0;
    
    if (this.userBatch.planPurchaseDate!=null) {
      var a=new Date(this.userBatch?.planPurchaseDate);
      a.setDate(a.getDate()+days)
      this.userBatch.planExpiryDate=new Date(a.toISOString());
    }
  }
}
