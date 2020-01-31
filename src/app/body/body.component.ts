import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmalService } from '../service/emal.service';
import { Emal } from '../service/email';
import { Service } from './service/service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.sass'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, EmalService]
})
export class BodyComponent implements OnInit {

  @ViewChild('myNgRecommendationForm', {static: false}) myNgDiscountForm !: ElementRef;
  @ViewChild('myNgContactForm', {static: false}) myNgContactForm !: ElementRef;

  userformRecommendation: FormGroup;
  userformContact: FormGroup;
  submitted: boolean;
  display = false;

  serviceList: Array<Service> = [];
  house = new Service('House', 'Restrooms,Bedrooms, Kitchen, Living Room, Laundry Room, Dining Room, Hallways and Stairs', 'house', 'LEFT');
  apartment = new Service('Apartment', 'Restrooms, Bedrooms, Kitchen, Living Room and Dining Room', 'apartment', 'RIGHT');
  office = new Service('Office', 'Work Zones, Meeting Room, Toilets, Stairs, Lobby and Waiting Room', 'office', 'LEFT');
  potconstruction = new Service('Post Construction', 'Windows, Walls, Floors, Vacuuming carpets and Blinds', 'potconstruction', 'RIGHT');

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService, private emalService: EmalService) { }

  ngOnInit() {
    this.serviceList.push(this.house);
    this.serviceList.push(this.apartment);
    this.serviceList.push(this.office);
    this.serviceList.push(this.potconstruction);

    // Add different email and phone

    this.userformRecommendation = new FormGroup({
      recommenderName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
      recommenderPhoneOrEmail: new FormControl('', Validators.compose([Validators.required,
        Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])),
      recommendedName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
      recommendedPhoneOrEmail: new FormControl('', Validators.compose([Validators.required,
        Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]))
    });
    this.userformContact = this.fb.group({
      phoneOrEmail: new FormControl('', Validators.compose([Validators.required,
        Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])),
    });
  }
  getPlaceHolderFormRecommendation(formControlName: string) {
    const messages = {
      recommenderName: {init: 'Please insert your name', error: 'Enter valid name'},
      recommenderPhoneOrEmail: {init: 'Please insert your phone or email', error: 'Enter valid phone or email'},
      recommendedName: {init: 'Please insert your recomendation name', error: 'Enter valid name'},
      recommendedPhoneOrEmail: {init: 'Please insert your recomendation phone or email', error: 'Enter valid phone or email'}
    };
    return (!this.userformRecommendation.controls[formControlName].valid && this.userformRecommendation.controls[formControlName].dirty) ?
    messages[formControlName].error : messages[formControlName].init;
  }

  getPlaceHolderFormContact(formControlName: string) {
    const messages = {
      phoneOrEmail: {init: 'Please insert your phone or email', error: 'Enter valid phone or email'},
    };
    return (!this.userformContact.controls[formControlName].valid && this.userformContact.controls[formControlName].dirty) ?
    messages[formControlName].error : messages[formControlName].init;
  }


  showDialog() {
    this.display = true;
  }

  onHide() {
    this.formRecommendationReset();
  }

  formRecommendationReset() {
    this.myNgDiscountForm.nativeElement.reset();
    this.userformRecommendation.reset();
  }

  formContactReset() {
    this.myNgContactForm.nativeElement.reset();
    this.userformContact.reset();
  }

  onSubmitRecommendation() {
      this.display = false;

      const recomendation = this.userformRecommendation.value;
      const email = new Emal('lr.quality.cleaning.service@gmail.com', 'lupitarodriguez102@gmail.com', 'Customer recomendation',
      '<div style="color:#002358; text-align: center; font-size:20px; background-color:#f8fbff; padding:2em;">' +
        'A customer recomends a people to try your service, contact this new potential consumer...!' +
        '<div style="padding: .5em; background-color: #00c0d0; text-align: center; font-size: 21px; color: white; ' +
            'margin: 0.5em auto; max-width: 400px;">' +
          '<div style="padding: .3em .3em 1.2em .3em; background-color: #ffffff; text-align: left; font-size: 18px; color: #002358;' +
            'text-align: center;">' +
          '<h3>Recommender</h3>' +
          '<div><span>Name: </span><span>' + recomendation.recommenderName + '</span></div>' +
          '<div><span>Phone or email: </span><span>' + recomendation.recommenderPhoneOrEmail + '</span></div>' +
          '</div>' +
          '<div style="padding: .3em .3em 1.2em .3em; background-color: #ffffff; text-align: left; font-size: 18px; color: #002358;' +
            'text-align: center;">' +
          '<h3>Recommended</h3>' +
          '<div><span>Name: </span><span>' + recomendation.recommendedName + '</span></div>' +
          '<div><span>Phone or email: </span><span>' + recomendation.recommendedPhoneOrEmail + '</span></div>' +
          '</div>' +
        '</div>' +
      '</div>');

      this.emalService.send(email).subscribe( res => {
        this.submitted = true;
        if (res.status === 'done') {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'The recommendation was submitted.', life: 5000});
        } else {
          this.messageService.add({severity: 'warn', summary: 'Warning',
           detail: 'We have a problem with the notification, Please try later.', life: 5000});
        }
      });
  }

  onSubmitContact() {
    this.display = false;

    const contact = this.userformContact.value.phoneOrEmail;
    const email = new Emal('lr.quality.cleaning.service@gmail.com', 'lupitarodriguez102@gmail.com', 'Customer request',
    '<div style="color:#002358; margin: 0 auto;font-size:20px; background-color:#f8fbff; padding:2em;max-width: 400px;">' +
      'A customer needs your services, please contact him:' +
      '<div style="padding: .5em; background-color: #00c0d0; text-align: center; font-size: 21px; color: white; margin-top: 0.5em">' +
         contact +
      '</div>' +
    '</div>');

    this.emalService.send(email).subscribe( res => {
      this.submitted = true;
      if (res.status === 'done') {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'The contact request was submitted.', life: 5000});
        this.formContactReset();
      } else {
        this.messageService.add({severity: 'warn', summary: 'Warning',
         detail: 'We have a problem with the notification, Please try later.', life: 5000});
      }
    });
}

  get diagnostic() { return JSON.stringify(this.userformContact.value); }

}
