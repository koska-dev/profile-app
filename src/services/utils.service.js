export class UtilsService {
  isEmpty(value) {
    return !value.trim();
  }

  isCorrectUsername(value) {
    return /^[a-z0-9-_]+$/.test(value.trim());
  }
}
