//import propTypes from 'prop-types';

function Filter({ filterContact }) {
  return (
    <>
      <label htmlFor="filter" style={{ display: 'flex' }}>
        Find contact by name
      </label>
      <input type="search" id="filter" onChange={filterContact}></input>
    </>
  );
}

export default Filter;
