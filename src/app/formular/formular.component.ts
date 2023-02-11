import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { executions, virtualanDataTypes, yaml } from '../constants/constants';
import { copyObject } from '../constants/helpers';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.less'],
})
export class FormularComponent implements OnInit {
  yamlForm: any;
  transformed = copyObject(yaml);

  executionsArray: Array<string> = executions;
  virtualanDataTypesArray: Array<string> = virtualanDataTypes;

  editorView: boolean = false;
  debug: boolean = false;


  constructor(public http: RequestService) {}
  ngOnInit(): void {
    this.yamlForm = new FormGroup({
      parallelExecution: new FormControl(4711, Validators.required),
      timeout: new FormControl(null, [Validators.required]),
      apiExecutor: new FormGroup({
        reportTitle: new FormControl('xyz', [Validators.required]),
        env: new FormControl('', [Validators.required]),
        virtualanSpecPath: new FormControl('', [Validators.required]),
        outputDir: new FormControl('', [Validators.required]),

        cucumblanProperties: new FormGroup({
          service_api: new FormControl('', [Validators.required]),
          virtualan_data_load: new FormControl('', [Validators.required]),
          virtualan_data_type: new FormControl('', [Validators.required]),
          virtualan_data_heading: new FormControl('', [Validators.required]),
        }),
        apiHeader: new FormGroup({
          headerList: new FormGroup({
            'X-API-KEY': new FormControl(''),
            'X-API-Test1': new FormControl(''),
            'X-API-Test2': new FormControl(''),
          }),
          overwrite: new FormControl(false),
        }),
        execution: new FormControl('', [Validators.required]),
        excludeProperties: new FormGroup({
          '/pet': new FormControl(''),
          '/store/order': new FormControl(''),
          '/user': new FormControl(''),
        }),
      }),
    });
  }

  submit() {
    this.debug && console.log(this.yamlForm.value, this.yamlForm.valid);
    this.transformed.parallelExecution = this.yamlForm.value.parallelExecution;
    this.transformed.timeout = this.yamlForm.value.timeout;
    this.transformed.apiExecutor[0].reportTitle =
      this.yamlForm.value.apiExecutor.reportTitle;
    this.transformed.apiExecutor[0].env = this.yamlForm.value.apiExecutor.env;
    this.transformed.apiExecutor[0].virtualanSpecPath =
      this.yamlForm.value.apiExecutor.virtualanSpecPath;
    this.transformed.apiExecutor[0].outputDir =
      this.yamlForm.value.apiExecutor.outputDir;
    this.transformed.apiExecutor[0].cucumblanProperties['service.api'] =
      this.yamlForm.value.apiExecutor.cucumblanProperties.service_api;
    this.transformed.apiExecutor[0].cucumblanProperties['virtualan.data.load'] =
      this.yamlForm.value.apiExecutor.cucumblanProperties.virtualan_data_load;
    this.transformed.apiExecutor[0].cucumblanProperties['virtualan.data.type'] =
      this.yamlForm.value.apiExecutor.cucumblanProperties.virtualan_data_type;
    this.transformed.apiExecutor[0].cucumblanProperties[
      'virtualan.data.heading'
    ] =
      this.yamlForm.value.apiExecutor.cucumblanProperties.virtualan_data_heading;
    this.transformed.apiExecutor[0].apiHeader.headerList = [];
    this.transformed.apiExecutor[0].apiHeader.headerList.push({
      'X-API-KEY':
        this.yamlForm.value.apiExecutor.apiHeader.headerList['X-API-KEY'],
    });

    this.transformed.apiExecutor[0].apiHeader.headerList.push({
      'X-API-Test1':
        this.yamlForm.value.apiExecutor.apiHeader.headerList['X-API-Test1'],
    });
    this.transformed.apiExecutor[0].apiHeader.headerList.push({
      'X-API-Test2':
        this.yamlForm.value.apiExecutor.apiHeader.headerList['X-API-Test2'],
    });
    this.transformed.apiExecutor[0].apiHeader.overwrite =
      this.yamlForm.value.apiExecutor.apiHeader.overwrite;
    this.transformed.apiExecutor[0].execution = this.yamlForm.value.apiExecutor.execution;

    this.transformed.apiExecutor[0].excludeProperties['/pet'] = this.yamlForm.value.apiExecutor.excludeProperties['/pet'];
    this.transformed.apiExecutor[0].excludeProperties['/store/order']= this.yamlForm.value.apiExecutor.excludeProperties['/store/order'];
    this.transformed.apiExecutor[0].excludeProperties['/user'] = this.yamlForm.value.apiExecutor.excludeProperties['/user'];
    console.log(this.transformed);

    this.http.postHttp( this.transformed);
    this.debug && console.log(this.transformed);
  }

  notValid(name: string) {
    return this.yamlForm.get(name).invalid && this.yamlForm.get(name).touched;
  }

  errorText(name: string) {
    this.debug && console.log('name', name);
    return `${name} is reqired`;
  }
  
  toggleEditorView() {
    this.editorView = !this.editorView; 
  }
}