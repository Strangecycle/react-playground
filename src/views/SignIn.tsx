import { message } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { sendCaptcha, SignInfo } from '../api/user';
import { userLoginCreator } from '../store/actions/user';
import { CAPTCHA_REG, PHONE_REG } from '../utils/reg';
import { HttpResponse } from '../utils/request';

const countdownCount = 5;
const defaultCountdownStyles = 'bg-green-400 hover:bg-green-500 cursor-pointer';
const disabledButtonStyles = 'bg-gray-400 cursor-not-allowed';
const defaultSignInStyles = 'bg-blue-400 hover:bg-blue-500 cursor-pointer';
const inputWarningBorder = 'border border-solid border-red-300';

export default function SignIn() {
  const [countdown, setCountdown] = useState(0);
  const [countdownStyles, setCountdownStyles] = useState(defaultCountdownStyles);
  const [isSend, setIsSend] = useState(false);
  const [inputBorder, setInputBorder] = useState('');
  const [signInStyles, setSignInStyles] = useState(disabledButtonStyles);
  const [signInfo, setSignInfo] = useState<SignInfo>({
    phone: '',
    captcha: '',
  });
  const phoneInput = useRef<HTMLInputElement | any>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  // TODO 了解一下 hooks 闭包陷阱
  useEffect(() => {
    let timer: NodeJS.Timeout | any;
    if (isSend && countdown !== 0) {
      setCountdownStyles(disabledButtonStyles);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setIsSend(false);
            setCountdownStyles(defaultCountdownStyles);
            clearInterval(timer);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isSend]);

  const isSignInDisabled = useMemo(() => {
    const { phone, captcha } = signInfo;
    const isCorrect = !PHONE_REG.test(phone) || !CAPTCHA_REG.test(captcha);
    if (isCorrect) {
      // TODO 去了解一下源码，看 set 相同的值到底需不需要手动判断
      if (signInStyles !== disabledButtonStyles) {
        setSignInStyles(disabledButtonStyles);
      }
    } else {
      setSignInStyles(defaultSignInStyles);
    }
    return isCorrect;
  }, [signInfo]);

  const startCountdown = (): boolean => {
    if (isSend) return !isSend;
    setCountdown(countdownCount);
    setIsSend(true);
    return !isSend;
  };

  const handlePhoneInput = (): boolean => {
    // * 手机号不正确时聚焦输入框
    const isCorrect = PHONE_REG.test(signInfo.phone);
    if (!isCorrect) {
      setInputBorder(inputWarningBorder);
      phoneInput.current.focus();
    } else {
      setInputBorder('');
    }
    return isCorrect;
  };

  const handleSendCaptcha = async () => {
    try {
      if (!handlePhoneInput() || !startCountdown()) {
        return;
      }
      const { data: captcha }: HttpResponse = await sendCaptcha({
        phone: signInfo.phone,
      });
      // TODO 这里方便测试，真实环境不应该直接赋值，而是用户收到验证码手动输入
      setSignInfo({ ...signInfo, captcha });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async () => {
    if (isSignInDisabled) {
      return;
    }
    await dispatch(userLoginCreator(signInfo));
    await history.replace('/');
    await message.success('Login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center shadow-2xl w-2/6 rounded-3xl py-14">
        <div className="text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Or&nbsp;
          <a href="void:0" className="text-blue-500">
            start your free trial
          </a>
        </p>
        <div className="mt-6 w-2/3 flex flex-col items-center">
          <div
            className={`bg-gray-200 w-full h-10 rounded px-3 ${inputBorder}`}
          >
            <input
              ref={phoneInput}
              className="bg-transparent w-full h-full text-gray-500 text-sm font-medium"
              type="phone"
              placeholder="Phone number"
              value={signInfo.phone}
              onChange={(e) =>
                setSignInfo({ ...signInfo, phone: e.target.value })
              }
            />
          </div>
          <div className="mt-3 w-full flex justify-between items-center">
            <div className="bg-gray-200 w-8/12 h-10 rounded px-3">
              <input
                className="bg-transparent w-full h-full text-gray-500 text-sm font-medium"
                type="text"
                placeholder="Captcha"
                value={signInfo.captcha}
                onChange={(e) =>
                  setSignInfo({ ...signInfo, captcha: e.target.value })
                }
              />
            </div>
            <span
              className={`w-3/12 h-10 flex items-center justify-center px-8 py-3 border border-transparent text-sm font-medium rounded-md text-white md:py-4 md:text-lg md:px-10 ${countdownStyles}`}
              onClick={handleSendCaptcha}
            >
              {isSend ? `${countdown}s` : 'Send'}
            </span>
          </div>
        </div>
        <span
          className={`mt-6 flex items-center justify-center px-8 py-3 border border-transparent text-sm font-medium rounded-3xl text-white md:py-2 md:text-lg md:px-6} ${signInStyles}`}
          onClick={handleSignIn}
        >
          Sign In
        </span>
      </div>
    </div>
  );
}
