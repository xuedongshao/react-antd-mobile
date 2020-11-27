import React from 'react';
import styles from './style/App.scss';
import './style/test.scss'

function App() {

  let a=[{s:'1'},1,2,3,4]
  let b = [...a]
  let c:any=b[0]
      c.s='3'

  console.log(a)
  console.log(b)

  return (
    <div className={styles.App}>
      <header className={styles.headerCss}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
