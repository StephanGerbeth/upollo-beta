const data = Symbol('data');

export default class GoogleUser {
  constructor(value) {
    this[data] = value;
  }

  getId () {
    return `${this[data].strategy}_${this[data].user.sub}`;
  }

  getName () {
    return this[data].user.name;
  }

  getPicture () {
    return this[data].user.picture;
  }

  getEmail () {
    return this[data].user.email;
  }

  toJSON () {
    return {
      id: this.getId(),
      name: this.getName(),
      picture: this.getPicture(),
      email: this.getEmail()
    };
  }
}
