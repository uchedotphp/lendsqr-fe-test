const fs = require('fs');
const path = 'src/services/db.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const users = data['users-records'];

if (Array.isArray(users)) {
  users.forEach(user => {
    if (
      user.email &&
      user.generalDetails &&
      user.generalDetails.educationAndEmployment
    ) {
      user.generalDetails.educationAndEmployment.officeEmail = user.email;
    }
  });
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log('All officeEmail values set to parent email where applicable!');
} else {
  console.error('users-records is not an array!');
} 