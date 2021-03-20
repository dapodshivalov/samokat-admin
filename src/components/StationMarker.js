import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const StationMarker = ({ text, onClick }) => (
  <Wrapper
    alt={text}
    onClick={onClick}
  >
    <img src={"parking.png"} style={{
      top: "50%",
      left: "50%",
      width: "30px",
      height: "30px",
    }}/>
  </Wrapper>
);

StationMarker.defaultProps = {
  onClick: null,
};

StationMarker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default StationMarker;