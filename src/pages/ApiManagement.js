import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import docsimg from '../asset/images/documents.png'
import Swal from 'sweetalert2';
import ChooseApitype from '../modal/ChooseApitype';
import Systemkey from '../modal/Systemkey';
import Selfkey from '../modal/Selfkey';
import { IoClose } from "react-icons/io5";
import { getApikeyList } from '../actions/ApikeyAction';
import { useSelector } from 'react-redux';
import isEmpty from 'is-empty';
import QRCode from "react-qr-code";
import CopyToClipboard from 'react-copy-to-clipboard'
import { showToastMessage } from '../lib/toast';
import ApikeyList from '../components/ApikeyList';

export default function Apimanagement(props) {
  const { getUser } = useSelector((state) => state.user);
  const [createapi, setCreateapi] = useState(false)
  const [apitype, setApitype] = useState("")
  const [keyList, setKeyList] = useState([])

  const deleteallapi = () => {
    Swal.fire({
      title: "Are you sure you want to delete all API keys?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: '#ff602e',
      cancelButtonColor: '#570ebe',

    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire("Deleted All APIs!", "", "success");
      } else if (result.isDenied) {
        // Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  const FetchApikeys = async () => {
    try {
      const { status, result, message } = await getApikeyList()
      if (status) {
        setKeyList(result)
      }
    } catch (err) {
      console.log(err, 'FetchApikeys__err')
    }
  }

  useEffect(() => {
    FetchApikeys()
  }, [getUser])
  console.log(createapi, "createapi");
  return (
    <div>
      <Layout props={props}>
        <div className='security_page api_page'>
          <div className='row'>
            <div className='col-12 mb-3'>
              <div className='security_card d-flex flex-wrap gap-4 align-items-center justify-content-between'>
                <p className='headname'>Api Management</p>
                <div className=' d-flex flex-wrap align-items-center gap-3'>
                  <button className="grn_grd_btn" onClick={() => setCreateapi(true)}>Create API</button>
                  {/* <button className="grn_grd_btn">Create Tax Report API</button> */}
                  {/* <button className="grn_grd_btn" onClick={() => deleteallapi()}>Delete All API</button> */}
                </div>
              </div>
            </div>
            <div className='col-12 mb-3'>
              <div className='security_card'>
                <ul className='secu_sec px-2 list-unstyled mb-0'>
                  <li>
                    <p className='secu_desc '>
                      1. Each account can create up to 30 API Keys.
                    </p>
                  </li>
                  <li>
                    {/* <p className='secu_desc '> 2. Do not disclose your API Key, Secret Key (HMAC) or Private Key (Ed25519, RSA) to anyone to avoid asset losses. You should treat your API Key and your Secret Key (HMAC) or Private Key (Ed25519, RSA) like your passwords.</p> */}
                    <p className='secu_desc '>
                      2. Do not disclose your API Key, Secret Key (HMAC) to anyone to avoid asset losses. You should treat your API Key and your Secret Key (HMAC) like your passwords.
                    </p>
                  </li>
                  <li>
                    <p className='secu_desc'>
                      3. It is recommended to restrict access to trusted IPs only to increase your account security.
                    </p>
                  </li>
                  <li>
                    <p className='secu_desc'>
                      4. You will not be able to create an API Key if KYC is not completed.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className='col-12 mb-3'>
              <div className='wv_card mt-3 d-flex align-items-center gap-2 mb-3'>
                <label class="checkbox_container">
                  <input
                    type="checkbox"
                    // checked={check}
                    onChange={(e) => {
                      // seterror();
                      // setCheck(e.target.checked);
                    }}
                  />
                  <span class="checkbox_checkmark"></span>
                </label>
                <p>By checking this box, all existing API Key(s) on your master account and sub-accounts will be subject to Default Security Controls</p>

              </div>
            </div> */}


            {keyList.length > 0 ?
              keyList.map((val, index) => {
                return (
                  <ApikeyList val={val} index={index} />
                )
              }) :
              <div className='col-12 mb-3'>
                <div className='empty_apicard '>
                  <div className='d-flex align-items-center justify-content-center w-100 flex-column gap-3'>
                    <p className='empty_text text-center'>Your Account has not <br />
                      created any API Keys yet.
                    </p>
                    <img src={docsimg} alt='docsimg' className='img-fluid docsimg' />
                  </div>
                </div>
              </div>}





          </div>

        </div>

        <ChooseApitype
          show={createapi}
          handleDeleteAccount={() => setCreateapi(false)}
          apitypes={(e) => setApitype(e)}
        />
        <Systemkey
          show={apitype == 'systemkey' && true}
          handleDeleteAccount={() => setApitype()}
          apitypes={(e) => setApitype(e)}
          keyList={keyList}
          setKeyList={(data) => { setKeyList([data, ...keyList]) }}
        />
        <Selfkey
          show={apitype == 'selfkey' && true}
          handleDeleteAccount={() => setApitype()}
          apitypes={(e) => setApitype(e)}
        />
      </Layout>

      {console.log(apitype, "apitypeapitype")}
    </div>
  )
}
