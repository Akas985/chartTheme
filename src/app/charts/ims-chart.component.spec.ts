import { ComponentFixture, TestBed } from '@angular/core/testing';
import { imsCharts } from './ims-chart.component';


describe('imsCharts', () => {
  let component: imsCharts;
  let fixture: ComponentFixture<imsCharts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ imsCharts ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(imsCharts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
