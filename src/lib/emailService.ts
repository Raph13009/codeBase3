import emailjs from '@emailjs/browser';

// Configuration MailJS
const SERVICE_ID = 'YOUR_SERVICE_ID'; // Remplacez par votre Service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Remplacez par votre Template ID
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Remplacez par votre Public Key

export const sendEmail = async (templateParams: {
  from_name: string;
  from_email: string;
  message: string;
  to_name: string;
  reply_to: string;
}) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Erreur MailJS:', error);
    throw error;
  }
};

// Configuration pour le développement (simulation)
export const sendEmailDev = async (templateParams: {
  from_name: string;
  from_email: string;
  message: string;
  to_name: string;
  reply_to: string;
}) => {
  // Simulation d'envoi en développement
  console.log('Email simulé:', templateParams);
  
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simuler un succès
  return { success: true, data: { status: 200 } };
}; 