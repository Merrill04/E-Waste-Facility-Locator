import nodemailer from 'nodemailer';

// Create a transporter using nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Can be changed based on your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Send a booking confirmation email to the user
 * 
 * @param {Object} bookingData - The booking data
 * @param {Object} predictionData - The prediction data for the item
 * @returns {Promise} - The result of the email sending operation
 */
export const sendBookingConfirmationEmail = async (bookingData, predictionData) => {
  const { fullName, email, preferredDate, preferredTime, itemDetails } = bookingData;
  
  // Format the date for better readability
  const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  
  // Get the predicted value or fallback
  const predictedValue = predictionData?.predictedValue || 'Not available';
  const itemName = predictionData?.deviceName || 'e-waste item';
  
  // Construct the email
  const mailOptions = {
    from: `"E-Waste Recycling Facility" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your E-Waste Recycling Pickup Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #4CAF50;">
          <h1 style="color: #4CAF50; margin-bottom: 5px;">E-Waste Recycling Facility</h1>
          <p style="font-size: 16px; color: #666;">Booking Confirmation</p>
        </div>
        
        <div style="padding: 20px 0;">
          <p>Dear <strong>${fullName}</strong>,</p>
          
          <p>Thank you for scheduling a recycling pickup with us. Your booking has been confirmed with the following details:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Pickup Details</h3>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${preferredTime}</p>
            <p><strong>Items to be picked up:</strong> ${itemDetails}</p>
            <p><strong>Item Value Estimate:</strong> ${typeof predictedValue === 'number' ? `$${predictedValue.toFixed(2)}` : predictedValue}</p>
          </div>
          
          <p>Our team will arrive at your location during the scheduled time slot. Please ensure that the items are ready for pickup.</p>
          
          <p>If you need to make any changes to your booking or have any questions, please contact us at support@ewasterecycling.com or call us at (123) 456-7890.</p>
        </div>
        
        <div style="padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 14px;">
          <p>Thank you for choosing our service and contributing to a greener planet!</p>
          <p>© ${new Date().getFullYear()} E-Waste Recycling Facility. All rights reserved.</p>
        </div>
      </div>
    `
  };
  
  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export default {
  sendBookingConfirmationEmail
}; 