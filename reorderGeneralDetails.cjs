const fs = require('fs');
const path = 'src/services/db.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const users = data['users-records'];

function reorderGeneralDetails(obj) {
  if (!obj) return obj;
  const order = [
    'personalInformation',
    'educationAndEmployment',
    'socials',
    'guarantor'
  ];
  const reordered = {};
  order.forEach(key => {
    if (key in obj) reordered[key] = obj[key];
  });
  // Add any other keys at the end
  Object.keys(obj).forEach(key => {
    if (!order.includes(key)) reordered[key] = obj[key];
  });
  return reordered;
}

if (Array.isArray(users)) {
  users.forEach(user => {
    if (user.generalDetails) {
      user.generalDetails = reorderGeneralDetails(user.generalDetails);
    }
  });
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log('generalDetails keys reordered for all users!');
} else {
  console.error('users-records is not an array!');
} 