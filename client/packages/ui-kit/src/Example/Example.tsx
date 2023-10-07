import * as React from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { TextField } from '@mui/material';

export type ExampleProps = React.HtmlHTMLAttributes<HTMLParagraphElement>;

const PREFIX = 'Example';
const classes = { root: `${PREFIX}-root` };

const Root = styled('p')({
  [`&.${classes.root}`]: {
    color: 'red',
  },
});

const Example: React.FC = (props: ExampleProps) => {
  const { className, ...other } = props;

  const rootCN = clsx(classes.root, className);

  return (
    <Root {...other} className={rootCN}>
      <TextField/>
      example component
    </Root>
  );
};

export default Example;
