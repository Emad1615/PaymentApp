import Select from 'react-select';
import styled from 'styled-components';
const StyledSelect = styled(Select)`
  flex: 1;
  outline: none;
  width: 100%;
  outline: none;
`;
function CustomSelect({
  options,
  value,
  setValue,
  isMulti = false,
  placeholder,
}) {
  return (
    <StyledSelect
      isRtl={true}
      isSearchable={true}
      isClearable={true}
      name="color"
      options={options}
      placeholder={placeholder}
      isMulti={isMulti}
      defaultValue={value}
      value={value}
      onChange={(e) => setValue(e)}
    />
  );
}

export default CustomSelect;
