import "../../../styles/adminStyles/about/aExp.css";
import React from "react";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  doc,
  query,
  collection,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@mui/material";
import ArticeImageList from "./articleImageList";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import ArticleDescription from "./articleDesc";
import { toast } from "react-toastify";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

function AdArticle({
  checked,
  Title,
  setEdit,
  prevDoc,
  description,
  featured,
  author,
  keywords,
}) {
  const handleClose = () => {
    setEdit(false);
  };
  const documentName = Title.split(" ").join("").toLowerCase();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const docRef = doc(db, "articles", documentName);
  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setArticle(doc.data());
    });
    const q = query(collection(db, "articles", documentName, "comments"));
    onSnapshot(q, (querySnapshot) => {
      setComments(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  // console.log(article.articleDescription);
  const checkedUpdate = article.posted;
  const featuredStatus = article.featured;
  const initialValue = article.content;
  const [submitted, setSubmitted] = useState(false);
  const [body, SetBody] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const contentRef = doc(db, "articles", documentName);

    try {
      await updateDoc(contentRef, {
        content: body,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 1500);
      toast.success("content submitted Successfully", {
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("error in submitting content, try again ", {
        autoClose: 2000,
      });
    }
  };

  const handleChange = async () => {
    const documentName = Title.split(" ").join("").toLowerCase();
    const postRef = doc(db, "articles", documentName);

    if (description && keywords) {
      try {
        await updateDoc(postRef, {
          posted: !checkedUpdate,
          postedDate: new Date(Date.now()),
        });
        toast.success("Public Status Changed Successfully", {
          autoClose: 2000,
        });
      } catch (err) {
        toast.error("error in Changing Public Status, try again", {
          autoClose: 2000,
        });
      }
    } else {
      toast.error("article description empty, cannot make public", {
        autoClose: 2000,
      });
    }
  };
  const handleFeatured = async () => {
    const documentName = Title.split(" ").join("").toLowerCase();
    const postRef = doc(db, "articles", documentName);
    try {
      await updateDoc(postRef, {
        featured: !featuredStatus,
      });
      toast.success("Successfully Updated Featured State", {
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("error in making article featured, try again", {
        autoClose: 2000,
      });
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleMediaClose = () => setOpen(false);
  // const isSmallScreen = window.matchMedia("(max-width: 1023.5px)").matches;

  // const [prevDoc, setPrevDoc] = React.useState({});

  // useEffect(() => {
  //   const docRef = doc(db, "articles", Title);
  //   onSnapshot(docRef, (doc) => {
  //     setPrevDoc(doc.data());
  //   });
  // }, []);
  // console.log(prevDoc);
  return (
    <form
      style={{ width: "90%", margin: "auto", marginTop: "30px" }}
      className="editSection"
    >
      <div className="modal__head" style={{ flexDirection: "column" }}>
        <h3 className="editArticleTitle">{Title}</h3>
        <p>
          Author: <b>{author}</b>
        </p>
        <span className="modal__close" onClick={handleClose}>
          x close
        </span>
      </div>
      <div>
        <div style={{ marginBottom: "20px" }}>
          <p>
            <i>
              add a short description of what the article is about and edit the
              author name
            </i>
          </p>
          {/* <div style={{display:"flex", justifyContent}} > */}
          <ArticleDescription
            toTitle={Title}
            toKeywords={keywords}
            comments={comments}
            prevDoc={prevDoc}
            toDesc={description}
            toAuthor={author}
            documentName={documentName}
            setEdit={setEdit}
          />
          <p>
            <i>
              click to create medias for this particular post, then copy and
              insert their links into the text editor as necessary
            </i>
          </p>
          <Button variant="outlined" onClick={handleOpen}>
            Media list
          </Button>

          {/* </div> */}
          <ArticeImageList
            open={open}
            onClose={handleMediaClose}
            title={Title}
          />
        </div>
        <div className="editor">
          <Editor
            apiKey="pbixvy8d4olmq0lb79b0x8tud7th3vwdwiog3kf5ijdxfktg"
            textareaName="Body"
            initialValue={initialValue}
            init={{
              menubar: "file edit view insert format tools table help",
              plugins:
                "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
              editimage_cors_hosts: ["picsum.photos"],
              toolbar:
                "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
              // toolbar_sticky: true,
              // toolbar_sticky_offset: isSmallScreen ? 102 : 108,
              autosave_ask_before_unload: true,
              autosave_interval: "30s",
              autosave_prefix: "{path}{query}-{id}-",
              autosave_restore_when_empty: false,
              autosave_retention: "2m",
              image_advtab: true,
              // link_list: [
              //   { title: "My page 1", value: "https://www.tiny.cloud" },
              //   { title: "My page 2", value: "http://www.moxiecode.com" },
              // ],
              // image_list: [
              //   { title: "My page 1", value: "https://www.tiny.cloud" },
              //   { title: "My page 2", value: "http://www.moxiecode.com" },
              // ],
              // image_class_list: [
              //   { title: "None", value: "" },
              //   { title: "Some class", value: "class-name" },
              // ],
              importcss_append: true,
              // file_picker_callback: (callback, value, meta) => {
              //   /* Provide file and text for the link dialog */
              //   if (meta.filetype === "file") {
              //     callback("https://www.google.com/logos/google.jpg", {
              //       text: "My text",
              //     });
              //   }

              //   /* Provide image and alt text for the image dialog */
              //   if (meta.filetype === "image") {
              //     callback("https://www.google.com/logos/google.jpg", {
              //       alt: "My alt text",
              //     });
              //   }

              //   /* Provide alternative source and posted for the media dialog */
              //   if (meta.filetype === "media") {
              //     callback("movie.mp4", {
              //       source2: "alt.ogg",
              //       poster: "https://www.google.com/logos/google.jpg",
              //     });
              //   }
              // },
              // templates: [
              //   {
              //     title: "New Table",
              //     description: "creates a new table",
              //     content:
              //       '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
              //   },
              //   {
              //     title: "Starting my story",
              //     description: "A cure for writers block",
              //     content: "Once upon a time...",
              //   },
              //   {
              //     title: "New list with dates",
              //     description: "New List with dates",
              //     content:
              //       '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
              //   },
              // ],
              // template_cdate_format:
              //   "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
              // template_mdate_format:
              //   "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
              height: 600,
              image_caption: true,
              quickbars_selection_toolbar:
                "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
              noneditable_class: "mceNonEditable",
              toolbar_mode: "sliding",
              contextmenu: "link image table",
              skin: "oxide",
              content_css: "default",
              content_style:
                "body { font-family:Poppins,sans-serif, Roboto Slab, Serif; font-size:16px }",
            }}
            onEditorChange={(newText) => SetBody(newText)}
          />
          <div
            style={{
              margin: "10px 10px 10px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Android12Switch
                    checked={featured}
                    onChange={handleFeatured}
                  />
                }
                label="Featured"
                labelPlacement="start"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Android12Switch checked={checked} onChange={handleChange} />
                }
                label="Public"
                labelPlacement="start"
              />
            </FormGroup>
          </div>
          <button
            style={{
              backgroundColor: "#755566",
              padding: "5px 10px",
              fontSize: "16px",
              border: "none",
              borderRadius: "4px",
              color: "white",
              // "&:hover": { backgroundColor: "#bab4c2" },
            }}
            onClick={handleSubmit}
          >
            {submitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AdArticle;
