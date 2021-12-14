import { useState } from "react";
import { createGist } from "../../app/services";
import "./CreateGist.scss";

function CreateGist() {
  const [state, setState] = useState({
    description: "",
    files: [{ name: "", content: "" }],
  });

  const createGistHandler = () => {
    const filesObj = {};
    state.files.forEach((file) => {
      filesObj[file.name] = { content: file.content };
    });
    createGist({ description: state.description, files: filesObj }).then(() =>
      setState((st) => ({
        description: "",
        files: [{ name: "", content: "" }],
      }))
    );
  };

  return (
    <section className="create-gist-container">
      <input
        value={state.description}
        onChange={(e) =>
          setState((st) => ({ ...st, description: e.target.value }))
        }
        placeholder="Enter description..."
      />
      {state.files.map((_, i) => (
        <>
          <input
            value={state.files[i].name}
            onChange={(e) =>
              setState((st) => ({
                ...st,
                files: st.files.map((file, _i) =>
                  i === _i ? { ...file, name: e.target.value } : file
                ),
              }))
            }
            placeholder="Enter file name..."
          />
          <textarea
            value={state.files[i].content}
            onChange={(e) =>
              setState((st) => ({
                ...st,
                files: st.files.map((file, _i) =>
                  i === _i ? { ...file, content: e.target.value } : file
                ),
              }))
            }
            placeholder="Enter file content..."
          />
        </>
      ))}

      <button
        onClick={() =>
          setState((st) => ({
            ...st,
            files: [...st.files, { name: "", content: "" }],
          }))
        }
      >
        Add File
      </button>
      <button onClick={() => createGistHandler()}>Create Gist</button>
    </section>
  );
}

export default CreateGist;
