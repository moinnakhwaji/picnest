import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const PinPage = ({ user }) => {
  const params = useParams();

  const {
    loading,
    fetchPin,
    pin,
    updatePin,
    addComment,
    deleteComment,
    deletePin,
  } = PinData();

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [pinValue, setPinValue] = useState("");

  const editHandler = () => {
    setTitle(pin.title);
    setPinValue(pin.pin);
    setEdit(!edit);
  };

  const updateHandler = () => {
    updatePin(pin._id, title, pinValue, setEdit);
  };

  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    addComment(pin._id, comment, setComment);
  };

  const deleteCommentHandler = (id) => {
    if (confirm("Are you sure you want to delete this comment?"))
      deleteComment(pin._id, id);
  };

  const navigate = useNavigate();

  const deletePinHandler = () => {
    if (confirm("Are you sure you want to delete this pin?"))
      deletePin(pin._id, navigate);
  };

  useEffect(() => {
    fetchPin(params.id);
  }, [params.id]);

  return (
    <div className="flex flex-col items-center bg-zinc-900 text-zinc-200 p-6 min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        pin && (
          <div className="bg-zinc-800 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl">
            <div className="w-full md:w-1/2 bg-zinc-950 rounded-t-lg md:rounded-l-lg md:rounded-t-none flex items-center justify-center">
              {pin.image && (
          <img
          src={pin.image.url}
          alt={pin.title}
          className="object-contain w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
        />
        
              )}
            </div>

            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                {edit ? (
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-zinc-700 border border-zinc-600 rounded-lg p-2 w-full mb-2 text-lg text-zinc-200"
                    placeholder="Enter Title"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-white">{pin.title}</h1>
                )}

                {pin.owner && pin.owner._id === user._id && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={editHandler}
                      className="text-purple-400 hover:text-purple-600"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={deletePinHandler}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                )}
              </div>

              {edit ? (
                <>
                  <textarea
                    value={pinValue}
                    onChange={(e) => setPinValue(e.target.value)}
                    className="bg-zinc-700 border border-zinc-600 rounded-lg p-2 w-full text-lg text-zinc-200"
                    rows="4"
                    placeholder="Enter Pin Description"
                  />
                  <button
                    onClick={updateHandler}
                    className="bg-purple-600 text-white py-2 px-4 rounded-lg mt-2 hover:bg-purple-700"
                  >
                    Update
                  </button>
                </>
              ) : (
                <p className="mb-6 text-lg text-zinc-300">{pin.pin}</p>
              )}

              {pin.owner && (
                <div className="flex items-center justify-between border-b border-zinc-700 pb-4 mb-4">
                  <Link
                    to={`/user/${pin.owner._id}`}
                    className="flex items-center gap-4"
                  >
                    <div className="rounded-full h-12 w-12 bg-zinc-600 flex items-center justify-center">
                      <span className="font-bold text-lg text-white">
                        {pin.owner.name.slice(0, 1)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {pin.owner.name}
                      </h2>
                      <p className="text-zinc-400">
                        {pin.owner.followers.length} Followers
                      </p>
                    </div>
                  </Link>
                </div>
              )}

              <form
                className="flex items-center gap-4 mt-4"
                onSubmit={submitHandler}
              >
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-lg text-zinc-200"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
                >
                  Add
                </button>
              </form>

              <hr className="my-6 border-zinc-700" />

              <div className="overflow-y-auto h-64 pr-2">
                {pin.comments && pin.comments.length > 0 ? (
                  pin.comments.map((e, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between mb-4"
                    >
                      <Link
                        to={`/user/${e.user}`}
                        className="flex items-start gap-4"
                      >
                        <div className="rounded-full h-10 w-10 bg-zinc-600 flex items-center justify-center">
                          <span className="font-bold text-lg text-white">
                            {e.name.slice(0, 1)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{e.name}</h3>
                          <p className="text-zinc-400">{e.comment}</p>
                        </div>
                      </Link>
                      {e.user === user._id && (
                        <button
                          onClick={() => deleteCommentHandler(e._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <MdDelete size={20} />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-400">No comments yet. Be the first to add one!</p>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PinPage;
