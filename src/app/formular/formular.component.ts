import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { yaml } from '../constants/constants';
import { copyObject } from '../constants/helpers';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.less'],
})
export class FormularComponent implements OnInit {
  yamlForm: any;
  advancedView: boolean = false;
  transForm = copyObject(yaml);
  originForm = copyObject(yaml);

  debug: boolean = false;
  constructor(public http: RequestService) {}
  ngOnInit(): void {
    this.yamlForm = new FormGroup({
      parallelExecution: new FormControl('a', Validators.required),
      timeout: new FormControl('b', [Validators.required]),
      apiExecutor: new FormGroup({
        reportTitle: new FormControl('c', [Validators.required]),
        env: new FormControl('d', [Validators.required]),
        virtualanSpecPath: new FormControl('e', [Validators.required]),
        outputDir: new FormControl('f', [Validators.required]),

        cucumblanProperties: new FormGroup({
          service_api: new FormControl('g', [Validators.required]),
          virtualan_data_load: new FormControl('h', [Validators.required]),
          virtualan_data_type: new FormControl('i', [Validators.required]),
          virtualan_data_heading: new FormControl('j', [Validators.required]),
        }),
        apiHeader: new FormGroup({
          headerList: new FormGroup({
            'X-API-KEY': new FormControl('k'),
            'X-API-Test1': new FormControl('l'),
            'X-API-Test2': new FormControl('m'),
          }),
          overwrite: new FormControl(false),
        }),
        execution: new FormControl('n', [Validators.required]),
        excludeProperties: new FormGroup({
          '/pet': new FormControl('o'),
          '/store/order': new FormControl('p'),
          '/user': new FormControl('q'),
        }),
      }),
    });
  }

  submit() {
    this.debug && console.log(this.yamlForm.value, this.yamlForm.valid);

    this.transForm.parallelExecution = this.yamlForm.value.parallelExecution;
    this.transForm.timeout = this.yamlForm.value.timeout;
    this.transForm.apiExecutor[0].reportTitle =
      this.yamlForm.value.apiExecutor.reportTitle;
    this.transForm.apiExecutor[0].env = this.yamlForm.value.apiExecutor.env;
    this.transForm.apiExecutor[0].virtualanSpecPath =
      this.yamlForm.value.apiExecutor.virtualanSpecPath;
    this.transForm.apiExecutor[0].outputDir =
      this.yamlForm.value.apiExecutor.outputDir;
    this.transForm.apiExecutor[0].cucumblanProperties['service.api'] =
      this.yamlForm.value.apiExecutor.cucumblanProperties.service_api;
    this.transForm.apiExecutor[0].cucumblanProperties['virtualan.data.load'] =
      this.yamlForm.value.apiExecutor.cucumblanProperties.virtualan_data_load;
    this.transForm.apiExecutor[0].cucumblanProperties['virtualan.data.type'] =
      this.yamlForm.value.apiExecutor.cucumblanProperties.virtualan_data_type;
    this.transForm.apiExecutor[0].cucumblanProperties[
      'virtualan.data.heading'
    ] =
      this.yamlForm.value.apiExecutor.cucumblanProperties.virtualan_data_heading;
    this.transForm.apiExecutor[0].apiHeader.headerList = [];
    this.transForm.apiExecutor[0].apiHeader.headerList.push({
      'X-API-KEY':
        this.yamlForm.value.apiExecutor.apiHeader.headerList['X-API-KEY'],
    });

    this.transForm.apiExecutor[0].apiHeader.headerList.push({
      'X-API-Test1':
        this.yamlForm.value.apiExecutor.apiHeader.headerList['X-API-Test1'],
    });
    this.transForm.apiExecutor[0].apiHeader.headerList.push({
      'X-API-Test2':
        this.yamlForm.value.apiExecutor.apiHeader.headerList['X-API-Test2'],
    });
    this.transForm.apiExecutor[0].apiHeader.overwrite =
      this.yamlForm.value.apiExecutor.apiHeader.overwrite;
    this.transForm.apiExecutor[0].execution = this.yamlForm.value.apiExecutor.execution;

    this.transForm.apiExecutor[0].excludeProperties['/pet'] = this.yamlForm.value.apiExecutor.excludeProperties['/pet'];
    this.transForm.apiExecutor[0].excludeProperties['/store/order']= this.yamlForm.value.apiExecutor.excludeProperties['/store/order'];
    this.transForm.apiExecutor[0].excludeProperties['/user'] = this.yamlForm.value.apiExecutor.excludeProperties['/user'];
    console.log(this.transForm);

    this.http.postHttp( this.transForm);
    this.debug && console.log(this.transForm);
  }

  notValid(name: string) {
    return this.yamlForm.get(name).invalid && this.yamlForm.get(name).touched;
  }

  errorText(name: string) {
    this.debug && console.log('name', name);
    return `${name} is reqired`;
  }

  toggleAdvancedView() {
    this.advancedView = !this.advancedView;
  }

  toggleDebug(){
    this.debug = !this.debug;
  }
}
