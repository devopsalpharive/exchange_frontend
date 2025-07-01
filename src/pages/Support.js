import React, { useRef, useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import { IoMail } from 'react-icons/io5'
import { FiEdit } from "react-icons/fi";
import TransactionHistory from '../Tables/TransactionHistory';
import SupportTicketTable from '../Tables/SupportTicketTable';
import { raiseTicket } from '../actions/supportTicketAxios';
import { showToastMessage } from '../config/toast';
import { imageValidation } from '../hooks/imageValdationHook';


export default function Support(props) {

  const supportTicketRef = useRef(null)

  const [supportTicketName, setSupportTicketName] = useState('Click to Choose the File');
  const [supportlist, setSupportlist] = useState([
    { value: "Login Issue" },
    { value: "Deposit Issue" },
    { value: "Withdraw Issue" },
    { value: "Kyc Issue" },
    { value: "New Category" },
  ])
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [selectedImages, setSelectedImages] = useState([]);
  console.log("selected immm", selectedImages);
  const [errors, setErrors] = useState({})
  const [updateTicket, setUpdateTicket] = useState(false)

  // axios call for ticket raise------>
  const handleSupportTicketUpload = async () => {
    console.log("ppp");
    supportTicketRef.current.click()
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append("subject", subject)
      formData.append("description", description)
      formData.append("status", "open")
      console.log("selectedimage", selectedImages);
      Object.values(selectedImages).forEach(file => {
        formData.append("attachment", file);
      });

      const data = await raiseTicket(formData)

      if (data.status) {
        showToastMessage(data.message, 'success')
        setSubject('')
        setDescription('')
        setSelectedImages('')
        setUpdateTicket(!updateTicket)
      } else {
        console.log("data.eee", data.error);
        setErrors(data.error);
        setSelectedImages('')
        showToastMessage(data.message, 'error');
      }

      setSupportTicketName('')
    } catch (e) {
      console.log("handleSubmit_rasingTicket_err", e);
    }
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
    // console.log("loggg", e.target.files[0]);

    const SelectedFile = await imageValidation(e.target.files[0])

    if (SelectedFile?.status == true) {
      console.log("SelectedFile", SelectedFile);
      setSupportTicketName(SelectedFile.files?.name)
      setSelectedImages([SelectedFile.files])
    } else {
      showToastMessage(SelectedFile.ChatImage, "error")
    }
  }


  return (
    <div>

      <Layout props={props}>
        <div className='support_ticketPage wallet_section'>
          <p className='page_main_head mb-3'>Create Support Ticket</p>

          <div className='row'>
            <div className='col-lg-9 mb-3'>
              <div className='security_card'>
                <div className="d-flex flex-column mb-24">
                  <label className="label">Subject *</label>
                  <input
                    type="email"
                    id="Subject"
                    name="Subject"
                    className="modal_input"
                    placeholder=""
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value), setErrors({})
                    }}
                  />
                  <p className=" error_text mt-2">{errors?.subject}</p>
                </div>
                <div className="d-flex flex-column mb-2 mt-4">
                  <label className="label">Description * </label>
                  <textarea
                    type="email"
                    id="Description"
                    name="Description"
                    className="modal_input"
                    placeholder=""
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value), setErrors({})
                    }}
                  />
                  <p className=" error_text mt-2">{errors?.description}</p>
                </div>
                <div className="d-flex flex-column mb-2 mt-4">
                  <label className="label">Attachments if any * <span className='error_text_sm ms-2'>
                    Note: Image Should Allowed only jpg/png/jpeg/mp4</span></label>

                  <button className='choose_file_wrapper d-flex align-items-center justify-content-between mt-3'
                    onClick={handleSupportTicketUpload}
                  >
                    <p className=''>
                      {supportTicketName}
                    </p>
                    <div className='browse_button'> Browse
                    </div>
                    <input
                      ref={supportTicketRef}
                      type="file"
                      id="file"
                      name="file"
                      className="d-none"
                      placeholder=""
                      onChange={(e) => { attachfile(e), e.target.value = null }}
                    />
                  </button>
                </div>

                <div className='d-flex align-items-center justify-content-center my-5'>
                  <button className='grad_btn'
                    onClick={() => handleSubmit()}
                  >
                    Create Ticket
                  </button>
                </div>
              </div>


            </div>
            <div className='col-lg-3 mb-3'>
              <div className='wv_card listsupportsec h-100'>
                <p className='head mb-3'>More About Support</p>
                <ul>
                  {supportlist.map((e, i) => (
                    <li onClick={() => setSubject(e.value)}>{i + 1}. {e.value}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='row'>
            <p className='page_main_head mb-3'>Support Details</p>
            <div className='col-12 mb-3'>
              <div
                className="wlt_asset_table recenttrans_table sectionscroll"
              >
                <SupportTicketTable updatesData={updateTicket} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}
