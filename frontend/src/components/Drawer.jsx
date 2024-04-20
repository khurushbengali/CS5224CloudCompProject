import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import FilterOptions from './FilterOptions';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const drawerWidth = 240;

export default function SideDrawer(props) {
    const { allFilterOptions, filterOptions, setFilterOptions, filterBooks } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
        setMobileOpen(!mobileOpen);
        }
    };

    const handleOptionSelect = (cat) => (value) => () => {
        const newFilterOptions = Object.assign({}, filterOptions)
        const currentIndex = newFilterOptions[cat].indexOf(value);
        const newChecked = [...newFilterOptions[cat]];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        newFilterOptions[cat] = newChecked
        setFilterOptions(newFilterOptions);
        filterBooks(newFilterOptions);
    }

    const drawer = (
        <div>
            <Toolbar />
            <Box>
                Filter
            <FilterAltIcon/>
            </Box>
            
            <Divider />
            {
                Object.entries(allFilterOptions).map(([cat, enums]) => (
                    <FilterOptions 
                        key={cat}
                        name={cat}
                        options={enums}
                        selectedOptions={filterOptions[cat]}
                        handleOptionSelect={handleOptionSelect(cat)}
                    />
                ))
            }
        </div>
    )
  return (
    <div>
        <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            {drawer}
        </Drawer>
        <Drawer
            variant="permanent"
            sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
        >
            {drawer}
        </Drawer>
    </div>
  );
}