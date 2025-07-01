import React, { useState } from "react";

const NewsCard = (props) => {

  const [showReadMore,setShowReadMore] = useState(false)
  return (
    <div className="news_card">
      {/* <p className="date mt-2">{props.val.date}</p> */}
      <p className="news_title mt-3">{props.val.heading}</p>
      {showReadMore ?  <p className="news_desc mt-4">{props.val.description}</p> : <p className="news_desc mt-4">{props.val.description.slice(0,120)}...</p>}
      
      <button className="home__gradClipBtn mt-4" onClick={()=>setShowReadMore(!showReadMore)}>{showReadMore ? "Read less" :"Read more"}</button>
    </div>
  );
};

export default NewsCard;
