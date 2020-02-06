import {GITHUB_USER} from "../shared/api";
import $ from "cash-dom";


export class ProfileService {

  loadUser(username) {
    return fetch(`${GITHUB_USER}${username}`)
      .then((response) => response.json())
  }

  updateProfileView(profile){
    $('#profile-name').text($('.username.input').val())
    $('#profile-image').attr('src', profile.avatar_url)
    $('#profile-url').attr('href', profile.html_url).text(profile.login)
    $('#profile-bio').text(profile.bio || '(no information)')
  }

}
