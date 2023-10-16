import xBeesConnect from "../helpers/xBeesConnect.ts";
import CopyInfoIcon from "../assets/icons/CopyInfoIcon.tsx";
import {styled} from "@mui/material/styles";

const Pointer = styled("div")({
  cursor: 'pointer',
});

export default function CopyInfoButton({value, ...otherProps}: {value: string; size?: number}) {
  const onClick = () => {
    if (value) {
      xBeesConnect().toClipboard(value);
    }
  };

  return (
    <Pointer><CopyInfoIcon onClick={onClick} {...otherProps} /></Pointer>
  );
}
