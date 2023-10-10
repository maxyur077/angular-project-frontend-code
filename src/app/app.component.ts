import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'Name',
    'Price',
    'CompanyName',
    'ManfactureDate',
    'action',
  ];
  
  dataSource!: MatTableDataSource<any>;

  

  itemArray :any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getSweetList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSweetList();
        }
      },
    });
  }

  getSweetList() {
    this._empService.getSweetList().subscribe({
      next: (res) => {
            
            this.dataSource = new MatTableDataSource(res.newChocolate);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.itemArray = res.chocolateData
        this.dataSource = new MatTableDataSource(this.itemArray);
        console.log(this.itemArray, "this.itemArray");
        
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSweet(id: number) {
    console.log(id)
    this._empService.deleteSweet(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Product  deleted!', 'done');
        this.getSweetList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSweetList();
        }
      },
    });
  }
}
