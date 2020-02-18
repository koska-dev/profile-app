import {GITHUB_USER} from "../shared/api";

export class ProfileRepository {
  loadUser(username) {
    return fetch(`${GITHUB_USER}${username}`)
      .then((response) => response.json())
  }

  loadEvents(username) {
    return fetch(`${GITHUB_USER}${username}/events/public`)
      .then((response) => response.json())
  }
}
