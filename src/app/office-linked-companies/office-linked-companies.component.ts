import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

interface Company {
  no: string;
  name: string;
  shareholders: number;
}

interface Person {
  id: number;
  name: string;
  role?: string;
  extractedFrom?: string;
}

@Component({
  selector: 'app-office-linked-companies',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,HeaderComponent],
  templateUrl: './office-linked-companies.component.html',
  styleUrls: ['./office-linked-companies.component.scss'],
   animations: [
    // Animate list items (fade + slide)
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-10px)' }),
            stagger(100, [animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))])
          ],
          { optional: true }
        )
      ])
    ]),

    // Animate selected card highlight
    trigger('cardSelection', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class OfficeLinkedCompaniesComponent implements OnInit {
  searchTerm: string = '';
  company = { name: 'Advanced Corp 3 Ltd' };

  officers: Person[] = [
    { id: 1, name: 'John Smith', role: 'Director' },
    { id: 2, name: 'Martin Clarke', role: 'CFO' },
    { id: 3, name: 'Michael Brown', role: 'CEO' }
  ];

  linkedCompanies: Company[] = [
    { no: 'REL52000', name: 'Related Company 1 Ltd', shareholders: 8 },
    { no: 'REL52009', name: 'Related Company 10 Ltd', shareholders: 9 }
  ];

  shareholders: Person[] = [
    { id: 4, name: 'Anna Smith', extractedFrom: 'Page 1, Section C' },
    { id: 5, name: 'Chris Johnson', extractedFrom: 'Page 5, Section D' },
    { id: 6, name: 'Emma Wilson', extractedFrom: 'Page 2, Section B' }
  ];

  filteredOfficers: Person[] = [];
  selectedOfficer: Person | null = null;
  selectedCompany: Company | null = null;
  router = inject(Router);
  ngOnInit() {
    this.filteredOfficers = [...this.officers];
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredOfficers = this.officers.filter(o =>
      o.name.toLowerCase().includes(term) ||
      (o.role && o.role.toLowerCase().includes(term))
    );
  }

  selectOfficer(officer: Person) {
    this.selectedOfficer = officer;
    this.selectedCompany = null;
  }

  selectCompany(company: Company) {
    this.selectedCompany = company;
  }

  getLinkedCompaniesCount(officer: Person): number {
    if (officer.name === 'John Smith') return 55;
    if (officer.name === 'Martin Clarke') return 61;
    return 0;
  }
  onHeaderButtonClick(action: string) {
  if (action === 'back') {
    this.router.navigate(['/company-details']);
  }
}

}


