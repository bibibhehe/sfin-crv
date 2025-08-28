import { InputLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';

const listValue = [{status: 'ACTIVE', color: 'primary'}, {status: 'DEACTIVE', color: 'warning'}, {status: 'NO', color: 'error'}];

const ParticipantStatusSelection = (props) => {
  return (
    <>
      <InputLabel id={props.name}>{props.label}</InputLabel>
      <ToggleButtonGroup value={props.value} labelId={props.name} name={props.name} label={props.label} exclusive
        onChange={(event, value) => { props.onChange(props.name, value) }}
        aria-label={props.name}>
        {listValue.map(
          (element, i) => (
            <ToggleButton value={element.status} key={i} color={element.color}>{element.status}</ToggleButton>
          )
        )}
      </ToggleButtonGroup>
    </>
  );
};

export const ParticipantStatusSelectionNoLabel = (props) => {
  return (
    <>
      <ToggleButtonGroup value={props.value} exclusive
        onChange={(event, value) => {props.onChange(props.name, props.id, value)}}
        aria-label={props.name}>
        {listValue.map(
          (element, i) => (
            <ToggleButton value={element.status} key={i} color={element.color}>{element.status}</ToggleButton>
          )
        )}
      </ToggleButtonGroup>
    </>
  );
};

export default ParticipantStatusSelection;
