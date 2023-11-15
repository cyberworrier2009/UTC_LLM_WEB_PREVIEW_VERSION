import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
export default function ButtonUTC(props) {
    return (<div style={{ display: "block" }}>
      <ButtonGroup>
      {/* <Button variant="secondary">Left Button</Button>
        <Button variant="primary">Middle Button</Button>    */}
      {props.button}
      </ButtonGroup>
    </div>);
}
