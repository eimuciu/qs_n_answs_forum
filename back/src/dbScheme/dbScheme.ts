const dbName = 'forum_db';

interface AnswersCollectionScheme {
  _id: string;
  body: string;
  createdAt: Date;
  dislikes: string[];
  isEdited: boolean;
  likes: string[];
  qid: string;
  uid: string;
}

interface QuestionsCollectonScheme {
  _id: string;
  title: string;
  body: string;
  isRead: boolean;
  isEdited: boolean;
  uid: string;
  createdAt: Date;
}

interface UserCollectonScheme {
  _id: string;
  email: string;
  hashedpsw: string;
}
