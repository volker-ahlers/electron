import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less']
})
export class FilesComponent {

 files: any;
 filename:string= '';
  constructor(public file: RequestService) {
    this.filename = 'testEmptySheet';
    this.machdas(this.filename);
    
  }

  async machdas (filename: string){
    console.log(filename);
    this.files = await lastValueFrom(this.file.getHttp(filename));
  }

  setFileName(filename: string = this.filename){
    console.log(this.filename)
    this.machdas(filename);
  }
}

