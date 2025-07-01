/** npm import */
import React, { useEffect, useRef, useState } from 'react'
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

/** local file import */

import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import toast from 'react-hot-toast';
import { saveContactUs } from '../actions/userAction';
import { showToastMessage } from '../config/toast';
import { imageValidation } from '../hooks/imageValdationHook';

const Contactus = (props) => {

    const [fileName, setFileName] = useState('Click To Upload');
    const [file, setFile] = useState(null)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    // ---->
    const [MobileNumber, setMobileNumber] = useState('');
    const [CountryCode, setCountryCode] = useState('');
    const [companyLegalDetails, setCompanyLegalDetails] = useState({});
    const [error, setError] = useState({})
    console.log("MobileNumber---> ", companyLegalDetails);

    // ---->

    console.log("file-->", file);

    const fileRef = useRef(null)

    const handleFileOnChange = async (e) => {

        const SelectedFile = await imageValidation(e.target.files[0])
        if (SelectedFile?.status == true) {
            console.log("SelectedFile", SelectedFile);
            setFile(SelectedFile?.files);
            setFileName(SelectedFile?.files.name);
        } else {
            showToastMessage(SelectedFile.ChatImage, "error")
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (companyLegalDetails?.countryCode !== "" && MobileNumber !== '') {
            const phoneNumber = parsePhoneNumberFromString(MobileNumber, companyLegalDetails?.countryCode.toUpperCase());
            if (!phoneNumber) {
                setError({ phoneNumber: "Invalid mobile number" })
                return false
            }
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('phoneNumber', MobileNumber)
        formData.append('message', message)
        formData.append('attachment', file)
        const result = await saveContactUs(formData)
        console.log("result,", result);
        if (result.status) {
            setMobileNumber('')
            setName('')
            setEmail('')
            setMessage('')
            setFileName('Click To Upload')
            toast.success('Message has sent successfully')
        } else {
            console.log(result.error.error)
            setError(result.error.error)
            toast.error(result.error.message)
        }
    }

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    });

    // const handleChange = (value, countryData) => {
    //     const phoneNumber = parsePhoneNumberFromString(value, countryData.countryCode.toUpperCase());
    //     console.log("phoneNumber.isValid())", phoneNumber.isValid());
    // };
    return (
        <>
            <Header props={props} />
            <section className='custom_section'>
                <div className='container container80 py-3'>
                    <div className='row justify-content-center'>
                        <div className='col-12 col-sm-11  col-lg-10 col-xl-9 col-xxl-8 '>
                            <div className='contact_card'>
                                <h3 className='grad_title'>Contact Us</h3>
                                <p className='contact_desc'>We're committed to providing you with the best possible experience.If you have any questions, concerns, or feedback, we're here to help</p>
                                <form className='mt_2rem' onSubmit={handleFormSubmit}>
                                    <div className='row '>
                                        <div className='col-md-6'>
                                            <div className='d-flex flex-column'>
                                                <label className='label'>
                                                    Name
                                                </label>
                                                <input className='modal_input' placeholder='Enter your name' onChange={(e) => { setName(e.target.value), setError({}) }} value={name} />
                                                <p className='error_text mt-2'>{error?.name}</p>
                                            </div>
                                        </div>
                                        <div className='col-md-6 mt-3 mt-md-0'>
                                            <div className='d-flex flex-column'>
                                                <label className='label'>
                                                    Email
                                                </label>
                                                <input className='modal_input' placeholder='Enter your email' onChange={(e) => { setEmail(e.target.value), setError({}) }} value={email} />
                                                <p className='error_text mt-2'>{error?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-4'>
                                        <div className='col-md-6'>
                                            <div className='d-flex flex-column'>
                                                <label className='label'>
                                                    Phone Number
                                                </label>
                                                <div className="custom_phone_input phone_input_sm">
                                                    <PhoneInput
                                                        countryCodeEditable={false}
                                                        placeholder="Enter Phone Number"
                                                        country={"us"}
                                                        value={MobileNumber != "" ? MobileNumber : "+1"}
                                                        isValid
                                                        // value={companyLegalDetails.phoneNumber}
                                                        // defaultCountry="us"
                                                        onChange={(value, event) => {
                                                            setError({})
                                                            const { dialCode, countryCode } = event;
                                                            let newPhoneNo = value
                                                            console.log("PHONE INPUTS", value, event, countryCode);
                                                            setMobileNumber(value);
                                                            setCountryCode(event.dialCode)
                                                            setCompanyLegalDetails((pervRecor) => {
                                                                return { ...pervRecor, ['phoneCode']: dialCode, ['phoneNumber']: newPhoneNo.slice(dialCode?.length), ['countryCode']: countryCode }
                                                            })
                                                        }}
                                                    //     console.log('isValidPhoneNumber',isValidPhoneNumber(value))
                                                    />
                                                </div>

                                                <p className='error_text mt-2'>{error?.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <div className='col-md-6 mt-3 mt-md-0'>
                                            <div className='d-flex flex-column'>
                                                <label className='label'>
                                                    Upload your file
                                                </label>

                                                <button type='button' className='contact_file_upload' onClick={() => fileRef.current.click()}>
                                                    <p>
                                                        {fileName}
                                                    </p>
                                                </button>

                                                <input type='file' className='d-none' onChange={(e) => handleFileOnChange(e)} ref={fileRef} />
                                                <p className='error_text_sm mt-2'>Note : Supported Formats: jpg and png & Max. 3MB allowed</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-4'>
                                        <div className='col-12'>
                                            <div className='d-flex flex-column'>
                                                <label className='label'>
                                                    Your message for us
                                                </label>
                                                <textarea placeholder='Enter your message' className='frm_inpt frm_txtarea mt-3' onChange={(e) => { setMessage(e.target.value), setError({}) }} value={message} />
                                            </div>
                                            <p className='error_text mt-2'>{error?.message}</p>
                                        </div>

                                    </div>
                                    <div className='d-flex align-items-center justify-content-center mt-5'>
                                        <button
                                            type='submit'
                                            className='grn_grd_btn'
                                            onClick={handleFormSubmit}>Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contactus