import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { searchQuery, feedQuery } from "../Utils/data.js";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((res) => {
        setPins(res);
      });
      setLoading(false);
    } else {
      client.fetch(feedQuery).then((res) => {
        setPins(res);
        setLoading(false);
      });
    }
  }, [categoryId]);
  if (loading) {
    return <Spinner message="We Are Adding New Ideas To Your Feed!" />;
  }
  if(!pins?.length ) {
    return <h2>No Pins Available</h2>
  }
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
