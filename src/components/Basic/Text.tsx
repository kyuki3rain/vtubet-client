import React from 'react'
import Typography from '@material-ui/core/Typography';

type Props = {
  color?: string;
  variant?: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body2" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "overline" | "srOnly" | undefined;
  textAlign?: "inherit" | "left" | "center" | "right" | "justify" | "end" | "initial" | "start" | "-moz-initial" | "revert" | "unset" | "match-parent" | undefined;
}

const Text: React.FC<Props> = ({color = "black", variant = "body2", textAlign = "start", children}) => {
  return (
    <Typography variant={variant} style={{
        color: color,
        textAlign: textAlign
      }}>
      {children}
    </Typography>
  )
}

export default Text;