import { Component, inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';


interface Person {
  id: number;
  name: string;
  role?: string;
  shares?: number;
  extractedFrom?: string;
  source?: string;
  isAlsoOfficer?: boolean;
  isAlsoShareholder?: boolean;
}

interface CompanyDetails {
  id: string;
  name: string;
  shareholders: Person[];
  officers: Person[];
}

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,HeaderComponent],
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
   animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideInDown', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('staggerIn', [
      transition(':enter', [
        query('.record', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger('100ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('listItemAnimation', [
      transition(':enter', [
        animate('300ms ease-out', keyframes([
          style({ opacity: 0, transform: 'translateX(-20px)', offset: 0 }),
          style({ opacity: 0.5, transform: 'translateX(-10px)', offset: 0.5 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1 })
        ]))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(20px)' }))
      ])
    ])
  ]
})
export class CompanyDetailsComponent implements OnInit, OnChanges {
  company!: CompanyDetails;
  dataService = inject(DataSharingService);
  router = inject(Router);
  overlapCount: number = 0;
  officerSearch: string = '';
  shareholderSearch: string = '';
  trackByOfficer = (index: number, officer: Person) => officer.id;
  trackByShareholder = (index: number, shareholder: Person) => shareholder.id;
  constructor() {
    // Load selected company from service
    this.company = this.dataService.selectedCompany ?? {
      id: '1',
      name: 'Default Company',
      shareholders: [],
      officers: []
    };
  }

  ngOnInit(): void {
    // Mock data (replace with API call later)
    this.company.shareholders = [
      { id: 1, name: 'John Smith', shares: 500, isAlsoOfficer: true },
      { id: 2, name: 'Alice Johnson', shares: 300, isAlsoOfficer: false }
    ];

    this.company.officers = [
      {
        id: 1,
        name: 'Robert Brown',
        role: 'CEO',
        isAlsoShareholder: true,
        source: 'Company Registry'
      },
      {
        id: 2,
        name: 'Emma Wilson',
        role: 'CFO',
        isAlsoShareholder: false,
        source: 'Public Filing'
      },
      {
        id: 3,
        name: 'Daniel Lee',
        role: 'CTO',
        isAlsoShareholder: true,
        source: 'Annual Report'
      }
    ];

    this.updateOverlapCount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['company']) {
      this.updateOverlapCount();
    }
  }

  private updateOverlapCount(): void {
    if (this.company?.shareholders) {
      this.overlapCount = this.company.shareholders.filter(s => s.isAlsoOfficer).length;
    }
  }
  handleHeaderAction(action: string) {
  if (action === 'Officer-Linked View') {
    // navigate back to officer-linked companies
    this.router.navigate(['/office-linked-companies']);
  }
}

}
