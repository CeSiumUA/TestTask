import {Component, OnInit} from '@angular/core';
import {BackendService} from '../services/backend.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AddPositionPopupComponent} from './add-position-popup.component';
import {AddCandidatePopupComponent} from './add-candidate-popup.component';

@Component({
  selector: 'app-employment-table',
  templateUrl: './employment-table.component.html',
  styleUrls: ['./employment-table.component.css']
})
export class EmploymentTableComponent implements OnInit {
  public displayedColumns = ['position', 'name', 'salary', 'assignDate', 'firedDate'];
  public employees = [];
  public pagesAmount = 0;
  public pageSize = 10;
  constructor(private backEndService: BackendService, private dialog: MatDialog) {
  }
  public addPosition(): void {
    const dialogRef = this.dialog.open(AddPositionPopupComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe();
  }
  public addCandidate(): void {
    const dialogRef = this.dialog.open(AddCandidatePopupComponent, {
      width: '260px'
    });
    dialogRef.afterClosed().subscribe();
  }
  ngOnInit() {
    this.backEndService.getEmployeeRecords(0, this.pageSize).subscribe(x => {
      this.pagesAmount = Math.ceil(x.totalAmount / this.pageSize);
      this.employees = x.employees;
    });
  }
}
