import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BackendService} from '../services/backend.service';
import {CurrencyPipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ValueConverter} from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-add-candidate-popup',
  template: '<h1 mat-dialog-title>Новый сотрудник</h1>' +
    '<div *ngIf="!requestProcessing">' +
    '<form [formGroup]="formGroup" (ngSubmit)="onAddPosition()">' +
      '<div mat-dialog-content>' +
        '<div formGroupName="employee">' +
        '<mat-form-field>' +
          '<mat-label>Фамилия</mat-label>' +
          '<input matInput [matAutocomplete]="auto1" name="fName" formControlName="firstName" required>' +
          '<mat-autocomplete #auto1="matAutocomplete">' +
          '<mat-option *ngFor="let fstnm of firstNamesList" [value]="fstnm">' +
            '{{fstnm}}' +
          '</mat-option>' +
        '</mat-autocomplete>' +
        '</mat-form-field>' +
          '<mat-form-field>' +
            '<mat-label>Имя</mat-label>' +
              '<input matInput [matAutocomplete]="auto2" name="lName" formControlName="lastName" required>' +
              '<mat-autocomplete #auto2="matAutocomplete">' +
              '<mat-option *ngFor="let lstnm of lastNamesList" [value]="lstnm">' +
              '{{lstnm}}' +
              '</mat-option>' +
              '</mat-autocomplete>' +
          '</mat-form-field>' +
        '</div>' +
        '<mat-form-field>' +
          '<mat-label>Должность</mat-label>' +
          '<mat-select formControlName="position" required>' +
            '<mat-option *ngFor="let pos of positions" [value]="pos">{{pos.positionName}}</mat-option>' +
          '</mat-select>' +
        '</mat-form-field>' +
        '<mat-form-field style="width: 180px">' +
          '<mat-label>Зарплата</mat-label>' +
          '<input matInput type="number" formControlName="salary" required/>' +
          '<span matPrefix>$&nbsp;</span>' +
        '</mat-form-field>' +
        '<mat-form-field style="width: 180px">' +
          '<mat-label>Нанят</mat-label>' +
          '<input name="assignDateInput" matInput [matDatepicker]="assignPicker" formControlName="assignDate" required/>' +
          '<mat-datepicker-toggle matSuffix [for]="assignPicker"></mat-datepicker-toggle>' +
          '<mat-datepicker #assignPicker></mat-datepicker>' +
        '</mat-form-field>' +
        '<mat-form-field style="width: 180px">' +
          '<mat-label>Уволен</mat-label>' +
          '<input name="firedDateInput" matInput [matDatepicker]="firedPicker" formControlName="firedDate" />' +
          '<mat-datepicker-toggle matSuffix [for]="firedPicker"></mat-datepicker-toggle>' +
          '<mat-datepicker #firedPicker></mat-datepicker>' +
        '</mat-form-field>' +
      '</div>' +
    '<div mat-dialog-actions>' +
    '<button mat-button type="button" (click)="onNoClick()">Закрыть</button>' +
    '<button mat-button type="submit" [disabled]="formGroup.invalid">Добавить</button>' +
    '</div>' +
    '</form>' +
    '</div>' +
    '<div *ngIf="requestProcessing">' +
    '<mat-spinner></mat-spinner>' +
    '</div>',
  styles: []
})
export class AddCandidatePopupComponent implements OnInit {
  public firstNamesList = [];
  public lastNamesList = [];
  public positions = [];
  public requestProcessing = false;
  public errorMessage: string;
  public formGroup = this.fb.group({
    employee: this.fb.group({
      firstName: ['', ],
      lastName: [''],
    }),
    position: null,
    salary: null,
    assignDate: null,
    firedDate: null
  });
  constructor(public dialogRef: MatDialogRef<AddCandidatePopupComponent>,
              private currencyPipe: CurrencyPipe,
              public backEndService: BackendService,
              public fb: FormBuilder) {
    this.formGroup.controls.employee.controls.firstName.valueChanges.subscribe(x => this.firstNameChanged(x));
    this.formGroup.controls.employee.controls.lastName.valueChanges.subscribe(x => this.lastNameChanged(x));
  }
  onAddPosition(): void {
    this.requestProcessing = true;
    this.backEndService.addEmployee(this.formGroup.getRawValue()).subscribe(x => {
      this.requestProcessing = false;
      this.onNoClick();
    }, error => {
      this.requestProcessing = false;
    });
  }
  firstNameChanged(event: any): void {
    if (event.length >= 2) {
      this.backEndService.getFirstName(event).subscribe(x => {
        this.firstNamesList = x;
      });
    }
  }
  lastNameChanged(event: any): void {
    if (event.length >= 2) {
      this.backEndService.getLastName(event).subscribe(x => {
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
