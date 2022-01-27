import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultInterceptor } from './default.interceptor';
import { Observable } from 'rxjs';

@Injectable()
class AnyService {
  constructor(private http: HttpClient) {}

  anyMethod(): Observable<any> {
    return this.http.get('/any');
  }
}

describe('DefaultInterceptor', () => {
  let service: AnyService;
  let testingController: HttpTestingController;

  // Given
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AnyService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: DefaultInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(AnyService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should add header to request', () => {
    // When
    service.anyMethod().subscribe();

    // Then
    const mockReq = testingController.expectOne('/any').request;
    expect(mockReq.headers.has('X-Header')).toBeTrue();
    expect(mockReq.headers.get('X-Header')).toEqual('<<some value>>');
  });
});
