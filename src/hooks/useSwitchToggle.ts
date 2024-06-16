import { useState } from "react";

export const useSwitchToggle = () => {
  const [toggledSwitch, setToggledSwitch] = useState<boolean>(false);

  const switchToggle = (toggleSwitch: boolean = false) => {
    setToggledSwitch(!toggleSwitch);
  };

  return {
    toggledSwitch,
    setToggledSwitch,
    switchToggle,
  };
};
