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
  public loginform: FormGroup;
  public regform: FormGroup;
  public showSpeciality: boolean = false;
  public trainingTypes = signal<ITrainingType[] | null>(null);

  //service
  private trainingTypeService=inject(TrainingTypeService);
  private trainerService=inject(TrainerService);

  constructor(private formBuilder:FormBuilder, private router:Router) {
    addIcons({personOutline,locationOutline,callOutline,mailOutline,lockClosedOutline,person,caretDownOutline,caretUpOutline,happyOutline});

    this.regform = this.formBuilder.group({
      trainerId: [0],
      name : ['',[Validators.required]],
      password: ['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$")]],
      address: ['',[Validators.required]],
      phone: ['',[Validators.required,Validators.pattern("^[0-9]{10}$")]],
      gender: ['',[Validators.required]],
      photo: ['',[Validators.required]],
      trainingTypes:formBuilder.array([]),
    })

    this.loginform = this.formBuilder.group({
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

  get errorControl() {
    return this.regform?.controls;
  };

  signup() {
    if (this.regform.valid) {
      const requestData = this.regform.value;
      console.log("Request Payload:", requestData);  
      this.trainerService.createTrainer(requestData).subscribe({
        next: data => {
          console.log("Account Created:", data);
          this.login=!this.login;
        },
        error: error => {
          console.error("Error creating account:", error.error.message);
        }
      });
    } else {
      console.log("Form is invalid");
      this.regform.markAllAsTouched();
    }
  }

  loginTrainer() {
    if (this.loginform.valid) {
      const requestData = this.loginform.value;
      console.log("Request Payload:", requestData);  
      this.trainerService.login(requestData).subscribe({
        next: data => {

          if (data!=null) {
            sessionStorage.setItem("trainerId", data.toString());
            this.trainerService.updateUsers(data).subscribe({
              next: data => { console.log("User updated:", data); 
              },
              error: error => { console.error("Error updating user:", error.error.message); }
            }); 
          }
          this.router.navigate(['/tabs']);
        },
        error: error => {
          console.error("Error creating account:", error.error.message);
        }
      });
    } else {
      console.log("Form is invalid");
      this.loginform.markAllAsTouched();
    }
  }

  getTrainingTypes(){
    this.trainingTypeService.getTrainingTypes().subscribe({
      next: (data) => {this.trainingTypes.set(data);
        console.log(data);
      },
      error: (error) => console.error(error)
    });
  }

  Accountlogin(){
    this.login = !this.login;
  }

  onCheckboxChange(event:any,option:number){
    const selectedTypes:FormArray = this.regform.get('trainingTypes') as FormArray;

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
    return this.regform.value.trainingTypes.includes(id);
  }
}
