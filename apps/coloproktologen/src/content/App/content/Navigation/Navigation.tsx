import { navigate } from "@router";
import React, { useEffect } from "react";
import { SwitchButton } from "@ui";
import site_states from "./constants/site_states";
import { useLocation } from "@tanstack/react-router";
import { navigationContainer, navigationContentContainer } from "./styles";

const Navigation: React.FC = () => {
  const [siteState, setSiteState] = React.useState(site_states[0]);
  const location = useLocation();

  useEffect(() => {
    if (window.location.pathname.includes("/app/")) {
      const path = window.location.pathname.split("/app/")[1];

      const state = site_states.find((state) => path.includes(state.value));
      if (state) {
        setSiteState(state);
      }
    }
  }, [location.pathname]);

  return (
    <div css={navigationContainer}>
      <div css={navigationContentContainer}>
        {site_states.map((state) => (
          <SwitchButton
            key={state.value}
            onClick={(state) => navigate(`/app/${state.value}`)}
            state={siteState}
            initialState={state}
            text={state.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Navigation;
