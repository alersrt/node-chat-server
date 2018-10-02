const userRepository = require('../repository/userRepository');

/**
 * Describes user service.
 *
 * @param provider string value uses for determining of the authentication provider
 *                 and has the next values: "facebook", "local"
 * @constructor
 */
function UserService(provider) {

}

/**
 * Retrieves user data from repository.
 *
 * @param userId user's identifier
 * @return {Promise<void>}
 */
UserService.prototype.findById = async function(userId) {
  return await userRepository.findById(userId);
};

/**
 * Returns user data from repository of stores new if it does not found.
 *
 * @param userId user's identifier.
 * @param profile user profile which will be stores in repository if not stored before.
 * @return {Promise<void>}
 */
UserService.prototype.findOrCreate = async function(userId, profile) {
  let user = await userRepository.findById(userId);
  if (!!!user) {
    user = await userRepository.save(profile);
  }
  return user;
};

module.exports = function(provider) {
  return new UserService(provider);
};