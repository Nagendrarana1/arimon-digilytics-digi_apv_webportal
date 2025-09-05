import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { OfficeLinkedCompaniesComponent } from './office-linked-companies/office-linked-companies.component';
import { ShareholderDocumentValidationComponent } from './shareholder-document-validation-component/shareholder-document-validation.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home-page',
        pathMatch: 'full'
    },
  {
    path: 'home-page',
    component: HomeComponent
  },
  {
    path: 'table',
    component: TableComponent
  },
  {
    path :'company-details',
    component: CompanyDetailsComponent
  },
  {
    path: 'office-linked-companies',
    component: OfficeLinkedCompaniesComponent
  },
  {
    path: 'shareholder-document-validation',
    component:ShareholderDocumentValidationComponent
  }
];
