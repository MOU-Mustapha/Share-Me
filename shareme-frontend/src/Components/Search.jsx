import React, { useState, useEffect } from "react";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import { feedQuery, searchQuery } from "../Utils/data.js";
import Spinner from "../Components/Spinner";

const Search = ({ searchTerm, setSearchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
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
  }, [searchTerm]);
  return (
    <div>
      {loading && <Spinner message="Searching For Pins..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;
