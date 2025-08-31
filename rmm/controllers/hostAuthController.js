import PendingHost from '../models/PendingHost.js';
import Host from '../models/Host.js';
import Company from '../models/Company.js';
import sendEmail from '../../utils/sendEmail.js';
import bcrypt from 'bcryptjs';


export const registerHost = async (req, res) => {
  const { email, password, companyName } = req.body;

  const existingHost = await Host.findOne({ email });
  if (existingHost) return res.status(400).json({ message: 'Host already exists' });

  const otp = generateOTP();
  const otpExpiry = Date.now() + 10 * 60 * 1000;
  const hashedPassword = await bcrypt.hash(password, 10);

  const pendingHost = new PendingHost({ email, password: hashedPassword, companyName, otp, otpExpiry });
  await pendingHost.save();

  await sendEmail(
    email,
    'Your OTP for Host Registration',
    `Hello,\n\nYour OTP for registering as a company host is: ${otp}\nIt will expire in 10 minutes.\n\nIf you did not request this, please ignore this email.\n\n— Rate My Management`
  );  
  res.json({ message: 'OTP sent. Verify to complete registration.' });
};

export const verifyHostRegistration = async (req, res) => {
  const { email, otp } = req.body;
  const pendingHost = await PendingHost.findOne({ email });

  if (!pendingHost || pendingHost.otp !== otp || Date.now() > pendingHost.otpExpiry)
    return res.status(400).json({ message: 'Invalid or expired OTP' });

  // Create company if needed
  let company = await Company.findOne({ name: pendingHost.companyName });
  if (!company) {
    company = new Company({ name: pendingHost.companyName });
    await company.save();
  }

  const host = new Host({
    email: pendingHost.email,
    passwordHash: pendingHost.password,
    company: company._id
  });

  await host.save();
  await PendingHost.deleteOne({ email });

  res.json({ message: 'Host verified and registered', host });
};