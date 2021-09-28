import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.http
      .get<ApiResponse>('https://reqres.in/api/users?per_page=10')
      .pipe(
        map((apiResponse: ApiResponse) => {
          return apiResponse.data.map(this.mapApiUsertoDomainUser);
        })
      );
  }

  private mapApiUsertoDomainUser(data: ApiUser): User {
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      avatarUrl: data.avatar,
    };
  }
}

interface ApiResponse {
  data: ApiUser[];
}

interface ApiUser {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}
