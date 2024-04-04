import { useSelector } from 'react-redux';
import { periodOptions } from '@constants/period-options';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import {
    setDateTraining,
    setFlag,
    setNameTraining,
    setPeriod,
    setRepeat,
    trainingSelector,
} from '@redux/slices/training-slice';
import { getDataForDate } from '@utils/get-data-for-date';
import { isPastDate } from '@utils/past-date';
import { Checkbox, DatePicker, Form, Select } from 'antd';
import moment from 'moment';
import { FieldData } from 'rc-field-form/lib/interface';

import './training-form.css';

export const TrainingForm = () => {
    const dispatch = useAppDispatch();
    const { trainingList, training, activitiesData } = useSelector(trainingSelector);
    const dataForDate = getDataForDate(activitiesData, training.date);
    const itemWithName = dataForDate.find((item) => item.name === training.name);
    const filteredOptions = trainingList.filter(
        (item) => !dataForDate.some((activity) => activity.name === item.name),
    );
    const activityDates = activitiesData.map((activity) =>
        moment(activity.date).format('YYYY-MM-DD'),
    );

    const handleFieldsChange = (allFields: FieldData[]) => {
        const nameFieldValue = allFields.find((field) => field.name[0] === 'name')?.value;
        const dateFieldValue = allFields.find((field) => field.name[0] === 'date')?.value;
        const periodFieldValue = allFields.find((field) => field.name[0] === 'period')?.value;
        const repeatValue = allFields.find((field) => field.name[0] === 'checked')?.value;

        dispatch(setFlag({ flag: isPastDate(dateFieldValue) }));
        dispatch(setRepeat({ repeat: repeatValue }));
        dispatch(setDateTraining({ date: moment(dateFieldValue).toISOString() }));
        dispatch(setNameTraining({ value: nameFieldValue }));
        dispatch(setPeriod({ period: periodFieldValue }));
    };

    return (
        <Form
            key={training._id}
            name='trainingForm'
            className='form-period'
            size='large'
            initialValues={
                itemWithName
                    ? {
                          name: training.name,
                          date: moment(training.date),
                          period: training.parameters?.period,
                          checked: Boolean(training.parameters?.period),
                      }
                    : {}
            }
            onFieldsChange={(_, allFields): void => {
                handleFieldsChange(allFields);
            }}
        >
            <Form.Item name='name'>
                <Select
                    className='select-training'
                    size='middle'
                    options={filteredOptions.map((item) => ({
                        value: item.name,
                        label: item.name,
                        disabled: item.name === training.name,
                    }))}
                />
            </Form.Item>
            <div className='block'>
                <Form.Item name='date' className='data-picker'>
                    <DatePicker
                        size='small'
                        format='DD.MM.YYYY'
                        disabledDate={(current) => current && current < moment().endOf('day')}
                        dateRender={(current) => {
                            const formattedDate = current.format('YYYY-MM-DD');

                            if (activityDates.includes(formattedDate)) {
                                return (
                                    <div style={{ backgroundColor: 'var(--primary-light-1)' }}>
                                        {current.date()}
                                    </div>
                                );
                            }

                            return <div>{current.date()}</div>;
                        }}
                    />
                </Form.Item>
                <Form.Item name='checked' valuePropName='checked'>
                    <Checkbox>С периодичностью</Checkbox>
                </Form.Item>
            </div>
            {training.parameters?.repeat && (
                <Form.Item name='period'>
                    <Select
                        className='select-training'
                        size='middle'
                        options={periodOptions.map((item) => ({
                            value: item.value,
                            label: item.name,
                        }))}
                    />
                </Form.Item>
            )}
        </Form>
    );
};
