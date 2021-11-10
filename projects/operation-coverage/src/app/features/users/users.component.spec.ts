import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/core/services/business/user/user.service';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let template: HTMLElement;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('mockUserService', ['fetchUsers']);

    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [MatCardModule],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();
  });

  beforeEach(() => {
    mockUserService.fetchUsers.and.returnValue(of([]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    describe('given user service returns observable', () => {
      const users = [
        {
          id: 1,
          email: 'george.bluth@reqres.in',
          firstName: 'George',
          lastName: 'Bluth',
          avatarUrl: 'https://reqres.in/img/faces/1-image.jpg',
        },
        {
          id: 2,
          email: 'janet.weaver@reqres.in',
          firstName: 'Janet',
          lastName: 'Weaver',
          avatarUrl: 'https://reqres.in/img/faces/2-image.jpg',
        },
      ];

      beforeEach(() => {
        // Given
        mockUserService.fetchUsers.and.returnValue(of(users));
      });

      it('should fetch users from user service', () => {
        // When
        component.ngOnInit();

        // Then
        expect(component.users).toEqual(users);
      });

      it('should update isLoading to false', () => {
        // When
        component.ngOnInit();

        // Then
        expect(component.isLoading).toBeFalse();
      });
    });

    describe('given user service returns error', () => {
      const error = 'fake error';

      beforeEach(() => {
        // Given
        mockUserService.fetchUsers.and.returnValue(throwError(error));
      });

      it('should assign error to component.error', () => {
        // When
        component.ngOnInit();

        // Then
        expect(component.error).toEqual(error);
      });
    });
  });

  describe('ui tests', () => {
    describe('#isLoading', () => {
      it('should display loading element when isLoading is true', () => {
        // Given
        component.isLoading = true;

        // When
        fixture.detectChanges();

        // Then
        expect(template.querySelector('[data-test="loading-el"]')).toBeTruthy();
      });

      it('should NOT display loading element when isLoading is NOT true', () => {
        // Given
        component.isLoading = false;

        // When
        fixture.detectChanges();

        // Then
        expect(
          template.querySelector('[data-test="loading-el"]')
        ).not.toBeTruthy();
      });
    });

    describe('#users', () => {
      it('should display a card for each user', () => {
        // Given
        component.users = [
          {
            id: 1,
            email: 'george.bluth@reqres.in',
            firstName: 'George',
            lastName: 'Bluth',
            avatarUrl: 'https://reqres.in/img/faces/1-image.jpg',
          },
          {
            id: 2,
            email: 'janet.weaver@reqres.in',
            firstName: 'Janet',
            lastName: 'Weaver',
            avatarUrl: 'https://reqres.in/img/faces/2-image.jpg',
          },
        ];

        // When
        fixture.detectChanges();

        // Then
        expect(
          template.querySelectorAll('[data-test="user-el"]').length
        ).toEqual(component.users.length);
      });
    });
  });
});
