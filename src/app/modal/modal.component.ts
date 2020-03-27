import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Task} from '../task';

interface IModalData {
    description: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {

  description: string

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModalData) {}

    onAcceptClick(): void {
      this.dialogRef.close(this.data);
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}
