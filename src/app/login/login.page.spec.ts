import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { LoginPage } from './login.page'

describe('LoginPage', () => {
  let component: LoginPage
  let fixture: ComponentFixture<LoginPage>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [ReactiveFormsModule, RouterTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize the form with empty fields', () => {
    expect(component.loginForm.valid).toBeFalsy()
  })

  it('should validate the form as invalid when submitted with empty fields', () => {
    component.loginForm.setValue({ username: 'd', password: 'd' })
    component.login()
    expect(component.loginForm.valid).toBeFalsy()
  })

  it('should validate the form as valid when submitted with valid credentials', () => {
    component.loginForm.setValue({
      username: 'testuser',
      password: 'testpassword',
    })
    component.login()
    expect(component.loginForm.valid).toBeTruthy()
  })

  it('should navigate to "tabs" page on successful login', () => {
    spyOn(component['router'], 'navigateByUrl')
    component.loginForm.setValue({
      username: 'testuser',
      password: 'testpassword',
    })
    component.login()
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('tabs', {
      replaceUrl: true,
    })
  })
})
