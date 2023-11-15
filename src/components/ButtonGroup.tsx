import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

export default function ButtonUTC(props:any) {
  return (
    <div style={{ display: "block"}}>
      <ButtonGroup>
      {/* <Button variant="secondary">Left Button</Button>
      <Button variant="primary">Middle Button</Button>    */}
      {props.button}
      </ButtonGroup>
    </div>
  );
}
