import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'imageUrl',
    'name',
    'unitPrice',
    'unitsInStock',
    'categoryId',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  categories: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
        height: '70%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProduct();
        }
      });
  }

  getAllProduct() {
    this.productService.getProduct().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('error fetching records');
      },
    });
  }

  editProduct(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllProduct();
        }
      });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        alert('deleted successfully');
        this.getAllProduct();
      },
      error: (err) => {
        console.log(err);

        alert('error deleting');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
