import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  localUrl: string = 'assets/xxx';
  postUrl: string = 'localhost:4200';

  constructor(private httpClient: HttpClient) {}

  getHttp(filename: string): Observable<any> {
    const localUrl = this.localUrl.replace('xxx', filename);
    console.log(localUrl);
    const params: HttpParams = new HttpParams()
      .set('observe', 'body')
      .set('Accept', 'application/json, text/javascript, */*');
    return this.httpClient
      .get<object>(localUrl, { withCredentials: true, params })
      .pipe(retry(1), catchError(this.handleError));
  }

  postHttp(files: string): void {
    console.log(files);
    const params: HttpParams = new HttpParams();
      // .set('observe', 'body')
      // .set('Accept', 'application/json, text/javascript, */*');
      this.httpClient.post<any>(this.postUrl, files, { params }).subscribe(data => {
        console.log(data);
    });
  }
  handleError = (error: any) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log('errorMessage', errorMessage);
    // this.notify.notifyme(errorMessage, 'error', 500); // todo
    return errorMessage;
  };
}
