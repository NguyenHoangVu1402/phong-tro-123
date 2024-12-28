import React, { useState, useEffect } from "react";
import { InputForm, Button } from "../../components";
import { useLocation } from "react-router-dom";

import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";

const Login = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const [isRegister, setIsRegister] = useState(location.state?.flag || false); // Đặt mặc định là false
    const [invalidFields, setInvalidFields] = useState({});
    const [payload, setPayload] = useState({phone: '', password: '', name: ''});

    useEffect(() => {
        if (location.state?.flag !== undefined) {
            setIsRegister(location.state.flag);
        }
    }, [location.state?.flag]);

    const handleSubmit = async () => {
        //console.log(payload);
        //isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload));
        let invalids = validate(payload);
        console.log(invalids);
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
                {isRegister && <InputForm label={'HỌ VÀ TÊN'} value={payload.name} setValue={setPayload} type={'name'}/>}
                <InputForm label={'SỐ ĐIỆN THOẠI'} value={payload.phone} setValue={setPayload} type={'phone'}/>
                <InputForm label={'MẬT KHẨU'} value={payload.password} setValue={setPayload} type={'password'}/>
                <Button text={isRegister ? 'Đăng kí' : 'Đăng nhập'} onClick={handleSubmit} bgColor='bg-secondary1' textColor='text-white' fullWidth/>
            </div>
            <div className="mt-7 flex items-center justify-between">
                {isRegister ? <small>Bạn đã có tài khoản? <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => { setIsRegister(false) }}>Đăng nhập ngay</span></small> :
                <>
                    <small className='text-[blue] hover:text-[red] cursor-pointer'>Bạn quên mật khẩu</small>
                    <small onClick={() => { setIsRegister(true) }} className='text-[blue] hover:text-[red] cursor-pointer'>Tạo tài khoản mới</small>
                </>}
            </div>
        </div>
    );
}

export default Login;
