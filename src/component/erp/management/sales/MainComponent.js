import { useCallback, useEffect, useReducer, useState } from 'react';
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
import SecondMergedItemTableComponent from './SecondMergedItemTable.component';
import CheckedItemTableComponent from './CheckedItemTableComponent';
import { erpSecondMergeHeaderDataConnect } from '../../../../data_connect/erpSecondMergeHeaderDataConnect';
import ExcelDownloadModalComponent from './excel-download-modal/ExcelDownloadModal.component';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';

const Container = styled.div`
    margin-bottom: 150px;
`;

const MainComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const [checkedOrderItemListState, dispatchCheckedOrderItemListState] = useReducer(checkedOrderItemListStateReducer, initialCheckedOrderItemListState);
    const [headerState, dispatchHeaderState] = useReducer(headerStateReducer, initialHeaderState);
    const [productOptionListState, dispatchProductOptionListState] = useReducer(productOptionListStateReducer, initialProductOptionListState);
    const [orderItemListState, dispatchOrderItemListState] = useReducer(orderItemListStateReducer, initialOrderItemListState);
    const [firstMergeHeaderListState, dispatchFirstMergeHeaderListState] = useReducer(firstMergeHeaderListStateReducer, initialFirstMergeHeaderListState);
    const [firstMergeHeaderState, dispatchFirstMergeHeaderState] = useReducer(firstMergeHeaderStateReducer, initialFirstMergeHeaderState);
    const [firstMergedItemListState, dispatchFirstMergedItemListState] = useReducer(firstMergedItemListStateReducer, initialFirstMergedItemListState);
    const [secondMergeHeaderListState, dispatchSecondMergeHeaderListState] = useReducer(secondMergeHeaderListStateReducer, initialSecondMergeHeaderListState);
    const [secondMergeHeaderState, dispatchSecondMergeHeaderState] = useReducer(secondMergeHeaderStateReducer, initialSecondMergeHeaderState);
    const [secondMergedItemListState, dispatchSecondMergedItemListState] = useReducer(secondMergedItemListStateReducer, initialSecondMergedItemListState);

    const [excelDownloadModalOpen, setExcelDownloadModalOpen] = useState(false);


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
        let periodType = query.periodType || null;

        let params = {
            salesYn: 'y',
            releaseYn: 'n',
            startDate: startDate,
            endDate: endDate,
            searchColumnName: searchColumnName,
            searchValue: searchValue,
            periodType: periodType
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
        await erpSecondMergeHeaderDataConnect().createOne(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqSearchSecondMergeHeaderList = async () => {
        await erpSecondMergeHeaderDataConnect().searchList()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchSecondMergeHeaderListState({
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

    const __reqDeleteSecondMergeHeader = async (id) => {
        await erpSecondMergeHeaderDataConnect().deleteOne(id)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqUpdateSecondMergeHeader = async (body) => {
        await erpSecondMergeHeaderDataConnect().updateOne(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqFetchSecondMerge = async (secondMergeHeaderId, body) => {
        await erpOrderItemDataConnect().fetchSecondMerge(secondMergeHeaderId, body)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchSecondMergedItemListState({
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

    useEffect(() => {
        __reqSearchOrderHeaderOne();
        __reqSearchProductOptionList();
        __reqSearchFirstMergeHeaderList();
        __reqSearchSecondMergeHeaderList();
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

    const _onCheckedOrderItemListClear = () => {
        dispatchCheckedOrderItemListState({
            type: 'CLEAR'
        })
    }

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

    // 옵션 코드 변경
    const _onSubmit_changeOptionCodeForOrderItemListInBatch = async function (data) {
        await __reqChangeOptionCodeForOrderItemListInBatch(data);
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
    const _onSubmit_fetchFirstMergeOrderItemList = async () => {
        if (!checkedOrderItemListState || checkedOrderItemListState?.length <= 0) {
            alert('병합 데이터를 선택해 주세요.');
            return;
        }

        if (!firstMergeHeaderState) {
            alert('1차 병합 헤더를 먼저 선택해 주세요.');
            return;
        }

        await __reqFetchFirstMerge(firstMergeHeaderState?.id, checkedOrderItemListState);
    }

    // 1차 병합 헤더 선택
    const _onChangeFirstMergeHeaderState = (data) => {
        dispatchFirstMergeHeaderState({
            type: 'INIT_DATA',
            payload: data
        })
        dispatchFirstMergedItemListState({
            type: 'CLEAR'
        })
        dispatchSecondMergedItemListState({
            type: 'CLEAR'
        })
    }

    // 2차 병합 헤더 생성
    const _onSubmit_createSecondMergeHeader = async (body) => {
        await __reqCreateSecondMergeHeaderOne(body)
        await __reqSearchSecondMergeHeaderList();
    }

    // 2차 병합 헤더 선택
    const _onChangeSecondMergeHeaderState = (data) => {
        dispatchSecondMergeHeaderState({
            type: 'INIT_DATA',
            payload: data
        })
        dispatchSecondMergedItemListState({
            type: 'CLEAR'
        })
    }

    // 2 차 병합 헤더 삭제
    const _onSubmit_deleteSecondMergeHeader = async (id) => {
        await __reqDeleteSecondMergeHeader(id);
        await __reqSearchSecondMergeHeaderList();
        dispatchSecondMergeHeaderState({
            type: 'CLEAR'
        })
    }

    // 2차 병합 헤더 수정
    const _onSubmit_updateSecondMergeHeader = async (body) => {
        await __reqUpdateSecondMergeHeader(body);
        await __reqSearchSecondMergeHeaderList();
        dispatchSecondMergeHeaderState({
            type: 'CLEAR'
        })
    }

    // 2차 데이터 병합
    const _onSubmit_fetchSecondMergeOrderItemList = async () => {
        if (!firstMergedItemListState || firstMergedItemListState?.length <= 0) {
            alert('1차 병합이 선행 되어야 합니다.');
            return;
        }

        if (!secondMergeHeaderState) {
            alert('2차 병합 헤더를 먼저 선택해 주세요.');
            return;
        }

        await __reqFetchSecondMerge(secondMergeHeaderState?.id, firstMergedItemListState);
    }

    const _onChange_openExcelDownloadModal = () => {
        setExcelDownloadModalOpen(true);
    }

    const _onChange_closeExcelDownloadModal = () => {
        setExcelDownloadModalOpen(false);
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
                    productOptionListState={productOptionListState}
                    checkedOrderItemListState={checkedOrderItemListState}

                    _onChange_checkAllCheckedOrderListState={_onChange_checkAllCheckedOrderListState}
                    _onChange_checkOneCheckedOrderListState={_onChange_checkOneCheckedOrderListState}
                ></ItemTableComponent>
                <CheckedItemTableComponent
                    headerState={headerState}
                    productOptionListState={productOptionListState}
                    checkedOrderItemListState={checkedOrderItemListState}

                    _onCheckedOrderItemListClear={_onCheckedOrderItemListClear}
                    _onSubmit_changeSalesYnForOrderItemList={_onSubmit_changeSalesYnForOrderItemList}
                    _onSubmit_changeOptionCodeForOrderItemListInBatch={_onSubmit_changeOptionCodeForOrderItemListInBatch}
                    _onChange_openExcelDownloadModal={_onChange_openExcelDownloadModal}
                ></CheckedItemTableComponent>
                {/* <FirstMergeOperatorComponent
                    firstMergeHeaderListState={firstMergeHeaderListState}
                    firstMergeHeaderState={firstMergeHeaderState}

                    _onSubmit_fetchFirstMergeOrderItemList={_onSubmit_fetchFirstMergeOrderItemList}
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
                    secondMergeHeaderListState={secondMergeHeaderListState}
                    secondMergeHeaderState={secondMergeHeaderState}

                    _onSubmit_fetchSecondMergeOrderItemList={_onSubmit_fetchSecondMergeOrderItemList}
                    _onSubmit_createSecondMergeHeader={_onSubmit_createSecondMergeHeader}
                    _onSubmit_deleteSecondMergeHeader={_onSubmit_deleteSecondMergeHeader}
                    _onSubmit_updateSecondMergeHeader={_onSubmit_updateSecondMergeHeader}
                    _onChangeSecondMergeHeaderState={_onChangeSecondMergeHeaderState}
                ></SecondMergeOperatorComponent>
                <SecondMergedItemTableComponent
                    headerState={secondMergeHeaderState}
                    orderItemListState={secondMergedItemListState}
                ></SecondMergedItemTableComponent> */}
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={excelDownloadModalOpen}
                maxWidth={'lg'}

                onClose={_onChange_closeExcelDownloadModal}
            >
                <ExcelDownloadModalComponent
                    headerState={headerState}
                    checkedOrderItemListState={checkedOrderItemListState}
                ></ExcelDownloadModalComponent>
            </CommonModalComponent>
        </>
    );
}
export default MainComponent;

const initialHeaderState = null;
const initialProductOptionListState = null;
const initialOrderItemListState = null;
const initialCheckedOrderItemListState = [];
const initialFirstMergeHeaderListState = null;
const initialFirstMergeHeaderState = null;
const initialFirstMergedItemListState = null;
const initialSecondMergeHeaderListState = null;
const initialSecondMergeHeaderState = null;
const initialSecondMergedItemListState = null;

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

const secondMergeHeaderListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const secondMergeHeaderStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const secondMergedItemListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}