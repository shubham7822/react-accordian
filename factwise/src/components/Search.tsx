import React, { useState } from 'react';

interface SearchProps {
    searchCallback: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchCallback }) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    searchCallback(searchText);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        className="border border-black p-3 rounded-lg w-96"
        placeholder="Search..."
      />
      <button
        onClick={handleSearch}
        className="mx-5 bg-gray-500  p-3 rounded-lg"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
