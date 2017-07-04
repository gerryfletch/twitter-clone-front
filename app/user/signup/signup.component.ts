import {Component, trigger, transition, style, animate, state} from '@angular/core'

import {VerificationService} from '../../_services/user/verification-service.service';
import {RegisterService} from '../../_services/user/register.service';
import {UserUtilsService} from '../../_services/user/user-utils.service';
import {AuthenticationService} from 'app/_services';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signup-comp',
  providers: [VerificationService, RegisterService, UserUtilsService],
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.scss',
    '../../partials/_buttons.scss'
  ],
  animations: [
    trigger('showHideText', [
      state('in', style({height: '0'})),
      transition('void => *', [
        style({height: '0'}),
        animate(250, style({height: '*'}))
      ]),
      state('out', style({height: '*'})),
      transition('* => void', [
        style({height: '*'}),
        animate(250, style({height: '0'}))
      ])
    ])
  ]
})
export class SignupComponent {

  isFocused: boolean;
  isHandleAvailable = true;

  handle = '';
  cachedHandle = '';
  isHandleOk = true;

  displayName = '';
  isDisplayOk = true;

  email = '';
  isEmailOk = true;

  password = '';
  isPasswordOk = true;

  isResponseError = false;
  responseError = '';

  constructor(private verificationService: VerificationService,
              private userUtils: UserUtilsService,
              private registrationService: RegisterService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  handleFocused() {
    this.isFocused = this.isHandleOk;
  }

  handleUnfocused() {
    this.isFocused = false;
  }


  validateForm() {
    this.handle = this.handle.toLowerCase().trim();

    if (this.handle !== this.cachedHandle) {
      this.isHandleOk = this.verificationService.isHandleValid(this.handle);
    }

    /* Check that the handle is available */
    if ((this.isHandleOk && this.handle !== '') &&
      this.handle !== this.cachedHandle) {

      this.userUtils.doesHandleExist(this.handle).subscribe(
        (result) => {
          this.isHandleAvailable = !result.ok;
          return false;
        },
        (error) => this.isHandleAvailable = true);
    } else {
      this.isHandleAvailable = true;
    }

    // Set Cached handle to save resources later
    this.cachedHandle = this.handle;

    this.isDisplayOk = this.verificationService.isDisplayNameValid(this.displayName);

    this.email = this.email.trim();
    this.isEmailOk = this.verificationService.isEmailValid(this.email);

    this.password = this.password.trim();
    this.isPasswordOk = this.verificationService.isPasswordValid(this.password);

    if ((this.isPasswordOk && this.isEmailOk && this.isDisplayOk && this.isHandleOk) &&
      this.password !== '' && this.email !== '' && this.displayName != '' && this.handle !== '') {
      return true;
    }
    return false;

  }

  register() {
    if (this.validateForm()) {
      this.registrationService.registerNewUser(this.handle, this.displayName, this.email, this.password)
        .subscribe(
          (result) => {
            console.log(result);
            const resultJson = result.json();
            console.log(resultJson);
            if (result.ok) {
              const token = resultJson.token;
              localStorage.setItem('token', token);
              this.router.navigate(['/dashboard']);
            } else {
              this.responseError = 'An error occured.';
              this.isResponseError = true;
            }
          },
          (error) => {
            const errorJson = JSON.parse(error._body);
            this.responseError = errorJson.error;
            this.isResponseError = true;
          });
    }
  }

}
