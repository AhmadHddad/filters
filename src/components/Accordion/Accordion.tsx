import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const StyledAccordion = withStyles({
   root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      width: '100%',
      boxShadow: 'none',
      '&:not(:last-child)': {
         borderBottom: 0,
      },
      '&:before': {
         display: 'none',
      },
      '&$expanded': {
         margin: 'auto',
      },
   },
   expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
   root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
         minHeight: 56,
      },
   },
   content: {
      '&$expanded': {
         margin: '12px 0',
      },
   },
   expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
   root: {
      padding: '8px 0px',
   },
}))(MuiAccordionDetails);

export type IAccordionItem = { body: any; title: any; id: string | number };
export type IAccordionList = IAccordionItem[];

export interface IAccordionProps {
   list?: IAccordionList;
   expandedAccordionId?: string;
   onChange?: (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => void;
}

export default function Accordion(props: IAccordionProps) {
   const { list, onChange, expandedAccordionId } = props;

   const controlled = Boolean(onChange);

   const [expanded, setExpanded] = React.useState<string | false>();

   const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
   };

   return (
      <div style={{ width: '100%' }}>
         {list?.map((li) => (
            <StyledAccordion
               key={li.id}
               square
               expanded={controlled ? expandedAccordionId === li.id : expanded === li.id}
               onChange={controlled ? onChange?.(li.id.toString()) : handleChange(li.id.toString())}
               id={li.id?.toString()}
            >
               <AccordionSummary expandIcon={<ExpandMoreIcon />}>{li.title}</AccordionSummary>
               <AccordionDetails>{li.body}</AccordionDetails>
            </StyledAccordion>
         ))}
      </div>
   );
}
