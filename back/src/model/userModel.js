const { dbClient } = require('../config');
const { makehash, comparehash } = require('../utils/hasher');
const { signtoken } = require('../utils/tokener');

const collection = dbClient.db('forum_db').collection('users');

async function findUser(credentials) {
  const { email, password } = credentials;
  try {
    await dbClient.connect();
    const userExist = await collection.findOne({ email });
    if (!userExist) {
      return { success: false, msg: 'Try again or register' };
    }
    if (comparehash(password, userExist.hashedpsw)) {
      const token = signtoken({ id: userExist._id });
      return {
        success: true,
        msg: 'Success login',
        token,
        data: { email: userExist.email, _id: userExist._id },
      };
    }
    return { success: false, msg: 'Check email or password' };
  } catch (err) {
    console.log('findUser module error', err);
    throw new Error('findUser module error');
  } finally {
    await dbClient.close();
  }
}

async function addUser(credentials) {
  const { email, password } = credentials;
  const hashedpsw = makehash(password);
  try {
    await dbClient.connect();
    const userExist = await collection.findOne({ email });
    if (!userExist) {
      await collection.insertOne({ email, hashedpsw });
      return { success: true, msg: 'Success registration' };
    }
    return { success: false, msg: 'Registration failed. Try another email' };
  } catch (err) {
    console.log('addUser module error', err);
    throw new Error('addUser module error');
  } finally {
    await dbClient.close();
  }
}

module.exports = { findUser, addUser };
