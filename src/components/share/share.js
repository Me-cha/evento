import "./share.css";
import React from "react";
import { RWebShare } from "react-web-share";

function Sharebutton() {
  return (
    <div className="share">
      <RWebShare
        data={{
          text: "Web Share",
          url: "url",
          title: "EVENT",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <img src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/application%2Fsocial-media-computer-icons-symbol-share-icon-png-share-button-e240a9a10320c850f8d128827a204c55.png?alt=media&token=ce8fb1f7-9c16-4c11-8b86-3c3225d55fcd" style={{height:'30px',width:'30px'}}></img>
      </RWebShare>
    </div>
  );
}

export default Sharebutton;
