import React, { useContext, useEffect, useRef, useState } from 'react'
import Layout from '../Layout/Layout'
import { AiOutlineSend } from 'react-icons/ai'
import adminpf from '../asset/images/profile.svg'
import toast from 'react-hot-toast';
import { IoIosAttach, IoMdCloseCircleOutline, IoMdDocument } from 'react-icons/io';
import { userReplyList } from '../actions/supportTicketAxios';
import { sendUserMessage } from '../actions/supportTicketAxios';
import SocketContext from '../context/SocketContext';
import { useLocation } from 'react-router-dom';
import { createRoomForChat, socket } from '../config/socketConnectivity'
import { useSelector } from "react-redux";
import { imageValidation } from '../hooks/imageValdationHook';
import { showToastMessage } from '../config/toast';

export default function SupportChat(props) {
  const { getUser } = useSelector((state) => state.user);
  const { state } = useLocation()
  const [textarea, setTextarea] = useState('');
  console.log("tetxt", textarea, "end");
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const chatRef = useRef(null);
  const attachref = useRef(null)
  // const [anim, setAnim] = useState(false);
  const [typing, setTyping] = useState(false)
  const containerRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);

  // const [message, setMessage] = useState('')
  // const [response, setResponse] = useState([])
  const [attachment, setAttachment] = useState([])
  const socketContext = useContext(SocketContext);
  const [chatlist, setChatlist] = useState([])
  const ticketId = state?.ticketId
  console.log("selselectedImagesected", selectedImages);


  const checkType = (file) => {
    let image = ["png", "gif", "jpeg", "jpg"]
    const fileType = file.split(".")[file.split(".").length - 1]
    if (image.some((val) => fileType.includes(val))) {
      return "image"
    } else {
      return "video"
    }
  }


  async function getuserReplyList() {
    const result = await userReplyList({ ticketId: ticketId });
    console.log("getuserReplyListgetuserReplyList", result?.data[0]?.reply);
    const reply = result?.data?.reply

    let chatlist = []
    let attachment = []
    reply?.forEach(e => {
      if (e?.receiverId == "") {
        chatlist.push({
          type: "user",
          message: e?.message,
          createdAt: e?.createdAt
        })
      }
      const createdAt = e.createdAt
      if (e?.attachment.length > 0) {
        e.attachment.map((e) => {
          if (e != "") {
            let type = checkType(e)
            attachment.push({
              image: e,
              createdAt: createdAt,
              type: type,
            })
          }
        })
      }
      if (e?.receiverId != "") {
        chatlist.push({
          type: "admin",
          message: e.message,
          createdAt: e.createdAt,
          adminProfile: e.adminProfile
        })
      }
    });
    setChatlist(chatlist)
    setAttachment(attachment)
  }


  const sendmessage = async () => {
    var date = new Date().getTime()
    const formData = new FormData()
    formData.append("type", "user")
    formData.append("message", textarea)
    formData.append("date", date)
    Object.values(selectedImages).forEach(file => {
      formData.append("attachment", file);
    });
    formData.append("ticketId", ticketId)

    var newchatlist = {
      type: "user",
      message: textarea,
      createdAt: date,
      attachment: selectedImages,
      ticketId: ticketId,
    }

    if (newchatlist.message || newchatlist.attachment) {

      if (chatRef.current) {
        chatRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }

      const data = await sendUserMessage(formData)

      if (!data.status) {
        toast.error(data?.error);
        setSelectedImages('');
      }
      else {
        if (selectedImages.length > 0) {
          selectedImages.map((e) => {
            let type = checkType(e.name)
            if (e != "") {
              setAttachment(previousArray => [...previousArray, {
                image: URL.createObjectURL(e),
                createdAt: date,
                type: type
              }
              ]);
            }
          })
        }
        setChatlist(previousArray => [...previousArray, newchatlist]);
        setTextarea('');
        setSelectedImages('')
      }
    }
    else {
      toast.error("Please enter message");
    }
  }

  const clickattach = () => {
    attachref.current.click();
  }
  const attachfile = async (e) => {
    // console.log("attatchmentChseeee", e.target.fileList, e.target.files.length);
    // if(e.target.files.length == 1){
    //   const files = Array.from(e.target.files);
    //   setSelectedImages(files);
    // }else{
    //   const files = Array.from(e.target.files);
    //   setSelectedImages([...selectedImages, ...files]);
    // }
    // const files = Array.from(e.target.files);

    let SelectedFile;
    if (e.target.files.length > 1) {
      SelectedFile = await imageValidation(Array.from(e.target.files))
    } else {
      SelectedFile = await imageValidation(e.target.files[0])
    }

    if (SelectedFile?.status == true) {
      if (SelectedFile.files.length > 1) {
        setSelectedImages(SelectedFile.files)
      } else {
        setSelectedImages([SelectedFile.files])
      }
    } else {
      showToastMessage(SelectedFile.ChatImage, "error")
    }
  }

  const removeImg = (i) => {
    let all = selectedImages;
    all.splice(i, 1)
    setSelectedImages([...all])
  }

  useEffect(() => {
    createRoomForChat(ticketId);
    console.log("room created");
    getuserReplyList()
  }, [ticketId])

  useEffect(() => {
  }, [selectedImages])

  console.log("selectimagesss", selectedImages)
  useEffect(() => {
    socketContext.socket.on('messageFromAdmin', data => {
      if (data.ticketId == ticketId) {
        // let att = []
        var newchatlist = {
          type: "admin",
          message: data.message,
          createdAt: data.createdAt,
          adminProfile: data.adminProfile,
          attachment: data.attachment
        }
        if (newchatlist.message || newchatlist.attachment) {
          setChatlist((previousArray) => {
            return [...previousArray, newchatlist]
          })
          setTextarea('')
          if (chatRef.current) {
            chatRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
          // setMessage(newchatlist.message)
        }
        const createdAt = data.createdAt
        if (data?.attachment.length > 0) {
          data.attachment.map((e) => {
            if (e != "") {
              let type = checkType(e)
              console.log("type", type);
              setAttachment(previousArray => [...previousArray, {
                image: e,
                createdAt: createdAt,
                type: type
              }])
            }
          })
        }
      }
    })
  }, [])

  const handleText = (e) => {
    const value = e.target.value;
    if (value.startsWith(' ')) {
      setTextarea(value.trimStart())
    } else {
      setTextarea(value)
    }
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [])

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>

      <Layout props={props}>
        {
          console.log("CHECKATTECHMENT", chatlist)
        }
        <div className='support_ticketPage wallet_section'>
          <p className='page_main_head mb-3'>Support Ticket</p>
          <div className='row'>
            <div className='col-lg-6 mb-3'>
              <div className='chatcard'>
                <div className='chat_topsec'
                  ref={containerRef}
                >
                  {chatlist.map((e, i) => (
                    <div className={`chat_details d-flex gap-2 align-items-start flex-row mb-3 m-auto ${e.type == "user" && "flex-row-reverse"} ${i == chatlist.length - 1 && e.type == "user" && "chatanimuser"}
                    ${i == chatlist.length - 1 && e.type == "admin" && "chatanimadmin"}`}>
                      <div>
                        {
                          e.type == 'user' ?
                            <img src={getUser?.profileImage == "" ? adminpf : getUser?.profileImage} className='img-fluid pf_img' alt='admin profile' />
                            :
                            e.type == 'admin' ?
                              <img src={e.adminProfile == "" ? adminpf : e.adminProfile} className='img-fluid pf_img' alt='admin profile' />
                              :
                              <img src={adminpf} className='img-fluid pf_img' alt='admin profile' />
                        }
                        {/* <img src={
                          e.type == 'user' ?
                            getUser?.profileImage == ""
                              ? adminpf
                              : getUser?.profileImage :
                            e.type == 'admin' ? e.adminProfile == "" ? adminpf : e.adminProfile : adminpf
                        } className='img-fluid pf_img' alt='admin profile' /> */}
                      </div>
                      <div className={`d-flex flex-column ${e.type == "user" && "align-items-end"}`}>

                        <div className='chat_message'>
                          {attachment &&
                            <>
                              <div className='d-flex align-items-center gap-2 flex-wrap'>
                                {
                                  attachment.map((imgs) => (
                                    // e?.createdAt == imgs?.createdAt ? 
                                    //   <>
                                    // {
                                    e.createdAt == imgs.createdAt ?
                                      <>
                                        <div className='mb-3'>
                                          {/* { */}
                                          {/* // imgs.type.includes("image") ? */}
                                          {
                                            imgs.type == "image" ?
                                              <a href={imgs.image} target="_blank" className='text-decoration-none'>
                                                <div className='imgsec '>
                                                  <img src={imgs.image} className='img-fluid selected_img' alt={imgs.name} />
                                                </div>
                                              </a>
                                              :
                                              imgs.type == "video" &&
                                              <>
                                                <a href={imgs.image} target="_blank" className='text-decoration-none'>
                                                  <div className='videosec '>
                                                    <video src={imgs.image} className="img-fluid selected_video" />
                                                  </div>
                                                </a>
                                              </>
                                          }

                                          {/* :
                                          <a href={URL.createObjectURL(imgs)} className="text-white text-decoration-none" target="_blank" >
                                          <div key={i} className='docsec'
                                            >
                                               {console.log(URL.createObjectURL(imgs), "pdfsec")}
                                              <IoMdDocument fill='#000' fontSize={24} style={{ width: "50px" }} />
                                              <p className='docname'>{imgs.name}</p>
                                           </div>
                                          </a> */}
                                          {/* } */}
                                        </div>
                                      </> :
                                      <>
                                        {/* <div className='mb-3'>
                                          <a href={imgs.image} target="_blank" className='text-decoration-none'>
                                            <div className='imgsec '>
                                              <img src={imgs.image} className='img-fluid selected_img' alt={imgs.name} />
                                            </div>
                                          </a>
                                        </div> */}
                                      </>
                                    // }
                                    // </>
                                    // :
                                    // <>
                                    // <div className='mb-3'>
                                    //   {/* { */}
                                    //   {/* // imgs.type.includes("image") ? */}
                                    //   <a href={imgs.image} target="_blank" className='text-decoration-none'>
                                    //     <div className='imgsec '>
                                    //       <img src={imgs.image} className='img-fluid selected_img' alt={imgs.name} />
                                    //     </div>
                                    //   </a>
                                    //     {/* // :
                                    // // imgs.type.includes("video") ?
                                    //   // <a href={URL.createObjectURL(imgs)} target="_blank" className='text-decoration-none'>
                                    //   //   <div className='videosec '>
                                    //   //     <video src={URL.createObjectURL(imgs)} className="img-fluid selected_video" />
                                    //   //   </div>
                                    //   // </a>
                                    //   // :
                                    //   // <a href={URL.createObjectURL(imgs)} className="text-white text-decoration-none" target="_blank" >
                                    //   //   <div key={i} className='docsec'
                                    //   //   >
                                    //   //     {console.log(URL.createObjectURL(imgs), "pdfsec")}
                                    //   //     <IoMdDocument fill='#000' fontSize={24} style={{ width: "50px" }} />
                                    //   //     <p className='docname'>{imgs.name}</p>
                                    //   //   </div>
                                    //   // </a> */}
                                    // {/* } */}
                                    // </div>
                                    // </>

                                  ))}
                              </div>
                            </>
                          }
                          {e.message &&
                            <div >
                              <p className={`para ${e.type == "user" && "text-end"}`}>{e.message}</p>
                            </div>
                          }

                        </div>
                        <p className='datetime'>{new Date(e.createdAt).toDateString()}</p>
                      </div>

                    </div>
                  ))}
                  {/* {
                    typing &&
                    < div className="is-typing">
                      <div className="jump1"></div>
                      <div className="jump2"></div>
                      <div className="jump3"></div>
                    </div>
                  } */}
                  <div ref={chatRef} className='pb-5'></div>

                </div>
                <div className='chat_inpsec'>
                  {console.log("selectedImagesselectedImages", selectedImages)}
                  {selectedImages?.length > 0 &&
                    <div className='attachsec'>
                      <div className='d-flex align-items-center gap-2 flex-row attachsecrow'>
                        {selectedImages?.map((e, i) => (
                          <>
                            {
                              e?.type?.includes("image") ?
                                <>
                                  <div key={i} className='imgsec'>
                                    <img src={URL.createObjectURL(e)} className='img-fluid selected_img' alt={e.name} />
                                    <IoMdCloseCircleOutline fill='#fff' className="closeicon" onClick={() => removeImg(i)} />
                                  </div>
                                </>
                                :
                                e?.type?.includes("video") ?
                                  <>
                                    <div className='videosec '>
                                      <video src={URL.createObjectURL(e)} className="img-fluid selected_video" />
                                      <IoMdCloseCircleOutline fill='#fff' className="closeicon" onClick={() => removeImg(i)} />
                                    </div>
                                  </>
                                  :
                                  <>
                                    <div key={i} className='docsec'>
                                      <IoMdDocument className="h-25 text-dark" fill='#fff' style={{ width: "50px" }} />
                                      <p className='docname'>{e.name}</p>
                                      <IoMdCloseCircleOutline fill='#fff' className="closeicon" onClick={() => removeImg(i)} />
                                    </div>
                                  </>
                            }
                          </>
                        ))}
                      </div>
                    </div>
                  }

                  <div className="input-group mb-3">
                    <textarea className="form-control" aria-label="With textarea"
                      onFocus={() => setTyping(true)}
                      onBlur={() => setTyping(false)}
                      value={textarea ? textarea : ''} onChange={(e) => handleText(e)}></textarea>
                    <span className="input-group-text d-flex gap-2" id="basic-addon2">
                      <div className='send_icon' onClick={clickattach}>
                        <IoIosAttach fontSize={24} />
                        <input
                          multiple
                          ref={attachref}
                          type="file"
                          className="d-none"
                          onChange={(e) => { attachfile(e), e.target.value = null }
                          }
                        />
                      </div>
                      <div className='send_icon' onClick={sendmessage}>
                        <AiOutlineSend fontSize={24} />
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Media-Gallery */}
            <div className='col-lg-6 mb-3'>
              <div className='wv_card h-100'>
                <p>Media Gallery</p>
                <div className='mediasec max_height'>
                  <div className='d-flex align-items-center gap-2 flex-wrap'>
                    {
                      attachment?.map((e, i) => (
                        <>
                          {
                            e.image &&
                            <div className=''>
                              {/* {e.map((imgs) => (
                                <> */}
                              {
                                e.type == "image" ?
                                  <>
                                    <a href={e.image} target="_blank" className='text-decoration-none'>
                                      <div className='imgsec '>
                                        <img src={e.image} className='img-fluid selected_img' alt={e.name} />
                                      </div>
                                    </a>
                                  </>
                                  :
                                  e.type == "video" &&
                                  <>
                                    <a href={e.image} target="_blank" className='text-decoration-none'>
                                      <div className='videosec '>

                                        <video src={e.image} className="img-fluid selected_video" />

                                      </div>
                                    </a>
                                  </>
                              }
                              {/* </> */}



                              {/* :
                                            <a href={URL.createObjectURL(imgs)} className="text-white text-decoration-none" target="_blank" >
                                              <div key={i} className='docsec'
                                                >

                                                 {console.log(URL.createObjectURL(imgs), "pdfsec")}
                                                <IoMdDocument fill='#000' fontSize={24} style={{ width: "50px" }} />
                                          <p className='docname'>{imgs.name}</p>
                                             </div>
                                            </a>
                                  </>
                              ))} */}
                            </div>
                          }
                        </>
                      ))}


                  </div>
                </div>
              </div>
            </div>
          </div >
        </div >
      </Layout >
    </div >
  )
}
