import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'
import { ReactiveFormsModule } from '@angular/forms'
import { ProfilePage } from './profile.page'
import { AlertController } from '@ionic/angular'

describe('ProfilePage', () => {
  let component: ProfilePage
  let fixture: ComponentFixture<ProfilePage>
  let alertController: Partial<AlertController>

  beforeEach(waitForAsync(() => {
    alertController = {
      create: jasmine.createSpy('create').and.returnValue(
        Promise.resolve({
          present: () => Promise.resolve(),
          onDidDismiss: () =>
            Promise.resolve({ data: { reason: 'mockReason' } }),
        })
      ),
      dismiss: jasmine
        .createSpy('dismiss')
        .and.returnValue(Promise.resolve(true)),
    }
    TestBed.configureTestingModule({
      declarations: [ProfilePage],
      imports: [ReactiveFormsModule, IonicModule],
      providers: [
        {
          provide: AlertController,
          useValue: alertController,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ProfilePage)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize the form with empty fields', () => {
    expect(component.profileForm.valid).toBeFalsy()
  })

  it('should validate the form as invalid when submitted with empty fields', () => {
    component.saveProfile()
    expect(component.profileForm.valid).toBeFalsy()
  })

  it('should validate the form as valid when submitted with valid data', () => {
    component.profileForm.setValue({
      displayName: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      aboutYourself: 'Lorem ipsum...',
      areaOfInterest: ['Technology', 'Science'],
      studentOrProfessional: 'Professional',
      experience: '5-10',
      expertise: 'Software Development',
      mentionYourRole: 'Full Stack Developer',
    })

    component.saveProfile()
    expect(component.profileForm.valid).toBeTruthy()
  })

  it('should show a success alert when the form is valid and saved', async () => {
    component.profileForm.setValue({
      displayName: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      aboutYourself: 'Lorem ipsum...',
      areaOfInterest: ['Technology', 'Science'],
      studentOrProfessional: 'Professional',
      experience: '5-10',
      expertise: 'Software Development',
      mentionYourRole: 'Full Stack Developer',
    })

    await component.saveProfile()
    expect(alertController.create).toHaveBeenCalled()
  })
})
