import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import qs from 'query-string';
import { erpSalesHeaderDataConnect } from '../../../../data_connect/erpSalesHeaderDataConnect';
import { erpOrderItemDataConnect } from '../../../../data_connect/erpOrderItemDataConnect';
import ItemTableComponent from './ItemTableComponent';
import TopOperatorComponent from './TopOperatorComponent';
import SearchOperatorComponent from './SearchOperatorComponent';
import { useLocation } from 'react-router-dom';
import { getEndDate, getStartDate } from '../../../../utils/dateFormatUtils';
import { productOptionDataConnect } from '../../../../data_connect/productOptionDataConnect';
import FirstMergeOperatorComponent from './FirstMergeOperatorComponent';
import { erpFirstMergeHeaderDataConnect } from '../../../../data_connect/erpFirstMergeHeaderDataConnect';
import FirstMergedItemTableComponent from './FirstMergedItemTable.component';
import SecondMergeOperatorComponent from './SecondMergeOperator.component';

const Container = styled.div`
    margin-bottom: 150px;
`;

const MainComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const [headerState, dispatchHeaderState] = useReducer(headerStateReducer, initialHeaderState);
    const [productOptionListState, dispatchProductOptionListState] = useReducer(productOptionListStateReducer, initialProductOptionListState);
    const [orderItemListState, dispatchOrderItemListState] = useReducer(orderItemListStateReducer, initialOrderItemListState);
    const [firstMergeHeaderListState, dispatchFirstMergeHeaderListState] = useReducer(firstMergeHeaderListStateReducer, initialFirstMergeHeaderListState);
    const [firstMergeHeaderState, dispatchFirstMergeHeaderState] = useReducer(firstMergeHeaderStateReducer, initialFirstMergeHeaderState);
    const [firstMergedItemListState, dispatchFirstMergedItemListState] = useReducer(firstMergedItemListStateReducer, initialFirstMergedItemListState);

    const __reqSearchOrderHeaderOne = async () => {
        await erpSalesHeaderDataConnect().searchOne()
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
        await erpSalesHeaderDataConnect().createOne(params)
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
        await erpSalesHeaderDataConnect().updateOne(params)
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
            salesYn: 'y',
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

    const __reqCreateFirstMergeHeaderOne = async (body) => {
        await erpFirstMergeHeaderDataConnect().createOne(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqSearchFirstMergeHeaderList = async () => {
        await erpFirstMergeHeaderDataConnect().searchList()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchFirstMergeHeaderListState({
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

    const __reqDeleteFirstMergeHeader = async (id) => {
        await erpFirstMergeHeaderDataConnect().deleteOne(id)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqUpdateFirstMergeHeader = async (body) => {
        await erpFirstMergeHeaderDataConnect().updateOne(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqFetchFirstMerge = async (firstMergeHeaderId, body) => {
        await erpOrderItemDataConnect().fetchFirstMerge(firstMergeHeaderId, body)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchFirstMergedItemListState({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
                }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqCreateSecondMergeHeaderOne = async (body) => {
        await erpFirstMergeHeaderDataConnect().createOne(body)
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
        __reqSearchProductOptionList();
        __reqSearchFirstMergeHeaderList();
    }, []);

    useEffect(() => {
        __reqSearchOrderItemList();
    }, [location]);

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
        await __reqSearchOrderItemList();
    }

    // 1차 병합 해더 생성
    const _onSubmit_createFirstMergeHeader = async (body) => {
        await __reqCreateFirstMergeHeaderOne(body);
        await __reqSearchFirstMergeHeaderList();
    }

    // 1 차 병합 헤더 삭제
    const _onSubmit_deleteFirstMergeHeader = async (id) => {
        await __reqDeleteFirstMergeHeader(id);
        await __reqSearchFirstMergeHeaderList();
        dispatchFirstMergeHeaderState({
            type: 'CLEAR'
        })
    }

    // 1차 병합 헤더 수정
    const _onSubmit_updateFirstMergeHeader = async (body) => {
        await __reqUpdateFirstMergeHeader(body);
        await __reqSearchFirstMergeHeaderList();
        dispatchFirstMergeHeaderState({
            type: 'CLEAR'
        })
    }

    // 1차 데이터 병합
    const _onSubmit_fetchFirstMergeOrderItemList = async (checkedOrderItemList) => {
        if (!firstMergeHeaderState) {
            alert('1차 병합 헤더를 먼저 선택해 주세요.');
            return;
        }

        await __reqFetchFirstMerge(firstMergeHeaderState?.id, checkedOrderItemList);
    }

    const _onChangeFirstMergeHeaderState = (data) => {
        dispatchFirstMergeHeaderState({
            type: 'INIT_DATA',
            payload: data
        })
    }

    // 2차 병합 헤더 생성
    const _onSubmit_createSecondMergeHeader = async (body) => {
        await __reqCreateSecondMergeHeaderOne(body)
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
                <ItemTableComponent
                    headerState={headerState}
                    orderItemListState={orderItemListState}

                    _onSubmit_changeSalesYnForOrderItemList={_onSubmit_changeSalesYnForOrderItemList}
                    _onSubmit_createFirstMergeHeader={_onSubmit_createFirstMergeHeader}
                    _onSubmit_deleteFirstMergeHeader={_onSubmit_deleteFirstMergeHeader}
                    _onSubmit_fetchFirstMergeOrderItemList={_onSubmit_fetchFirstMergeOrderItemList}
                ></ItemTableComponent>
                <FirstMergeOperatorComponent
                    firstMergeHeaderListState={firstMergeHeaderListState}
                    firstMergeHeaderState={firstMergeHeaderState}

                    _onSubmit_createFirstMergeHeader={_onSubmit_createFirstMergeHeader}
                    _onSubmit_deleteFirstMergeHeader={_onSubmit_deleteFirstMergeHeader}
                    _onSubmit_updateFirstMergeHeader={_onSubmit_updateFirstMergeHeader}
                    _onChangeFirstMergeHeaderState={_onChangeFirstMergeHeaderState}
                ></FirstMergeOperatorComponent>
                <FirstMergedItemTableComponent
                    headerState={firstMergeHeaderState}
                    orderItemListState={firstMergedItemListState}
                ></FirstMergedItemTableComponent>
                <SecondMergeOperatorComponent
                    _onSubmit_createSecondMergeHeader={_onSubmit_createSecondMergeHeader}
                ></SecondMergeOperatorComponent>
            </Container>
        </>
    );
}
export default MainComponent;

const initialHeaderState = null;
const initialProductOptionListState = null;
const initialOrderItemListState = null;
const initialFirstMergeHeaderListState = null;
const initialFirstMergeHeaderState = null;
const initialFirstMergedItemListState = null;

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

const firstMergeHeaderListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const firstMergeHeaderStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const firstMergedItemListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}