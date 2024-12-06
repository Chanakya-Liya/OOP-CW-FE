import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8030/images';

  getImage(imageName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}?imageName=${imageName}`, { responseType: 'blob' });
  }

}
