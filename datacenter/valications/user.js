'use strict';

const userBase = {
  body: {
    name: {
      in: 'body',
      isString: true,
      notEmpty: true,
      errorMessage: 'user name can not be empty'
    },
    password: {
      in: 'body',
      isString: true,
      notEmpty: true,
      errorMessage: 'user password can not be empty'
    }
  }
};

exports.weibo = {
  login: {
    route: '/api/v1/user/login',
    method: 'post',
    schema: _.pick(userBase.body, ['name', 'password'])
  }
};
