import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListPage } from './wish-list.page';

describe('Tab2Page', () => {
  let component: WishListPage;
  let fixture: ComponentFixture<WishListPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(WishListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
