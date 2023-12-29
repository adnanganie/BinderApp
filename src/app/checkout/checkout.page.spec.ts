import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CheckoutPage } from './checkout.page'
import { IonicModule, PopoverController } from '@ionic/angular'

describe('CheckoutPage', () => {
  let component: CheckoutPage
  let fixture: ComponentFixture<CheckoutPage>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CheckoutPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: 'PopoverController',
          useValue: jasmine.createSpy('PopoverController'),
        },
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(CheckoutPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
