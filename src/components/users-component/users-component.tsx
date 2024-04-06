import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { CardUserJointTraining } from '@components/card-user-joint-training';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useWindowSize } from '@hooks/use-window-size';
import { jointTrainingSelector, setIsUserList } from '@redux/slices/joint-training';
import { Input,Pagination, Typography } from 'antd';

import './users-component.css';

const { Title } = Typography;
const { Search } = Input;


export const UserList = () => {
    const { userJointTrainingList } = useSelector(jointTrainingSelector);
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 12;
    const windowSize = useWindowSize();
    let searchWidth;


    if (windowSize > 1024) {
        searchWidth = 484;
    } else if (windowSize > 768) {
        searchWidth = 380;
    } else {
        searchWidth = 312;
    }
    const currentItems = userJointTrainingList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleButtonBack = () =>{
        dispatch(setIsUserList({isUserList: false}));
    }

    const changeSearch = (value: string) => {
        setSearchQuery(value);
    }
    const filteredItems = currentItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
    <div className='users'>
        <div className='users__header'>
        <Title
            level={4}
             className='title'
            ><ArrowLeftOutlined style={{fontSize: '11px', paddingRight: '16px'}}  onClick={handleButtonBack}/>
            Назад
        </Title>
        <Search data-test-id='search-input' placeholder="Поиск по имени" onSearch={changeSearch} style={{ width: searchWidth }} />
        </div>

        <div className='cards_user'>
        {filteredItems.map((item)=> <CardUserJointTraining item={item} key={item.id} searchQuery={searchQuery}/>)}
        </div>
        <Pagination
        size="small"
        defaultCurrent={1}
        pageSize={itemsPerPage}
         total={userJointTrainingList.length}
         onChange={setCurrentPage}
          />

    </div>
    );
};
