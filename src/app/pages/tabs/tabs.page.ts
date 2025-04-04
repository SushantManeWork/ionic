import { Component, OnInit, signal } from '@angular/core'; 
import { IonIcon,IonTabButton,IonTabBar,IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline,personOutline,calendarOutline,home,person,calendar} from "ionicons/icons";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [ IonIcon,IonTabButton,IonTabBar,IonTabs]
})
export class TabsPage implements OnInit {
  public currentTab=signal<string>('members');

  constructor() {
    addIcons({homeOutline, personOutline,calendarOutline,home,person,calendar});
   }

  ngOnInit() {
  }

  getCurrentTab(event:{tab:string}){
    console.log(event);
    this.currentTab.set(event.tab);
  }
}
