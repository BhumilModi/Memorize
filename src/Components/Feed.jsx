import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import MasonaryLayout from "./MasonaryLayout";
import Spinner from "./Spinner";
import {client} from "../client";
import {feedQuery, searchQuery} from "../utils/data";

function Feed() {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const {categoryId} = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are getting you , your UNIQUE feed..." />;

  if (!pins?.length) return <h2>No Photos in this Category...</h2>;

  return <div>{pins && <MasonaryLayout pins={pins} />}</div>;
}

export default Feed;
