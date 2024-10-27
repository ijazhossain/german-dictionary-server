import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  name: {
    firstName: 'M A Alim',
    lastName: 'Mukul',
  },
  email: 'mukul.sustcse@gmail.com',
  password: 'mukul01312506395eureka',
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};
const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });
  if (!isSuperAdminExists) {
    await User.create(superUser);
  }
};
export default seedSuperAdmin;
