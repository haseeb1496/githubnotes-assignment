import AppHeader from "../components/AppHeader/AppHeader";
import "./GitNotes.scss";
import PublicGists from "../components/PublicGists/PublicGists";
import { useAppDispatch } from "../app/hooks";
import { getUserInfo } from "../app/services";
import { setIsLoggedIn } from "../features/global/globalSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "../components/UserProfile/UserProfile";
import CreateGist from "../components/CreateGist/CreateGist";
import ViewGist from "../components/ViewGist/ViewGist";
import { useEffect } from "react";
import { setUserInfo } from "../features/user/userSlice";

function GitNotes() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserInfo().then((res) => {
        dispatch(setIsLoggedIn(true));
        dispatch(setUserInfo(res.data));
      });
    }
  }, []);

  return (
    <section>
      <BrowserRouter>
        <AppHeader />
        <div className="body-container">
          <Routes>
            <Route path="/*" element={<PublicGists />}></Route>
            <Route path="/profile" element={<UserProfile />}></Route>
            <Route path="/create" element={<CreateGist />}></Route>
            <Route path="/view/:id" element={<ViewGist />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </section>
  );
}

export default GitNotes;
