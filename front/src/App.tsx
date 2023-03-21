import css from './App.module.scss';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import Answers from './components/pages/Answers/Answers';
import MessageModal from './components/molecules/MessageModal/MessageModal';
import { useMsgCtx } from './store/MessagingProvider';
import { deleteQuestion } from './api/api';

function App() {
  const { message, showMessage, messageType, makeMessage } = useMsgCtx();

  const handleDeleteQuestion = async (qId: string) => {
    const res = await deleteQuestion(qId);
    if (res?.data.success) {
      makeMessage(res.data.msg, 'success');
      window.location.replace('/');
      return;
    }
    makeMessage(res?.data.msg, 'error');
  };

  const handleDeleteWithStateUpdate = async (
    qId: string,
    deleteStateUpdate: (a: string) => void,
  ) => {
    const res = await deleteQuestion(qId);
    if (res?.data.success) {
      makeMessage(res.data.msg, 'success');
      deleteStateUpdate(qId);
      return;
    }
    makeMessage(res?.data.msg, 'error');
  };

  return (
    <>
      <MessageModal message={message} type={messageType} show={showMessage} />
      <NavBar />
      <div className={css.main}>
        <Routes>
          <Route
            path="/"
            element={
              <Home handleDeleteQuestion={handleDeleteWithStateUpdate} />
            }
          />
          <Route
            path="/answers/:id"
            element={<Answers handleDeleteQuestion={handleDeleteQuestion} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
