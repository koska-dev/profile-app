import './assets/scss/app.scss';
import $ from 'cash-dom';
import {polyfill} from 'es6-promise';

polyfill();
import "isomorphic-fetch";
import {UtilsService} from "./services/utils.service";

export class App {

  constructor(profileService, profileRepository) {
    this.profileService = profileService;
    this.profileRepository = profileRepository;
  }

  initializeApp() {
    this.setEventListeners();
  }

  setEventListeners() {
    $('button#load-user').on('click', (e) => this.getUser(e));
  }

  getUser(e) {
    const usernameInput = $('input#username');
    if (!UtilsService.isEmpty(usernameInput.val()) && UtilsService.isCorrectUsername(usernameInput.val())) {
      usernameInput.removeClass('invalid');
      this.profileRepository.loadUser(usernameInput.val()).then(
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
    this.profileRepository.loadEvents(username).then(
      events => {
        this.profileService.updateHistoryView(events);
      }
    );

  }
}
