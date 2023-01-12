
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/services/category.service';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'categoryName',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  openDialog() {
    this.dialog
      .open(DialogCategoryComponent, {
        width: '50%',
        height: '70%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllCategory();
        }
      });
  }

  getAllCategory() {
    this.categoryService.getCategory().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        console.log(this.dataSource);
      },
      error: (err) => {
        alert('error fetching records');
      },
    });
  }

  editCategory(row: any) {
    this.dialog
      .open(DialogCategoryComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllCategory();
        }
      });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        alert('deleted successfully');
     
        this.getAllCategory();
      },
      error: () => {
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
