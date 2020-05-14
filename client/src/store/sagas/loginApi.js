import { put, takeLatest, all } from 'redux-saga/effects';
export default function* fetchLoginApi() {
  const json = yield fetch('')
        .then(response => response.json(), );    
  yield put({ type: "NEWS_RECEIVED", json: json.articles, });
}
