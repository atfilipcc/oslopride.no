import theme from "@/utils/theme";
import React from "react";
import styled from "styled-components";
import Selectors from "./Selectors";
import Toggles from "./Toggles";

const Filter = ({ selectors, defaultSelector, toggles }) => (
  <Wrapper>
    <Selectors selectors={selectors} defaultSelector={defaultSelector} />
    <Toggles toggles={toggles} />
  </Wrapper>
);

export default Filter;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 3px solid ${theme.purple};
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;