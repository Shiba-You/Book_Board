import Router from "next/router";
import { useState } from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Layout from '../components/template/layout';
import UpLoad from '../components/Upload';
import FloatButton from '../components/FloatButton';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '100px'
  },
  text: {
    width: "100%",
  }
}));

export default function New(props) {
  const { currentUser } = props
  const classes = useStyles();
  const title = "Add new book";
  const [artileTitle, setArticleTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  return(
  <>
    <Layout title={title} currentUser={currentUser}>
      <Grid container spacing={3} className={classes.root}>
        <Grid container item xs={12}>
          <TextField
            className={classes.text}
            label="タイトル"
            id="standard-basic"
            margin="dense"
            value={artileTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </Grid>
        <Grid item md={3}>
          <UpLoad currentUser={currentUser} image={image} setImage={setImage} />
        </Grid>
        <Grid item md={9}>
          <TextField
            className={classes.text}
            placeholder="本文をここに記入してください"
            multiline
            minRows={50}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Grid>
      </Grid>
      <FloatButton
        seed="cancel"
        position="1"
      />
      <FloatButton
        seed="save"
        position="0"
        artileTitle={artileTitle}
        content={content}
        currentuser={currentUser}
        image={image}
      />
    </Layout>
  </>
  );
}


New.getInitialProps = async ({ req, res }) => {
  const isServerSide = typeof window === "undefined";
  if (isServerSide && req && res) {
    const root = "http://localhost:3000";
    const options = { headers: { cookie: req.headers.cookie || "" } };
    const result = await fetch(`${root}/api/loggedIn`, options);
    const json = (await result.json())
    if (!json.user) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    }
    return { 
      currentUser: (json.user || {}).currentUser || ""
    };
  }
  if (!isServerSide) {
    const result = await fetch("./api/loggedIn");
    const json = (await result.json())
    if (!json.user) Router.push({pathname: "/login"});
    return { 
      currentUser: (json.user || {}).currentUser || ""
    };
  }
  return { 
    currentUser: ""
  };
};



// import React, { useState, useEffect } from "react";
// import { storage } from "./api/firebase";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";

// const UpLoadTest = () => {
//   const [image, setImage] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState(100);

//   const handleImage = (event) => {
//     const image = event.target.files[0];
//     setImage(image);
//     console.log(image);
//     setError("");
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     setError("");
//     if (image === "") {
//       console.log("ファイルが選択されていません");
//       setError("ファイルが選択されていません");
//       return;
//     }
//     // アップロード処理
//     console.log("アップロード処理");
//     const storageRef = storage.ref("images/test/"); //どのフォルダの配下に入れるかを設定
//     const imagesRef = storageRef.child(image.name); //ファイル名

//     console.log("ファイルをアップする行為");
//     const upLoadTask = imagesRef.put(image);
//     console.log("タスク実行前");
//     console.log("image")
//     console.log(image)

//     upLoadTask.on(
//       "state_changed",
//       (snapshot) => {
//         console.log("snapshot", snapshot);
//         const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log(percent + "% done");
//         setProgress(percent);
//       },
//       (error) => {
//         console.log("err", error);
//         setError("ファイルアップに失敗しました。" + error);
//         setProgress(100); //実行中のバーを消す
//       },
//       () => {
//         upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//           console.log("File available at", downloadURL);
//           setImageUrl(downloadURL);
//           console.log("downloadURL")
//           console.log(downloadURL)
//         });
//       }
//     );
//   };

//   return (
//     <div>
//       upload
//       {error && <div variant="danger">{error}</div>}
//       <form onSubmit={onSubmit}>
//         <input type="file" onChange={handleImage} />
//         <button onClick={onSubmit}>Upload</button>
//       </form>
//       {progress !== 100 && <LinearProgressWithLabel value={progress} />}
//       {imageUrl && (
//         <div>
//           <img width="400px" src={imageUrl} alt="uploaded" />
//         </div>
//       )}
//     </div>
//   );
// };

// function LinearProgressWithLabel(props) {
//   return (
//     <Box display="flex" alignItems="center">
//       <Box width="100%" mr={1}>
//         <LinearProgress variant="determinate" {...props} />
//       </Box>
//       <Box minWidth={35}>
//         <Typography variant="body2" color="textSecondary">{`${Math.round(
//           props.value
//         )}%`}</Typography>
//       </Box>
//     </Box>
//   );
// }
// export default UpLoadTest;