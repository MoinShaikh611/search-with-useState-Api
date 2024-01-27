import { FC, use, useEffect, useState } from 'react';

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  // https://jsonplaceholder.typicode.com/todos



  const [q,setQ] = useState("")

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(true);
        }
      );
  }, []);

  const handleSearchResults = (e) => {
   setQ(e.target.value);
  }

  const renderList = (arr) => {
    return arr.filter(a => a.title.toLowerCase().includes(q)).map(a => <li>{a.title}</li>)
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <input type="text" value={q} onChange={handleSearchResults} />
        <p>{q}</p>
        <ul>
          {renderList(items)}
        </ul>
      </div>
    );
  }
};
