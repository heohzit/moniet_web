import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import ReactQuill, { Quill } from "react-quill";
import { useMemo, useRef } from "react";
import axios from "axios";

const TextEditor1 = (props) => {
  const data = props.data;
  const setData = props.setData;
  const url = props.url;

  const quillRef = useRef();

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "color",
  ];

  const modules = useMemo(() => {
    return {
      toolbar: {
        // 툴바에 넣을 기능을 순서대로 나열
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
        ],
      },
    };
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={data}
      formats={formats}
      onChange={setData}
      modules={modules}
    />
  );
};

Quill.register("modules/ImageResize", ImageResize);
const TextEditor2 = (props) => {
  const data = props.data;
  const setData = props.setData;
  const url = props.url;

  const quillRef = useRef();

  const imageHandler = () => {
    // input태그 생성
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // 비동기 요청을 동기처리하라는 명령
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        const form = new FormData();
        form.append("image", file[0]);
        const token = window.localStorage.getItem("token");
        axios
          .post(url, form, {
            headers: {
              contentType: "multipart/form-data",
              processData: false,
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            console.log(res.data);
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, "image", res.data);
            editor.setSelection(range.index + 1);
          })
          .catch((res) => {
            console.log("실패");
            console.log(res.response.status);
          });
      }
    };
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "image",
    "color",
  ];

  const modules = useMemo(() => {
    return {
      toolbar: {
        // 툴바에 넣을 기능을 순서대로 나열
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video"],
        ],
        handlers: {
          // 이미지업로드 버튼 클릭시 우리가 만든 함수가 동작하도록 설정
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    };
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={data}
      formats={formats}
      onChange={setData}
      modules={modules}
    />
  );
};

export { TextEditor1, TextEditor2 };
