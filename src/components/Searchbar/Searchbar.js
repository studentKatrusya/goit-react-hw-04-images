import { useState } from 'react';
import { Wrap, Form, Btn, Label, Input } from './Searchbar.styled';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchBar({ onSubmit }) {
  // const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.info('Enter your request.');
    } else {
      onSubmit(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <div>
      <Wrap>
        <Form onSubmit={handleSubmit}>
          <Btn type="submit">
            <Label>Search</Label>
          </Btn>

          <Input
            type="text"
            // name="searchQuery"
            value={searchQuery}
            onChange={handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Wrap>
      <ToastContainer autoClose={3000} theme={'colored'} />
    </div>
  );
}

export default SearchBar;
