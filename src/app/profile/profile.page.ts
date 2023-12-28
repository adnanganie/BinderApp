// profile.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  profileForm: FormGroup;

  // Mock profile image URL
  profileImageUrl: string = 'assets/profile-image-placeholder.png';

  constructor(private formBuilder: FormBuilder, private alertController: AlertController) {
    this.profileForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      aboutYourself: ['', Validators.maxLength(100)],
      areaOfInterest: [[]],
      studentOrProfessional: [''],
      experience: [''],
      expertise: [''],
      mentionYourRole: ['', Validators.maxLength(200)],
    });
  }

  // Save profile function
  async saveProfile() {
    if (this.profileForm.valid) {
      // Access form values using this.profileForm.value
      // Perform save operation (backend call, etc.)

      // Show success popup
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Your profile is updated.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
