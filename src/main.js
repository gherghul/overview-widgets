import { renderApplicationHistory } from './overview-applicationHistory-widget.js';
import { renderCustomerDetails } from './overview-customerDetails-widget.js';
import { renderCustomerTasks } from './overview-customerTasks-widget.js';
import { renderMortgageDetails } from './overview-mortgageDetails-widget.js';


const STAGE_RULES = {
  Application: {
    triggers: [
      { keywords: ["Application in progress"], label: "In Progress" },
      { keywords: ["Application verification"], label: "Submitted" },
    ],
  },
  Verification: {
    triggers: [
      { keywords: ["Application verification"], label: "In Progress" },
      { keywords: ["Customer Clarification Validator"], label: "Further Information Required" },
      { keywords: ["Underwriter assessment"], label: "Approved" },
    ],
  },
  Underwriting: {
    triggers: [
      { keywords: ["Underwriter assessment"], label: "In Progress" },
      { keywords: ["Customer Clarification Underwriter"], label: "Further Information Required" },
      { keywords: ["AIP issued"], label: "Approved" },
      { keywords: ["Underwriter Reject"], label: "Declined" },
    ],
  },
  Offer: {
    triggers: [
      { keywords: ["Pre-Offer preparation", "Pre-Offer Validation"], label: "In Progress" },
      { keywords: ["Customer Clarification Pre Offer", "Customer Clarification Offer"], label: "Further Information Required" },
      { keywords: ["Offer approved", "Offer issued"], label: "Approved" },
      { keywords: ["UW Declined", "Property rejected"], label: "Declined" },
    ],
  },
  Completion: {
    triggers: [
      { keywords: ["Pre drawdown preparation", "Pre drawdown validation", "Pre Drawdown Assessment", "Drawdown assessment"], label: "In Progress" },
      { keywords: ["Customer Clarifications Pre-Drawdown", "Customer Clarifications Pre-Drawdown Assessment"], label: "Further Information Required" },
    ],
  },
};




/**
 * Builds a stage history array based on chronological status transitions.
 * Ensures that all stages appear even if not reached, and resets later stages
 * if the application moves back to an earlier stage.
 *
 * @param {Array<Object>} transitions - Chronological transitions array.
 * @returns {Array<Object>} Array of stage history objects.
 */
function buildApplicationHistory(transitions) {
  const stages = Object.keys(STAGE_RULES);
  const history = stages.map(stage => ({
    stage,
    status: "-",
    date: "-",
  }));

  let currentStageIndex = -1;

  for (const t of transitions) {
    const status = t.toStatus || "";
    const date = t.transitionDate;

    const matchedStage = stages.find(stage =>
      STAGE_RULES[stage].triggers.some(trigger =>
        trigger.keywords.some(kw =>
          status.toLowerCase().includes(kw.toLowerCase())
        )
      )
    );

    if (!matchedStage) continue;

    const stageIndex = stages.indexOf(matchedStage);

    // reassessment logic
    if (stageIndex < currentStageIndex) {
      for (let i = stageIndex + 1; i < stages.length; i++) {
        history[i] = { stage: stages[i], displayStatus: "-", dateTime: "-" };
      }
    }

    const trigger = STAGE_RULES[matchedStage].triggers.find(trigger =>
      trigger.keywords.some(kw => status.toLowerCase().includes(kw.toLowerCase()))
    );
    const formattedDate = new Date(date)
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "");
    history[stageIndex] = {
      stage: matchedStage,
      status: trigger?.label || "-",
      date: formattedDate,
    };

    currentStageIndex = stageIndex;
  }

  return history;
}



const mount = document.getElementById('overview');


const applicants = [
  {
    role: "Main applicant",
    name: "Steven Jones",
    dob: "01/01/1990",
    address: "1 main street, Carlow",
    phone: "086 1234567",
    email: "Steven.Jones@gmail.com",
  },
  {
    role: "Co-applicant",
    name: "Anne Jones",
    dob: "21/01/1992",
    address: "1 main street, Carlow",
    phone: "086 1234567",
    email: "Anne.Jones@gmail.com",
  }
];
const customerDetailsParams = {
  applicants,
  applicationStatus: "Offer approved",
  additionalData: [
    { offerSubmittedOn: '21/06/2025' },
    { applicationValidated: true },
    { loanAmount: '€70,000' },
    { integrationCompleted: { value: 'Yes', timestamp: '2025-10-30T14:22:00Z', labelTimestamp: 'Integration completed on' } },
  ],
};


const mortgageData = {
  mortgageType: 'First time buyer',
  requestedAmount: '€400,000',
  loanTerm: '25 years 4 months',
  currentValue: '€450,000',
  productName: 'Flex Mortgage',
  loanToValue: '80%',
  rate: '3%',
  propertyAddress: '52 Beachfield, Co Dublin',
};



const history = [
  { stage: 'Application', status: 'Submitted', date: '01/09/2025 11:53' },
  { stage: 'Verification', status: 'Approved', date: '02/09/2025 12:50' },
  { stage: 'Approval', status: 'Approved', date: '13/09/2025 14:24' },
  { stage: 'Offer', status: 'Approved', date: '20/09/2025 07:45' },
  { stage: 'Completion', status: '-', date: '-' },
];

const tasks = [
  {
    title: 'Last 2 years account statements',
    status: 'Open',
    lastUpdatedDate: '01/09/2025',
    lastUpdatedBy: 'Kevin Martin',
    expiryDate: '31/12/2025',
  },
  {
    title: "Reason for unpaid fee’s",
    status: 'Received',
    lastUpdatedDate: '12/09/2025',
    lastUpdatedBy: 'Steven Jones',
    expiryDate: '-',
  },
  {
    title: 'Estimates for works',
    status: 'Open',
    lastUpdatedDate: '02/09/2025',
    lastUpdatedBy: 'Kevin Martin',
    expiryDate: '-',
  },
];

const transitions = [
  {
    "currentStatus": "Funds released",
    "fromStatus": "Get A Mortgage Estimate",
    "toStatus": "Application In Progress",
    "transitionDate": "2023-12-08T12:40:12.63Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "Application In Progress",
    "toStatus": "Application Verification",
    "transitionDate": "2023-12-08T15:35:03.287Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "Application Verification",
    "toStatus": "Underwriter Assessment",
    "transitionDate": "2023-12-08T15:51:57.867Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "Underwriter Assessment",
    "toStatus": "AIP issued",
    "transitionDate": "2023-12-08T16:19:17.743Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "AIP issued",
    "toStatus": "PreOfferInProgress",
    "transitionDate": "2023-12-08T16:24:32.123Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "PreOfferInProgress",
    "toStatus": "Pre Offer Validation",
    "transitionDate": "2023-12-08T16:32:06.323Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "Pre Offer Validation",
    "toStatus": "Offer assessment",
    "transitionDate": "2023-12-11T09:19:05.343Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "Offer assessment",
    "toStatus": "Customer Offer clarification",
    "transitionDate": "2023-12-11T09:32:54.03Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "Customer Offer clarification",
    "toStatus": "Offer assessment",
    "transitionDate": "2023-12-11T09:54:44.893Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "Offer assessment",
    "toStatus": "Offer reviewed by Credit Risk",
    "transitionDate": "2023-12-11T10:23:32.597Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "Offer reviewed by Credit Risk",
    "toStatus": "Offer Approved",
    "transitionDate": "2023-12-11T10:24:38.217Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "Offer Approved",
    "toStatus": "Offer issued",
    "transitionDate": "2023-12-11T10:30:43.803Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "Offer issued",
    "toStatus": "Pre drawdown preparation",
    "transitionDate": "2023-12-11T11:20:32.367Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "Pre drawdown preparation",
    "toStatus": "Offer assessment",
    "transitionDate": "2023-12-11T11:38:36.323Z"
  },
  {
    "currentStatus": "Funds released",
    "fromStatus": "Offer assessment",
    "toStatus": "Customer Offer clarification",
    "transitionDate": "2023-12-11T11:48:06.313Z"
  }
];


console.log(buildApplicationHistory(transitions));




renderCustomerDetails(mount, customerDetailsParams);
renderMortgageDetails(mount, mortgageData);
renderCustomerTasks(mount, tasks);
renderApplicationHistory(mount, buildApplicationHistory(transitions));