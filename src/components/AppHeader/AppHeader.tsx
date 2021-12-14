import "./AppHeader.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import {
  searchPublicGists,
  getPublicGists,
  getUserInfo,
} from "../../app/services";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  setSearchInput,
  setPublicGists,
  setIsLoggedIn,
  selectSearchInput,
  selectIsLoggedIn,
} from "../../features/global/globalSlice";
import { getGitToken } from "../../app/services";
import GitHubLogin from "react-github-login";
import { constants } from "../../app/constants";
import { Dropdown, Menu } from "antd";
import "antd/dist/antd.css";
import { Link, useNavigate } from "react-router-dom";
import {
  selectNumberOfResults,
  selectPageNumber,
} from "../../features/page/pageSlice";
import { selectUserInfo, setUserInfo } from "../../features/user/userSlice";

function AppHeader() {
  const [inputActive, setInputActive] = useState(false);
  const pageNumber = useAppSelector((st) => selectPageNumber(st));
  const numberOfResults = useAppSelector((st) => selectNumberOfResults(st));
  const searchString = useAppSelector((st) => selectSearchInput(st));
  const loginUserInfo = useAppSelector((st) => selectUserInfo(st));
  const isLoggedIn = useAppSelector((st) => selectIsLoggedIn(st));
  const dispatch = useAppDispatch();
  const navgiate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">View Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/create">Create Gist</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/starred">Starred Gists</Link>
      </Menu.Item>
      <Menu.Item onClick={() => logoutHandler()}>Logout</Menu.Item>
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
    navgiate("/");
  };

  const blurHandler = (evt: any) => {
    setInputActive(false);
    dispatch(setSearchInput(evt.target.value));
    if (evt.target.value !== searchString) {
      (!evt.target.value
        ? getPublicGists(pageNumber, numberOfResults)
        : searchPublicGists(pageNumber, numberOfResults, evt.target.value)
      ).then((res) =>
        dispatch(setPublicGists(!evt.target.value ? res.data : res.data.items))
      );
    }
  };

  const keyUpHandler = (evt: any) => {
    if (evt.target.value !== searchString && evt.key === "Enter") {
      dispatch(setSearchInput(evt.target.value));
      (!evt.target.value
        ? getPublicGists(pageNumber, numberOfResults)
        : searchPublicGists(pageNumber, numberOfResults, evt.target.value)
      ).then((res) =>
        dispatch(setPublicGists(!evt.target.value ? res.data : res.data.items))
      );
    }
  };

  const onLoginHandler = (evt: any) => {
    getGitToken(evt.code)
      .then((res) => localStorage.setItem("token", res.data.access_token))
      .then(() =>
        getUserInfo().then((res) => {
          dispatch(setIsLoggedIn(true));
          dispatch(setUserInfo(res.data));
        })
      );
  };

  return (
    <header className="app-header">
      <Link to="/">
        <span>EMUMBA</span>
      </Link>
      <div className="right-container">
        <input
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
