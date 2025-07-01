import React, { useEffect, useState } from 'react'
import { data } from "../../data/data";
import { announcements } from "../../actions/announcementAxios";

const MarketNews = () => {
  const [news, setNews] = useState([])

  const getAllAnnouncement = async () => {
    const data = await announcements();
    if (data.status) {
      setNews(data.data)
    }

  }

  useEffect(() => {
    getAllAnnouncement()
  }, [])

  return (
    <div className="trade_card">
      {
        news && news.length > 0 ?
          <>
            <div className="trade_title">Market News</div>
            <div className="market_news_body ">
              <div className='market_news_body_content'>
                {news.map((news) => (
                  <div className="market_news_card mb-4">
                    <div className="market_news_img_wrp">
                      <img src={news.banner} alt="" className="img_fit_container" />
                    </div>
                    <p className="mt-2 fs_sm">{news.description}</p>
                  </div>
                ))}
              </div>

            </div>
          </> : <></>
      }

    </div>
  );
};

export default MarketNews;
