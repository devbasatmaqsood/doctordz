const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    tnc: { type: String, default: '' },
    privacyPolicyLink: { type: String, default: '' },
    tax: { type: Number, default: 0 }, // tax in percentage

    razorPayId: { type: String, default: '' },
    isRazorPay: { type: Boolean, default: false },
    razorSecretKey: { type: String, default: '' },

    isStripePay: { type: Boolean, default: false },
    stripePublishableKey: { type: String, default: '' },
    stripeSecretKey: { type: String, default: '' },

    maintenanceMode: { type: Boolean, default: false },

    zegoAppId: { type: String, default: 'ZEGO APP ID' },
    zegoAppSignIn: { type: String, default: 'ZEGO APP SIGN IN' },
    zegoServerSecret: { type: String, default: 'ZEGO SERVER SECRET' },

    currencySymbol: { type: String, default: '' },
    currencyName: { type: String, default: '' },

    flutterWaveKey: { type: String, default: '' },
    isFlutterWave: { type: Boolean, default: false },

    // cashAfterService: { type: Boolean, default: false },

    commissionPercent: { type: Number, default: 10 },
    minWithdraw: { type: Number, default: 0 },

    firebaseKey: { type: Object, default: {} }, //firebase.json handle notification

    durationOfvideo: { type: Number, default: 0 }, //always be in seconds

    geminiKey: { type: String, default: '' },

    companyEmail: { type: String, default: 'Enter Your Company Email' },
    companyContact: { type: String, default: '+918859239955' },
    resendApiKey: { type: String, default: '' },
    openAIkey: { type: String, default: '' },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Setting', settingSchema);
