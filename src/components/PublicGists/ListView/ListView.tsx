import "./ListView.scss";
import { Table } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import moment from "moment";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CgGitFork } from "react-icons/cg";
import {
  addStarredGist,
  removeStarredGist,
  selectIsLoading,
  selectIsLoggedIn,
  selectStarredGists,
} from "../../../features/global/globalSlice";
import { useNavigate } from "react-router-dom";
import { forkGist } from "../../../app/services";
import { CircularProgress } from "@mui/material";
import { message } from "antd";

function ListView(props: { gists: any[] }) {
  const navgiate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((st) => selectIsLoggedIn(st));
  const isLoading = useAppSelector((st) => selectIsLoading(st));
  const starredGistIds = useAppSelector((st) => selectStarredGists(st)).map(
    (gist) => gist["id"]
  );
  const datasource = props.gists.map((gist, i) => {
    const date = gist["created_at"]
      ? moment(gist["created_at"]).format("D MMM YYYY hh:mm a")
      : "";
    return {
      key: i,
      id: gist["id"],
      avatar: (
        <img
          className="avatar"
          src={
            gist["repository"]
              ? gist["repository"]["owner"]["avatar_url"]
              : gist["owner"]["avatar_url"]
          }
        ></img>
      ),
      name: gist["repository"]
        ? gist["repository"]["owner"]["login"]
        : gist["owner"]["login"],
      date: date.slice(0, 11),
      time: date.slice(11),
      description: gist["repository"]
        ? gist["repository"]["description"]
        : gist["description"] || "No description",
      notebooks: gist["name"] || Object.keys(gist["files"]).join(", "),
      actions: (
        <div className="action-icons">
          {!!gist["starredGist"] || starredGistIds.includes(gist["id"]) ? (
            <AiFillStar onClick={(e) => removeStarGistHandler(e, gist)} />
          ) : (
            <AiOutlineStar onClick={(e) => addStarGistHandler(e, gist)} />
          )}
          {isLoggedIn && (
            <CgGitFork onClick={(e) => forkGistHandler(e, gist["id"])} />
          )}
        </div>
      ),
    };
  });
  const columns = [
    {
      title: " ",
      dataIndex: "avatar",
      key: "avatar",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Notebook(s)",
      dataIndex: "notebooks",
      key: "notebooks",
      ellipsis: true,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const removeStarGistHandler = (evt: any, gist) => {
    evt.stopPropagation();
    dispatch(removeStarredGist(gist["id"]));
  };

  const addStarGistHandler = (evt: any, gist) => {
    evt.stopPropagation();
    dispatch(addStarredGist(gist["id"]));
  };

  const forkGistHandler = (evt: any, id: string) => {
    evt.stopPropagation();
    forkGist(id).then(() => message.success("Gist forked successfully"));
  };

  return (
    <section
      className="list-view"
      style={{ justifyContent: isLoading ? "center" : "flex-start" }}
    >
      {isLoading ? (
        <CircularProgress color="success" />
      ) : (
        <Table
          dataSource={datasource}
          columns={columns}
          pagination={false}
          onRow={(gist) => ({
            onClick: () => navgiate(`/view/${gist["id"]}`),
          })}
        />
      )}
    </section>
  );
}

export default ListView;
