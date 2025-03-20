import { Component, OnInit, signal } from '@angular/core'; 
import { IonIcon,IonTabButton,IonTabBar,IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline,personOutline,peopleOutline,calendarOutline,home,person,people,calendar} from "ionicons/icons";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [ IonIcon,IonTabButton,IonTabBar,IonTabs]
})
export class TabsPage implements OnInit {
  currentTab=signal<string>('members');

  constructor() {
    addIcons({homeOutline, personOutline,peopleOutline,calendarOutline,home,person,people,calendar});
   }

  ngOnInit() {
  }

  getCurrentTab(event:{tab:string}){
    console.log(event);
    this.currentTab.set(event.tab);
  }

}
