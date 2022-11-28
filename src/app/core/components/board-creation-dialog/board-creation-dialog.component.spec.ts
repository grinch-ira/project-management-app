import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCreationDialogComponent } from './board-creation-dialog.component';

describe('BoardCreationDialogComponent', () => {
  let component: BoardCreationDialogComponent;
  let fixture: ComponentFixture<BoardCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardCreationDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
