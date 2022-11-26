import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsFilterComponent } from './boards-filter.component';

describe('BoardsFilterComponent', () => {
  let component: BoardsFilterComponent;
  let fixture: ComponentFixture<BoardsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
