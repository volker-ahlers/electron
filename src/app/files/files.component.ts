import { Component, ElementRef, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less']
})
export class FilesComponent {
  @ViewChild('editor') editor!:ElementRef;
 files: any;
 texttosend: string = '';

 filename:string= '';
  constructor(public file: RequestService) {
    this.filename = 'folders_yaml.json';
    this.machdas(this.filename);
    
  }

  machdas (filename: string){
    console.log(filename);
    this.files = this.file.getHttp(filename);
    console.log(this.files);
  }

  setFileName(filename: string = this.filename){
    console.log(this.filename)
    this.machdas(filename);
  }

  save(){
    console.log(this.editor.nativeElement.textContent);
    console.log(this.editor.nativeElement.innerText);
    this.texttosend = this.editor.nativeElement.textContent;
    this.file.postHttp(JSON.parse(this.texttosend));
  }
}

