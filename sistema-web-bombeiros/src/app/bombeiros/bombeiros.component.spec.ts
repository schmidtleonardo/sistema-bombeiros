import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BombeirosComponent } from './bombeiros.component';

describe('BombeirosComponent', () => {
  let component: BombeirosComponent;
  let fixture: ComponentFixture<BombeirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BombeirosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BombeirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
