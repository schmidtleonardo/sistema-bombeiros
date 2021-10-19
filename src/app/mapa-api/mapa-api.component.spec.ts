import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaApiComponent } from './mapa-api.component';

describe('MapaApiComponent', () => {
  let component: MapaApiComponent;
  let fixture: ComponentFixture<MapaApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
