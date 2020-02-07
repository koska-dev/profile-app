export class UtilsService {
  static isEmpty(value) {
    return !value.trim();
  }

  static isCorrectUsername(value) {
    return /^[a-z0-9-_]+$/.test(value.trim());
  }

  static getParsedDate(isoDate){
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(isoDate);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }
}

