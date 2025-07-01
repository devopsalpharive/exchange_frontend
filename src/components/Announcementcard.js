import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { announcements } from '../actions/announcementAxios'

export default function Announcementscard() {

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

  console.log('newss', news)
  return (

    <>
      {news.length > 0 &&
        <div className="announc_card h-100">
          <p className='lnd_grad_txt' >Announcements</p>
          {/* <p>More</p> */}
          <div className='announcement_list mt-3'>
            <ul>
              {news.map((e) => (
                <li className='mb-3 announce_li'>
                  {/* <p className='desc mb-2'>{e.description}</p>
                  <p className='date mb-0'>{new Date(e.endDate).toDateString()}</p> */}

                  <div className='d-flex gap-3'>
                    <div className='announce_img_wrapper'>
                      <img src={e?.banner} />
                    </div>
                    <div>
                      <p className='date mb-0'>{new Date(e.endDate).toDateString()}</p>
                      <p className='title mb-2'>{e.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

          </div>
        </div>}
    </>

  )
}
