import {GITHUB_USER} from "../shared/api";
import $ from "cash-dom";


export class ProfileService {

  loadUser(username) {
    return fetch(`${GITHUB_USER}${username}`)
      .then((response) => response.json())
  }

  loadEvents(username) {
    return fetch(`${GITHUB_USER}${username}/events/public`)
      .then((response) => response.json())
  }

  updateProfileView(profile) {
    $('#profile-name').text($('.username.input').val())
    $('#profile-image').attr('src', profile.avatar_url)
    $('#profile-url').attr('href', profile.html_url).text(profile.login)
    $('#profile-bio').text(profile.bio || '(no information)')
  }

  updateHistoryView(events) {
    const content = $('<div></div>');
    if (Array.isArray(events) && events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        const eventTemplate = this.getTemplateByEventType(events[i]);
        if (eventTemplate) {
          const template = this.getTemplate();
          template.find('.heading').text(this.getFormatDate(events[i].created_at));
          template.find('.timeline-content').append(eventTemplate);
          content.append(template[0].innerHTML);
        }
      }
      $('#user-timeline').html(content.html());
    }
  }

  getTemplate() {
    return $('#timeline-template').clone();
  }

  getTemplateByEventType(event) {
    switch (event.type) {
      case 'PullRequestEvent':
        return this.getPullRequestEventTemplate(event);
      case 'PullRequestReviewCommentEvent':
        return this.getReviewCommentTemplate(event);
      default:
        return null;
    }
  }

  getReviewCommentTemplate(event) {
    const content = $('<div></div>').addClass('content');
    const profileContainer = $('<span></span>').addClass('gh-username')
      .append($('<img/>').attr('src', event.actor.avatar_url))
      .append($('<a></a>').attr('href', event.actor.url).text(` ${event.actor.login} `));
    const action = $('<a> comment </a>').attr('href', event.payload.comment.html_url);
    const secondAction = $('<a> pull request </a>').attr('href', event.payload.comment.url);
    const repo = $('<p></p>').addClass('repo-name')
      .append($('<a></a>').attr('href', event.repo.url).text(` ${event.repo.name} `));

    return content
      .append(profileContainer)
      .append(event.payload.action)
      .append(action)
      .append(' to ')
      .append(secondAction)
      .append(repo);
  }

  getPullRequestEventTemplate(event) {
    const content = $('<div></div>').addClass('content');
    const profileContainer = $('<span></span>').addClass('gh-username')
      .append($('<img/>').attr('src', event.actor.avatar_url))
      .append($('<a></a>').attr('href', event.actor.url).text(` ${event.actor.login} `));
    const action = $('<a> pull request </a>').attr('href', event.payload.pull_request.url);
    const repo = $('<p></p>').addClass('repo-name')
      .append($('<a></a>').attr('href', event.repo.url).text(` ${event.repo.name} `));

    return content
      .append(profileContainer)
      .append(event.payload.action)
      .append(action)
      .append(repo);
  }

  getFormatDate(isoDate) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(isoDate);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }


}
