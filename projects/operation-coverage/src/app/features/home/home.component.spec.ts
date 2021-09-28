import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let template: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
