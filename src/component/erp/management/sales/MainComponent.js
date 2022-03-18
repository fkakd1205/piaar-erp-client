import { useCallback, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import qs from 'query-string';
import { erpSalesHeaderDataConnect } from '../../../../data_connect/erpSalesHeaderDataConnect';
import { erpOrderItemDataConnect } from '../../../../data_connect/erpOrderItemDataConnect';
import ItemTableComponent from './ItemTableComponent';
import TopOperatorComponent from './TopOperatorComponent';
import SearchOperatorComponent from './SearchOperatorComponent';
import { useLocation } from 'react-router-dom';
import { dateToYYYYMMDDhhmmss, dateToYYYYMMDDhhmmssFile, getEndDate, getStartDate } from '../../../../utils/dateFormatUtils';
import { productOptionDataConnect } from '../../../../data_connect/productOptionDataConnect';
import CheckedItemTableComponent from './CheckedItemTableComponent';
import ExcelDownloadModalComponent from './excel-download-modal/ExcelDownloadModal.component';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';
import { erpDownloadExcelHeaderDataConnect } from '../../../../data_connect/erpDownloadExcelHeaderDataConnect';

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
    const [excelFormHeaderList, dispatchExcelFormHeaderList] = useReducer(excelFormHeaderListReducer, initialExcelFormHeaderList);

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

    const __reqSearchSecondMergeHeaderList = async () => {
        await erpDownloadExcelHeaderDataConnect().searchList()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchExcelFormHeaderList({
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

    const __reqActionDownloadForDownloadOrderItems = async (id, downloadOrderItemsBody) => {
        await erpDownloadExcelHeaderDataConnect().actionDownloadForDownloadOrderItems(id, downloadOrderItemsBody)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                    const link = document.createElement('a');
                    link.href = url;

                    let date = dateToYYYYMMDDhhmmssFile(new Date());

                    link.setAttribute('download', date + '_판매데이터_엑셀.xlsx');
                    document.body.appendChild(link);
                    link.click();
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

    // 엑셀 다운로드
    const _onSubmit_downloadOrderItemsExcel = async (downloadExcelHeader, downloadOrderItemList) => {
        await __reqActionDownloadForDownloadOrderItems(downloadExcelHeader.id, downloadOrderItemList);
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
                {/* <PageHeaderComponent
                    headerState={headerState}

                    _onSubmit_modifiedHeader={_onSubmit_modifiedHeader}
                ></PageHeaderComponent> */}
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
                    excelFormHeaderList={excelFormHeaderList}

                    _onSubmit_downloadOrderItemsExcel={_onSubmit_downloadOrderItemsExcel}
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
const initialExcelFormHeaderList = null;

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

const excelFormHeaderListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}