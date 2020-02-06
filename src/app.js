import './assets/scss/app.scss';
import $ from 'cash-dom';
import {polyfill} from 'es6-promise';

polyfill();
import "isomorphic-fetch";

export class App {

  constructor(profileService, utilsService) {
    this.profileService = profileService;
    this.utilsService = utilsService;
  }

  initializeApp() {
    this.setEventListeners();
  }

  setEventListeners() {
    $('button#load-user').on('click', (e) => this.getUser(e));
  }

  getUser(e) {
    const usernameInput = $('input#username');
    if (!this.utilsService.isEmpty(usernameInput.val()) && this.utilsService.isCorrectUsername(usernameInput.val())) {
      usernameInput.removeClass('invalid');
      this.profileService.loadUser(usernameInput.val()).then(
        response => {
          this.profileService.updateProfileView(response);
          this.getEvents(usernameInput.val());
        }
      );
    } else {
      usernameInput.addClass('invalid');
    }
  }

  getEvents(username){
    this.profileService.loadEvents(username).then(
      events => {
        this.profileService.updateHistoryView(events);
      }
    );

  }
}
