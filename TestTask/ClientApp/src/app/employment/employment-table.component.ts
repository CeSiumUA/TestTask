import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-employment-table',
  templateUrl: './employment-table.component.html',
  styleUrls: ['./employment-table.component.css']
})
export class EmploymentTableComponent implements OnInit {
  public displayedColumns = ['position', 'name', 'salary', 'assignDate', 'firedDate'];
  public employees = [];
  constructor() {
  }
  ngOnInit() {
  }
}
