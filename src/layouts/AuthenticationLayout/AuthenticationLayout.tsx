import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '@redux/slices/AuthSlice';
import { Outlet } from 'react-router-dom';
import formLogo from '/png/formLogo.png';
import { Menu } from 'antd';
import { history } from '@redux/configure-store';
import { Loader } from '@components/Loader';
import { Path } from '@constants/paths';
import formLogoMobile from '/png/formLogoMobile.png';

import './authenticationLayout.css';

export const AuthenticationLayout: React.FC = () => {
    const { loading, token } = useSelector(authSelector);

    useEffect(() => {
        if (token) {
            history.push(Path.Auth);
        }
    }, []);

    return (
        <div className='auth-wrapper'>
            {loading && <Loader />}
            <div className='auth-wrapper__content'>
                <div className='auth-wrapper__logo'>
                    <img src={formLogo} alt='CleverFit' className='auth-logo auth-logo_hidden' />
                    <img src={formLogoMobile} alt='CleverFit' className='auth-logo-mobile' />
                </div>
                <div
                    className='auth-wrapper__buttons'
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Menu
                        mode='horizontal'
                        defaultSelectedKeys={['login']}
                        style={{ display: 'flex', flex: '1' }}
                    >
                        <Menu.Item
                            key='login'
                            style={{ flex: '1', textAlign: 'center' }}
                            onClick={() => history.push('/auth')}
                        >
                            Вход
                        </Menu.Item>
                        <Menu.Item
                            key='register'
                            style={{ flex: '1', textAlign: 'center' }}
                            onClick={() => history.push('/auth/registration')}
                        >
                            Регистрация
                        </Menu.Item>
                    </Menu>
                </div>
                <Outlet />
            </div>
        </div>
    );
};
