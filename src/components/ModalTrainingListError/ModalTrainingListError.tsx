import { useEffect, useState } from 'react';
import { Button, Modal, Typography } from 'antd';
import { ModalTrainingListErrorProps } from '../../types/Props';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { trainingSelector } from '@redux/slices/TrainingSlice';

import './modalTrainingListError.css';

const { Title, Text } = Typography;

export const ModalTrainingListError = ({
    isModalTrainingList,
    handleModalToggle,
    update,
}: ModalTrainingListErrorProps) => {
    const { isModal } = useSelector(trainingSelector);
    const [modalWidth, setModalWidth] = useState(window.innerWidth < 576 ? 328 : 384);

    useEffect(() => {
        const handleResize = () => {
            setModalWidth(window.innerWidth < 576 ? 328 : 384);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Modal
            className='modal-training-list-error'
            footer={false}
            centered
            open={isModalTrainingList}
            onCancel={isModal ? handleModalToggle : undefined}
            closable={isModal}
            width={modalWidth}
            closeIcon={
                isModal ? (
                    <CloseOutlined data-test-id='modal-error-user-training-button-close' />
                ) : null
            }
        >
            <div className='result-training-list-error'>
                <div className='block-title__wrapper'>
                    <CloseCircleOutlined
                        className='icon-result'
                        style={
                            isModal
                                ? { color: 'var(--primary-light-6)', fontSize: '24px' }
                                : { color: 'var(--character-dark-error)', fontSize: '24px' }
                        }
                    />
                    <div className='block-title'>
                        <Title
                            level={5}
                            className='title'
                            data-test-id='modal-error-user-training-title'
                        >
                            При {isModal ? 'открытии' : 'сохранении'} данных <br /> произошла ошибка
                        </Title>
                        <Text
                            type='secondary'
                            className='subtitle'
                            data-test-id='modal-error-user-training-subtitle'
                        >
                            {isModal ? 'Попробуйте ещё раз.' : 'Придётся попробовать ещё раз'}
                        </Text>
                    </div>
                </div>
                <Button
                    type='primary'
                    className='btn-update'
                    onClick={isModal ? update : handleModalToggle}
                    data-test-id='modal-error-user-training-button'
                >
                    {isModal ? 'Обновить' : 'Закрыть'}
                </Button>
            </div>
        </Modal>
    );
};
