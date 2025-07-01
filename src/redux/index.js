import { combineReducers } from "redux";

import themeReducer from "./themeReducer";
import userReducer from './userReducer';
import stakingRedecer from './stakingReducer';
import pairReducer from "./pairReducer";
import spotReducer from "./spotReducer";
import walletReducer from "./walletReducer";
import currencyReducer from "./currencyReducer";
import launchpadReducer from "./launchpadReducer";
import launchTokenReducer from "./launchTokenReducer";
import marginReducer from "./marginReducer";
import derivativeReducer from "./derivativeReducer";
import futuresReducer from "./futuresReducer";
import copyTradeReducer from "./copyTradeReducer";

import spotlayoutReducer from "./spotlayoutReducer";
import commonReducer from "./commonReducer";
export default combineReducers({
    theme: themeReducer,
    user: userReducer,
    staking: stakingRedecer,
    pairList: pairReducer,
    spot: spotReducer,
    wallet: walletReducer,
    currency: currencyReducer,
    launchpad: launchpadReducer,
    launchToken: launchTokenReducer,
    spotlayout: spotlayoutReducer,
    margin: marginReducer,
    derivative: derivativeReducer,
    futures: futuresReducer,
    copyTrade: copyTradeReducer,
    common: commonReducer
});

