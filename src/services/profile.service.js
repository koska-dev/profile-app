import $ from "cash-dom";
import {UtilsService} from "./utils.service";


export class ProfileService {

  constructor() {
    this.profileContainer = $('.profile-container');
    this.eventsContainer = $('.events-container');
    this.spinner = $('#spinner');
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
          template.find('.heading').text(UtilsService.getParsedDate(events[i].created_at));
          template.find('.timeline-content').append(eventTemplate);
          content.append(template[0].innerHTML);
        }
      }
      $('#user-timeline').html(content.html());
    }
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
    const content = this.getContent();
    const profile = this.getProfile(event.actor);
    const action = this.getAction('comment', event.payload.comment.html_url);
    const secondAction = this.getAction('pull request', event.payload.comment.url);
    const repo = this.getRepo(event.repo);

    return content
      .append(profile)
      .append(event.payload.action)
      .append(action)
      .append(' to ')
      .append(secondAction)
      .append(repo);
  }

  getPullRequestEventTemplate(event) {
    const content = this.getContent();
    const profile = this.getProfile(event.actor);
    const action = this.getAction('pull request', event.payload.pull_request.url)
    const repo = this.getRepo(event.repo);

    return content
      .append(profile)
      .append(event.payload.action)
      .append(action)
      .append(repo);
  }

  getContent() {
    return $('<div></div>').addClass('content');
  }

  getProfile(actor) {
    return $('<span></span>').addClass('gh-username')
      .append($('<img/>').attr('src', actor.avatar_url))
      .append($('<a></a>').attr('href', actor.url).text(` ${actor.login} `));
  }

  getAction(name, href) {
    return $(`<a> ${name} </a>`).attr('href', href);
  }

  getRepo(repo) {
    return $('<p></p>').addClass('repo-name')
      .append($('<a></a>').attr('href', repo.url).text(` ${repo.name} `))
  }

  getTemplate() {
    return $('#timeline-template').clone();
  }

  setLoader(loading) {
    if (loading) {
      this.profileContainer.addClass('is-invisible');
      this.eventsContainer.addClass('is-invisible');
      this.spinner.removeClass('is-hidden');
    } else {
      this.profileContainer.removeClass('is-invisible');
      this.eventsContainer.removeClass('is-invisible');
      this.spinner.addClass('is-hidden');
    }
  }


}
