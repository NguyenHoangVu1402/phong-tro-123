import React, { useState, useEffect } from "react";
import { InputForm, Button } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { isLoggedIn, msg, update } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(location.state?.flag || false); // Đặt mặc định là false
    const [invalidFields, setInvalidFields] = useState({});
    const [payload, setPayload] = useState({phone: '', password: '', name: ''});

    useEffect(() => {
        if (location.state?.flag !== undefined) {
            setIsRegister(location.state.flag);
        }
    }, [location.state?.flag]);

    useEffect(() => {
        isLoggedIn && navigate('/');
    }, [isLoggedIn, navigate])

    useEffect(() => {
        msg && Swal.fire('Oop!', msg,  'error')
    }, [msg, update])

    const handleSubmit = async () => {
        let finalPayload = isRegister ?  payload : {
            phone: payload.phone,
            password: payload.password
        };
        let invalids = validate(finalPayload);
        if(invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload));
    }

    const validate = (payload) => {
        let invalids = 0;
        let fields = Object.entries(payload);
        fields.forEach(item => {
            if (item[1] === '') {
                setInvalidFields(prev => [...prev, {
                    name: item[0],
                    message: 'Bạn không được để trống trường này!!!'
                }]);
                invalids++;
            }
        })
        fields.forEach(item => {
            switch (item[0]) {
                case 'password':
                    if (item[1].length < 6) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Mật khẩu phải có tối thiểu 6 kí tự.'
                        }])
                        invalids++
                    }
                    break;
                case 'phone':
                    if (!+item[1]) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Số điện thoại không hợp lệ.'
                        }])
                        invalids++
                    }
                    break

                default:
                    break;
            }
        })
        return invalids
    };

    return (
        <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
            <h3 className='font-semibold text-2xl mb-3'>{isRegister ? 'Đăng kí tài khoản' : 'Đăng nhập tài khoản'}</h3>
            <div className='w-full flex flex-col gap-5'>
                {isRegister && <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label={'HỌ VÀ TÊN'} value={payload.name} setValue={setPayload} keyPayload={'name'}/>}
                <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label={'SỐ ĐIỆN THOẠI'} value={payload.phone} setValue={setPayload} keyPayload={'phone'}  />
                <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label={'MẬT KHẨU'} value={payload.password} setValue={setPayload} keyPayload={'password'} type='password'/>
                <Button text={isRegister ? 'Đăng kí' : 'Đăng nhập'} onClick={handleSubmit} bgColor='bg-secondary1' textColor='text-white' fullWidth/>
            </div>
            <div className="mt-7 flex items-center justify-between">
                {isRegister ? <small>Bạn đã có tài khoản? <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => { 
                    setIsRegister(false)
                    setPayload({phone: '', password: '', name: ''})
                 }}>Đăng nhập ngay</span></small> :
                <>
                    <small className='text-[blue] hover:text-[red] cursor-pointer'>Bạn quên mật khẩu</small>
                    <small onClick={() => { 
                        setIsRegister(true)
                        setPayload({phone: '', password: '', name: ''})
                         }} className='text-[blue] hover:text-[red] cursor-pointer'>Tạo tài khoản mới</small>
                </>}
            </div>
        </div>
    );
}

export default Login;
