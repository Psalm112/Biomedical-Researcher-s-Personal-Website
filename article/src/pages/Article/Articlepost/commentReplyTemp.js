import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { formatDistance } from "date-fns";

const CommentReplyTemp = ({ reply, uid }) => {
  return (
    <div className="cTemp">
      <div className="cTempCont">
        <div className="cTempIdentity">
          <FontAwesomeIcon className="cIcon" icon={faCircleUser} />
          <span>{reply.name.split(" ").join("").toLowerCase()}</span>
          {reply.uid === uid && <span className="youTag">you</span>}
          <span className="commentTime">
            {formatDistance(new Date(reply?.created.toDate()), new Date(), {
              addSuffix: true,
              includeSeconds: true,
            })}
          </span>
        </div>
        <div className="commentActions"></div>
        <div className="cTempComment">{reply.comment}</div>
      </div>
    </div>
  );
};

export default CommentReplyTemp;
