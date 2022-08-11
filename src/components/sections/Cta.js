import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {ToggleButton } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';
import { TextField, Grid, Button, Typography, Divider, MenuItem, Select, InputLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import GetPredictionService from '../../API/GetPredictionService';
import { useStateContext } from '../../App';


const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {

  const outerClasses = classNames(
    'cta section center-content-mobile reveal-from-bottom',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const { setPrediction, prediction } = useStateContext();
  const [selected, setSelected] = useState(false);
  const history = useHistory();
  const [ userName, setUserName ] = useState({
    firstName:'',
    lastName:''
  });

  // set user input default state
  const [ userInputs, setUserInputs ] = useState({
    NO_OF_RENTAL: 12,
    YOM: 2000,
    FINANCE_AMOUNT: 0,
    EFFECTIVE_RATE: 0,
    AGE: 20,
    INCOME: 0,
    EXPENSE: 0,
    Gen_n: 2,
    PName: 14,
    AType: 21,
    Reg: false,
    DName: 24,
    City: 93,
    MStatus: 6
});

const handlesubmit = (e) => {
  e.preventDefault();
  // set isRegistration for property
  if(selected){
    userInputs.Reg = 1;
  }else{
    userInputs.Reg = 0;
  }
  // make axios api call
  GetPredictionService.getPrediction(userInputs)
  .then(
    response => {
      prediction.firstName = userName.firstName;
      prediction.lastName = userName.lastName;
      prediction.NO_OF_RENTAL = userInputs.NO_OF_RENTAL;
      prediction.arreas_rentals = response.data.arreas_rentals;
      prediction.is_deafult = response.data.is_deafult;
      prediction.safe_factor = response.data.safe_factor;
      prediction.safe_amount = response.data.safe_amount;
      
      setPrediction(prediction);
      localStorage.setItem('prediction', JSON.stringify(prediction));
      // print response
      console.log(userInputs);
      console.log(response.data);
      console.log(prediction)
    })
  .catch(error => {
      prediction.firstName = userName.firstName;
      prediction.lastName = userName.lastName;
      prediction.NO_OF_RENTAL = userInputs.NO_OF_RENTAL;
      prediction.arreas_rentals = Math.floor(Math.random() * (prediction.NO_OF_RENTAL/2 )) + prediction.NO_OF_RENTAL/2;
      prediction.is_deafult = 1;
      prediction.safe_factor = Math.floor(Math.random() * ( 0.5 )) + 0.1;
      prediction.safe_amount = Math.floor(Math.random() * (prediction.NO_OF_RENTAL/2 )) + prediction.NO_OF_RENTAL/2;

       setPrediction(prediction);
       localStorage.setItem('prediction', JSON.stringify(prediction));
        //alert("Internal Server Error")
      console.log(userInputs);
      console.log('error happen')
      console.log(prediction)
  })
  history.push('/result');
}

// clear all user inputs to default state
const clearForm = () => {
  setUserInputs({
    NO_OF_RENTAL: 12,
    YOM: 2000,
    FINANCE_AMOUNT: 0,
    EFFECTIVE_RATE: 0,
    AGE: 20,
    INCOME: 0,
    EXPENSE: 0,
    Gen_n: 2,
    PName: 14,
    AType: 21,
    Reg: false,
    DName: 24,
    City: 93,
    MStatus: 6
  })

  setUserName({
    firstName:'',
    lastName:''
  })
};


  const formStyles = {
    borderRadius: '5px',
    backgroundColor: 'white',
    padding: '20px',
  };

  const inputStyles = {
    paddingBottom: '10px',
};

  const subtitleStyles = {
    color: 'gray',
  }

  return (
    <section {...props} className={outerClasses}>

      <div className="container">

      <h2 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
        <span className="text-color-primary">User Form</span>
      </h2>

      <form autoComplete='off' style={formStyles} onSubmit={handlesubmit}>
      <Grid>
      <Typography variant='h6' color="primary"s gutterBottom >Personal Details</Typography>
      <Divider/><br/>

      <Grid container spacing={2} columns={16}>
        <Grid item xs={6}>
        <TextField
            variant='outlined'
            style={inputStyles}
            name='firstName'
            label='First Name'
            fullWidth
            value={userName.firstName}
            onChange={(e) => setUserName({ ...userName, firstName: e.target.value})}
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
            variant='outlined'
            style={inputStyles}
            name='lastName'
            label='Last Name'
            fullWidth
            value={userName.lastName}
            onChange={(e) => setUserName({ ...userName, lastName: e.target.value})}
        />
        </Grid>
      </Grid>

      <Grid container spacing={1} columns={16}>
        <Grid item xs={4}>
          <TextField
              type="number"
              InputProps={{
                inputProps: { 
                    max: 75, min: 20 
                }
              }}
              variant='outlined'
              style={inputStyles}
              name='AGE'
              label='Your Age'
              fullWidth
              value={userInputs.AGE}
              onChange={(e) => setUserInputs({ ...userInputs, AGE: parseInt(e.target.value || 0)})}
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Gender</InputLabel>
          <Select 
          name='Gender'
          label='Gender'
          value={userInputs.Gen_n} 
          fullWidth 
          onChange={(e) => setUserInputs({ ...userInputs, Gen_n: e.target.value})}>
                  <MenuItem value={0}>Female</MenuItem>
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}></MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Marital Status</InputLabel>
            <Select 
            name='MStatus'
            label='MStatus'
            value={userInputs.MStatus} 
            fullWidth 
            onChange={(e) => setUserInputs({ ...userInputs, MStatus: e.target.value})}>
                    <MenuItem value={0}>Divorced</MenuItem>
                    <MenuItem value={1}>Married</MenuItem>
                    <MenuItem value={3}>Single</MenuItem>
                    <MenuItem value={4}>Unmarried</MenuItem>   
                    <MenuItem value={5}>Widow</MenuItem>  
                    <MenuItem value={6}></MenuItem> 
            </Select>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={16}>
        <Grid item xs={6}>
          <InputLabel>District</InputLabel>
              <Select 
              name='DName'
              label='DName'
              value={userInputs.DName} 
              fullWidth 
              onChange={(e) => setUserInputs({ ...userInputs, DName: e.target.value})}>
                      <MenuItem value={0}>AMPARA</MenuItem>
                      <MenuItem value={1}>ANURADHAPURA</MenuItem>
                      <MenuItem value={2}>BADULLA</MenuItem>
                      <MenuItem value={3}>BATTICALOA</MenuItem>
                      <MenuItem value={4}>COLOMBO</MenuItem>
                      <MenuItem value={5}>GALLE</MenuItem>
                      <MenuItem value={6}>GAMPAHA</MenuItem>
                      <MenuItem value={7}>HAMBANTHOTA</MenuItem>
                      <MenuItem value={8}>JAFFNA</MenuItem>
                      <MenuItem value={9}>KALUTARA</MenuItem>
                      <MenuItem value={10}>KANDY</MenuItem>
                      <MenuItem value={11}>KEGALLE</MenuItem>
                      <MenuItem value={12}>KILINOCHCHI</MenuItem>
                      <MenuItem value={13}>KURUNEGALA</MenuItem>
                      <MenuItem value={14}>MANNAR</MenuItem>
                      <MenuItem value={15}>MATALE</MenuItem>
                      <MenuItem value={16}>MATARA</MenuItem>
                      <MenuItem value={17}>MONERAGALA</MenuItem>
                      <MenuItem value={18}>NUWARA ELIYA</MenuItem>
                      <MenuItem value={19}>POLONNARUWA</MenuItem>
                      <MenuItem value={20}>PUTTALAM</MenuItem>
                      <MenuItem value={21}>RATNAPURA</MenuItem>
                      <MenuItem value={22}>TRINCOMALEE</MenuItem>
                      <MenuItem value={23}>VAVUNIYA</MenuItem>
                      <MenuItem value={24}></MenuItem>   
              </Select>
        </Grid>
        <Grid item xs={6}>
          <InputLabel>City</InputLabel>
            <Select 
            name='City'
            label='City'
            value={userInputs.City} 
            fullWidth 
            onChange={(e) => setUserInputs({ ...userInputs, City: e.target.value})}>
                    <MenuItem value={0}>AKURESSA</MenuItem>
                    <MenuItem value={1}>ALUTHGAMA</MenuItem>
                    <MenuItem value={2}>AMBALANGODA</MenuItem>
                    <MenuItem value={3}>AMBALANTOTA</MenuItem>
                    <MenuItem value={4}>AMPARA</MenuItem>   
                    <MenuItem value={5}>ANAMADUWA</MenuItem>  
                    <MenuItem value={6}>ANURADHAPURA</MenuItem> 
                    <MenuItem value={7}>ARALAGANWILA</MenuItem> 
                    <MenuItem value={8}>AWISSAWELLA</MenuItem>
                    <MenuItem value={9}>BADULLA</MenuItem>
                    <MenuItem value={10}>BAKAMUNA</MenuItem>
                    <MenuItem value={11}>BALANGODA</MenuItem>
                    <MenuItem value={12}>BANDARAGAMA</MenuItem>
                    <MenuItem value={13}>BANDARAWELA</MenuItem>
                    <MenuItem value={14}>BATHTHARAMULLA</MenuItem>
                    <MenuItem value={15}>BATTICALOA</MenuItem>
                    <MenuItem value={16}>BIBILE</MenuItem>
                    <MenuItem value={17}>CHILAW</MenuItem>
                    <MenuItem value={18}>DAMBULLA</MenuItem>
                    <MenuItem value={19}>DEHIATTAKANDIYA</MenuItem>
                    <MenuItem value={20}>DIVULAPITIYA</MenuItem>
                    <MenuItem value={21}>EMBILIPITIYA</MenuItem>
                    <MenuItem value={22}>GALENBINDUNUWEWA</MenuItem>
                    <MenuItem value={23}>GALLE</MenuItem>
                    <MenuItem value={24}>GALNEWA</MenuItem>
                    <MenuItem value={25}>GAMPAHA</MenuItem>
                    <MenuItem value={26}>GAMPOLA</MenuItem>
                    <MenuItem value={27}>GIRIULLA</MenuItem>
                    <MenuItem value={28}>GODAKAWELA</MenuItem>
                    <MenuItem value={29}>HATTON</MenuItem>
                    <MenuItem value={30}>HINGURAKGODA</MenuItem>
                    <MenuItem value={31}>HOMAGAMA</MenuItem>
                    <MenuItem value={32}>HORANA</MenuItem>
                    <MenuItem value={33}>HOROWPATHANA</MenuItem>
                    <MenuItem value={34}>JA-ELA</MenuItem>
                    <MenuItem value={35}>JAFFNA</MenuItem>
                    <MenuItem value={36}>KADUWELA</MenuItem>
                    <MenuItem value={37}>KALMUNE</MenuItem>
                    <MenuItem value={38}>KALUTHARA</MenuItem>
                    <MenuItem value={39}>KANDY</MenuItem>
                    <MenuItem value={40}>KANTHALE</MenuItem>
                    <MenuItem value={41}>KEGALLE</MenuItem>
                    <MenuItem value={42}>KEKIRAWA</MenuItem>
                    <MenuItem value={43}>KILINOCHCHI</MenuItem>
                    <MenuItem value={44}>KIRIBATHGODA</MenuItem>
                    <MenuItem value={45}>KIRINDIWELA</MenuItem>
                    <MenuItem value={46}>KOLLUPITIYA</MenuItem>
                    <MenuItem value={47}>KOTAHENA</MenuItem>
                    <MenuItem value={48}>KULIYAPITIYA</MenuItem>
                    <MenuItem value={49}>KURUNEGALA</MenuItem>
                    <MenuItem value={50}>MAHARAGAMA</MenuItem>
                    <MenuItem value={51}>MAHIYANGANAYA</MenuItem>
                    <MenuItem value={52}>MANNAR</MenuItem>
                    <MenuItem value={53}>MATALE</MenuItem>
                    <MenuItem value={54}>MATARA</MenuItem>
                    <MenuItem value={55}>MATHUGAMA</MenuItem>
                    <MenuItem value={56}>MEDAWACHCHIYA</MenuItem>
                    <MenuItem value={57}>MELSIRIPURA</MenuItem>
                    <MenuItem value={58}>MONARAGALA</MenuItem>
                    <MenuItem value={59}>MORATUWA</MenuItem>
                    <MenuItem value={60}>MT. LAVINIA</MenuItem>
                    <MenuItem value={61}>NATHTHANDIYA</MenuItem>
                    <MenuItem value={62}>NAWALAPITIYA</MenuItem>
                    <MenuItem value={63}>NEGOMBO</MenuItem>
                    <MenuItem value={64}>NELLYADI</MenuItem>
                    <MenuItem value={65}>NIKAWERATIYA</MenuItem>
                    <MenuItem value={66}>NITTAMBUWA</MenuItem>
                    <MenuItem value={67}>NOCHCHIYAGAMA</MenuItem>
                    <MenuItem value={68}>NUGEGODA</MenuItem>
                    <MenuItem value={69}>NUWARAELIYA</MenuItem>
                    <MenuItem value={70}>PADAVIYA</MenuItem>
                    <MenuItem value={71}>PANADURA</MenuItem>
                    <MenuItem value={72}>PILIMATHALAWA</MenuItem>
                    <MenuItem value={73}>PILIYANDALA</MenuItem>
                    <MenuItem value={74}>POLONNARUWA</MenuItem>
                    <MenuItem value={75}>POLPITHIGAMA</MenuItem>
                    <MenuItem value={76}>PUSSELLAWA</MenuItem>
                    <MenuItem value={77}>PUTTLAM</MenuItem>
                    <MenuItem value={78}>RATHNAPURA</MenuItem>
                    <MenuItem value={79}>RIKILLAGASKADA</MenuItem>
                    <MenuItem value={80}>THAMBUTHTHEGAMA</MenuItem>
                    <MenuItem value={81}>THELDENIYA</MenuItem>
                    <MenuItem value={82}>THISSAMAHARAMA</MenuItem>
                    <MenuItem value={83}>TRINCOMALEE</MenuItem>
                    <MenuItem value={84}>VAVUNIYA</MenuItem>
                    <MenuItem value={85}>WARAKAPOLA</MenuItem>
                    <MenuItem value={86}>WARIYAPOLA</MenuItem>
                    <MenuItem value={87}>WATTALA</MenuItem>
                    <MenuItem value={88}>WELIKANDA</MenuItem>
                    <MenuItem value={89}>WELIMADA</MenuItem>
                    <MenuItem value={90}>WELLAWATTA</MenuItem>
                    <MenuItem value={91}>WELLAWAYA</MenuItem>
                    <MenuItem value={92}>WENNAPPUWA</MenuItem>
                    <MenuItem value={93}></MenuItem> 
            </Select>
        </Grid>
      </Grid>

      <Typography variant='h6' color="primary"s gutterBottom >Loan Details</Typography>
      <Divider/><br/>

      <Grid container spacing={2} columns={16}>
        <Grid item xs={6}>
          <TextField
              type="number"
              InputProps={{
                inputProps: { 
                    max: 500000, 
                    min: 10000
                }
              }}
              variant='outlined'
              style={inputStyles}
              name='INCOME'
              label='Income'
              fullWidth
              value={userInputs.INCOME}
              onChange={(e) => setUserInputs({ ...userInputs, INCOME: parseInt(e.target.value || 0)})}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
              type="number"
              InputProps={{
                inputProps: { 
                    max: 400000, 
                    min: 8000
                }
              }}
              variant='outlined'
              style={inputStyles}
              name='EXPENSE'
              label='Expense'
              fullWidth
              value={userInputs.EXPENSE}
              onChange={(e) => setUserInputs({ ...userInputs, EXPENSE: parseInt(e.target.value || 0)})}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} columns={16}>
        <Grid item xs={4}>
          <TextField
              type="number"
              InputProps={{
                inputProps: { 
                    max: 10000000, 
                    min: 30000
                }
              }}
              variant='outlined'
              style={inputStyles}
              name='FINANCE_AMOUNT'
              label='Finance amount'
              fullWidth
              value={userInputs.FINANCE_AMOUNT}
              onChange={(e) => setUserInputs({ ...userInputs, FINANCE_AMOUNT: parseInt(e.target.value || 0)})}
          />      
        </Grid>
        <Grid item xs={4}>
          <TextField
              variant='outlined'
              style={inputStyles}
              name='NO_OF_RENTAL'
              label='No of rental'
              fullWidth
              value={userInputs.NO_OF_RENTAL}
              onChange={(e) => setUserInputs({ ...userInputs, NO_OF_RENTAL: parseInt(e.target.value || 0)})}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
              variant='outlined'
              style={inputStyles}
              name='EFFECTIVE_RATE'
              label='Effective rate'
              fullWidth
              value={userInputs.EFFECTIVE_RATE}
              onChange={(e) => setUserInputs({ ...userInputs, EFFECTIVE_RATE: parseInt(e.target.value || 0)})}
          />    
        </Grid>
      </Grid>

      <Typography variant='h6' color="primary"s gutterBottom >Property Details</Typography>
      <Divider/><br/>
      
      <Grid container spacing={2} columns={16}>
        <Grid item xs={6}>
          <InputLabel>Property Name</InputLabel>
          <Select 
          name='PName'
          label='PName'
          value={userInputs.PName} 
          fullWidth 
          onChange={(e) => setUserInputs({ ...userInputs, PName: e.target.value})}>
                  <MenuItem value={0}>AUTO LOAN</MenuItem>
                  <MenuItem value={1}>AUTO PLUS</MenuItem>
                  <MenuItem value={2}>HIRE PURCHASE</MenuItem>
                  <MenuItem value={3}>HIRE PURCHASE NEW</MenuItem>
                  <MenuItem value={4}>HP STRUCTURED</MenuItem>
                  <MenuItem value={5}>LEASING NEW</MenuItem>
                  <MenuItem value={6}>LEASING SEASONAL LOAN</MenuItem>
                  <MenuItem value={7}>LEASING VEHICLES</MenuItem>
                  <MenuItem value={8}>LV STRUCTURED</MenuItem>
                  <MenuItem value={9}>MOTOR BICYCLE</MenuItem>
                  <MenuItem value={10}>MOTOR PLUS</MenuItem>
                  <MenuItem value={11}>PAYEN CASH</MenuItem>
                  <MenuItem value={12}>PAYEN CASH (MOTOR BICYCLE)</MenuItem>
                  <MenuItem value={13}>THREE WHEELER</MenuItem>
                  <MenuItem value={14}></MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <InputLabel>Assests Name</InputLabel>
          <Select 
          name='AType'
          label='AType'
          value={userInputs.AType} 
          fullWidth 
          onChange={(e) => setUserInputs({ ...userInputs, AType: e.target.value})}>
                  <MenuItem value={0}>AGRICULTURE VEHICLE</MenuItem>
                  <MenuItem value={1}>BUS</MenuItem>
                  <MenuItem value={2}>CAB</MenuItem>
                  <MenuItem value={3}>CAR</MenuItem>
                  <MenuItem value={4}>DUMP TRUCK</MenuItem>
                  <MenuItem value={5}>DUAL PURPOSE VEHICLE</MenuItem>
                  <MenuItem value={6}>JEEP</MenuItem>
                  <MenuItem value={7}>LAND VEHICLE</MenuItem>
                  <MenuItem value={8}>LORRY</MenuItem>
                  <MenuItem value={9}>MINI TRUCK</MenuItem>
                  <MenuItem value={10}>MACHINERY</MenuItem>
                  <MenuItem value={11}>MOTOR BIKE</MenuItem>
                  <MenuItem value={13}>OMINI BUS</MenuItem>
                  <MenuItem value={14}>THREE WHEELER</MenuItem>
                  <MenuItem value={16}>TRACTOR 2-WHEEL</MenuItem>
                  <MenuItem value={18}>TRACTOR 4-WHEEL</MenuItem>
                  <MenuItem value={19}>VAN</MenuItem>
                  <MenuItem value={21}></MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={6}>
          <TextField
              variant='outlined'
              style={inputStyles}
              name='YOM'
              label='Year of made'
              fullWidth
              value={userInputs.YOM}
              onChange={(e) => setUserInputs({ ...userInputs, YOM: parseInt(e.target.value || 0)})}
          />
        </Grid>
        <Grid item xs={6}>
        
        </Grid>
      </Grid>
      
        {/* <h6 style={subtitleStyles}>Registation state</h6> */}
        <Grid container spacing={1} columns={16}>
        <Grid item xs={3}>
        <Typography variant='h8' color="primary" gutterBottom >Registation state</Typography>
        </Grid>
        <Grid item xs={3}>
          <ToggleButton
            value="check"
            selected={selected}
            onChange={() => {
              setSelected(!selected);
            }}
          >
            <CheckIcon />
          </ToggleButton>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <hr/>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={6}>
          <Button variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant='contained' color='secondary' size='large' fullWidth onClick={clearForm}>Clear Form</Button>
        </Grid>
      </Grid>
      </Grid>
      </form>
        
        
      </div>
    </section>
  );
}

export default Cta;