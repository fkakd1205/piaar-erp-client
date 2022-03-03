import { useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';
import styled from 'styled-components';
import { erpOrderHeaderDataConnect } from '../../../../data_connect/erpOrderHeaderDataConnect';
import { erpOrderItemDataConnect } from '../../../../data_connect/erpOrderItemDataConnect';
import ItemTableComponent from './ItemTableComponent';
import SearchOperatorComponent from './SearchOperatorComponent';
import TopOperatorComponent from './TopOperatorComponent';
import { getEndDate, getStartDate } from '../../../../utils/dateFormatUtils';

const Container = styled.div`
    margin-bottom: 150px;
`;

const initialHeaderState = null;
const initialOrderItemListState = null;
const headerStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}
const orderItemListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const MainComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const [headerState, dispatchHeaderState] = useReducer(headerStateReducer, initialHeaderState);
    const [orderItemListState, dispatchOrderItemListState] = useReducer(orderItemListStateReducer, initialOrderItemListState);

    const __reqSearchOrderHeaderOne = async () => {
        await erpOrderHeaderDataConnect().searchOne()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchHeaderState({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const __reqSearchOrderItemList = async () => {
        let startDate = query.startDate ? getStartDate(query.startDate) : null;
        let endDate = query.endDate ? getEndDate(query.endDate) : null;
        let searchColumnName = query.searchColumnName || null;
        let searchValue = query.searchValue || null;

        let params = {
            salesYn: 'n',
            releaseYn: 'n',
            startDate: startDate,
            endDate: endDate,
            searchColumnName: searchColumnName,
            searchValue: searchValue
        }

        await erpOrderItemDataConnect().searchList(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchOrderItemListState({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
                }
            })
            .catch(err => {
                let res = err.response;
                console.log(res);
            })
    }

    const __reqCreateOrderHeaderOne = async (params) => {
        await erpOrderHeaderDataConnect().createOne(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqUpdateOrderHeaderOne = async (params) => {
        await erpOrderHeaderDataConnect().updateOne(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqUpdateOrderItemToSales = async function (params) {
        await erpOrderItemDataConnect().updateListToSales(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqDeleteOrderItemList = async function (params) {
        await erpOrderItemDataConnect().deleteList(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    useEffect(() => {
        __reqSearchOrderHeaderOne();
    }, []);

    useEffect(() => {
        console.log('helo')
        __reqSearchOrderItemList();
    }, [location]);


    const _onSubmitModifiedHeader = async (headerDetails) => {
        let params = null;
        if (!headerState) {
            params = {
                headerDetail: {
                    details: headerDetails
                }
            }
            await __reqCreateOrderHeaderOne(params);
        } else {
            params = {
                ...headerState,
                headerDetail: {
                    details: headerDetails
                }
            }
            await __reqUpdateOrderHeaderOne(params);
        }

        await __reqSearchOrderHeaderOne();
    }

    // 판매 전환 서밋 : soldYn = y 로 업데이트
    const _onSubmitOrderItemListToSales = async (params) => {
        await __reqUpdateOrderItemToSales(params);
        await __reqSearchOrderItemList();
    }

    // 데이터 삭제 서밋
    const _onSubmitOrderItemListDelete = async function (params) {
        await __reqDeleteOrderItemList(params);
        await __reqSearchOrderItemList();
    }

    return (
        <>
            <Container>
                <TopOperatorComponent
                    headerState={headerState}

                    _onSubmitModifiedHeader={_onSubmitModifiedHeader}
                ></TopOperatorComponent>
                <SearchOperatorComponent
                    headerState={headerState}
                ></SearchOperatorComponent>
                <ItemTableComponent
                    headerState={headerState}
                    orderItemListState={orderItemListState}

                    _onSubmitOrderItemListToSales={_onSubmitOrderItemListToSales}
                    _onSubmitOrderItemListDelete={_onSubmitOrderItemListDelete}
                ></ItemTableComponent>
            </Container>
        </>
    );
}
export default MainComponent;