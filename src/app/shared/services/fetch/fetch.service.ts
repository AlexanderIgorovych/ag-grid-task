import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Item } from '../../models/item.model'
import { Video } from '../../models/video.model'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  constructor(private http: HttpClient) {}

  getAPIData(): Observable<Item[]> {
    return this.http
      .get<Video>(environment.FETCH_API)
      .pipe(map((data: Video) => data.items))
  }
}
