import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';

import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss'],
})
export class DialogCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogCategoryComponent>
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      id: ['', Validators.required],
      categoryName: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.categoryForm.controls['id'].setValue(this.editData.id);
      this.categoryForm.controls['categoryName'].setValue(
        this.editData.categoryName
      );

    }
  }

  addCategory() {
    if (!this.editData) {
      if (this.categoryForm.valid) {
        this.categoryService.postCategory(this.categoryForm.value).subscribe({
          next: (response) => {
            alert('category added succesfully!!');
            this.categoryForm.reset();
            this.dialogRef.close('save');
            console.log(this.categoryForm.value.id, this.categoryForm.value.categoryName);
            
          },
          error: () => {
            alert('error');
          },
        });
      }
    } else {
      this.updateCategory();
    }
  }

  updateCategory() {
    this.categoryService
      .putCategory(this.categoryForm.value, this.editData.id)
      .subscribe({
        next: (response) => {
          alert('category updated');
          this.categoryForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert('error');
        },
      });
  }
}
