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
          '<input matInput [(ngModel)]="firstname">' +
        '</mat-form-field>' +
        '<mat-form-field>' +
          '<mat-label>Имя</mat-label>' +
          '<input matInput [(ngModel)]="lastname">' +
        '</mat-form-field>' +
        '<mat-form-field>' +
          '<mat-label>Должность</mat-label>' +
          '<mat-select [(value)]="position">' +
            '<mat-option *ngFor="let pos of positions" [value]="pos">{{pos.positionName}}</mat-option>' +
          '</mat-select>' +
        '</mat-form-field>' +
        '<mat-form-field>' +
          '<mat-label>Зарплата</mat-label>' +
          '<input matInput type="text" (blur)="transformAmount($event)" (click)="transformNormal($event)" [(ngModel)]="salary" />' +
        '</mat-form-field>' +
        '<mat-form-field>' +
          '<mat-label>Нанят</mat-label>' +
          '<input matInput [matDatepicker]="assignPicker" />' +
          '<mat-datepicker-toggle matSuffix [for]="assignPicker"></mat-datepicker-toggle>' +
          '<mat-datepicker #picker></mat-datepicker>' +
        '</mat-form-field>' +
        '<mat-form-field>' +
          '<mat-label>Уволен</mat-label>' +
          '<input matInput [matDatepicker]="firedPicker" />' +
          '<mat-datepicker-toggle matSuffix [for]="firedPicker"></mat-datepicker-toggle>' +
          '<mat-datepicker #picker></mat-datepicker>' +
        '</mat-form-field>' +
      '</div>' +
    '<div mat-dialog-actions>' +
    '<button mat-button (click)="onNoClick()">Закрыть</button>' +
    '<button mat-button (click)="onAddPosition()">Добавить</button>' +
    '</div>' +
    '</div>' +
    '<div *ngIf="requestProcessing">' +
    '<mat-spinner></mat-spinner>' +
    '</div>'
})
export class AddCandidatePopupComponent implements OnInit{
  public position: any;
  public positions = [];
  public requestProcessing = false;
  public errorMessage: string;
  public firstname: string;
  public lastname: string;
  public salary: number;
  public formattedSalary: string;
  constructor(public dialogRef: MatDialogRef<AddCandidatePopupComponent>, private currencyPipe: CurrencyPipe, public backEndService: BackendService) {
  }
  onAddPosition(): void {
    // this.requestProcessing = true;
    console.log(this.salary);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  transformAmount(element) {
    this.formattedSalary = this.currencyPipe.transform(this.salary, '$');
    element.target.value = this.formattedSalary;
  }
  transformNormal(element) {
    if (this.salary !== undefined) {
      element.target.value = this.salary;
    }
  }
  ngOnInit() {
    this.requestProcessing = true;
    this.backEndService.getPositions().subscribe(x => {
      this.requestProcessing = false;
      this.positions = x;
    }, error => console.warn(error));
  }
}
