import { useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';

const PredictedOutputField = ({ index }) => {
  const { values } = useFormikContext();
  const area = parseFloat(values.herbals?.[index]?.area) || 0;
  const output = parseFloat(values.herbals?.[index]?.output) || 0;
  const total = area * output;

  return (
    <TextField
      fullWidth
      variant="filled"
      label="คาดการณ์ผลผลิต (กก./ปี)"
      value={total}
      InputProps={{
        readOnly: true,
      }}
      sx={{ gridColumn: 'span 2' }}
    />
  );
};

export default PredictedOutputField;