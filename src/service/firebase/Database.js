import { fromEvent, Subject } from 'rxjs';
import { take, share } from 'rxjs/operators';
import { covertFormDataToObject } from '@/utils/formData';

export default class Database {
  constructor(promise) {
    this.promise = promise;
  }

  addEntry (entry, form) {
    return this.updateEntry(entry, form);
  }

  deleteEntry (entry) {
    return this.updateEntry(entry, null);
  }

  updateEntry (entry, form) {
    if (form instanceof FormData) {
      form = covertFormDataToObject(form);
    }
    return this.preparePromise((db, auth) => {
      if (!entry.val) {
        form.owner = auth.user.uid;
      }
      console.log(form);
      if (form) {
        return entry.ref
          .update(form)
          .then(() => entry.key);
      } else {
        return entry.ref
          .set(form)
          .then(() => entry.key);
      }
    });
  }

  getEntry (key = null) {
    return this.preparePromise((db) => {
      if (key) {
        return get(db.child(key))
          .pipe(take(1))
          .toPromise();
      } else {
        return db.push();
      }
    });
  }

  getEntriesByOwner () {
    return this.preparePromise((db, auth) => {
      return get(db.orderByChild('owner').equalTo(auth.user.uid), true)
        .pipe(take(1))
        .toPromise();
    });
  }

  observeEntry (entry) {
    return this.prepareSubscribe((db, auth, subject) => {
      return get(db.child(entry.key))
        .subscribe((result) => subject.next(result));
    });
  }

  observeEntries () {
    return this.prepareSubscribe((db, auth, subject) => {
      return get(db)
        .subscribe((result) => subject.next(result));
    });
  }

  observeEntriesByOwner () {
    return this.prepareSubscribe((db, auth, subject) => {
      return get(db.orderByChild('owner').equalTo(auth.user.uid), true)
        .subscribe((result) => subject.next(result));
    });
  }

  preparePromise (fn, subject = null) {
    return this.promise.then(([db, auth]) => fn(db, auth, subject));
  }

  prepareSubscribe (fn) {
    const subject = new Subject();
    this.preparePromise(fn, subject);
    return subject;
  }
}

function get (query) {
  return fromEvent(query, 'value')
    .pipe(
      share()
    );
}
