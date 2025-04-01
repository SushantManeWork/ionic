import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage),
    children:[
      {
        path:'',
        redirectTo:'/tabs/members',
        pathMatch:"full"
      },
      {
        path: 'members',
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/tabs/members/members.page').then( m => m.MembersPage)
          },
          {
            path: 'add',
            loadComponent: () => import('./pages/tabs/add-member/add-member.page').then( m => m.AddMemberPage)
          },
          {
            path: 'renew/:id',
            loadComponent: () => import('./pages/tabs/renew-member/renew-member.page').then( m => m.RenewMemberPage)
          },
          {
            path: 'update/:id',
            loadComponent: () => import('./pages/tabs/update-member/update-member.page').then( m => m.UpdateMemberPage)
          },
          {
            path: ':id',
            loadComponent: () => import('./pages/tabs/member-details/member-details.page').then( m => m.MemberDetailsPage)
          }
        ]
      },
      {
        path: 'routine',
        loadComponent: () => import('./pages/tabs/routine/routine.page').then( m => m.RoutinePage)
      },
      {
        path: 'account',
        children:[
          {
            path: '',
            loadComponent: () => import('./pages/tabs/account/account.page').then( m => m.AccountPage),
          },
          {
            path: 'update',
            loadComponent: () => import('./pages/tabs/update-trainer/update-trainer.page').then( m => m.UpdateTrainerPage)
          }
        ]
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  }
];
