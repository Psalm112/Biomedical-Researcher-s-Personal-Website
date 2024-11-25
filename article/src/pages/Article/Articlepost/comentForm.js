import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const CommentForm = ({ documentName, uid }) => {
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
    // if (userId[0]) {
    // setEmail(userId[0]?.email);
    // setName(userId[0]?.name);
    // setComment("");
    // }
  }, [comments]);
  // console.log(userId);
  useEffect(() => {
    // if (userId[0]) {
    setEmail(userId[0]?.email);
    setName(userId[0]?.name);
    setComment("");
    // }
  }, [userId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "articles", documentName, "comments"), {
        main: {
          name: name,
          email: email,
          comment: comment,
          uid: uid,
          created: Timestamp.now(),
        },
        replies: [],
        Timestamp: Timestamp.now(),
        created: Timestamp.now(),
      });
      toast.success("Comment successfully posted", {
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
    } catch (err) {
      toast.error("error in posting comment, try again", {
        autoClose: 2000,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} name="comment">
      <div className="commentForm">
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
    </form>
  );
};

export default CommentForm;
