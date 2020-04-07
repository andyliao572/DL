import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroblinkComponent } from './microblink.component';

describe('MicroblinkComponent', () => {
  let component: MicroblinkComponent;
  let fixture: ComponentFixture<MicroblinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroblinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroblinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
