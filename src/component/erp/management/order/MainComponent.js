import { useCallback, useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';
import styled from 'styled-components';
import { erpOrderHeaderDataConnect } from '../../../../data_connect/erpOrderHeaderDataConnect';
import { erpOrderItemDataConnect } from '../../../../data_connect/erpOrderItemDataConnect';
import ItemTableComponent from './ItemTableComponent';
import SearchOperatorComponent from './SearchOperatorComponent';
import TopOperatorComponent from './TopOperatorComponent';
import { dateToYYYYMMDDhhmmss, getEndDate, getStartDate } from '../../../../utils/dateFormatUtils';
import { productOptionDataConnect } from '../../../../data_connect/productOptionDataConnect';
import CheckedItemTableComponent from './CheckedItemTableComponent';

const Container = styled.div`
    margin-bottom: 150px;
`;

const MainComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const [test, setTest] = useState(1)
    const [headerState, dispatchHeaderState] = useReducer(headerStateReducer, initialHeaderState);
    const [productOptionListState, dispatchProductOptionListState] = useReducer(productOptionListStateReducer, initialProductOptionListState);
    const [orderItemListState, dispatchOrderItemListState] = useReducer(orderItemListStateReducer, initialOrderItemListState);
    const [checkedOrderItemListState, dispatchCheckedOrderItemListState] = useReducer(checkedOrderItemListStateReducer, initialCheckedOrderItemListState);

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

    const __reqSearchProductOptionList = async () => {
        await productOptionDataConnect().searchList()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchProductOptionListState({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
                }
            })
            .catch(err => {
                console.log(err.response)
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

    const __reqChangeSalesYnForOrderItemList = async function (body) {
        await erpOrderItemDataConnect().changeSalesYnForListInSales(body)
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

    const __reqChangeOptionCodeForOrderItemListInBatch = async function (body) {
        await erpOrderItemDataConnect().changeOptionCodeForListInBatch(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            });
    }

    useEffect(() => {
        __reqSearchOrderHeaderOne();
        __reqSearchProductOptionList();
    }, []);

    useEffect(() => {
        __reqSearchOrderItemList();
    }, [location]);

    const _onChange_checkAllCheckedOrderListState = useCallback(() => {
        if (orderItemListState.length === checkedOrderItemListState.length) {
            dispatchCheckedOrderItemListState({
                type: 'CLEAR'
            })
        } else {
            let data = [...orderItemListState];
            dispatchCheckedOrderItemListState({
                type: 'SET_DATA',
                payload: data
            })
        }
    }, [checkedOrderItemListState, orderItemListState])

    const _onChange_checkOneCheckedOrderListState = useCallback((e, selectedData) => {
        e.stopPropagation();
        let data = [...checkedOrderItemListState];
        let selectedId = selectedData.id;

        if (checkedOrderItemListState.some(r => r.id === selectedId)) {
            data = data.filter(r => r.id !== selectedId);
        } else {
            data.push(selectedData);
        }

        dispatchCheckedOrderItemListState({
            type: 'SET_DATA',
            payload: data
        })
    }, [checkedOrderItemListState])

    // 헤더 설정 서밋
    const _onSubmit_modifiedHeader = async (headerDetails) => {
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

    // 판매 전환 서밋
    const _onSubmit_changeSalesYnForOrderItemList = async (body) => {
        await __reqChangeSalesYnForOrderItemList(body);
        dispatchCheckedOrderItemListState({
            type: 'CLEAR'
        })
        await __reqSearchOrderItemList();
    }

    // 데이터 삭제 서밋
    const _onSubmit_deleteOrderItemList = async function (params) {
        await __reqDeleteOrderItemList(params);
        dispatchCheckedOrderItemListState({
            type: 'CLEAR'
        })
        await __reqSearchOrderItemList();
    }

    // 옵션 코드 변경
    const _onSubmit_changeOptionCodeForOrderItemListInBatch = async function (data) {
        await __reqChangeOptionCodeForOrderItemListInBatch(data);
        await __reqSearchOrderItemList();
    }

    return (
        <>
            <Container>
                <TopOperatorComponent
                    headerState={headerState}

                    _onSubmit_modifiedHeader={_onSubmit_modifiedHeader}
                ></TopOperatorComponent>
                <SearchOperatorComponent
                    headerState={headerState}
                ></SearchOperatorComponent>
                <div>
                    {checkedOrderItemListState.length}
                </div>
                <ItemTableComponent
                    headerState={headerState}
                    productOptionListState={productOptionListState}
                    orderItemListState={orderItemListState}
                    checkedOrderItemListState={checkedOrderItemListState}

                    _onChange_checkAllCheckedOrderListState={_onChange_checkAllCheckedOrderListState}
                    _onChange_checkOneCheckedOrderListState={_onChange_checkOneCheckedOrderListState}
                    _onSubmit_changeSalesYnForOrderItemList={_onSubmit_changeSalesYnForOrderItemList}
                    _onSubmit_deleteOrderItemList={_onSubmit_deleteOrderItemList}
                    _onSubmit_changeOptionCodeForOrderItemListInBatch={_onSubmit_changeOptionCodeForOrderItemListInBatch}
                ></ItemTableComponent>
                <CheckedItemTableComponent
                    headerState={headerState}
                    checkedOrderItemListState={checkedOrderItemListState}
                ></CheckedItemTableComponent>
            </Container>
        </>
    );
}

export default MainComponent;

const initialHeaderState = null;
const initialProductOptionListState = null;
const initialOrderItemListState = null;
const initialCheckedOrderItemListState = [];

const headerStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const productOptionListStateReducer = (state, action) => {
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

const checkedOrderItemListStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return [];
        default: return [];
    }
}