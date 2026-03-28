# Portfolio Contact Backend Setup

## 📧 Email & SMS Integration Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables Setup

Create `.env` file in backend folder:

```env
# Gmail Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password

# Twilio Configuration (for SMS)
TWILIO_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE=+1234567890
YOUR_PHONE=+919876543210

# Server
PORT=5000
```

### 3. Gmail App Password Setup
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate App Password for "Mail"
4. Use this password in EMAIL_PASS

### 4. Twilio Setup (for SMS)
1. Sign up at https://twilio.com
2. Get Account SID and Auth Token
3. Buy a phone number
4. Add your phone number to verified numbers

### 5. Run Backend
```bash
npm run dev
```

### 6. Update Frontend URL
If deploying, change the API URL in App.jsx:
```javascript
const response = await fetch('YOUR_BACKEND_URL/api/contact', {
```

## 🚀 Features
- ✅ Email notifications to your Gmail
- ✅ SMS notifications to your phone
- ✅ Form validation
- ✅ Success/Error feedback
- ✅ Responsive design

## 📱 What You'll Receive
**Email:** Formatted HTML email with contact details
**SMS:** Quick notification with name, email, and message preview

Your portfolio contact form is now fully functional! 🎯