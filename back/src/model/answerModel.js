const { dbClient } = require('../config');
const { ObjectId } = require('mongodb');

const collection = dbClient.db('forum_db').collection('answers');

async function getAnswersByQuestion(qId) {
  try {
    await dbClient.connect();
    const answersData = await collection.find({ qid: ObjectId(qId) }).toArray();
    const dataToReturn = answersData.sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1,
    );
    return { success: true, msg: 'Data retrieved', data: dataToReturn };
  } catch (err) {
    console.log('getAnswersByQuestion module error', err);
    throw new Error('getAnswersByQuestion module error');
  } finally {
    await dbClient.close();
  }
}

async function addAnswer(answerData) {
  answerData.uid = ObjectId(answerData.uid);
  answerData.qid = ObjectId(answerData.qid);
  try {
    await dbClient.connect();
    const dbres = await collection.insertOne(answerData);
    if (dbres.acknowledged) {
      const findAnswer = await collection.findOne({
        _id: dbres.insertedId,
      });
      if (findAnswer) {
        return { success: true, msg: 'Data inserted', data: findAnswer };
      }
    }
    return { success: false, msg: 'Insertion failed. Try again' };
  } catch (err) {
    console.log('addAnswer module error', err);
    throw new Error('addAnswer module error');
  } finally {
    await dbClient.close();
  }
}

async function deleteAnswer(aId) {
  try {
    await dbClient.connect();
    const delres = await collection.deleteOne({ _id: ObjectId(aId) });
    if (delres.deletedCount === 1) {
      return { success: true, msg: 'Answer deleted' };
    }
    return { success: false, msg: 'Deletion failed' };
  } catch (err) {
    console.log('deleteAnswer module error', err);
    throw new Error('deleteAnswer module error');
  } finally {
    await dbClient.close();
  }
}

async function updateAnswer(answerData, aId) {
  const { _id, createdAt, qid, uid, ...rest } = answerData;
  console.log(rest);
  try {
    await dbClient.connect();
    const updateres = await collection.updateOne(
      { _id: ObjectId(aId) },
      {
        $set: {
          ...rest,
        },
      },
    );
    if (updateres.modifiedCount === 1 && updateres.matchedCount === 1) {
      return { success: true, msg: 'Answer updated' };
    }
    return { success: false, msg: 'Update failed' };
  } catch (err) {
    console.log('updateAnswer module error', err);
    throw new Error('updateAnswer module error');
  } finally {
    await dbClient.close();
  }
}

module.exports = {
  getAnswersByQuestion,
  addAnswer,
  deleteAnswer,
  updateAnswer,
};
