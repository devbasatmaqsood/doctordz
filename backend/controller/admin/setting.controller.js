const Setting = require('../../models/setting.model');

exports.get = async (req, res) => {
  try {
    const setting = settingJSON ? settingJSON : null;
    if (!setting) {
      return res
        .status(200)
        .send({ status: false, message: 'Setting Not Exist' });
    }
    return res.status(200).send({
      status: true,
      message: 'success!!',
      setting,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message || 'Internal Server Error!!',
    });
  }
};

exports.update = async (req, res) => {
  try {
    const setting = await Setting.findOne().sort({ createdAt: -1 });
    if (!setting) {
      return res
        .status(200)
        .send({ status: false, message: 'Setting Not Exist' });
    }

    setting.tnc = req.body.tnc || setting.tnc;
    setting.privacyPolicyLink =
      req.body.privacyPolicyLink || setting.privacyPolicyLink;
    setting.razorPayId = req.body.razorPayId || setting.razorPayId;
    setting.razorSecretKey = req.body.razorSecretKey || setting.razorSecretKey;
    setting.stripePublishableKey =
      req.body.stripePublishableKey || setting.stripePublishableKey;
    setting.stripeSecretKey =
      req.body.stripeSecretKey || setting.stripeSecretKey;

    setting.zegoAppId = req.body.zegoAppId || setting.zegoAppId;
    setting.zegoAppSignIn = req.body.zegoAppSignIn || setting.zegoAppSignIn;
    setting.zegoServerSecret =
      req.body.zegoServerSecret || setting.zegoServerSecret;

    setting.flutterWaveKey = req.body.flutterWaveKey || setting.flutterWaveKey;
    setting.currencySymbol = req.body.currencySymbol || setting.currencySymbol;
    setting.currencyName = req.body.currencyName || setting.currencyName;

    setting.tax = req.body.tax || setting.tax;
    setting.minWithdraw = req.body.minWithdraw || setting.minWithdraw;
    setting.commissionPercent =
      req.body.commissionPercent || setting.commissionPercent;
    setting.durationOfvideo = req.body.durationOfvideo
      ? Number(req.body.durationOfvideo)
      : setting.durationOfvideo;

    setting.geminiKey = req.body.geminiKey || setting.geminiKey;

    setting.firebaseKey = req.body.firebaseKey
      ? JSON.parse(req.body.firebaseKey.trim())
      : setting.firebaseKey;

    setting.companyEmail = req.body.companyEmail || setting.companyEmail;
    setting.companyContact = req.body.companyContact || setting.companyContact;

    setting.resendApiKey = req.body.resendApiKey || setting.resendApiKey;
    setting.openAIkey = req.body.openAIkey || setting.openAIkey;

    await setting.save();

    res.status(200).send({ status: true, message: 'Success!!', setting });

    updateSettingFile(setting);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'Internal Server Error' });
  }
};

exports.handleSwitch = async (req, res) => {
  try {
    const type = req.query.type;
    if (!type) {
      return res
        .status(200)
        .send({ status: false, message: 'Oops ! Invalid details!!' });
    }

    const setting = await Setting.findOne().sort({ createdAt: -1 });
    if (!setting) {
      return res
        .status(200)
        .send({ status: false, message: 'Setting Not Exist' });
    }

    if (type == 1) {
      setting.isRazorPay = !setting.isRazorPay;
    }
    if (type == 2) {
      setting.isStripePay = !setting.isStripePay;
    }
    if (type == 3) {
      setting.maintenanceMode = !setting.maintenanceMode;
    }
    if (type == 4) {
      setting.isFlutterWave = !setting.isFlutterWave;
    }
    if (type == 5) {
      setting.cashAfterService = !setting.cashAfterService;
    }
    await setting.save();

    updateSettingFile(setting);

    return res
      .status(200)
      .send({ status: true, message: 'success!!', setting });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'Internal Server Error' });
  }
};
