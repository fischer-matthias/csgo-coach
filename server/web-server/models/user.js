module.exports = (database) => {
  const logger = require('../../utils/logger')();
  const collection = 'User';
  const user = {};

  /**
   * Login / Registration procedere
   */
  user.verify = (_uid) => {
    return new Promise((resolve, reject) => {
      user
        .exists(_uid)
        .then(result => resolve(result))
        .catch(error => {
          user
            .create(_uid)
            .then(result => resolve(result))
            .catch(error => reject(error));
        });
    });
  };

  /**
   * Verifies that a specific user is already exisiting.
   * @param {*} _uid
   */
  user.exists = (_uid) => {
    return new Promise((resolve, reject) => {
      const query = { uid: _uid };
      database
        .findOne(collection, query)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  };

  /**
   * Creates a new user.
   * @param {*} _uid
   */
  user.create = (_uid) => {
    return new Promise((resolve, reject) => {
      const document = { uid: _uid, role: 'user' };
      database
        .create(collection, document)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  };

  return user;
};
