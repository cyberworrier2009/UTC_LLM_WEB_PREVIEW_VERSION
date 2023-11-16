// import {
//     Card,
//     CardTitle,
//     CardBody,
//     CardFooter,
//     Gallery,
//     Title,
//     DescriptionList,
//     DescriptionListGroup,
//     DescriptionListTerm,
//     DescriptionListDescription,
//     Divider
//   } from '@patternfly/react-core';

// function PromptCard(props){

//     return(
//         <>
//      <Card isClickable className='text-white bg-[#212427] align-content: center'>
//        <CardTitle className='align-content: center;'>
//          <Title headingLevel="h4" size="xl">
//             {props.title}
//          </Title>
//        </CardTitle>
//        <CardBody>
//          <DescriptionList>
//            <DescriptionListGroup>
//              <DescriptionListTerm>{props.description}</DescriptionListTerm>
//            </DescriptionListGroup>
//           </DescriptionList>
//        </CardBody>
//        {/* <Divider />
//         <CardFooter>
//          <a href="#">View Settings</a>
//        </CardFooter> */}
//      </Card>
//      </>
//     );
// };

// export default PromptCard;

import * as React from "react";
import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import { useDispatch } from "react-redux";
import { message } from "../slices/prompt-slice-message";

export default function PromptCard(props) {
  const dispatch = useDispatch();

  const handleDispatch = () => {
    dispatch({type:"promptSelect/message", payload: props.description})
  };
  return (
    <Card variant="solid" onClick={handleDispatch}>
      <CardContent>
        <Typography level="title-md" textColor="inherit">
          {props.title}
        </Typography>
        <Typography textColor="inherit">{props.description}</Typography>
      </CardContent>
      {/* <CardActions buttonFlex="0 1 120px">
        <IconButton variant="outlined" onClick={handleDispatch} color="neutral">
          <FavoriteBorder />
        </IconButton>
      </CardActions> */}
    </Card>
  );
}
