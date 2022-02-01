import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SSOConectorService } from '@wizsolucoes/ngx-wiz-sso';
import { fakeToken } from 'src/testing/fakes/fake_token';

import { AuthGuard, SSOWrapper } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSSOWrapper: jasmine.SpyObj<SSOWrapper>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
    mockSSOWrapper = jasmine.createSpyObj('mockSSOWrapper', ['isLogged']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SSOWrapper, useValue: mockSSOWrapper },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    describe('when user is logged in', () => {
      beforeEach(() => {
        // Given
        mockSSOWrapper.isLogged.and.returnValue(true);
      });

      it('should return true if user is logged in', () => {
        // When
        const canNavigate = guard.canActivate();

        // Then
        expect(canNavigate).toBe(true);
      });
    });

    describe('when user is NOT logged in', () => {
      beforeEach(() => {
        // Given
        mockSSOWrapper.isLogged.and.returnValue(false);
      });

      it('should return false if user is NOT logged in', () => {
        // When
        const canNavigate = guard.canActivate();

        // Then
        expect(canNavigate).toBe(false);
      });

      it('should navigate to home', () => {
        // When
        guard.canActivate();

        // Then
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
      });
    });
  });
});

describe('SSOWrapper', () => {
  it('should return true if SSOConectorService isLogged returns a token', () => {
    // Given
    spyOn(SSOConectorService, 'isLogged').and.returnValue(fakeToken);

    // Then
    expect(new SSOWrapper().isLogged()).toBeTrue();
  });
});
