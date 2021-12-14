import "./Pagination.scss";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { getPublicGists } from "../../../app/services";
import {
  setPublicGists,
  setIsLoading,
  selectIsLoading,
} from "../../../features/global/globalSlice";
import {
  selectNumberOfResults,
  selectPageNumber,
  setPageNumber,
} from "../../../features/page/pageSlice";
import { useState } from "react";

function Pagination() {
  const pageNumber = useAppSelector((st) => selectPageNumber(st));
  const numberOfResults = useAppSelector((st) => selectNumberOfResults(st));
  const isLoading = useAppSelector((st) => selectIsLoading(st));
  const dispatch = useAppDispatch();
  const [pageInput, setPageInput] = useState(pageNumber);

  const previousPageButton = (
    <button disabled={!!isLoading} onClick={() => previousPageHandler()}>
      <IoIosArrowRoundBack />
      Previous Page
      <div></div>
    </button>
  );

  const previousPageHandler = () => {
    fetchGistData(+pageNumber - 1);
  };

  const nextPageHandler = () => {
    fetchGistData(+pageNumber + 1);
  };

  const onChangeHandler = (evt: any) => {
    setPageInput(evt.target.value);
  };

  const onKeyUpHandler = (evt: any) => {
    if (
      evt.key === "Enter" &&
      +pageNumber !== +evt.target.value &&
      !!pageInput
    ) {
      if (+pageInput <= 0) {
        setPageInput(1);
      }
      getPublicGists(evt.target.value, numberOfResults).then((res) => {
        dispatch(setPageNumber(evt.target.value));
        dispatch(setIsLoading(false));
        dispatch(setPublicGists(res.data));
      });
    }
  };

  const fetchGistData = (page: number) => {
    dispatch(setIsLoading(true));
    getPublicGists(page, numberOfResults).then((res) => {
      setPageInput(page);
      dispatch(setPageNumber(page));
      dispatch(setIsLoading(false));
      dispatch(setPublicGists(res.data));
    });
  };

  return (
    <section className="pagination">
      <div></div>
      <div className="buttons-container">
        {+pageNumber !== 1 && previousPageButton}
        <button disabled={!!isLoading} onClick={() => nextPageHandler()}>
          <div></div>
          Next Page
          <IoIosArrowRoundForward />
        </button>
      </div>
      <div className="page-info">
        Page{" "}
        <input
          value={pageInput}
          type="number"
          onChange={(e) => onChangeHandler(e)}
          onKeyUp={(e) => onKeyUpHandler(e)}
        />
      </div>
    </section>
  );
}

export default Pagination;
