import { renderApplicationHistory } from './overview-applicationHistory-widget.js';
import { renderCustomerDetails } from './overview-customerDetails-widget.js';
import { renderCustomerTasks } from './overview-customerTasks-widget.js';
import { renderMortgageDetails } from './overview-mortgageDetails-widget.js';

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
    { loanAmount: 70000 },
  ]
}

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

renderCustomerDetails(mount, customerDetailsParams);
renderMortgageDetails(mount, mortgageData);
renderCustomerTasks(mount, tasks);
renderApplicationHistory(mount, history);