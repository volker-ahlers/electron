import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent {
  @ViewChild('table') table!:any;
  tableForm: any;
  rows: number = 10;
  columns: number = 10;
  tablewidth: string = 'auto';

  extended:boolean = true;
  isContentVisible:boolean = false;

  ngOnInit(): void {
    this.tableForm = new FormGroup({
      rows: new FormControl(this.rows),
      columns: new FormControl(this.columns, [Validators.required]),
    });
   
  }
  ngAfterViewInit(){
    setTimeout( () => this.tableWidth() ,10 );
  }
  getRows() {
    const arr = new Array();
    for (let i = 0; i < this.tableForm.get('rows').value; i++) {
      arr.push('x');
    }
    return arr;
  }
  getColumns() {
    const arr = new Array();
    for (let i = 0; i < this.tableForm.get('columns').value; i++) {
      arr.push('x');
    }
    return arr;
  }
  changeTable() {
    this.tableWidth();
    this.getRows();
    this.getColumns();

  }
  reset(){
    this.tableForm.reset({ rows: this.rows, columns: this.columns});
    this.tableWidth();
  }
  toggleextend(){
    this.extended = !this.extended;
    this.tableWidth();
  }

  tableWidth(){
    const x = this.table.nativeElement.querySelector('td');
    const width = x.offsetWidth * this.tableForm.get('columns').value + 50 + 'px';
    if(this.extended){
      this.tablewidth = width;
    } else {
      this.tablewidth = 'auto';
    }
  }

  toggleContentVisible(){
  this.isContentVisible = !this.isContentVisible;
  }
}
