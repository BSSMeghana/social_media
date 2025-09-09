import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/ForgotPassword.module.css';
import { useRouter } from 'next/router';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(''); // will store concatenated 6 digits
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(59);
  const router = useRouter();

  // Send OTP
  const sendOtp = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('http://localhost:4000/auth/forgot-password', { email });
      setMessage(res.data.message);
      setStep(2);
      setTimer(59);
      startTimer();
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('http://localhost:4000/auth/reset-password', {
        email,
        otp,
        newPassword,
        confirmPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  // Timer countdown
  const startTimer = () => {
    let counter = 59;
    const interval = setInterval(() => {
      counter -= 1;
      setTimer(counter);
      if (counter <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  // handle single OTP box change
  const handleOtpChange = (value: string, index: number) => {
    let otpArr = otp.split('');
    otpArr[index] = value.trim();
    const newOtp = otpArr.join('');
    setOtp(newOtp);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>Forgot Password</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <button onClick={sendOtp} className={styles.button} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {/* OTP Inputs */}
            <div className={styles.otpWrapper}>
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className={styles.otpInput}
                  value={otp[i] || ''}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                />
              ))}
            </div>

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              required
            />

            <button onClick={resetPassword} className={styles.button} disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <div className={styles.timerRow}>
              <span>{timer > 0 ? `${timer} secs` : 'OTP expired'}</span>
              <span
                className={styles.resend}
                onClick={() => {
                  if (timer === 0) {
                    sendOtp();
                  }
                }}
              >
                Resend OTP
              </span>
            </div>
          </>
        )}

        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
