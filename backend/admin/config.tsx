/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';

function CustomLogo ({ width = 30, height = 30, className='' }) {
  return (<h3 css={{
      display: 'flex',
      justifyContent:'space-between',
      width:'200px'
    }}>
    GyaniGurs
  </h3>)
}

export const components = {
  Logo: CustomLogo
}
