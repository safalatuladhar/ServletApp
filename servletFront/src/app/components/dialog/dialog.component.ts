import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup;
  actionBtn: string = 'Save';
  categories: any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      unitPrice: ['', Validators.required],
      imageUrl: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['id'].setValue(this.editData.id);
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['unitPrice'].setValue(this.editData.unitPrice);
      this.productForm.controls['imageUrl'].setValue(this.editData.imageUrl);
      this.productForm.controls['unitsInStock'].setValue(this.editData.unitsInStock);
      this.productForm.controls['categoryId'].setValue(this.editData.categoryId);
    }

    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategory().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) => {
        alert('error fetching records');
      },
    });
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        console.log(this.productForm.value.categoryId);
        this.productService.postProduct(this.productForm.value).subscribe({
          next: (response) => {
            alert('product added succesfully!!');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('error');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    
    this.productService
      .putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (response) => {
          alert('product updated');
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          // alert('error');
          console.log(err);
          
        },
      });
  }
}
