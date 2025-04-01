import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonTitle, IonCard, IonCardHeader, IonCardContent, IonItem, IonButton, IonLabel,
   IonSelectOption, IonSelect, IonInput, IonCheckbox ,IonIcon,IonText} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, locationOutline, callOutline, mailOutline, lockClosedOutline, caretDownOutline,
   caretUpOutline, happyOutline, 
   person} from 'ionicons/icons';
import { TrainingTypeService } from 'src/app/services/trainingType/training-type.service';
import { ITrainingType } from 'src/app/interface/ITrainingType';
import { TrainerService } from 'src/app/services/trainer/trainer.service';
import { Router } from '@angular/router';
import { AlertController } from "@ionic/angular";

//service

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, FormsModule, ReactiveFormsModule,IonSelect, IonLabel, IonText, IonItem, 
    IonCardHeader, IonIcon, IonCard, IonContent, IonTitle,  CommonModule, FormsModule,
    IonCardContent,ReactiveFormsModule,IonButton,IonSelectOption,IonCheckbox]
})
export class LoginPage implements OnInit {
  public login: boolean = false;
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public showSpeciality: boolean = false;
  public trainingTypes = signal<ITrainingType[] | null>(null);

  //service
  private trainingTypeService=inject(TrainingTypeService);
  private trainerService=inject(TrainerService);

  constructor(private formBuilder:FormBuilder, private router:Router,private alertController: AlertController) {
    addIcons({callOutline, caretDownOutline, caretUpOutline, happyOutline, locationOutline, 
      lockClosedOutline, mailOutline, person, personOutline});

    this.registerForm = this.formBuilder.group({
      trainerId: [0],
      name : ['',[Validators.required]],
      password: ['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$")]],
      address: ['',[Validators.required]],
      phone: ['',[Validators.required,Validators.pattern("^[0-9]{10}$")]],
      gender: ['',[Validators.required]],
      photo: ['',[Validators.required]],
      trainingTypes:formBuilder.array([]),
    })

    this.loginForm = this.formBuilder.group({
      phone: ['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$")]]
    })
   }

  ngOnInit() {
    this.getTrainingTypes();
    var trainerId=sessionStorage.getItem("trainerId");

    if(trainerId!=null){
      this.trainerService.updateUsers(parseInt(trainerId))
      this.router.navigate(['/tabs']);
    }
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
    return this.registerForm?.controls;
  };

  signup() {
    if (this.registerForm.valid) {
      const requestData = this.registerForm.value; 
      this.trainerService.createTrainer(requestData).subscribe({
        next: data => {
          this.showErrorAlert("Account Created");
          this.login=!this.login;
        },
        error: error => {
          this.showErrorAlert(error.error);
        }
      });
    } else {
      this.showErrorAlert("Form is invalid");
      this.registerForm.markAllAsTouched();
    }
  }

  loginTrainer() {
    if (this.loginForm.valid) {
      const requestData = this.loginForm.value;
      console.log("Request Payload:", requestData);  
      this.trainerService.login(requestData).subscribe({
        next: data => {

          if (data!=null) {
            sessionStorage.setItem("trainerId", data.toString());
          }
          this.router.navigate(['/tabs']);
        },
        error: error => {
          this.showErrorAlert(error.error)
        }
      });
    } else {
      this.showErrorAlert("Form is invalid");
      this.loginForm.markAllAsTouched();
    }
  }

  getTrainingTypes(){
    this.trainingTypeService.getTrainingTypes().subscribe({
      next: (data) => {this.trainingTypes.set(data);
        console.log(data);
      }
    });
  }

  Accountlogin(){
    this.login = !this.login;
  }

  onCheckboxChange(event:any,option:number){
    const selectedTypes:FormArray = this.registerForm.get('trainingTypes') as FormArray;

    if(event.detail.checked){
      selectedTypes.push(this.formBuilder.control(option));
    }else{
      const index = selectedTypes.controls.findIndex(x => x.value === option);

      if (index > -1) {
        selectedTypes.removeAt(index);
      }
    }
  }
    
  isChecked(id:number):boolean{
    return this.registerForm.value.trainingTypes.includes(id);
  }
}
