import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCreationFormComponent } from './board-creation-form.component';

describe('BoardCreationFormComponent', () => {
  let component: BoardCreationFormComponent;
  let fixture: ComponentFixture<BoardCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCreationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
