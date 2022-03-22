import { useRequest } from 'ahooks';
import Mock from 'mockjs';
import React from 'react';
import ReactDOM from 'react-dom';

async function getEmail(search) {
  console.log('debounce getEmail', search);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock({ 'data|5': ['@email'] }).data);
    }, 300);
  });
}

export default () => {
  const { data, loading, run } = useRequest(getEmail, {
    debounceWait: 1000,
    manual: true,
  });

  return (
    <div>
      debounce
      <input
        placeholder="Search Emails"
        onChange={(e) => run(e.target.value)}
      />
      {loading ? (
        <p>loading</p>
      ) : (
        <ul style={{ marginTop: 8 }}>
          {data?.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ReactDOM.render(<App />, document.getElementById('root'));
