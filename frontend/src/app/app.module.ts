import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/layout/header/header.component';
import { LeftnavbarComponent } from './common/layout/leftnavbar/leftnavbar.component';
import { RightnavbarComponent } from './common/layout/rightnavbar/rightnavbar.component';
import {CategoryDetailsComponent} from './common/category-details/category-details.component';
import {PersonalPlanComponent} from './humanBase/personal-plan/personal-plan.component';
import {CategoriesService} from './common/northwind.service';
import {ProductsService} from './common/northwind.service';
import {AppRoutes} from './app.routes';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardStripsComponent } from './common/dashboard-strips/dashboard-strips.component';
import { HumanBaseComponent } from './humanBase/human-base.component';
import { ManagersComponent } from './manager/managers.component';
import { MainComponent } from './communication/main/main.component';
import { MainpanelComponent } from './common/mainpanel/mainpanel.component';
import { CardComponent } from './common/card/card.component';
import { ProfiletimelineComponent } from './humanBase/profiletimeline/profiletimeline.component';
import { AdvisorsComponent } from './advisor/advisors.component';
import { HumandetailComponent } from './humanBase/humandetail/humandetail.component';
import {DataService} from './communication/services/data.service';
import { ChartsModule } from '@progress/kendo-angular-charts';
import {MatMenuModule} from '@angular/material/menu';
import { FormanagerComponent } from './humanBase/human-base-subcomponents/formanager/formanager.component';
import {CardManagerComponent} from './common/card-manager/card-manager.component';
import {ForadvisorComponent} from './humanBase/human-base-subcomponents/foradvisor/foradvisor.component';
import { CandidatComponent } from './humanBase/human-base-subcomponents/formanager/subcomponents/candidat/candidat.component';
import { MyadvisorComponent } from './humanBase/human-base-subcomponents/formanager/subcomponents/myadvisor/myadvisor.component';
import { UploadanddownloadComponent } from './humanBase/human-base-subcomponents/formanager/subcomponents/uploadanddownload/uploadanddownload.component';
import { PersonalgroupComponent } from './humanBase/human-base-subcomponents/formanager/subcomponents/personalgroup/personalgroup.component';
import { DettaglioComponent } from './humanBase/human-base-subcomponents/formanager/subcomponents/dettaglio/dettaglio.component';
import { PersonalLifeComponent } from './communication/main/components/personal-life/personal-life.component';
import { ThreeStageGraphComponent } from './communication/main/components/three-stage-graph/three-stage-graph.component';
import { BusinessLifeComponent } from './communication/main/components/business-life/business-life.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import * as $ from 'jquery';
import { YearService } from './helper/year.service';
import { JqueryService } from './helper/jquery.service';




import {MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatInputModule,
  MatSidenavModule} from '@angular/material';
import { AdvisorCustomerComponent } from './advisor/advisor-customer/advisor-customer.component';
import { AdvisorProspectComponent } from './advisor/advisor-prospect/advisor-prospect.component';
@NgModule({
  declarations: [
    AppComponent,
    PersonalPlanComponent,
    CategoryDetailsComponent,
    HeaderComponent,
    LeftnavbarComponent,
    RightnavbarComponent,
    DashboardStripsComponent,
    HumanBaseComponent,
    ManagersComponent,
    MainComponent,
    MainpanelComponent,
    CardComponent,
    ProfiletimelineComponent,
    AdvisorsComponent,
    HumandetailComponent,
    FormanagerComponent,
    CardManagerComponent,
    ForadvisorComponent,
    CandidatComponent,
    MyadvisorComponent,
    UploadanddownloadComponent,
    PersonalgroupComponent,
    DettaglioComponent,
    PersonalLifeComponent,
    ThreeStageGraphComponent,
    BusinessLifeComponent,
    AdvisorCustomerComponent,
    AdvisorProspectComponent,

  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    HttpModule,
    MatCardModule,
    MatMenuModule,
    GridModule,
    HttpClientModule,
     AppRoutes,
     ButtonsModule,
     TabStripModule,
     BrowserAnimationsModule,
     ChartsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatInputModule,
    FlexLayoutModule

  ],
  providers: [CategoriesService, ProductsService, DataService, JqueryService, YearService],
  bootstrap: [AppComponent]
})
export class AppModule { }
