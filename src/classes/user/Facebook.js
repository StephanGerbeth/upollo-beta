const data = Symbol('data');

export default class FacebookUser {
  constructor(value) {
    this[data] = value;
  }

  getId () {
    return `${this[data].strategy}_${this[data].user.id}`;
  }

  getName () {
    return this[data].user.name;
  }

  getPicture () {
    return this[data].user.picture.data.url;
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
