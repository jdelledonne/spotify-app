import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistblockComponent } from './artistblock.component';

describe('ArtistblockComponent', () => {
  let component: ArtistblockComponent;
  let fixture: ComponentFixture<ArtistblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
