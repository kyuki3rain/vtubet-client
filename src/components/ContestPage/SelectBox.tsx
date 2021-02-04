import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

type Props = {
  value: number;
  member_names: Array<string>;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  check_duplicate: (index: number) => boolean;
}

const SelectBox: React.FC<Props> = ({value, member_names, handleChange, check_duplicate}) => {
    return (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
        style={{
          flex: "1 1 auto"
        }}
      >
        {
          member_names.map((name, index) => {
            if(check_duplicate(index)) return;
            return (
              <MenuItem value={index}>{name}</MenuItem>
            );
          })
        }
      </Select>
    )
}

export default SelectBox;