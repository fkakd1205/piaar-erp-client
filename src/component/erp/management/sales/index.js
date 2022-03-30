import { useEffect, useReducer, useState } from 'react';
import qs from 'query-string';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';
import ViewHeaderSettingModalComponent from './view-header-setting-modal/ViewHeaderSettingModal.component';
import HeaderComponent from './header/Header.component';
import { erpSalesHeaderDataConnect } from '../../../../data_connect/erpSalesHeaderDataConnect';
import SearchOperatorComponent from './search-operator/SearchOperator.component';
import { dateToYYYYMMDDhhmmssFile, getEndDate, getStartDate } from '../../../../utils/dateFormatUtils';
import { erpOrderItemDataConnect } from '../../../../data_connect/erpOrderItemDataConnect';
import { productOptionDataConnect } from '../../../../data_connect/productOptionDataConnect';
import OrderItemTableComponent from './order-item-table/OrderItemTable.component';
import CheckedOrderItemTableComponent from './checked-order-item-table/CheckedOrderItemTable.component';
import CheckedOperatorComponent from './checked-operator/CheckedOperator.component';
import { erpDownloadExcelHeaderDataConnect } from '../../../../data_connect/erpDownloadExcelHeaderDataConnect';
import { BackdropHookComponent, useBackdropHook } from '../../../../hooks/backdrop/useBackdropHook';
import OrderItemTablePagenationComponent from './order-item-table-pagenation/OrderItemTablePagenation.component';
import { getDefaultHeaderFields } from '../../../../static-data/staticData';
import { sortFormatUtils } from '../../../../utils/sortFormatUtils';

const Container = styled.div`
    margin-bottom: 100px;
`;

const DEFAULT_HEADER_FIELDS = getDefaultHeaderFields();

const SalesComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const [viewHeader, dispatchViewHeader] = useReducer(viewHeaderReducer, initialViewHeader);
    const [productOptionList, dispatchProductOptionList] = useReducer(productOptionListReducer, initialProductOptionList);
    const [orderItemPage, dispatchOrderItemPage] = useReducer(orderItemPageReducer, initialOrderItemPage);
    const [checkedOrderItemList, dispatchCheckedOrderItemList] = useReducer(checkedOrderItemListReducer, initialCheckedOrderItemList);
    const [downloadExcelList, dispatchDownloadExcelList] = useReducer(downloadExcelListReducer, initialDownloadExcelList);

    const [headerSettingModalOpen, setHeaderSettingModalOpen] = useState(false);

    const __reqSearchOrderHeaderOne = async () => {
        await erpSalesHeaderDataConnect().searchOne()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchViewHeader({
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
                    dispatchProductOptionList({
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
        let searchQuery = query.searchQuery || null;
        let periodType = query.periodType || null;
        let page = query.page || null;
        let size = query.size || null;
        let sortBy = query.sortBy || null;
        let sortDirection = query.sortDirection || null;
        let sort = sortFormatUtils().getSortWithSortElements(DEFAULT_HEADER_FIELDS, sortBy, sortDirection);

        let params = {
            salesYn: 'y',
            startDate: startDate,
            endDate: endDate,
            periodType: periodType,
            searchColumnName: searchColumnName,
            searchQuery: searchQuery,
            page: page,
            size: size,
            sort: sort
        }

        await erpOrderItemDataConnect().searchList(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchOrderItemPage({
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

    const __reqChangeReleaseOptionCodeForOrderItemListInBatch = async function (body) {
        await erpOrderItemDataConnect().changeReleaseOptionCodeForListInBatch(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            });
    }

    const __reqSearchDownloadExcelHeaders = async () => {
        await erpDownloadExcelHeaderDataConnect().searchList()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchDownloadExcelList({
                        type: 'SET_DATA',
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
                if (res.status === 200) {
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

    const __reqChangeReleaseYnForOrderItemList = async (body) => {
        await erpOrderItemDataConnect().changeReleaseYnForList(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqUpdateOrderItemOne = async (body) => {
        await erpOrderItemDataConnect().updateOne(body)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    alert('수정되었습니다.');
                    return;
                }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data?.memo);
            })
    }

    useEffect(() => {
        __reqSearchOrderHeaderOne();
        __reqSearchProductOptionList();
        __reqSearchDownloadExcelHeaders();
    }, []);

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await __reqSearchOrderItemList();
            onActionCloseBackdrop();
        }
        fetchInit();
    }, [location]);

    const _onAction_openHeaderSettingModal = () => {
        setHeaderSettingModalOpen(true);
    }

    const _onAction_closeHeaderSettingModal = () => {
        setHeaderSettingModalOpen(false);
    }

    const _onAction_checkOrderItem = (e, orderItem) => {
        e.stopPropagation();
        let data = [...checkedOrderItemList];
        let selectedId = orderItem.id;

        if (checkedOrderItemList.some(r => r.id === selectedId)) {
            data = data.filter(r => r.id !== selectedId);
        } else {
            data.push(orderItem);
        }

        dispatchCheckedOrderItemList({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onAction_checkOrderItemAll = () => {
        let newData = [];
        let idSet = new Set(checkedOrderItemList.map(r => r.id));

        orderItemPage.content.forEach(r => {
            if (idSet.has(r.id)) {
                return;
            } else {
                newData.push(r);
            }
        });

        dispatchCheckedOrderItemList({
            type: 'SET_DATA',
            payload: [
                ...checkedOrderItemList,
                ...newData
            ]
        });
    }

    const _onAction_releaseOrderItemAll = () => {
        let idSet = new Set(orderItemPage.content.map(r => r.id));

        let newData = checkedOrderItemList.filter(r => {
            return !idSet.has(r.id);
        })

        dispatchCheckedOrderItemList({
            type: 'SET_DATA',
            payload: newData
        })
    }

    const _onAction_releaseCheckedOrderItemListAll = () => {
        dispatchCheckedOrderItemList({
            type: 'CLEAR'
        })
    }

    // 헤더 설정 서밋
    const _onSubmit_saveAndModifyViewHeader = async (headerDetails) => {
        onActionOpenBackdrop();
        let params = null;
        if (!viewHeader) {
            params = {
                headerDetail: {
                    details: headerDetails
                }
            }
            await __reqCreateOrderHeaderOne(params);
        } else {
            params = {
                ...viewHeader,
                headerDetail: {
                    details: headerDetails
                }
            }
            await __reqUpdateOrderHeaderOne(params);
        }

        _onAction_closeHeaderSettingModal();
        await __reqSearchOrderHeaderOne();
        onActionCloseBackdrop();
    }

    // 판매 전환 서밋
    const _onSubmit_changeSalesYnForOrderItemList = async (body) => {
        onActionOpenBackdrop();
        await __reqChangeSalesYnForOrderItemList(body);
        dispatchCheckedOrderItemList({
            type: 'CLEAR'
        })
        await __reqSearchOrderItemList();
        onActionCloseBackdrop();
    }

    // 데이터 삭제 서밋
    const _onSubmit_deleteOrderItemList = async function (params) {
        onActionOpenBackdrop();
        await __reqDeleteOrderItemList(params);
        dispatchCheckedOrderItemList({
            type: 'CLEAR'
        })
        await __reqSearchOrderItemList();
        onActionCloseBackdrop();
    }

    // 옵션 코드 변경
    const _onSubmit_changeOptionCodeForOrderItemListInBatch = async function (body) {
        onActionOpenBackdrop();
        await __reqChangeOptionCodeForOrderItemListInBatch(body);
        dispatchCheckedOrderItemList({
            type: 'CLEAR'
        })
        await __reqSearchOrderItemList();
        onActionCloseBackdrop();
    }

    // 출고 옵션 코드 변경
    const _onSubmit_changeReleaseOptionCodeForOrderItemListInBatch = async function (body) {
        onActionOpenBackdrop();
        await __reqChangeReleaseOptionCodeForOrderItemListInBatch(body);
        dispatchCheckedOrderItemList({
            type: 'CLEAR'
        })
        await __reqSearchOrderItemList();
        onActionCloseBackdrop();
    }

    // 엑셀 다운로드
    const _onSubmit_downloadOrderItemsExcel = async (downloadExcelHeader, downloadOrderItemList) => {
        onActionOpenBackdrop();
        await __reqActionDownloadForDownloadOrderItems(downloadExcelHeader.id, downloadOrderItemList);
        onActionCloseBackdrop();
    }

    // 출고 전환
    const _onSubmit_changeReleaseYnForOrderItemList = async (body) => {
        onActionOpenBackdrop();
        await __reqChangeReleaseYnForOrderItemList(body);
        dispatchCheckedOrderItemList({
            type: 'CLEAR'
        })
        await __reqSearchOrderItemList();
        onActionCloseBackdrop();
    }

    // 단일 erpOrderItem 업데이트
    const _onSubmit_updateErpOrderItemOne = async (body) => {
        onActionOpenBackdrop();
        await __reqUpdateOrderItemOne(body);
        dispatchCheckedOrderItemList({
            type: 'CLEAR'
        })
        await __reqSearchOrderItemList();
        onActionCloseBackdrop();
    }

    return (
        <>
            <Container>
                <HeaderComponent
                    _onAction_openHeaderSettingModal={_onAction_openHeaderSettingModal}
                ></HeaderComponent>
                <SearchOperatorComponent
                    viewHeader={viewHeader}
                ></SearchOperatorComponent>
                <OrderItemTableComponent
                    viewHeader={viewHeader}
                    orderItemList={orderItemPage?.content}
                    checkedOrderItemList={checkedOrderItemList}

                    _onAction_checkOrderItem={_onAction_checkOrderItem}
                    _onAction_checkOrderItemAll={_onAction_checkOrderItemAll}
                    _onAction_releaseOrderItemAll={_onAction_releaseOrderItemAll}
                    _onSubmit_updateErpOrderItemOne={_onSubmit_updateErpOrderItemOne}
                ></OrderItemTableComponent>
                <OrderItemTablePagenationComponent
                    orderItemPage={orderItemPage}
                ></OrderItemTablePagenationComponent>
                <CheckedOperatorComponent
                    viewHeader={viewHeader}
                    checkedOrderItemList={checkedOrderItemList}
                    productOptionList={productOptionList}
                    downloadExcelList={downloadExcelList}

                    _onAction_releaseCheckedOrderItemListAll={_onAction_releaseCheckedOrderItemListAll}
                    _onSubmit_changeSalesYnForOrderItemList={_onSubmit_changeSalesYnForOrderItemList}
                    _onSubmit_deleteOrderItemList={_onSubmit_deleteOrderItemList}
                    _onSubmit_changeOptionCodeForOrderItemListInBatch={_onSubmit_changeOptionCodeForOrderItemListInBatch}
                    _onSubmit_changeReleaseOptionCodeForOrderItemListInBatch={_onSubmit_changeReleaseOptionCodeForOrderItemListInBatch}
                    _onSubmit_downloadOrderItemsExcel={_onSubmit_downloadOrderItemsExcel}
                    _onSubmit_changeReleaseYnForOrderItemList={_onSubmit_changeReleaseYnForOrderItemList}
                ></CheckedOperatorComponent>
                <CheckedOrderItemTableComponent
                    viewHeader={viewHeader}
                    checkedOrderItemList={checkedOrderItemList}
                ></CheckedOrderItemTableComponent>
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={headerSettingModalOpen}
                maxWidth={'lg'}

                onClose={_onAction_closeHeaderSettingModal}
            >
                <ViewHeaderSettingModalComponent
                    viewHeader={viewHeader}

                    _onSubmit_saveAndModifyViewHeader={_onSubmit_saveAndModifyViewHeader}
                ></ViewHeaderSettingModalComponent>
            </CommonModalComponent>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            ></BackdropHookComponent>
        </>
    );
}

export default SalesComponent;

const initialViewHeader = null;
const initialProductOptionList = null;
const initialOrderItemPage = null;
const initialCheckedOrderItemList = [];
const initialDownloadExcelList = null;

const viewHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const productOptionListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const orderItemPageReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const checkedOrderItemListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return [];
        default: return [];
    }
}

const downloadExcelListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}