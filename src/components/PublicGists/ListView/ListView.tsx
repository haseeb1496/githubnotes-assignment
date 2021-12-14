import "./ListView.scss";
import { Table } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import moment from "moment";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CgGitFork } from "react-icons/cg";
import {
  addStarredGist,
  removeStarredGist,
  selectStarredGists,
} from "../../../features/global/globalSlice";
import { useNavigate } from "react-router-dom";
import { forkGist } from "../../../app/services";

function ListView(props: { gists: any[] }) {
  const navgiate = useNavigate();
  const dispatch = useAppDispatch();
  const starredGistIds = useAppSelector((st) => selectStarredGists(st)).map(
    (gist) => gist["id"]
  );
  const datasource = props.gists.map((gist) => {
    const date = gist["created_at"]
      ? moment(gist["created_at"]).format("D MMM YYYY hh:mm a")
      : "";
    return {
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
          <CgGitFork onClick={(e) => forkGistHandler(e, gist["id"])} />
        </div>
      ),
      raw_url: gist["files"][Object.keys(gist["files"])[0]]["raw_url"],
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
    },
    {
      title: "Notebook(s)",
      dataIndex: "notebooks",
      key: "notebooks",
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
    forkGist(id);
  };

  return (
    <section className="list-view">
      <Table
        dataSource={datasource}
        columns={columns}
        pagination={false}
        onRow={(gist) => ({
          onClick: () => navgiate(`/view/${gist["id"]}`),
        })}
      />
    </section>
  );
}

export default ListView;
