import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BackendService} from '../services/backend.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-add-candidate-popup',
  template: '<h1 mat-dialog-title>Новый сотрудник</h1>' +
    '<div *ngIf="!requestProcessing">' +
      '<div mat-dialog-content>' +
        '<mat-form-field>' +
          '<mat-label>Фамилия</mat-label>' +
          '<input matInput [(ngModel)]="firstname" (ngModelChange)="firstNameChanged()" [matAutocomplete]="auto1">' +
          '<mat-autocomplete #auto1="matAutocomplete">' +
          '<mat-option *ngFor="let fstnm of firstNamesList" [value]="fstnm">' +
            '{{fstnm}}' +
          '</mat-option>' +
        '</mat-autocomplete>' +
        '</mat-form-field>' +
        '<mat-form-field>' +
          '<mat-label>Имя</mat-label>' +
            '<input matInput [(ngModel)]="lastname" (ngModelChange)="lastNameChanged()" [matAutocomplete]="auto2">' +
            '<mat-autocomplete #auto2="matAutocomplete">' +
            '<mat-option *ngFor="let lstnm of lastNamesList" [value]="lstnm">' +
            '{{lstnm}}' +
            '</mat-option>' +
            '</mat-autocomplete>' +
        '</mat-form-field>' +
        '<mat-form-field>' +
          '<mat-label>Должность</mat-label>' +
          '<mat-select [(value)]="position">' +
            '<mat-option *ngFor="let pos of positions" [value]="pos">{{pos.positionName}}</mat-option>' +
          '</mat-select>' +
        '</mat-form-field>' +
        '<mat-form-field style="width: 180px">' +
          '<mat-label>Зарплата</mat-label>' +
          '<input matInput type="number" [(ngModel)]="salary" />' +
          '<span matPrefix>$&nbsp;</span>' +
        '</mat-form-field>' +
        '<mat-form-field style="width: 180px">' +
          '<mat-label>Нанят</mat-label>' +
          '<input name="assignDateInput" matInput [matDatepicker]="assignPicker" [(ngModel)]="assignDate" />' +
          '<mat-datepicker-toggle matSuffix [for]="assignPicker"></mat-datepicker-toggle>' +
          '<mat-datepicker #assignPicker></mat-datepicker>' +
        '</mat-form-field>' +
        '<mat-form-field style="width: 180px">' +
          '<mat-label>Уволен</mat-label>' +
          '<input name="firedDateInput" matInput [matDatepicker]="firedPicker" [(ngModel)]="firedDate" />' +
          '<mat-datepicker-toggle matSuffix [for]="firedPicker"></mat-datepicker-toggle>' +
          '<mat-datepicker #firedPicker></mat-datepicker>' +
        '</mat-form-field>' +
      '</div>' +
    '<div mat-dialog-actions>' +
    '<button mat-button (click)="onNoClick()">Закрыть</button>' +
    '<button mat-button (click)="onAddPosition()">Добавить</button>' +
    '</div>' +
    '</div>' +
    '<div *ngIf="requestProcessing">' +
    '<mat-spinner></mat-spinner>' +
    '</div>',
  styles: []
})
export class AddCandidatePopupComponent implements OnInit {
  public position: any;
  public firstNamesList = [];
  public lastNamesList = [];
  public positions = [];
  public requestProcessing = false;
  public errorMessage: string;
  public firstname: string;
  public lastname: string;
  public salary: number;
  public formattedSalary: string;
  public assignDate: any;
  public firedDate: any;
  constructor(public dialogRef: MatDialogRef<AddCandidatePopupComponent>, private currencyPipe: CurrencyPipe, public backEndService: BackendService) {
  }
  onAddPosition(): void {
    this.requestProcessing = true;
    const empl = {
      Position: this.position,
      Employee: {
        FirstName: this.firstname,
        LastName: this.lastname,
      },
      Salary: this.salary,
      AssignDate: this.assignDate,
      FiredDate: this.firedDate
    };
    this.backEndService.addEmployee(empl).subscribe(x => {
      this.requestProcessing = false;
      this.onNoClick();
    }, error => {
      console.log(error);
    });
  }
  firstNameChanged(): void {
    if (this.firstname.length >= 2) {
      this.backEndService.getFirstName(this.firstname).subscribe(x => {
        this.firstNamesList = x;
      });
    }
  }
  lastNameChanged(): void {
    if (this.lastname.length >= 2) {
      this.backEndService.getLastName(this.lastname).subscribe(x => {
        this.lastNamesList = x;
      });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.requestProcessing = true;
    this.backEndService.getPositions().subscribe(x => {
      this.requestProcessing = false;
      this.positions = x;
    }, error => console.warn(error));
  }
}
