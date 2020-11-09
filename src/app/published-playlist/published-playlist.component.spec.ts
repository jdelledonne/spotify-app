import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedPlaylistComponent } from './published-playlist.component';

describe('PublishedPlaylistComponent', () => {
  let component: PublishedPlaylistComponent;
  let fixture: ComponentFixture<PublishedPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
