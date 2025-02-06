import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  Chart,
  registerables,
} from 'chart.js';

import {
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

Chart.register(...registerables);

@Component({
  selector: 'app-employee-charts',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './employee-charts.component.html',
  styleUrls: ['./employee-charts.component.css'],
})
export class EmployeeChartsComponent implements OnInit {
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;

  private employeeApiUrl = 'https://hub.dummyapis.com/employee?noofRecords=50&idStarts=1001'; 
  private medicalDetailsApiUrl = 'https://motion-referring-programmer-long.trycloudflare.com/medicalDetails'; 

  chartLabels: any = {};

  constructor(private http: HttpClient, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadTranslations(); // Load translations for chart labels

    this.createCharts();
  }

  private loadTranslations(): void {
    this.translate.get([
      'charts.title',
      'charts.bar_chart',
      'charts.pie_chart',
      'charts.line_chart',
    ]).subscribe((translations) => {
      this.chartLabels = translations;
    });
  }

  private createCharts(): void {
    // Fetch employees for Bar Chart
    this.http.get<any[]>(this.employeeApiUrl).subscribe((employees) => {
      const ageData = this.groupByAge(employees);
      this.createBarChart(ageData.labels, ageData.data);
    });

    // Fetch medical details for Pie and Line Chart
    this.http.get<any[]>(this.medicalDetailsApiUrl).subscribe((medicalDetails) => {
      const salaryData = this.groupBySalary(medicalDetails);
      const claimData = this.groupByClaimMonth(medicalDetails);

      this.createPieChart(salaryData.labels, salaryData.data);
      this.createLineChart(claimData.labels, claimData.data);
    });
  }

  private groupByAge(employees: any[]): { labels: string[]; data: number[] } {
    const ageGroups = { '20-29': 0, '30-39': 0, '40-49': 0, '50+': 0 };

    employees.forEach((emp) => {
      if (emp.age >= 20 && emp.age <= 29) ageGroups['20-29']++;
      else if (emp.age >= 30 && emp.age <= 39) ageGroups['30-39']++;
      else if (emp.age >= 40 && emp.age <= 49) ageGroups['40-49']++;
      else if (emp.age >= 50) ageGroups['50+']++;
    });

    return { labels: Object.keys(ageGroups), data: Object.values(ageGroups) };
  }

  private groupBySalary(medicalDetails: any[]): { labels: string[]; data: number[] } {
    const salaryRanges = { '<50k': 0, '50k-100k': 0, '>100k': 0 };

    medicalDetails.forEach((detail) => {
      if (detail.salary < 50000) salaryRanges['<50k']++;
      else if (detail.salary >= 50000 && detail.salary <= 100000) salaryRanges['50k-100k']++;
      else salaryRanges['>100k']++;
    });

    return { labels: Object.keys(salaryRanges), data: Object.values(salaryRanges) };
  }

  private groupByClaimMonth(medicalDetails: any[]): { labels: string[]; data: number[] } {
    const monthlyClaims: { [month: string]: number } = {};
  
    const staticMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  
    medicalDetails.forEach((detail, index) => {
      const month = staticMonths[index % staticMonths.length];
      if (!monthlyClaims[month]) monthlyClaims[month] = 0;
      monthlyClaims[month] += detail.claimedAmount || 0;
    });
  
    const sortedMonths = staticMonths; 
  
    return {
      labels: sortedMonths,
      data: sortedMonths.map((month) => monthlyClaims[month]),
    };
  }

  private createBarChart(labels: string[], data: number[]): void {
    const ctx = this.barChart.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: this.chartLabels['charts.bar_chart'],  
              data,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { min: 0, max: 40, beginAtZero: true },
          },
        },
      });
    }
  }

  private createPieChart(labels: string[], data: number[]): void {
    const ctx = this.pieChart.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        },
        options: { responsive: true },
      });
    }
  }

  private createLineChart(labels: string[], data: number[]): void {
    const ctx = this.lineChart.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: this.chartLabels['charts.line_chart'],  
              data,
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => `₹${context.raw}`,
              },
            },
          },
        },
      });
    }
  }
}
