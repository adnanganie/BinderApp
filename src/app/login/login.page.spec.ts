import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { By } from '@angular/platform-browser'
import { LoginPage } from './login.page'

describe('LoginPage', () => {
  let component: LoginPage
  let fixture: ComponentFixture<LoginPage>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        IonicModule.forRoot(),
      ],
      providers: []
    }).compileComponents()

    fixture = TestBed.createComponent(LoginPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize the form with empty fields', () => {
    expect(component.loginForm?.valid).toBeFalsy()
  })

  it('should validate the form as invalid when submitted with empty fields', () => {
    // Set values to form controls
    component.loginForm?.setValue({
      username: '',
      password: '',
    })

    // Trigger form submission
    component.login()

    expect(component.loginForm?.valid).toBeFalsy()
  })

  it('should validate the form as valid when submitted with valid credentials', () => {
    // Set values to form controls
    component.loginForm?.setValue({
      username: 'testuser',
      password: 'testpassword',
    })

    component.login()

    expect(component.loginForm?.valid).toBeTruthy()
  })

  it('should navigate to "tabs" page on successful login', () => {
    spyOn(component['router'], 'navigateByUrl')

    component.loginForm?.setValue({
      username: 'testuser',
      password: 'testpassword',
    })

    component.login()

    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('tabs', {
      replaceUrl: true,
    })
  })
})
