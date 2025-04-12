const allRoles = {
  admin: [],
  patient: [],
  doctor: [],
  hospital: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
