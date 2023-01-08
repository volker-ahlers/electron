import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less'],
})
export class FilesComponent {
  @ViewChild('editor') editor!: ElementRef;
  @Input() files: any;
  @Input() transformed: any;
  texttosend: string = '';

  filename: string = '';
  contenteditable: boolean = false;
  debug: boolean = false;

  constructor(public http: RequestService) {}

  save() {
    console.log(this.editor.nativeElement.textContent);
    console.log(this.editor.nativeElement.innerText);
    this.texttosend = this.editor.nativeElement.textContent;
    this.http.postHttp(JSON.parse(this.texttosend));
  }

  toggleEditable() {
    this.contenteditable = !this.contenteditable; 
  }

  toggleDebug(){
    this.debug = !this.debug;
  }
}
