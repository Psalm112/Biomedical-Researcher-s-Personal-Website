import React, { useState, useEffect } from "react";
import CommentTemplate from "./commentTemplate";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import CommentReplyTemp from "./commentReplyTemp";

const CommentList = ({ documentName, uid, repAscend, comAscend, repHover }) => {
  const [comments, setComments] = useState([]);
  const [orderByy, setOrderBy] = useState("desc");
  const [order, setOrder] = useState("Timestamp");
  useEffect(() => {
    if (!repHover) {
      if (repAscend) {
        setOrder("Timestamp");
        setOrderBy("asc");
      } else if (!repAscend) {
        setOrder("Timestamp");
        setOrderBy("desc");
      }
    } else {
      if (comAscend) {
        setOrder("created");
        setOrderBy("asc");
      } else if (!comAscend) {
        setOrder("created");
        setOrderBy("desc");
      }
    }
    // const messageRef = doc(db, "rooms", "roomA", "messages", "message1");
    // console.log(order, orderByy);
    const q = query(
      collection(db, "articles", documentName, "comments"),
      orderBy(order, orderByy)
    );
    onSnapshot(q, (querySnapshot) => {
      setComments(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [repHover, repAscend, comAscend]);

  return (
    <>
      {comments.map((comment) => (
        <div style={{ width: "100%" }}>
          <div>
            <CommentTemplate
              comment={comment}
              documentName={documentName}
              commentId={comment.id}
              uid={uid}
              replies={comment?.data?.replies}
            />
            {comment?.data?.replies[0] !== undefined && (
              <div className="replyCont">
                <div className="replyTemp">
                  {comment?.data?.replies.map((reply) => (
                    <CommentReplyTemp
                      reply={reply}
                      uid={uid}
                      // replying={`@${comment?.data?.main.name
                      //   .split(" ")
                      //   .join("")
                      //   .toLowerCase()}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
  // }
};

export default CommentList;
