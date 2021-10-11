import { Button } from '@material-ui/core';
import Layout from '../components/template/layout';

export default function Testpage(props) {
  const { length } = props
  const title = "テストページ"
  const currentUser = ""

  const check1 = () => {
    fetch('https://us-central1-book-board-f3939.cloudfunctions.net/someMethod1')
      .then((res, rej) => {
        console.log(res);
        if (!res.ok) {
          console.error("エラー", res)
        } else {
          return res.json().then(userInfo => {
              console.log(userInfo);
          });
        }
      });
  }
  const check2 = () => {
    fetch('https://us-central1-book-board-f3939.cloudfunctions.net/someMethod2')
      .then((res, rej) => {
        console.log(res);
        if (!res.ok) {
          console.error("エラー", res)
        } else {
          return res.json().then(userInfo => {
              console.log(userInfo);
          });
        }
      });
  }

  return(
  <>
    <Layout title={title} currentUser={currentUser}>
      <p>テストページ</p>
      <Button
        onClick={() => {check1()}}
      >
        テスト1
      </Button>
      <Button
        onClick={() => {check2()}}
      >
        テスト2
      </Button>
      <p>{ length }</p>
    </Layout>
  </>
  );
}

// Testpage.getInitialProps = async ({ req, res }) => {
//   const result = await fetch('https://us-central1-book-board-f3939.cloudfunctions.net/someMethod')
//   const json = await result.json()
//   return {
//     length: json.result
//   }
// };