'use strict';

const base = [
  {statusCode: 200, succeed: true, code: 200, status: '', desc: 'success'},
  {statusCode: 500, succeed: false, code: 500, status: '', desc: ''},
  {statusCode: 404, succeed: true, code: 404, status: '', desc: 'The interface does not exist'},
  {statusCode: 403, succeed: true, code: 403, status: 'noAuth', desc: 'Verify that it does not pass or has no permissions'}
];

const extend = [];

const statusToCode = {};
const codeToStatus = {};

base.concat(extend).forEach(item => {
  statusToCode[item.status] = codeToStatus[item.code] = item;
});

module.exports = {
  statusToCode,
  codeToStatus
};

