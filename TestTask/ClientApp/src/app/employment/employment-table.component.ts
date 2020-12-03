import {Component, OnInit} from '@angular/core';
import {BackendService} from '../services/backend.service';
import {MatDialog, MatDialogRef, PageEvent} from '@angular/material';
import {AddPositionPopupComponent} from './add-position-popup.component';
import {AddCandidatePopupComponent} from './add-candidate-popup.component';

@Component({
  selector: 'app-employment-table',
  templateUrl: './employment-table.component.html',
  styleUrls: ['./employment-table.component.css']
})
export class EmploymentTableComponent implements OnInit {
  public displayedColumns = ['id', 'position', 'name', 'salary', 'assignDate', 'firedDate'];
  public employees = [];
  public pagesAmount = 0;
  public pageSize = 10;
  public availablePageSizes;
  public getWorkingOnly = false;
  constructor(private backEndService: BackendService, private dialog: MatDialog) {
  }
  public addPosition(): void {
    const dialogRef = this.dialog.open(AddPositionPopupComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe();
  }
  public paginationChanged(event: any): void {
    this.pageSize = event.pageSize;
    this.getRecords(event.pageIndex);
  }
  public addCandidate(): void {
    const dialogRef = this.dialog.open(AddCandidatePopupComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(x => {
      this.getRecords();
    });
  }
  public getRecords(skip = 0): void {
    let subscription = null;
    if (this.getWorkingOnly) {
      subscription = this.backEndService.getWorkingEmployeeRecords(skip * this.pageSize, this.pageSize);
    } else {
      subscription = this.backEndService.getEmployeeRecords(skip * this.pageSize, this.pageSize);
    }
    subscription.subscribe(x => {
      this.pagesAmount = x.totalAmount; // Math.ceil(x.totalAmount / this.pageSize);
      this.availablePageSizes = [5, 10, 25, 100, this.pagesAmount];
      this.employees = x.employees;
    });
  }
  ngOnInit() {
    this.getRecords();
  }
}
