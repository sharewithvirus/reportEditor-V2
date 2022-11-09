const bcrypt = require('bcrypt');

  exports.hashPassword = async (candidatePassword) => {
    return await bcrypt.hash(candidatePassword, 12)
  }

  exports.comparePassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
  }