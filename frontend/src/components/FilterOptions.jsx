import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';

export default function FilterOptions(props) {
    const {name, options, selectedOptions, handleOptionSelect} = props;
    const [open, setOpen] = React.useState(true);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleClick = () => {
        setOpen(!open);
    };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={ name } />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {options.map(option => {
                const labelId = `checkbox-list-label-${option}`;
                return (
                    <ListItemButton key={option} sx={{ pl: 4 }} onClick={handleOptionSelect(option)} dense>
                        <ListItemIcon>
                            <Checkbox
                            edge="start"
                            checked={selectedOptions.indexOf(option) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText primary={option} />
                    </ListItemButton>
            )})}
        </List>
      </Collapse>
    </List>
  );
}