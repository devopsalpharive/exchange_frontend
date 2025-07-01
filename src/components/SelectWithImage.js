import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useLocation, Link, NavLink, useNavigate } from "react-router-dom";
import { Images } from ".././data/Images";
import AddLiquidity from "../modal/AddLiquidity";
import BankTransfer from "../modal/BankTransfer";
import isEmpty from "is-empty";

const SelectWithImage = (props) => {
  const { pathname } = useLocation()
  // const [assetOption,setAssetOption] = useState([])
  const { setSelectedCurrency, selectedCurrency, assetList } = props
  const [assetOption, setAssetOption] = useState([])
  // console.log(assetList, 'assetList')
  useEffect(() => {
    if (!isEmpty(assetList) && !isEmpty(pathname)) {
      let assets = []
       assetList.filter((el) => {
        if (pathname == "/withdraw" && el.networkData.filter((val) => val.withdrawStatus).length > 0) {
          assets.push(el)
        } else if (pathname == "/deposit" && el.networkData.filter((val) => val.depositStatus).length > 0) {
          assets.push(el)
        }
      });
      // console.log("assetOption_data", assets, userAsset.assets, pathname);
      setAssetOption(assets)
    }

  }, [assetList, pathname])

  const customCurrencyRenderer = ({ label, data, value }) => (
    <div
      className="market_select_component d-flex align-items-center"
      onClick={() => {

        setSelectedCurrency(data);
        currencyRef.current.blur();
        setCloser(!closer);
        // props.setSelectCurrencyType(value);
      }}
    >
      <img src={isEmpty(data.currencyImage) ? (Images.stakeCoin8) : data.currencyImage} style={{ width: "25px", height: "25px", marginRight: "10px", borderRadius: "50px" }} />
      <p>{label}</p>
    </div>
  );

  const [closer, setCloser] = useState();

  const currencyRef = useRef();

  return (
    <>
      <div className="position-relative coin_select dw_coin_slt">
        <Select
          name={props.name}
          className="mt-2"
          defaultValue={selectedCurrency}
          // onChange={props?.selectedCurrency}
          options={assetOption}
          value={selectedCurrency}
          components={{ Option: customCurrencyRenderer }}
          ref={currencyRef}
          isSearchable={true}
          classNamePrefix="custom_rct_slt"
        />
        {/* {console.log("seleleeeee", props?.selectedCurrency)} */}
        <img
          src={selectedCurrency?.currencyImage}
          className="img-fluid market_coinname_img position-absolute"
          style={{ width: "25px", height: "25px", marginRight: "10px", borderRadius: "50px" }}
        />
      </div>
    </>
  );
};

export default SelectWithImage;
