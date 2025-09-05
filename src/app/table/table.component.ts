import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataSharingService } from '../data-sharing.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface Company {
  no: string;
  name: string;
  shareholders: number;
  officers: number;
  docs: { inc: number; conf: number };
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  animations: [
    // Container fade
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ])
    ]),

    // Row enter/leave with stagger
    trigger('rowAnimation', [
      transition(':enter', [
        query(
          'tr',
          [
            style({ opacity: 0, transform: 'translateY(-10px) scale(0.98)' }),
            stagger(100, [
              animate(
                '400ms ease-out',
                style({ opacity: 1, transform: 'translateY(0) scale(1)' })
              )
            ])
          ],
          { optional: true }
        )
      ])
    ]),

  // Sort bounce (rows shift slightly)
  trigger('sortAnimation', [
      transition('* => *', [
        query('tr', [
          animate('200ms ease-in', style({ transform: 'translateX(10px)' })),
          animate('200ms ease-out', style({ transform: 'translateX(0)' }))
        ], { optional: true })
      ])
    ])
  ]


})

export class TableComponent {
  searchTerm = '';
  currentPage = 1;
  pageSize = 25;
  sortColumn: keyof Company | 'docs' = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  Math = Math; // ✅ fix for template use
  dataService = inject(DataSharingService);
  router = inject(Router);
  trackByCompanyNo: any;

  companies: Company[] = [
    { no: '00000052', name: 'Advanced Enterprises 3 Ltd', shareholders: 6, officers: 7, docs: { inc: 1, conf: 2 } },
    { no: '00000100', name: 'Advanced Enterprises 6 Ltd', shareholders: 8, officers: 4, docs: { inc: 1, conf: 3 } },
    { no: '00000020', name: 'Advanced Group 1 Ltd', shareholders: 7, officers: 4, docs: { inc: 1, conf: 3 } },
    { no: '00000004', name: 'Advanced Investments Ltd', shareholders: 4, officers: 6, docs: { inc: 1, conf: 1 } },
    { no: '00000116', name: 'Advanced Investments 7 Ltd', shareholders: 8, officers: 6, docs: { inc: 1, conf: 4 } },
    { no: '00000036', name: 'Advanced Partners 2 Ltd', shareholders: 6, officers: 3, docs: { inc: 1, conf: 2 } },
    { no: '00000084', name: 'Advanced Partners 5 Ltd', shareholders: 8, officers: 3, docs: { inc: 1, conf: 3 } },
    { no: '00000068', name: 'Advanced Services 4 Ltd', shareholders: 5, officers: 4, docs: { inc: 1, conf: 1 } },
    { no: '00000132', name: 'Advanced Services 8 Ltd', shareholders: 5, officers: 6, docs: { inc: 1, conf: 3 } },
    { no: '00000148', name: 'Advanced Technologies 9 Ltd', shareholders: 4, officers: 8, docs: { inc: 1, conf: 2 } },
    { no: '00000150', name: 'Alpha Corp 5 Ltd', shareholders: 9, officers: 5, docs: { inc: 1, conf: 2 } },

    // ✅ More data for testing
    { no: '00000151', name: 'Beta Holdings Ltd', shareholders: 10, officers: 6, docs: { inc: 2, conf: 1 } },
    { no: '00000152', name: 'Gamma Global Ltd', shareholders: 12, officers: 7, docs: { inc: 3, conf: 2 } },
    { no: '00000153', name: 'Delta Partners Ltd', shareholders: 6, officers: 8, docs: { inc: 1, conf: 3 } },
    { no: '00000154', name: 'Epsilon Innovations Ltd', shareholders: 15, officers: 9, docs: { inc: 2, conf: 2 } },
    { no: '00000155', name: 'Zeta Enterprises Ltd', shareholders: 11, officers: 7, docs: { inc: 1, conf: 4 } },
    { no: '00000156', name: 'Theta Solutions Ltd', shareholders: 13, officers: 5, docs: { inc: 2, conf: 3 } },
    { no: '00000157', name: 'Lambda Systems Ltd', shareholders: 9, officers: 10, docs: { inc: 3, conf: 2 } },
    { no: '00000158', name: 'Omega Capital Ltd', shareholders: 7, officers: 6, docs: { inc: 2, conf: 2 } },
    { no: '00000159', name: 'Phoenix Ventures Ltd', shareholders: 14, officers: 8, docs: { inc: 4, conf: 3 } },
    { no: '00000160', name: 'Orion Group Ltd', shareholders: 8, officers: 6, docs: { inc: 2, conf: 2 } },
    { no: '00000161', name: 'Pegasus Tech Ltd', shareholders: 10, officers: 9, docs: { inc: 3, conf: 1 } },
    { no: '00000162', name: 'Titan Industries Ltd', shareholders: 12, officers: 11, docs: { inc: 4, conf: 4 } },
    { no: '00000163', name: 'Nova Research Ltd', shareholders: 6, officers: 4, docs: { inc: 1, conf: 1 } },
    { no: '00000164', name: 'Apex Holdings Ltd', shareholders: 16, officers: 10, docs: { inc: 5, conf: 3 } },
    { no: '00000165', name: 'Zenith Finance Ltd', shareholders: 9, officers: 7, docs: { inc: 2, conf: 2 } },
    { no: '00000166', name: 'Aurora Digital Ltd', shareholders: 11, officers: 6, docs: { inc: 2, conf: 3 } },
    { no: '00000167', name: 'Starlight Media Ltd', shareholders: 13, officers: 8, docs: { inc: 3, conf: 2 } },
    { no: '00000168', name: 'Horizon Logistics Ltd', shareholders: 10, officers: 5, docs: { inc: 1, conf: 1 } },
  ];

  selectedCompany: any;


  get filteredCompanies() {
    let result = this.companies.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.no.includes(this.searchTerm)
    );

    // Sorting
    result = result.sort((a, b) => {
      let valA: any;
      let valB: any;

      if (this.sortColumn === 'docs') {
        valA = a.docs.inc + a.docs.conf;
        valB = b.docs.inc + b.docs.conf;
      } else {
        valA = a[this.sortColumn];
        valB = b[this.sortColumn];
      }

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }

  get pagedCompanies() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCompanies.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredCompanies.length / this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  sort(column: keyof Company | 'docs') {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }
  openCompanyDetails(company: any) {
    this.selectedCompany = company;
    this.dataService.selectedCompany = company;
    console.log(this.dataService.selectedCompany);
    this.router.navigate(['/company-details']);
  }
  onHeaderButtonClick(action: any) {
    // if (action === 'add') {
    //   this.addCompany();
    // } else if (action === 'export') {
    //   this.exportCompanies();
    // }
  }
}
