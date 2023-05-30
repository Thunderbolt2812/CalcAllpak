import React, { useState, useEffect } from 'react';
import { IonApp, IonContent, IonInput, IonButton, IonAlert } from '@ionic/react';
import '../pages/Home.css';
import footerImage from '../pages/Branding.png'; // Import the PNG image
import headerImage from '../pages/header.png'; // Import the PNG image
import bgrndImage from '../pages/background.png'; // Import the PNG image
import loadingGif from '../pages/comp 1.gif'; // Import the loading GIF
// import emailjs from 'emailjs-com';
import nodemailer from 'nodemailer';


const Home: React.FC = () => {
  const [calculator, setCalculator] = useState('netWeight');
  const [gaugeWeight, setGaugeWeight] = useState('');
  const [rollWidth, setRollWidth] = useState('');
  const [length, setLength] = useState('');
  const [netWeight, setNetWeight] = useState('');
  const [gauge, setGauge] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isLoading, setLoading] = useState(true); // Loading state
  // const EMAILJS_USER_API_KEY = 'Zsc9LlLICV1OzAfS6';
  // const [showEmailPopup, setShowEmailPopup] = useState(false); // Email popup state


  useEffect(() => {
    const calculateNetWeight = () => {
      // Perform calculation logic to calculate the net weight
      const gaugeWeightValue = (parseFloat(gaugeWeight) / 1000) / 0.000254;
      const rollWidthValue = parseFloat(rollWidth) / 25.4;
      const lengthValue = parseFloat(length);
      const netWeightValue = (gaugeWeightValue * rollWidthValue * lengthValue * 0.18028) / 1000;
      setNetWeight(isNaN(netWeightValue) ? '---' : netWeightValue.toFixed(3)); // Set the net weight with 3 decimal places
    };

    const calculateLength = () => {
      // Perform calculation logic to calculate the length
      const netWeightValue = parseFloat(netWeight);
      const gaugeWeightValue = (parseFloat(gaugeWeight) / 1000) / 0.000254;
      const rollWidthValue = parseFloat(rollWidth) / 25.4;
      const lengthValue = (netWeightValue * 1000) / (gaugeWeightValue * rollWidthValue * 0.18028); // Calculation formula
      setLength(isNaN(lengthValue) ? '---' : Math.round(lengthValue).toString()); // Set the rounded length as a string
    };

    const calculateGauge = () => {
      // Perform calculation logic to calculate the gauge
      const gaugeWeightValue = parseFloat(gaugeWeight);
      const rollWidthValue = parseFloat(rollWidth) / 25.4;
      const gaugeValue = (gaugeWeightValue * 1000) / (rollWidthValue * 6.5607 * 0.18028);
      setGauge(isNaN(gaugeValue) ? '---' : gaugeValue.toFixed(2)); // Set the gauge with 2 decimal places
    };

    if (calculator === 'netWeight') {
      calculateNetWeight();
    } else if (calculator === 'length') {
      calculateLength();
    } else if (calculator === 'gauge') {
      calculateGauge();
    }
    if (isLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 8000); // Adjust the delay as needed
    }
  }, [calculator, gaugeWeight, rollWidth, length, netWeight]);

  const handleCalculatorClick = (selectedCalculator: string) => {
    setCalculator(selectedCalculator);
    // Reset input values and net weight when switching calculators
    setGaugeWeight('');
    setRollWidth('');
    setLength('');
    setNetWeight('');
    setGauge('');
  };

  const handleClearLButtonClick = () => {
    // Clear all input values
    setGaugeWeight('');
    setRollWidth('');
    setNetWeight('');
  };
  const handleClearNWButtonClick = () => {
    // Clear all input values
    setGaugeWeight('');
    setRollWidth('');
    setLength('');
  };

  const handleClearGButtonClick = () => {
    // Clear all input values
    setGaugeWeight('');
    setRollWidth('');
  };
  const handleButtonLinkClick = () => {
    window.open('https://www.allpaksoluciones.com/', '_blank', 'noopener noreferrer');
  };

  function openWhatsAppContact() {
    const phoneNumber = "50497500141"; // Replace with the desired WhatsApp Business contact number

    const whatsappURL = `https://wa.me/${phoneNumber}`;
    window.open(whatsappURL);
  }
  const sendEmail = async () => {
    try {
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-email-password'
        }
      });
  
      // Prepare the email message
      const message = {
        from: 'your-email@gmail.com',
        to: 'recipient@example.com',
        subject: 'Hello from Nodemailer',
        text: 'This is a test email sent from Nodemailer.'
      };
  
      // Send the email
      const info = await transporter.sendMail(message);
      console.log('Email sent:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  

  // const handleSendEmailClick = () => {
  //   setShowEmailPopup(true);
  // };

  // const handleEmailPopupClose = () => {
  //   setShowEmailPopup(false);
  // };

  // const handleEmailInputChange = (e: any) => {
  //   console.log('Recipient Email:', recipientEmail);
  //   setRecipientEmail(e.target.value);
  // };

  // const sendEmail = (recipientEmail: string) => {
  //   console.log('Recipient Email:', recipientEmail);
  //   const templateParams = {
  //     from_name: 'UltraWrap',
  //     to_email: recipientEmail,
  //     message:
  //       calculator === 'netWeight'
  //         ? 'CALCULADORA DE PESO NETO\n'
  //         : calculator === 'length'
  //           ? 'CALCULADORA DE LONGITUD\n'
  //           : 'CALCULADORA DE GAUGE\n',
  //   };

  //   if (calculator === 'netWeight') {
  //     templateParams.message += `\nInput values: Gauge Weight: ${gaugeWeight}, Roll Width: ${rollWidth}, Length: ${length}\n\nResultado Peso Neto: ${netWeight} kg`;
  //   } else if (calculator === 'length') {
  //     templateParams.message += `\nInput values: Net Weight: ${netWeight}, Gauge Weight: ${gaugeWeight}, Roll Width: ${rollWidth}\n\nResultado Longitud: ${length} pies`;
  //   } else if (calculator === 'gauge') {
  //     templateParams.message += `\nInput values: Net Weight: ${netWeight}, Roll Width: ${rollWidth}\n\nResultado Gauge: ${gauge}`;
  //   }

  //   emailjs
  //     .send('service_8w3fmon', 'template_g4ncilk', templateParams, EMAILJS_USER_API_KEY)
  //     .then((response: any) => {
  //       console.log('Email sent successfully!', response.status, response.text);
  //     })
  //     .catch((error: any) => {
  //       console.error('Error sending email:', error);
  //     });
  // };


  return (
    <IonApp className="block-horizontal">
      <IonContent>
        {isLoading ? (
          // Conditionally render the loading screen
          <div className="loading-screen">
            <img src={loadingGif} alt="Loading GIF" />
          </div>
        ) : (
          <div className="calculadora" style={{
            backgroundImage: `url(${bgrndImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}>
            <div className="header" style={{ fontFamily: 'futura-koyu' }}>
              <img src={headerImage} alt="Headerimg" />
            </div>
            <div className="button-group">
              <button
                className={`calculator-button ${calculator === 'netWeight' ? 'active' : ''}`}
                onClick={() => handleCalculatorClick('netWeight')}
                style={{ fontFamily: 'GOTHICB' }}
              >
                PESO NETO
              </button>
              <button
                className={`calculator-button ${calculator === 'length' ? 'active' : ''}`}
                onClick={() => handleCalculatorClick('length')}
                style={{ fontFamily: 'GOTHICB' }}
              >
                LONGITUD
              </button>
              <button
                className={`calculator-button ${calculator === 'gauge' ? 'active' : ''}`}
                onClick={() => handleCalculatorClick('gauge')}
                style={{ fontFamily: 'GOTHICB' }}
              >
                GAUGE
              </button>
            </div>

            <div className="input-group">
              {calculator === 'netWeight' && (
                <>
                  {/* Input fields for net weight calculator */}
                  <div className="calc"></div>
                  <div className="input-wrapper">
                    <div className="tipo">Gauge</div>
                    <IonInput
                      label="  "
                      labelPlacement="start"
                      type="number"
                      placeholder=""
                      value={gaugeWeight}
                      onIonChange={(e) => {
                        setGaugeWeight(e.detail.value!);
                        setCalculator('netWeight'); // Trigger calculation on input change
                      }}
                      className="custom-input"
                    ></IonInput>
                    <div className="placeholder">*Valores en micras</div>
                  </div>
                  <div className="input-wrapper">
                    <div className="tipo">Ancho del rollo</div>
                    <IonInput
                      label="  "
                      labelPlacement="start"
                      type="number"
                      placeholder=""
                      value={rollWidth}
                      onIonChange={(e) => {
                        setRollWidth(e.detail.value!);
                        setCalculator('netWeight'); // Trigger calculation on input change
                      }}
                      className="custom-input"
                    ></IonInput>
                    <div className="placeholder">*Valores en milimetros</div>
                  </div>
                  <div className="input-wrapper">
                    <div className="tipo">Longitud</div>
                    <IonInput
                      label="  "
                      labelPlacement="start"
                      type="number"
                      placeholder=""
                      value={length}
                      onIonChange={(e) => {
                        setLength(e.detail.value!);
                        setCalculator('netWeight'); // Trigger calculation on input change
                      }}
                      className="custom-input"
                    ></IonInput>
                    <div className="placeholder">*Valores en pies</div>
                  </div>
                  {netWeight && (
                    <div className="resultado" style={{ marginTop: '10px' }}>
                      Peso Neto: {netWeight} kg
                    </div>
                  )}
                  <IonButton onClick={handleClearNWButtonClick} className="custom-button" fill="clear">
                    Reiniciar
                  </IonButton>
                </>
              )}

              {calculator === 'length' && (
                <>
                  {/* Input fields for length calculator */}
                  <div className="input-wrapper">
                    <div className="tipo">Peso neto</div>
                    <IonInput
                      label="  "
                      labelPlacement="start"
                      type="number"
                      placeholder=""
                      value={netWeight}
                      onIonChange={(e) => {
                        setNetWeight(e.detail.value!);
                        setCalculator('length'); // Trigger calculation on input change
                      }}
                      className="custom-input"
                    ></IonInput>
                    <div className="placeholder">*Valores en kilogramos</div>
                  </div>
                  <div className="input-wrapper">
                    <div className="tipo">Gauge</div>
                    <IonInput
                      label="  "
                      labelPlacement="start"
                      type="number"
                      placeholder=""
                      value={gaugeWeight}
                      onIonChange={(e) => {
                        setGaugeWeight(e.detail.value!);
                        setCalculator('length'); // Trigger calculation on input change
                      }}
                      className="custom-input"
                    ></IonInput>
                    <div className="placeholder">*Valores en micras</div>
                  </div>
                  <div className="input-wrapper">
                    <div className="tipo">Ancho del rollo</div>
                    <IonInput
                      label="  "
                      labelPlacement="start"
                      type="number"
                      placeholder=""
                      value={rollWidth}
                      onIonChange={(e) => {
                        setRollWidth(e.detail.value!);
                        setCalculator('length'); // Trigger calculation on input change
                      }}
                      className="custom-input"
                    ></IonInput>
                    <div className="placeholder">*Valores en milimetros</div>
                  </div>
                  {length && (
                    <div className="resultado" style={{ marginTop: '10px' }}>
                      Longitud: {length} pies{' '}
                    </div>
                  )}
                  <IonButton onClick={handleClearLButtonClick} className="custom-button" fill="clear">
                    Reiniciar
                  </IonButton>
                </>
              )}

              {calculator === 'gauge' && (
                <>
                  {/* Input fields for gauge calculator */}
                  <div className="input-wrapper">
                    <div className="tipo">Peso de los 2 metros de Estiramiento</div>
                    <IonInput
                      label='  '
                      labelPlacement="start"
                      type="number"
                      placeholder=""
                      value={gaugeWeight}
                      onIonChange={(e) => {
                        setGaugeWeight(e.detail.value!);
                        setCalculator('gauge'); // Trigger calculation on input change
                      }}
                      className="custom-input"
                    ></IonInput>
                    <div className="placeholder">*Valores en kilogramos</div>
                  </div>
                  <div className="input-wrapper">
                    <div className="tipo">Ancho del rollo</div>
                    <IonInput
                      label='  '
                      labelPlacement="start"
                      type="number"
                      placeholder=""
                      value={rollWidth}
                      onIonChange={(e) => {
                        setRollWidth(e.detail.value!);
                        setCalculator('gauge'); // Trigger calculation on input change
                      }}
                      className="custom-input"
                    ></IonInput>
                    <div className="placeholder">*Valores en milimetros</div>
                  </div>
                  {gauge && <div className="resultado" style={{ marginTop: '10px' }}>Gauge: {gauge}</div>}
                  <IonButton onClick={handleClearGButtonClick} className="custom-button" fill='clear'> Reiniciar
                  </IonButton>
                </>
              )}
            </div>
             <IonButton className="custom-button" fill="clear" onClick={sendEmail}>
              Send Email
            </IonButton>
            {/*<IonAlert
            
              isOpen={showEmailPopup}
              onDidDismiss={handleEmailPopupClose}
              header="Enviar Datos al correo"
              inputs={[
                {
                  name: 'email',
                  type: 'email',
                  value: recipientEmail,
                  placeholder: 'Correo:',
                  handler: handleEmailInputChange,
                },
              ]}
              buttons={[
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: handleEmailPopupClose,
                },
                {
                  text: 'Enviar',
                  handler: () => {
                    console.log('Recipient Email:', recipientEmail);
                    sendEmail(recipientEmail);
                    handleEmailPopupClose();
                  },
                },
              ]}
            /> */}

            {/* <div className='footer-content'>
              <img src={footerImage} alt="Footer" />
              <div className="footer">
                <div className='wha'>
                  <button className="linkWha" onClick={openWhatsAppContact}>Ponte En Contacto Con Nuestro Equipo</button>
                </div>
                <div className='webs'>
                  <button className="link-button" onClick={handleButtonLinkClick}>
                    www.allpksoluciones.com
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        )}

      </IonContent>
    </IonApp>
  );
};

export default Home;
