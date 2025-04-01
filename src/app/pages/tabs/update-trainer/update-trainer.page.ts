import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonTitle, IonCard, IonIcon, IonCardHeader, IonCardContent, IonItem, IonText,
   IonButton, IonLabel, IonSelectOption, IonSelect, IonInput,IonCheckbox ,IonHeader, IonToolbar,
   NavController,IonBackButton,IonButtons} from '@ionic/angular/standalone';
import { ITrainingType } from 'src/app/interface/ITrainingType';
import { TrainingTypeService } from 'src/app/services/trainingType/training-type.service';
import { TrainerService } from 'src/app/services/trainer/trainer.service';
import { addIcons } from 'ionicons';
import { callOutline, caretDownOutline, caretUpOutline, happyOutline, locationOutline, lockClosedOutline,
   mailOutline, person, personOutline } from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { ITrainerForCreate } from 'src/app/interface/ITrainerForCreate';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-update-trainer',
  templateUrl: './update-trainer.page.html',
  styleUrls: ['./update-trainer.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar,IonInput, FormsModule, ReactiveFormsModule,IonSelect, IonLabel, IonText, IonItem, 
    IonCardHeader, IonIcon, IonCard, IonContent, IonTitle,  CommonModule, FormsModule,
    IonCardContent,ReactiveFormsModule,IonButton,IonSelectOption,IonCheckbox,IonBackButton,IonButtons]
})
export class UpdateTrainerPage implements OnInit {

  private navCtrl = inject(NavController);
  private route = inject(ActivatedRoute);
  public showSpeciality: boolean = false;
  public trainer = signal<ITrainerForCreate | null>(null);
  public trainerForm: FormGroup;
  public trainerId: number = 0;
  public trainingTypes = signal<ITrainingType[] | null>(null);

  //service
  private trainerService=inject(TrainerService);
  private trainingTypeService=inject(TrainingTypeService);
  
  constructor(private alertController: AlertController,private formBuilder:FormBuilder, private router:Router) {
    addIcons({callOutline, caretDownOutline, caretUpOutline, happyOutline, locationOutline,
       lockClosedOutline, mailOutline, person, personOutline});

    this.trainerForm = this.formBuilder.group({
      trainerId: [0],
      name : ['',[Validators.required]],
      password: ['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$")]],
      address: ['',[Validators.required]],
      phone: ['',[Validators.required,Validators.pattern("^[0-9]{10}$")]],
      gender: ['',[Validators.required]],
      photo: ['',[Validators.required]],
      trainingTypes:formBuilder.array([]),
    })
   }

  ngOnInit() {
    const id =JSON.parse( sessionStorage.getItem("trainerId") || '0')
  
    if (!id) {
      this.showErrorAlert();
      this.navCtrl.back();
      return;
    }
    this.trainerId = parseInt(id);
    this.getTrainingTypes();
    this.getTrainer();
  }

  async showErrorAlert(message:string="Something went wrong!! \n Please try again.") {
    const alert=await this.alertController.create({
      header:"Error",
      message:message,
      buttons:['OK']
    });
    await alert.present();
  }

  get errorControl() {
    return this.trainerForm?.controls;
  };

  updateTrainer(){
    this.trainerService.update(this.trainerForm.controls['trainerId'].value,this.trainerForm.value).subscribe({
      next:(trainer)=>{
        this.router.navigateByUrl("/tabs/account")
      },
      error:(err)=>{
        this.showErrorAlert(err.error);
        this.router.navigateByUrl("/tabs/account");
      }
    })
  }

  getTrainer(){
    this.trainerService.getCreateTrainer(this.trainerId).subscribe({
      next:(trainer)=>{
        this.trainer.set(trainer);
        this.setTrainerToFormGroup();
      },
      error:(err)=>{
        this.showErrorAlert(err.error);
        this.router.navigateByUrl("/tabs/account");
      }
    })
  }

  setTrainerToFormGroup(){
    this.trainerForm.controls['trainerId'].setValue(this.trainer()?.trainerId)
    this.trainerForm.controls['name'].setValue(this.trainer()?.name)
    this.trainerForm.controls['password'].setValue(this.trainer()?.password)
    this.trainerForm.controls['address'].setValue(this.trainer()?.address)
    this.trainerForm.controls['phone'].setValue(this.trainer()?.phone)
    this.trainerForm.controls['gender'].setValue(this.trainer()?.gender)
    this.trainerForm.controls['photo'].setValue(this.trainer()?.photo)
    const selectedTypes:FormArray = this.trainerForm.get('trainingTypes') as FormArray;

    this.trainer()?.trainingTypes.forEach(trainingTypeId=>{
      selectedTypes.push(this.formBuilder.control(trainingTypeId));
    })
  }

  getTrainingTypes(){
    this.trainingTypeService.getTrainingTypes().subscribe({
      next: (data) => {this.trainingTypes.set(data);
        console.log(data);
      },
      error: (error) => {
        this.showErrorAlert(error.error);
      }
    });
  }

  onCheckboxChange(event:any,option:number){
    const selectedTypes:FormArray = this.trainerForm.get('trainingTypes') as FormArray;
   
    if(event.detail.checked){
      selectedTypes.push(this.formBuilder.control(option));
    }else{
      const index = selectedTypes.controls.findIndex(x => x.value === option);
      
      if (index > -1) {
        selectedTypes.removeAt(index);
      }
    }
    console.log(this.trainerForm.value.trainingTypes);
  }

  isChecked(id:number):boolean{
    return this.trainerForm.value.trainingTypes.includes(id);
  }
}
