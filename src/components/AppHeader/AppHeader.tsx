import "./AppHeader.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { getUserInfo } from "../../app/services";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  setSearchInput,
  setIsLoggedIn,
  selectSearchInput,
  selectIsLoggedIn,
  setIsLoading,
} from "../../features/global/globalSlice";
import { getGitToken } from "../../app/services";
import GitHubLogin from "react-github-login";
import { constants } from "../../app/constants";
import { Dropdown, Menu, message } from "antd";
import "antd/dist/antd.css";
import { Link, useNavigate } from "react-router-dom";
import { selectUserInfo, setUserInfo } from "../../features/user/userSlice";
import { CgProfile } from "react-icons/cg";
import { IoIosCreate } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

function AppHeader() {
  const [inputActive, setInputActive] = useState(false);
  const searchString = useAppSelector((st) => {
    const string = selectSearchInput(st);
    if (document.getElementById("search-input")) {
      document.getElementById("search-input")!["value"] = string;
    }
    return string;
  });
  const loginUserInfo = useAppSelector((st) => selectUserInfo(st));
  const isLoggedIn = useAppSelector((st) => selectIsLoggedIn(st));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">
          <div className="icon-container">
            <CgProfile />
            View Profile
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/create">
          <div className="icon-container">
            <IoIosCreate />
            Create Gist
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/starred">
          <div className="icon-container">
            <AiFillStar />
            Starred Gists
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => logoutHandler()}>
        <div className="icon-container">
          <BiLogOut />
          Logout
        </div>
      </Menu.Item>
    </Menu>
  );

  const loginUser = isLoggedIn ? (
    <Dropdown trigger={["click"]} overlay={menu} placement="topRight" arrow>
      <img src={loginUserInfo["avatar_url"]} className="avatar" />
    </Dropdown>
  ) : (
    <GitHubLogin
      clientId={constants.gitClientId}
      buttonText="Login"
      valid={true}
      redirectUri={constants.redirectUri}
      scope="gist"
      onSuccess={(e) => onLoginHandler(e)}
    />
  );

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setIsLoggedIn(false));
    dispatch(setUserInfo({}));
    message.success("Logged out successfully");
    navigate("/");
  };

  const blurHandler = (evt: any) => {
    setInputActive(false);
    dispatch(setSearchInput(evt.target.value));
    if (evt.target.value !== searchString) {
      dispatch(setIsLoading(true));
    }
  };

  const keyUpHandler = (evt: any) => {
    if (evt.target.value !== searchString && evt.key === "Enter") {
      dispatch(setSearchInput(evt.target.value));
      dispatch(setIsLoading(true));
    }
  };

  const onLoginHandler = (evt: any) => {
    getGitToken(evt.code)
      .then((res) => localStorage.setItem("token", res.data.access_token))
      .then(() =>
        getUserInfo().then((res) => {
          dispatch(setIsLoggedIn(true));
          dispatch(setUserInfo(res.data));
          message.success("Logged in successfully");
        })
      );
  };

  return (
    <header className="app-header">
      <Link to="/">
        <span onClick={() => dispatch(setSearchInput(""))}>EMUMBA</span>
      </Link>
      <div className="right-container">
        <input
          id="search-input"
          onFocus={() => setInputActive(true)}
          onBlur={(e) => blurHandler(e)}
          onKeyUp={(e) => keyUpHandler(e)}
          placeholder="Search Notes..."
        />
        <AiOutlineSearch className={inputActive ? "active" : ""} />
        <div className="user-login-container">{loginUser}</div>
      </div>
    </header>
  );
}

export default AppHeader;
