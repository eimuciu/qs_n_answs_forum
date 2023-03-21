const { dbClient } = require('../config');
const { ObjectId } = require('mongodb');

const collection = dbClient.db('forum_db').collection('questions');
const answersCollection = dbClient.db('forum_db').collection('answers');

// async function getAllQuestions() {
//   try {
//     await dbClient.connect();
//     const questionsData = await collection.find().toArray();
//     return { success: true, msg: 'Data retrieved', data: questionsData };
//   } catch (err) {
//     console.log('findGroups module error', err);
//     throw new Error('findGroups module error');
//   } finally {
//     await dbClient.close();
//   }
// }

async function getAllQuestions() {
  try {
    await dbClient.connect();
    const questionsData = await collection
      .aggregate([
        {
          $lookup: {
            from: 'answers',
            localField: '_id',
            foreignField: 'qid',
            as: 'answers',
          },
        },
      ])
      .toArray();
    const dataToReturn = questionsData
      .map((qObj) => ({
        ...qObj,
        answers: qObj.answers.length,
      }))
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return { success: true, msg: 'Data retrieved', data: dataToReturn };
  } catch (err) {
    console.log('findGroups module error', err);
    throw new Error('findGroups module error');
  } finally {
    await dbClient.close();
  }
}

async function addQuestion(questionData) {
  questionData.uid = ObjectId(questionData.uid);
  try {
    await dbClient.connect();
    const dbres = await collection.insertOne(questionData);
    if (dbres.acknowledged) {
      const findQuestion = await collection.findOne({
        _id: dbres.insertedId,
      });
      if (findQuestion) {
        return { success: true, msg: 'Data inserted', data: findQuestion };
      }
    }
    return { success: false, msg: 'Insertion failed. Try again' };
  } catch (err) {
    console.log('addQuestion module error', err);
    throw new Error('addQuestion module error');
  } finally {
    await dbClient.close();
  }
}

async function deleteQuestion(qId) {
  try {
    await dbClient.connect();
    const delres = await collection.deleteOne({ _id: ObjectId(qId) });
    const delAnsRes = await answersCollection.deleteMany({
      qid: ObjectId(qId),
    });
    if (delres.deletedCount === 1 && delAnsRes.acknowledged) {
      return { success: true, msg: 'Question deleted' };
    }
    return { success: false, msg: 'Deletion failed' };
  } catch (err) {
    console.log('deleteQuestion module error', err);
    throw new Error('deleteQuestion module error');
  } finally {
    await dbClient.close();
  }
}

async function updateQuestion(questionData, qId) {
  const { _id, createdAt, uid, ...rest } = questionData;
  try {
    await dbClient.connect();
    const updateres = await collection.updateOne(
      { _id: ObjectId(qId) },
      {
        $set: {
          ...rest,
        },
      },
    );
    if (updateres.modifiedCount === 1 && updateres.matchedCount === 1) {
      return { success: true, msg: 'Question updated' };
    }
    return { success: false, msg: 'Update failed' };
  } catch (err) {
    console.log('updateQuestion module error', err);
    throw new Error('updateQuestion module error');
  } finally {
    await dbClient.close();
  }
}

module.exports = {
  getAllQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
};
