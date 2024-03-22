import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SortingOptions(props) {
  const {onSort, sortOption, setSortOption} = props;

  const options = [
    "Alphabetical",
    "Date Added",
    "Latest"
  ]

  const handleChange = (event) => {
    setSortOption(event.target.value);
    onSort(event.target.value);
  };

  return (
    <Box sx={{ width: 240 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortOption}
          label="Alphabetical"
          onChange={handleChange}
        >
          {options.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}