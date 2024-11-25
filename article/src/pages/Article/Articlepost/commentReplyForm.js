import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../../firebase";
import {
  doc,
  updateDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CommentReplyForm = ({
  documentName,
  uid,
  commentId,
  setReply,
  //   replying,
  replies,
}) => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState([]);
  // const [ifReplies, setIfReplies] = useState(false);
  useEffect(() => {
    // const messageRef = doc(db, "rooms", "roomA", "messages", "message1");
    const q = query(
      collection(db, "articles", documentName, "comments"),
      orderBy("created", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      setComments(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {
    comments.map((comm) => {
      if (comm?.data?.main.uid === uid) {
        setUserId((arr) => [
          ...arr,
          { name: comm?.data?.main.name, email: comm?.data?.main.email },
        ]);
      }
      const replies = comm?.data?.replies;
      replies.map((reply) => {
        if (reply.uid === uid) {
          setUserId((arr) => [
            ...arr,
            { name: reply.name, email: reply.email },
          ]);
        }
      });
    });
  }, [comments]);
  //   console.log(name);
  useEffect(() => {
    // if (userId[0]) {
    setEmail(userId[0]?.email);
    setName(userId[0]?.name);
    setComment("");
    // }
  }, [userId]);
  console.log(comment);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "articles", documentName, "comments", commentId);
    try {
      await updateDoc(docRef, {
        replies: [
          ...replies,
          {
            name: name,
            email: email,
            comment: comment,
            uid: uid,
            created: Timestamp.now(),
          },
        ],
        Timestamp: Timestamp.now(),
      });

      toast.success("Reply successfully posted", {
        autoClose: 2000,
      });
      if (!comments[0]) {
        const q = query(
          collection(db, "articles", documentName, "comments"),
          orderBy("created", "desc")
        );
        onSnapshot(q, (querySnapshot) => {
          setComments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      }
      // setEmail("");
      // setName("");
      setComment("");
      setReply(false);
    } catch (err) {
      toast.error("error in posting reply, try again", {
        autoClose: 2000,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      name="comment"
      //   style={{ transition: "display 0.5s, transform 10.5s" }}
      className="commentFormReplyCont"
    >
      <div className="commentForm reply">
        <div>
          <textarea
            placeholder="Write a comment..."
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div>
          <input
            placeholder="Name"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            required
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Post</button>
        </div>
      </div>
      <FontAwesomeIcon
        onClick={() => setReply(false)}
        icon={faCircleXmark}
        style={{ fontSize: "30px", position: "absolute", top: 0, right: 0 }}
      />
    </form>
  );
};

export default CommentReplyForm;
