import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import { Link, useHistory } from 'react-router-dom';
import {Slider, makeStyles, CardContent, Card, Chip, Button, CircularProgress } from '@material-ui/core';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}
const ResultComponent = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  

  
  const [ isDeafult, setIsDeafult ] = useState(false);
  const history = useHistory();
  const [result, setResult ] = useState({
    firstName:'.....', 
    lastName:'.....',
    arreas_rentals:0,
    safe_amount:100000,
    safe_factor:0.45,
    is_deafult: 2,
    NO_OF_RENTAL: 0
    });

  useEffect(() => {
    const timer = setTimeout(() => {
    if((localStorage.getItem('prediction')))
    setResult(JSON.parse(localStorage.getItem('prediction')));
    // if(result.firstName == 'gihan' ){
    //   setIsDeafult(false)
    // } else {
    //   setIsDeafult(true)
    // }
    console.log(result.firstName);
    }, 2000);
    return () => clearTimeout(timer);
  },[]);

  const clearForm = () => {
    localStorage.removeItem('prediction');
    history.push('/');
  }

  const approveLoan = () => {
    localStorage.removeItem('prediction');
    {/* save data to backend */}
    history.push('/');
  }
  
  const useStyles = makeStyles({
    root: {
        minWidth: 275,
        width: '60%',
        backgroundColor: '#242424',
        borderRadius: 40
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      statestyle: {
        color: 'white',
        fontSize: 25
      },
      safefactorstyle: {
        color: 5 > 10 ? 'red' : 'gray',
        margin: 10
      },
      loanamountstyle: {
        color: 'white',
        fontSize: 22
      }
  });

  const sectionHeader = {
    title: 'Result Summery',
    paragraph:''
  };

  const classes = useStyles();

  {/* predicted loan amount + clear form + approve lone */}
  let loanAmountLabel;
  let customerStatus;

  if (result.is_deafult == 1) {

    loanAmountLabel = <div>
                      <p className={classes.safefactorstyle}>
                      System can propose you to safe finance amount
                      </p>
                      <p className={classes.loanamountstyle}>
                      {`${result.safe_amount} LKR`}
                      </p>
                      <Button variant='contained' color='primary' size='large' fullWidth onClick={clearForm}>Back to home</Button>
                      </div>

  } else if (result.is_deafult == 0 ) {
    loanAmountLabel = <div>
                        <p className={classes.safefactorstyle}>
                        You are predicted as a secured borrower.
                        </p>
                        <Button variant='contained' color='primary' size='large' fullWidth  onClick={approveLoan} >Back to home</Button>
                        </div>
  } else {
    loanAmountLabel = <div>
      <p className={classes.safefactorstyle}>
        Predicting . . .
      </p>
    </div>
  }

  if (result.is_deafult == 1) {

    customerStatus =  <div>
                        <h4 className={classes.statestyle}>{`Hi, ${result.firstName} ${result.lastName}`}</h4>
                        <br/>
                        <img borderRadius={15} src={require('./../../assets/images/rejected.png')} alt="Rejected" width='20%' height='20%' />
                        <p className={classes.safefactorstyle}>
                        Predicted arreas rental count from <i>TapToLoan</i>
                        </p>
                        <Chip color='primary' label={`${result.arreas_rentals} / ${result.NO_OF_RENTAL}`}/>
                      </div>
  } else if (result.is_deafult == 0) {  
  
    customerStatus =  <div>
                        <h4 className={classes.statestyle}>{`Hi, ${result.firstName} ${result.lastName}`}</h4>
                        <br/>
                        <p className={classes.safefactorstyle}>
                        Congratulations ! !
                        </p>
                        
                        <img borderRadius={15} src={require('./../../assets/images/approved.png')} alt="Approved" width='50%' height='50%' />

                      </div>

  } else {
    customerStatus =  <div>
      <CircularProgress size="11em" />
    </div>
  }

  
  

  {/* Customer status */}
  
  

  
  return (

    isDeafult ? (
        <section
          {...props}
          className={outerClasses}
        >
        <div className="container">
            <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
                <div className={tilesClasses}>
                    <Card className={classes.root}>
                        <CardContent>
                            <h4 className={classes.statestyle}>{`Hi, ${result.firstName} ${result.lastName}`}</h4>
                            <img borderRadius={15} src={require('./../../assets/images/image01.gif')} alt="MyStore" width='50%' height='80%' />
                            <br/>
                            <h5 className={classes.safefactorstyle}>Probability : 0.6897</h5>
                            <Button variant='contained' color='secondary' size='large' fullWidth onClick={clearForm}>Clear Form</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
        </section>
    ) : (
        <section
          {...props}
          className={outerClasses}
        >
        <div className="container">
            <div className={innerClasses}>
              <SectionHeader data={sectionHeader} className="center-content" />
                <div className={tilesClasses}>

                <Card className={classes.root}>
                    <CardContent>
                    
                        { customerStatus }
                        {/* <CircularProgress size={100} thickness={5} variant="determinate" value={result.safe_factor*100} /><br/>
                        <Chip color='primary' label={`${result.safe_factor} %`}/><br/>
                        <p className={classes.safefactorstyle}>No of arreas rental Limit</p>
                        <Chip color='primary' label={`${result.arreas_rentals} / 36`}/><br/> */}
                        <hr/>
                        {/* predicted loan amount */}
                        {loanAmountLabel}
                    </CardContent>
                </Card>

                </div>
            </div>
        </div>
        </section>
    )

  );
}

export default ResultComponent;