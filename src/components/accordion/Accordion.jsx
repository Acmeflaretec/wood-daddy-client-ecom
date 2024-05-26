import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionBox(props) {

  const {accDetails} = props

  return (
    <div style={{marginTop:'30px'}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Product details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           {accDetails.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Specifications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {accDetails.specification}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Dimension</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
         {accDetails.dimension}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Warranty</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {accDetails.warranty}
          </Typography>
        </AccordionDetails>
      </Accordion>
    
    </div>
  );
}