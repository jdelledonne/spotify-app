import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistHubComponent } from './playlist-hub.component';

describe('PlaylistHubComponent', () => {
  let component: PlaylistHubComponent;
  let fixture: ComponentFixture<PlaylistHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
