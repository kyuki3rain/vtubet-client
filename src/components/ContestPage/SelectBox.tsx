import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

type Props = {
  value: number;
  members: Array<string>;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectBox: React.FC<Props> = ({value, members, handleChange}) => {
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
          members.map((member, index) => {
            return (
              <MenuItem value={index}>{member}</MenuItem>
            );
          })
        }
      </Select>
    )
}

export default SelectBox;