import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BackendService} from '../services/backend.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-position-popup',
  template: '<h1 mat-dialog-title>Новая должность</h1>' +
    '<div *ngIf="!requestProcessing">' +
      '<div mat-dialog-content>' +
        '<mat-form-field>' +
          '<mat-label>Должность</mat-label>' +
          '<input matInput [(ngModel)]="position" required>' +
          '<mat-hint align="start"><span style="color: red;">{{errorMessage}}</span></mat-hint>' +
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
export class AddPositionPopupComponent {
  public position: string;
  public requestProcessing = false;
  public errorMessage: string;
  constructor(public dialogRef: MatDialogRef<AddPositionPopupComponent>, public backEndService: BackendService) {
  }
  onAddPosition(): void {
    this.requestProcessing = true;
    this.backEndService.addPosition(this.position).subscribe(x => {
      this.requestProcessing = false;
      this.onNoClick();
    }, error => {
      this.requestProcessing = false;
      this.errorMessage = 'Позиция уже существует!';
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
