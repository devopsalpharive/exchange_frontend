import React, { useEffect, useRef, useState } from 'react'
import isEmpty from "is-empty";
import Header from '../Layout/Header'
import Footer from '../Layout/Footer';
import { supportTicket } from '../actions/SupportTicket'
import { showToastMessage } from '../config/toast';

const SupportTicket = (props) => {
    const initialValue = {
        Subject: "",
        Description: "",
        file: ""
    };
    const [errors, setError] = useState()
    const [formValue, setFormValue] = useState(initialValue);
    const supportTicketRef = useRef(null)

    const handleSupportTicketUpload = () => {
        supportTicketRef.current.click()
    }
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const handlechange = (e) => {
        setError({})
        var { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    const onChangeValue = async (e) => {
        setError({})
        let errors = {};
        var { name, value, files } = e.target;
        if (!/\.(gif|jpeg|tiff|png|webp|bmp|jpg)$/i.test(files[0]?.name)) {
            errors.file =
                "Please upload file having extensions  .png,.jpeg,.jpg only.";
        }
        if (Object.keys(errors).length > 0) {
            setError(errors);
        } else {
            if (name === "file") {
                console.log({ ...formValue, [name]: files }, 'onChangeValue')
                setFormValue({ ...formValue, [name]: files[0] });
            }
        }
    };

    const validation = () => {
        let errors = {};
        var allowedExtensions = /\.(gif|jpeg|tiff|png|webp|bmp|jpg)$/i;
        if (isEmpty(formValue?.Subject)) {
            errors.Subject = "Subject field is required";
        }
        if (isEmpty(formValue?.Description)) {
            errors.Description = "Description field is required";
        }
        if (!isEmpty(formValue.file)) {
            if (allowedExtensions.test(formValue?.file)) {
                errors.file = "Please upload file having extensions .png,webp,jpg only.";
            }
        }
        return errors
    }

    const handleSubmit = async () => {
        try {
            var value = validation()
            if (!isEmpty(value)) {
                setError(value)
            }
            else {
                var passData = new FormData();
                passData.append("file", formValue.file);
                passData.append("Subject", formValue.Subject);
                passData.append("Description", formValue.Description);
                let { status, loading, error, message, result } = await supportTicket(passData);
                if (status) {
                    showToastMessage(message, 'success')
                    setError({});
                    setFormValue({})
                }
                else {
                    if (error) {
                        setError(error);
                    } else if (message) {
                    }
                }
            }
        } catch (err) {
            console.log("handleSubmit err", err);
        }
    }

    return (
        <div>
            <Header props={props} />
            <section className='custom_section'>
                <div className='container container80'>
                    <div className='row justify-content-center py-4 py-lg-5'>
                        <div className='col-10 col-lg-8 col-xl-6'>
                            <div className='support_card'>
                                <h3 className="support_title mx-auto">Support Ticket</h3>
                                <div className="d-flex flex-column mb-2 mt-4">
                                    <label className="label">Subject</label>
                                    <input
                                        type="email"
                                        id="Subject"
                                        name="Subject"
                                        className="mt-3  cred_input"
                                        placeholder=""
                                        value={formValue.Subject}
                                        onChange={(e) => handlechange(e)}
                                    />
                                    <p className=" error_text mt-2">{errors?.Subject}</p>
                                </div>
                                <div className="d-flex flex-column mb-2 mt-4">
                                    <label className="label">Description * </label>
                                    <textarea
                                        type="email"
                                        id="Description"
                                        name="Description"
                                        className="mt-3  custom_textarea"
                                        placeholder=""
                                        value={formValue.Description}
                                        onChange={(e) => handlechange(e)}

                                    />
                                    <p className=" error_text mt-2">{errors?.Description}</p>
                                </div>
                                <div className="d-flex flex-column mb-2 mt-4">
                                    <label className="label">Attachments if any * <span className='red_span ms-2'>
                                        Image Should Allowed only pdf/docx/jpg/png</span></label>

                                    <button className='choose_file_wrapper d-flex align-items-center justify-content-between mt-3' onClick={handleSupportTicketUpload}>
                                        <p className=''>
                                            Click to Choose the File
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
                                            onChange={(event) => onChangeValue(event)}
                                        />
                                    </button>
                                    {formValue.file ? (
                                        <div className="banner_img_sec">
                                            <img src={URL.createObjectURL(formValue.file)} className='img-fluid rounded-5 plans__symbolImg mt-3' alt='' />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    <p className=" error_text mt-2">{errors?.file}</p>
                                </div>
                                <div className='d-flex align-items-center justify-content-center my-5'>
                                    <button className='grad_btn' onClick={() => handleSubmit()} >
                                        Submit
                                    </button>
                                </div>
                                <div className='d-flex flex-wrap gap-2 align-items-center justify-content-between ticket_actions'>
                                    <p>Create Date</p>
                                    <p>Ticket ID</p><p>Status</p><p>Subject</p><p>Action</p>
                                </div>
                                <div className='mt-4'>
                                    <h6 className='notes_title'>Notes</h6>
                                    <p className='notes_content mt-2'> 1. Please enter your 6 digit account UID if you have already registered with us. This field is compulsory if you registered account with your mobile number.</p>
                                    <p className='notes_content mt-2'>
                                        2. Please enter the details of your request. For trade related inquiries, please indicate the affected order# and describe the issue you encountered in details. A member of our support staff will respond as soon as possible.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

        </div>
    )
}

export default SupportTicket
