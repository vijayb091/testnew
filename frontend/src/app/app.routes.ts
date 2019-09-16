import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PersonalPlanComponent } from './humanBase/personal-plan/personal-plan.component';
import { AppComponent } from './app.component';
import { HumanBaseComponent } from './humanBase/human-base.component';
import { ManagersComponent } from './manager/managers.component';
import { MainpanelComponent } from './common/mainpanel/mainpanel.component';
import { ProfiletimelineComponent } from './humanBase/profiletimeline/profiletimeline.component';
import { HumandetailComponent } from './humanBase/humandetail/humandetail.component';
import {AdvisorsComponent} from './advisor/advisors.component';
import { FormanagerComponent } from './humanBase/human-base-subcomponents/formanager/formanager.component';
import { CandidatComponent } from './humanBase/human-base-subcomponents/formanager/subcomponents/candidat/candidat.component';
import { DettaglioComponent } from './humanBase/human-base-subcomponents/formanager/subcomponents/dettaglio/dettaglio.component';
import { MyadvisorComponent } from './humanBase/human-base-subcomponents/formanager/subcomponents/myadvisor/myadvisor.component';
import { PersonalgroupComponent } from './humanBase/human-base-subcomponents/formanager/subcomponents/personalgroup/personalgroup.component';
import { UploadanddownloadComponent } from './humanBase/human-base-subcomponents/formanager/subcomponents/uploadanddownload/uploadanddownload.component';
import {MainComponent} from './communication/main/main.component';
import { PersonalLifeComponent } from './communication/main/components/personal-life/personal-life.component';
import { ThreeStageGraphComponent } from './communication/main/components/three-stage-graph/three-stage-graph.component';
import { BusinessLifeComponent } from './communication/main/components/business-life/business-life.component';
export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'graph', component: ThreeStageGraphComponent,

            },
            {
                path: 'personal-life', component: PersonalLifeComponent,

            },
            {
                path: 'business-life', component: BusinessLifeComponent,

            },
        ]
    },

    // {
    //     path: 'cv',
    //     component: MainComponent,

    // },
    {
        path: 'panel',
        component: MainpanelComponent,
        children: [
            {
                path: 'humanbase', component: HumanBaseComponent,

            },
            {
                path: 'managers', component: ManagersComponent
            },
            {
                path: 'profile', component: ProfiletimelineComponent
            },
            {
                path: 'humandetail', component: HumandetailComponent,
            },
            {
                path: 'advisor', component: AdvisorsComponent,
            },
            {
                path: 'manager', component: FormanagerComponent,

                children: [
                    {
                        path: '',
                        redirectTo: 'candidate',
                        pathMatch: 'full'
                    },
                    {
                        path: 'candidate', component: CandidatComponent,
                    },
                    {
                        path: 'dettaglio', component: DettaglioComponent,
                    },
                    {
                        path: 'my-advisor', component: MyadvisorComponent,
                    },
                    {
                        path: 'personal-group', component: PersonalgroupComponent,
                    },
                    {
                        path: 'upload-download', component: UploadanddownloadComponent,
                    },
                ]

            },

        ]
    }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
