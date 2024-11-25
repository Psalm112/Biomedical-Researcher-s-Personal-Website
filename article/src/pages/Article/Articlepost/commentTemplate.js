import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { formatDistance } from "date-fns";
import CommentReplyForm from "./commentReplyForm";

const CommentTemplate = ({
  comment,
  replies,
  documentName,
  commentId,
  uid,
}) => {
  // console.log(new Date());
  const [reply, setReply] = useState(false);
  // const handleReply = () => {
  //   const form = document.querySelector(".commentFormReplyCont");
  //   form.style.display = "block";
  //   form.style.transform = "translateX(0)";
  //   form.style.opacity = 1;
  //   // form.classList.add("show");
  // };

  return (
    <div className="cTemp">
      <div className="cTempCont">
        <div className="cTempIdentity">
          <FontAwesomeIcon className="cIcon" icon={faCircleUser} />
          <span>
            {comment?.data?.main.name.split(" ").join("").toLowerCase()}
          </span>
          {comment?.data?.main.uid === uid && (
            <span className="youTag">you</span>
          )}
          <span className="commentTime">
            {formatDistance(
              new Date(comment?.data?.main.created.toDate()),
              new Date(),
              {
                addSuffix: true,
                includeSeconds: true,
              }
            )}
          </span>
        </div>
        <div className="commentActions">
          <button onClick={() => setReply(true)}>
            <FontAwesomeIcon icon={faReply} />
            Reply
          </button>
          {/* <button>
            <FontAwesomeIcon icon={faPenToSquare} />
            Edit
          </button>
          <button >
            <FontAwesomeIcon icon={faTrashCan} />
            Delete
          </button> */}
        </div>
        <div className="cTempComment">{comment?.data?.main.comment}</div>
      </div>
      {reply && (
        <CommentReplyForm
          documentName={documentName}
          commentId={commentId}
          replies={replies}
          uid={uid}
          setReply={setReply}
          // replying={`@${comment?.data?.main.name
          //   .split(" ")
          //   .join("")
          //   .toLowerCase()}`}
        />
      )}
    </div>
  );
};

export default CommentTemplate;
