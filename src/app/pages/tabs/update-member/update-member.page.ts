import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar ,IonButtons,IonBackButton,IonCard,IonList,IonInput,
  IonItem,IonRadioGroup,IonLabel,NavController,IonRadio,
IonCardHeader,IonText,IonButton} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { IUser } from 'src/app/interface/IUser';
import { addIcons } from 'ionicons';
import { create } from 'ionicons/icons';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.page.html',
  styleUrls: ['./update-member.page.scss'],
  standalone: true,
  imports: [FormsModule,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,
    IonCard,IonList,IonInput,IonItem,IonRadioGroup,IonLabel,IonBackButton,IonButton,
    IonRadio,IonText,ReactiveFormsModule,IonCardHeader]
})
export class UpdateMemberPage implements OnInit {

  private navCtrl = inject(NavController);
  private route = inject(ActivatedRoute);
  private userId?: number;
  public user = signal<IUser | null>(null);
  public userForm: FormGroup;

  //service
  private userService = inject(UserServiceService);

  constructor(private formBuilder:FormBuilder,private router:Router,private alertController: AlertController) { 
    addIcons({create});
    this.userForm=formBuilder.group({
      userId:[0],
      name:[''],
      photo:[''],
      phone:[''],
      gender:[''],
      address:[''],
      trainer:[0],
      trainingPackage:[0],
      userBatchInfo:[0],
      trainingType:[0],
      isActive:[true]
    })
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (!id) {
      this.showErrorAlert();
      this.navCtrl.back();
      return;
    }
    this.userId = parseInt(id);
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
    if (this.userId) {

      this.userService.findUserById(this.userId).subscribe({
        next: (member) => {
          this.user.set(member);
          this.setMemberToFormGroup();
        },
        error: (error) => {
          this.showErrorAlert(error.error);
          this.router.navigateByUrl("/tabs/members");
        }
      });
    }
  }

  updateMember(){
    this.userService.updateUser(this.userForm?.controls['userId'].value,this.userForm?.value).subscribe({
      next:(data)=>{console.log(data);
        this.router.navigateByUrl("/tabs/members")
      },
      error:(error)=>{
        this.showErrorAlert(error.error);
        this.router.navigateByUrl("/tabs/members");
      } 
    });
  }

  setMemberToFormGroup(){
    this.userForm?.controls['userId'].setValue(this.user()?.userId);
    this.userForm?.controls['name'].setValue(this.user()?.name);
    this.userForm?.controls['photo'].setValue(this.user()?.photo);
    this.userForm?.controls['phone'].setValue(this.user()?.phone);
    this.userForm?.controls['gender'].setValue(this.user()?.gender);
    this.userForm?.controls['address'].setValue(this.user()?.address);
    this.userForm?.controls['trainer'].setValue(this.user()?.trainer);
    this.userForm?.controls['trainingPackage'].setValue(this.user()?.trainingPackage);
    this.userForm?.controls['userBatchInfo'].setValue(this.user()?.userBatchInfo);
    this.userForm?.controls['trainingType'].setValue(this.user()?.trainingType);
    this.userForm?.controls['isActive'].setValue(this.user()?.isActive);
  }
}
