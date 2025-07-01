import React, { useEffect, useState } from "react";
import "./App.css";
import Landing from "./pages/Landing";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Launchpad from "./pages/Launchpad";
import ComingSoon from "./pages/ComingSoon";
import LaunchPadDetails from "./pages/LaunchPadDetails";
import CreateLaunchpad from "./pages/CreateLaunchpad";
import Stake from "./pages/Stake";
import Dashboard from "./pages/Dashboard";
import AssetBalance from "./pages/AssetBalance";
import MyProfile from "./pages/MyProfile";
import SpotTrading from "./pages/SpotTrading";
import DerivativeTrade from "./pages/Derivatives/DerivativeTrade";
import MyProfilePage from "./pages/MyProfilePage";
import MarketOverview from "./pages/MarketOverview";
import { useDispatch, useSelector } from "react-redux";
import useThemeChange from "./hooks/useThemeChange";
import WalletNew from "./pages/Wallet";
import Wallet from "./pages/Wallet";
import Asset from "./pages/Asset";
import Verification from "./pages/Verification";
import Referral from "./pages/Referral";
import Settings from "./pages/Settings";
import DepositNew from "./pages/Deposit";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import BankDetails from "./pages/BankDetails";
import Header from "./Layout/Header";
import RequestToken from "./pages/RequestToken";
import RequestTokenSelect from "./pages/RequestTokenSelect";
import ExistingToken from "./pages/ExistingToken";
import ExistingTokenNext from "./pages/ExistingTokenNext";
import NewToken from "./pages/NewToken";
import NewTokenNext from "./pages/NewTokenNext";
import AlreadyMinted from "./pages/AlreadyMinted";
import AlreadyMintedNext from "./pages/AlreadyMintedNext";
import HelperRoute from "./HelperRoutes";
import Security from "./pages/Security";
import Dash from './pages/Dash'


// import Context
import SocketContext from "./context/SocketContext";

/** Config */
import { setAuthToken } from "./config/axios";
import { socket } from "./config/socketConnectivity";
/** Conditional-Routes */
import { AuthRoute } from "./components/conditionalRoutes/AuthRoute";
import { PrivateRoute } from "./components/conditionalRoutes/PrivateRoute";
/** Actions */
import { userData, userLogout } from "./actions/userAction";
import Loader from "./pages/Loader";
import Template from "./pages/Template";
import Template2 from "./pages/Template2";
import Disclaimer from "./pages/Disclaimer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import SupportTicket from "./pages/SupportTicket";
import Managedevices from "./pages/Managedevices";
import Manageactivity from "./pages/Manageactivity";
import Apimanagement from "./pages/ApiManagement";
import Emailmanagement from "./pages/EmailManagement";
import NumberManagement from "./pages/NumberManagement";
import History from "./pages/History";

import StakeTermsConditions from "./pages/StakeTermsConditions";
import MarginTrading from "./pages/Margin/MarginTrading";
import Support from "./pages/Support";
import SupportChat from "./pages/SupportChat";
import Faq from "./pages/Faq";
import FuturesTrade from "./pages/Futures/FuturesTrade";
import Contactus from "./pages/Contactus";
import FuturesChart from "./components/FuturesTrade/Chart";
import MarginChart from "./components/MarginTrade/Chart";
import DerivativeChart from "./components/DerivativeTrade/Chart";
import SpotChart from "./components/SpotTrade/Chart";
import { jwtDecode } from 'jwt-decode';

import { BiSignal4 } from "react-icons/bi";
import CopyTrade from "./pages/CopyTrading/CopyTrade";
import CopyTraders from "./pages/CopyTrading/CopyTraders";
import TraderCopierProfile from "./pages/CopyTrading/TraderCopierProfile";
import CopierDashboard from "./pages/CopyTrading/CopierDashboard";
// import TraderDashboard from "./pages/CopyTrading/TraderDashboard";
import CurrencyConversion from "./pages/SwapUI/CurrencyConversion";


const App = () => {

  // console.log = function () { };
  const { connectionStatus } = useSelector((state) => state.common)
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  // const [connectionStatus, setConnectionStatus] = useState('stable')

  const handleEnableLogin = () => {
    setIsLogin(true);
  };
  const handleDisableLogin = () => {
    setIsLogin(false);
  };

  // start of theme change

  const [theme, setTheme] = useThemeChange("theme", "dark");

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const handleHeaderThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    dispatch({ type: "themeChange", value: theme });
  }, [theme]);

  document.body.setAttribute("data-theme", theme);

  console.log('themeee', theme)

  // end of theme change

  useEffect(() => {
    // Prevents the app from being loaded in an iframe
    if (window.self !== window.top) {
      // You can either redirect the parent window or show a message
      window.top.location = window.location.href; // Breaks out of the iframe
    }
  }, []);

  console.log("_TOKEN_CHECKERSSSSSSSSSSS", jwtDecode('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjdiZjEzYWJiZDg4OWE2OGNhOGZkYTAiLCJlbWFpbCI6Im1hbmlrYW5kYWFubWF0aWN6QGdtYWlsLmNvbSIsInN0YXR1cyI6InZlcmlmaWVkIiwia3ljU3RhdHVzIjoiYXBwcm92ZWQiLCJmaXJzdE5hbWUiOiJNYW5pIiwibGFzdE5hbWUiOiJNYXJhbiBSIiwiaWF0IjoxNzI4NDY1MTU1LCJleHAiOjE3Mjg0Njg3NTV9'))
  return (
    <BrowserRouter>
      <SocketContext.Provider value={{ socket }}>
        <HelperRoute />
        <div>
          <Toaster />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              // <AuthRoute>
              <Landing
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
              // </AuthRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleEnableLogin={handleEnableLogin}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </AuthRoute>
            }
          />
          <Route
            path="/activation/:userId"
            element={
              <AuthRoute>
                <Login
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleEnableLogin={handleEnableLogin}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </AuthRoute>
            }
          />
          <Route
            path="/register"
            element={
              <Register
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          />
          <Route
            path="/register/:code"
            element={
              <Register
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          />
          <Route
            path="/forgotpassword"
            element={
              <ForgotPassword
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          />
          <Route
            path="/reset-password/:authToken"
            element={
              <ForgotPassword
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          />
          {/* <Route
            path="/reset-password"
            element={
              <ForgotPassword
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          /> */}
          {/* reset-password */}
          <Route
            path="/launchpad"
            element={
              <Launchpad
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          />
          <Route
            path="/staking"
            element={
              // <PrivateRoute>
              <Stake
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
              // </PrivateRoute>
            }
          />
          <Route
            path="/createlaunchpad"
            element={
              <PrivateRoute>
                <CreateLaunchpad
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <PrivateRoute>
                <Wallet
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/myprofile"
            element={
              <PrivateRoute>
                <MyProfile
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/verify-old-email/:userId"
            element={
              // <AuthRoute>
              <MyProfile
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
              // </AuthRoute>
            }
          />
          <Route
            path="/verify-new-email/:userId"
            element={
              // <AuthRoute>
              <MyProfile
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
              // </AuthRoute>
            }
          />
          {/* <Route
            path="/asset"
            element={
              <PrivateRoute>
                <Asset
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/verification"
            element={
              <PrivateRoute>
                <Verification
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/referral"
            element={
              <PrivateRoute>
                <Referral
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/deposit"
            element={
              <PrivateRoute>
                <Deposit
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/withdraw"
            element={
              <PrivateRoute>
                <Withdraw
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/spot-trading/:tikerRoot?"
            element={
              // <PrivateRoute>
              <SpotTrading
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
              // </PrivateRoute>
            }
          />
          <Route
            path="/spot-chart/:tikerRoot?"
            element={
              // <PrivateRoute>
              <SpotChart
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
              // </PrivateRoute>
            }
          />
          <Route
            path="/derivative-trading/:tikerRoot?"
            element={
              <DerivativeTrade
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          />
          <Route
            path="/derivative-chart/:tikerRoot?"
            element={
              // <PrivateRoute>
              <DerivativeChart
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
              // </PrivateRoute>
            }
          />
          <Route
            path="/margin-trading/:tikerRoot?"
            element={
              // <PrivateRoute>
              <MarginTrading
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
              // </PrivateRoute>
            }
          />
          <Route
            path="/margin-chart/:tikerRoot?"
            element={
              // <PrivateRoute>
              <MarginChart
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
              // </PrivateRoute>
            }
          />
          <Route
            path="/futures-trading/:tikerRoot?"
            element={
              // <PrivateRoute>
              <FuturesTrade
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
              // </PrivateRoute>
            }
          />
          <Route
            path="/futures-chart/:tikerRoot?"
            element={
              // <PrivateRoute>
              <FuturesChart
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
              // </PrivateRoute>
            }
          />
          <Route
            path="/market-overview"
            element={
              <MarketOverview
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          />
          {/* <Route path="/bankdetails" element={<BankDetails />} /> */}
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/request-token"
            element={
              <RequestToken
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          /> */}
          <Route
            path="/request-token-types"
            element={
              <RequestTokenSelect
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          />{" "}
          <Route
            path="/launchTokens/:type"
            element={
              <ExistingToken
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          />
          {/* unusedfiles */}
          {/* <Route
            path="/existing-token-next"
            element={
              <ExistingTokenNext
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          /> */}
          <Route
            path="/new-token"
            element={
              <NewToken
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          />{" "}
          <Route
            path="/new-token-next"
            element={
              <NewTokenNext
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          />{" "}
          <Route
            path="/already-minted"
            element={
              <AlreadyMinted
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          />
          <Route
            path="/already-minted-next"
            element={
              <AlreadyMintedNext
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          />
          <Route
            path="/launchPadDetail/rubby/:name/:id"
            // path="launchPadDetails/:name/:id"
            element={
              <PrivateRoute>
                <LaunchPadDetails
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/security"
            element={
              <PrivateRoute>
                <Security
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dash
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/launchPadDetail/emerald/:name/:id"
            element={
              <PrivateRoute>
                <Template
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/launchPadDetail/sapphire/:name/:id"
            element={
              <PrivateRoute>
                <Template2
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />

          {/* <Route
            path="/support"
            element={
              <PrivateRoute>
                <SupportTicket
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
          /> */}
          <Route
            path="/managedevice"
            element={
              <PrivateRoute>
                <Managedevices
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/manageactivity"
            element={
              <PrivateRoute>
                <Manageactivity
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/api-management"
            element={
              <PrivateRoute>
                <Apimanagement
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/email-management"
            element={
              <PrivateRoute>
                <Emailmanagement
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/number-management"
            element={
              <PrivateRoute>
                <NumberManagement
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/support"
            element={
              <PrivateRoute>
                <Support
                  theme={theme}
                  setTheme={setTheme}
                  handleThemeChange={handleThemeChange}
                  handleDisableLogin={handleDisableLogin}
                  isLogin={isLogin}
                />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path="/support-chat"
            element={
              <SupportChat
                theme={theme}
                setTheme={setTheme}
                handleThemeChange={handleThemeChange}
                handleDisableLogin={handleDisableLogin}
                isLogin={isLogin}
              />
            }
          /> */}
          <Route path="/loader" element={<Loader />} />
          {/* <Route path="/template/:id" element={<Template />} /> */}
          <Route path="/template2/:id" element={<Template2 />} />

          <Route path="/disclaimer"
            element={<Disclaimer
              theme={theme}
              setTheme={setTheme}
              handleThemeChange={handleThemeChange} />} />

          <Route path="/privacy-policy"
            element={<PrivacyPolicy
              theme={theme}
              setTheme={setTheme}
              handleThemeChange={handleThemeChange} />} />

          <Route path="/terms-of-service"
            element={<TermsOfService
              theme={theme}
              setTheme={setTheme}
              handleThemeChange={handleThemeChange} />} />

          <Route path="/faq"
            element={<Faq
              theme={theme}
              setTheme={setTheme}
              handleThemeChange={handleThemeChange} />}
          />

          <Route
            path="/stake-terms-and-conditions"
            element={<StakeTermsConditions />}
          />
          <Route path="/contact-us"
            element={<Contactus
              theme={theme}
              setTheme={setTheme}
              handleThemeChange={handleThemeChange} />}
          />
          <Route path="/copy-trade"
            element={<CopyTrade
              theme={theme}
              setTheme={setTheme}
              handleThemeChange={handleThemeChange} />}
          />
          <Route path="/copingTrade"
            element={<CopyTraders
              theme={theme}
              setTheme={setTheme}
              handleThemeChange={handleThemeChange} />}
          />
          <Route path="/copy/profile/:type/:id"
            element={<TraderCopierProfile
              theme={theme}
              setTheme={setTheme}
              handleThemeChange={handleThemeChange} />}
          />
          <Route path="/copier-dashboard"
            element={<CopierDashboard
              theme={theme}
              setTheme={setTheme}
              handleThemeChange={handleThemeChange} />}
          />
          <Route path="/currency-conversion"
            element={<CurrencyConversion
              theme={theme}
              setTheme={setTheme}
              handleThemeChange={handleThemeChange} />}
          />
        </Routes>

        <div className={`connection_status ${connectionStatus}`}>
          <BiSignal4 fontSize={19} />
          {
            connectionStatus == 'connected' ?
              <p>Stable Connection</p> :
              connectionStatus == 'disconnected' ? <p> Unstable Connection</p> :
                connectionStatus == 'notconnected' ? <p> Offline</p> :
                  connectionStatus == 'connecting' ? <p> Connecting...</p> :
                    connectionStatus == 'reconnecting' ? <p> Reconnecting...</p> :
                      connectionStatus == 'switch' ? <p>Network swtiching...</p> : <p>Disconnect</p>
          }

        </div>
      </SocketContext.Provider>
    </BrowserRouter >
  );
};

export default App;
