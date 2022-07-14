import React, {useState, useEffect} from "react";
import {MdDownloadForOffline} from "react-icons/md";
import {Link, useParams} from "react-router-dom";
import {v4 as uuidv4} from "uuid";

import {client, urlFor} from "../client";
import {pinDetailQuery, pinDetailMorePinQuery} from "../utils/data";
import Spinner from "./Spinner";

function PinDetail({user}) {
  const {pinId} = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        console.log(data);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({comments: []})
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {_type: "postedBy", _ref: user._id},
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };
  if (!pinDetail) return <Spinner message="Loading Photo..." />;

  return (
    <div
      className="flex xl:flex-row flex-col m-auto bg-white"
      style={{maxWidth: "1500px", borderRadius: "32px"}}
    >
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img
          src={pinDetail?.image && urlFor(pinDetail.image).url()}
          className="max-h-[500px] rounded-t-3xl rounded-b-lg object-cover"
          alt=""
        />
      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <a
              href={`${pinDetail.image.asset.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-dark text-[24px] opacity-75 ml-1"
            >
              <MdDownloadForOffline />
            </a>
          </div>
          <a
            href={pinDetail.destination}
            target="_blank"
            rel="noreferrer"
            className="bg-white flex items-center text-black gap-2 p-1 pl-4 pr-4 text-base rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            {pinDetail.destination.length > 20
              ? pinDetail.destination.slice(12, 30)
              : pinDetail.destination.slice(12)}
          </a>
        </div>
        <div>
          <h1 className="text-4xl font-bold break-words mt-3">
            {pinDetail.title}
          </h1>
          <p className="mt-3">{pinDetail.about}</p>
        </div>
        <Link
          to={`/user-profile/${pinDetail.postedBy?.id}`}
          className="flex gap-2 mt-5 items-center bg-white rounded-lg"
        >
          <img
            src={pinDetail.postedBy?.image}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="font-semibold capitalize text-lg">
            {pinDetail.postedBy?.userName}
          </p>
        </Link>
        <h2 className="mt-5 text-2xl">Comments</h2>
        <div clssName="max-h-370 overflow-y-auto">
          {pinDetail?.comments?.map((comment, i) => (
            <div
              className="flex gap-2 mt-5 bg-white items-center rounded-lg"
              key={i}
            >
              <img
                src={comment?.postedBy?.image}
                alt=""
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="flex flex-col">
                <p className="font-bold">{comment?.postedBy?.userName}</p>
                <p>{comment?.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap mt-6 gap 3">
          <Link
            to={`/user-profile/${pinDetail.postedBy?.id}`}
            className="flex mr-1 items-center bg-white rounded-lg"
          >
            <img
              src={pinDetail.postedBy?.image}
              alt=""
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </Link>
          <input
            className="flex-1 border-2 border-gray-100 outline-none p-2 px-4 rounded-2xl focus:border-gray-300"
            type="text"
            placeholder="Add Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="button"
            className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
            onClick={addComment}
          >
            {addingComment ? "Posting Comment" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PinDetail;
