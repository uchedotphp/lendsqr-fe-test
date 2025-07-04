const fs = require('fs');
const path = 'src/services/db.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const users = data['users-records'];

if (Array.isArray(users)) {
  users.forEach(user => {
    if (
      user.firstName &&
      user.lastName &&
      user.generalDetails &&
      user.generalDetails.personalInformation
    ) {
      user.generalDetails.personalInformation.fullName = `${user.firstName} ${user.lastName}`;
    }
  });
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log('All user fullNames updated!');
} else {
  console.error('users-records is not an array!');
} 