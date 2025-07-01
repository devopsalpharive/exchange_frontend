import React from "react";
import { data } from "../../data/data";

const MarketNews = () => {
  return (
    <div className="trade_card">
      <div className="trade_title">Market News</div>

      <div className="market_news_body mt-3">
        {data.marketNews.map((news) => (
          <div className="market_news_card mb-4">
            <div className="market_news_img_wrp">
              <img src={news.img} alt="" className="img-fluid market_news_img_size" />
            </div>
            <p className="mt-2 fs_sm">{news.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketNews;
