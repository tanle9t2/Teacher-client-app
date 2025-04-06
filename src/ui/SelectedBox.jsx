import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectedBox({ state, handleOnChange, data, defaultValue }) {
    return (
        <FormControl sx={{ m: 1, minWidth: 500, fontSize: 20 }}>
            <Select
                value={state || defaultValue}
                onChange={handleOnChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{
                    fontSize: 16,
                    textAlign: 'left',
                    paddingLeft: '8px',
                }}
            >
                <MenuItem sx={{
                    fontSize: 16,

                }} value="">
                    <em>{defaultValue}</em>
                </MenuItem >
                {data.map(item => <MenuItem sx={{
                    fontSize: 16,

                }} key={item.id} value={item.id}>{item.name}</MenuItem>)}
            </Select>
        </FormControl>
    );
}

export default SelectedBox

