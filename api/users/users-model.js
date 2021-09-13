/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
function find() {
  return 'find wired'
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
  return 'findBy wired'
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {
  return 'findById wired'
}

/**
  resolves to the newly inserted user { user_id, username }
 */
function add(user) {
  return 'add wired'
}

module.exports = { find, findBy, findById, add }
