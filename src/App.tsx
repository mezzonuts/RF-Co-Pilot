
import React from 'react';
import { Tabs, Tab } from '@mui/material'; // assuming MUI installed later

export default function App() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab label="Agent Workspace" />
      <Tab label="Knowledge Vault" />
      <Tab label="Tools" />
      <Tab label="Skills + LLM Settings" />
    </Tabs>
  );
}
