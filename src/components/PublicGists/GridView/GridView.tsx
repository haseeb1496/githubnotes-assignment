import "./GridView.scss";
import moment from "moment";
import Gist from "react-gist";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectIsLoading } from "../../../features/global/globalSlice";
import { CircularProgress } from "@mui/material";
import { Empty } from "antd";

function GridView(props: { gists: any[] }) {
  const navigate = useNavigate();
  const isLoading = useAppSelector((st) => selectIsLoading(st));

  return (
    <section
      className="grid-view"
      style={{
        justifyContent:
          isLoading || !props.gists.length ? "center" : "flex-start",
        alignItems: isLoading || !props.gists.length ? "center" : "flex-start",
      }}
    >
      {isLoading ? (
        <CircularProgress color="success" />
      ) : !props.gists.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        props.gists.map((gist) => {
          const date = gist["created_at"]
            ? moment(gist["created_at"]).fromNow()
            : "";
          return (
            <div
              className="gist-container"
              onClick={() => navigate(`/view/${gist["id"]}`)}
            >
              <div className="content">
                <Gist
                  id={gist["id"]}
                  file={
                    !!gist["files"] && !!Object.keys(gist["files"]).length
                      ? gist["files"][Object.keys(gist["files"])[0]]["filename"]
                      : ""
                  }
                />
              </div>
              <hr />
              <div className="user-info">
                <img
                  className="avatar"
                  src={
                    gist["repository"]
                      ? gist["repository"]["owner"]["avatar_url"]
                      : gist["owner"]["avatar_url"]
                  }
                />
                <div className="file-info-container">
                  <span className="user-name">
                    {gist["repository"]
                      ? gist["repository"]["owner"]["login"]
                      : gist["owner"]["login"]}
                    /
                    <span className="file-name">
                      {!!gist["files"] && !!Object.keys(gist["files"]).length
                        ? Object.keys(gist["files"])[0]
                        : ""}
                    </span>
                  </span>
                  <span>Created {date}</span>
                  <span className="description">
                    {gist["repository"]
                      ? gist["repository"]["description"]
                      : gist["description"] || ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}

export default GridView;
