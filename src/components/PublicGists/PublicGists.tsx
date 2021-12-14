import { IoGridOutline } from "react-icons/io5";
import { AiOutlineUnorderedList } from "react-icons/ai";
import "./PublicGists.scss";
import ListView from "./ListView/ListView";
import GridView from "./GridView/GridView";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  setListView,
  setIsLoading,
  setPublicGists,
  selectStarredGists,
  selectPublicGists,
  selectListView,
} from "../../features/global/globalSlice";
import Pagination from "./Pagination/Pagination";
import {
  selectNumberOfResults,
  selectPageNumber,
  setNumberOfResults,
} from "../../features/page/pageSlice";
import { useEffect } from "react";
import { getPublicGists } from "../../app/services";
import { Route, Routes } from "react-router-dom";

function PublicGists() {
  const dispatch = useAppDispatch();
  const numberOfResults = useAppSelector((st) => selectNumberOfResults(st));
  const pageNumber = useAppSelector((st) => selectPageNumber(st));
  const listView = useAppSelector((st) => selectListView(st));
  const publicGists = useAppSelector((st) => selectPublicGists(st));
  const starredGists = useAppSelector((st) => selectStarredGists(st));

  const gridViewListener = () => {
    dispatch(setListView(false));
    dispatch(setNumberOfResults(9));
  };

  const listViewListener = () => {
    dispatch(setListView(true));
    dispatch(setNumberOfResults(14));
  };

  useEffect(() => {
    dispatch(setIsLoading(true));
    getPublicGists(pageNumber, numberOfResults).then((res) => {
      !!listView
        ? dispatch(setNumberOfResults(14))
        : dispatch(setNumberOfResults(9));
      dispatch(setIsLoading(false));
      dispatch(setPublicGists(res.data));
    });
  }, [numberOfResults]);

  return (
    <section className="public-gists">
      <div className="icons-container">
        <IoGridOutline
          className={!listView ? "active-view" : ""}
          onClick={() => gridViewListener()}
        />
        <div className="divider"></div>
        <AiOutlineUnorderedList
          className={listView ? "active-view" : ""}
          onClick={() => listViewListener()}
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {listView ? (
                <ListView gists={publicGists} />
              ) : (
                <GridView gists={publicGists} />
              )}
              <Pagination />
            </>
          }
        ></Route>
        <Route
          path="/starred"
          element={
            listView ? (
              <ListView gists={starredGists} />
            ) : (
              <GridView gists={starredGists} />
            )
          }
        ></Route>
      </Routes>
    </section>
  );
}

export default PublicGists;
