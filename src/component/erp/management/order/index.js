import { useEffect, useReducer, useState } from 'react';
import qs from 'query-string';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';
import ViewHeaderSettingModalComponent from './view-header-setting-modal/ViewHeaderSettingModal.component';
import HeaderComponent from './header/Header.component';
import { erpOrderHeaderDataConnect } from '../../../../data_connect/erpOrderHeaderDataConnect';
import SearchOperatorComponent from './search-operator/SearchOperator.component';
import { dateToYYYYMMDDhhmmssFile, getEndDate, getStartDate } from '../../../../utils/dateFormatUtils';
import { erpOrderItemDataConnect } from '../../../../data_connect/erpOrderItemDataConnect';
import { productOptionDataConnect } from '../../../../data_connect/productOptionDataConnect';
import OrderItemTableComponent from './order-item-table/OrderItemTable.component';
import CheckedOrderItemTableComponent from './checked-order-item-table/CheckedOrderItemTable.component';
import CheckedOperatorComponent from './checked-operator/CheckedOperator.component';
import { useBackdropHook, BackdropHookComponent } from '../../../../hooks/backdrop/useBackdropHook';
import { getDefaultHeaderFields } from '../../../../static-data/staticData';
import OrderItemTablePagenationComponent from './order-item-table-pagenation/OrderItemTablePagenation.component';
import { sortFormatUtils } from '../../../../utils/sortFormatUtils';
import useSocketClient from '../../../../web-hooks/socket/useSocketClient';
import { erpOrderItemSocket } from '../../../../data_connect/socket/erpOrderItemSocket';
import { erpOrderHeaderSocket } from '../../../../data_connect/socket/erpOrderHeaderSocket';
import { useSocketConnectLoadingHook, SocketConnectLoadingHookComponent } from '../../../../hooks/loading/useSocketConnectLoadingHook';
import { useBasicSnackbarHook, BasicSnackbarHookComponent } from '../../../../hooks/snackbar/useBasicSnackbarHook';
import { erpDownloadExcelHeaderDataConnect } from '../../../../data_connect/erpDownloadExcelHeaderDataConnect';

const Container = styled.div`
    margin-bottom: 100px;
`;

const DEFAULT_HEADER_FIELDS = getDefaultHeaderFields();

const OrderComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const {
        connected,
        onPublish,
        onSubscribe,
        onUnsubscribe,
    } = useSocketClient();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnacbar,
    } = useBasicSnackbarHook();

    const {
        open: socketConnectLoadingOpen,
        onActionOpen: onActionOpenSocketConnectLoading,
        onActionClose: onActionCloseSocketConnectLoading
    } = useSocketConnectLoadingHook();

    const [viewHeader, dispatchViewHeader] = useReducer(viewHeaderReducer, initialViewHeader);
    const [productOptionList, dispatchProductOptionList] = useReducer(productOptionListReducer, initialProductOptionList);
    const [orderItemPage, dispatchOrderItemPage] = useReducer(orderItemPageReducer, initialOrderItemPage);
    const [checkedOrderItemList, dispatchCheckedOrderItemList] = useReducer(checkedOrderItemListReducer, initialCheckedOrderItemList);
    const [downloadExcelList, dispatchDownloadExcelList] = useReducer(downloadExcelListReducer, initialDownloadExcelList);

    const [headerSettingModalOpen, setHeaderSettingModalOpen] = useState(false);

    // Search
    const __reqSearchViewHeaderOne = async () => {
        await erpOrderHeaderDataConnect().searchOne()
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
            salesYn: 'n',
            releaseYn: 'n',
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
                    });
                }
            })
            .catch(err => {
                let res = err.response;
                console.log(res);
            })
    }

    const __reqRefreshOrderItemList = async (ids) => {
        let params = {
            ids: ids,
            salesYn: 'n',
            releaseYn: 'n',
        }

        await erpOrderItemDataConnect().refreshList(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchCheckedOrderItemList({
                        type: 'SET_DATA',
                        payload: res.data.data
                    });
                }
            })
            .catch(err => {
                let res = err.response;
                console.log(res);
            })
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

    // Create
    const __reqCreateOrderHeaderOneSocket = async (params) => {
        await erpOrderHeaderSocket().createOne(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    // Update And Change
    const __reqUpdateOrderHeaderOneSocket = async (params) => {
        await erpOrderHeaderSocket().updateOne(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqUpdateOrderItemOneSocket = async (body) => {
        await erpOrderItemSocket().updateOne(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data?.memo);
            })
    }

    const __reqChangeSalesYnForOrderItemListSocket = async function (body) {
        await erpOrderItemSocket().changeSalesYnForListInSales(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }


    const __reqChangeOptionCodeForOrderItemListInBatchSocket = async function (body) {
        await erpOrderItemSocket().changeOptionCodeForListInBatch(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            });
    }

    // Delete
    const __reqDeleteOrderItemListSocket = async function (params) {
        await erpOrderItemSocket().deleteList(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    // Action
    const __reqActionDownloadForDownloadOrderItems = async (id, downloadOrderItemsBody) => {
        await erpDownloadExcelHeaderDataConnect().actionDownloadForDownloadOrderItems(id, downloadOrderItemsBody)
            .then(res => {
                // if (res.status === 200 && res.data.message === 'success') {
                const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                const link = document.createElement('a');
                link.href = url;

                let date = dateToYYYYMMDDhhmmssFile(new Date());

                link.setAttribute('download', date + '_주문수집_데이터_엑셀.xlsx');
                document.body.appendChild(link);
                link.click();
                // }
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
        __reqSearchViewHeaderOne();
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

    useEffect(() => {
        async function subscribeSockets() {
            onActionOpenSocketConnectLoading();
            if (!connected) {
                return;
            }

            onSubscribe([
                {
                    subscribeUrl: '/topic/erp.erp-order-item',
                    callback: async (e) => {
                        console.log(e);
                        let body = JSON.parse(e.body);
                        if (body?.statusCode === 200) {
                            await __reqSearchOrderItemList();
                            if (body?.socketMemo) {
                                onActionOpenSnackbar(body?.socketMemo)
                            }
                        }
                    }
                },
                {
                    subscribeUrl: '/topic/erp.erp-order-header',
                    callback: async (e) => {
                        let body = JSON.parse(e.body);
                        if (body?.statusCode === 200) {
                            await __reqSearchViewHeaderOne();
                        }
                    }
                }
            ]);
            onActionCloseSocketConnectLoading();
        }
        subscribeSockets();
        return () => {
            onUnsubscribe();
        };
    }, [connected]);

    useEffect(() => {
        async function fetchCheckedOrderItems() {
            if (!orderItemPage || !checkedOrderItemList || checkedOrderItemList?.length <= 0) {
                return;
            }

            let ids = checkedOrderItemList.map(r => r.id);
            await __reqRefreshOrderItemList(ids);
        }

        fetchCheckedOrderItems();
    }, [orderItemPage])

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
        onActionOpenBackdrop()
        let params = null;
        if (!viewHeader) {
            params = {
                headerDetail: {
                    details: headerDetails
                }
            }
            await __reqCreateOrderHeaderOneSocket(params);
        } else {
            params = {
                ...viewHeader,
                headerDetail: {
                    details: headerDetails
                }
            }
            await __reqUpdateOrderHeaderOneSocket(params);
        }

        _onAction_closeHeaderSettingModal();
        onActionCloseBackdrop()
    }

    // 판매 전환 서밋
    const _onSubmit_changeSalesYnForOrderItemList = async (body) => {
        onActionOpenBackdrop()
        await __reqChangeSalesYnForOrderItemListSocket(body);
        onActionCloseBackdrop()
    }

    // 데이터 삭제 서밋
    const _onSubmit_deleteOrderItemList = async function (params) {
        onActionOpenBackdrop()
        await __reqDeleteOrderItemListSocket(params);
        onActionCloseBackdrop()
    }

    // 옵션 코드 변경
    const _onSubmit_changeOptionCodeForOrderItemListInBatch = async function (body) {
        onActionOpenBackdrop()
        await __reqChangeOptionCodeForOrderItemListInBatchSocket(body);
        onActionCloseBackdrop()
    }

    // 단일 erpOrderItem 업데이트
    const _onSubmit_updateErpOrderItemOne = async (body) => {
        onActionOpenBackdrop();
        await __reqUpdateOrderItemOneSocket(body);
        onActionCloseBackdrop();
    }

    // 엑셀 다운로드
    const _onSubmit_downloadOrderItemsExcel = async (downloadExcelHeader, downloadOrderItemList) => {
        onActionOpenBackdrop();
        await __reqActionDownloadForDownloadOrderItems(downloadExcelHeader.id, downloadOrderItemList);
        onActionCloseBackdrop();
    }

    return (
        <>
            {connected &&
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
                        _onSubmit_downloadOrderItemsExcel={_onSubmit_downloadOrderItemsExcel}
                    ></CheckedOperatorComponent>
                    <CheckedOrderItemTableComponent
                        viewHeader={viewHeader}
                        checkedOrderItemList={checkedOrderItemList}
                    ></CheckedOrderItemTableComponent>
                </Container>
            }

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
            />

            {/* Snackbar */}
            {snackbarOpen &&
                <BasicSnackbarHookComponent
                    open={snackbarOpen}
                    message={snackbarMessage}
                    onClose={onActionCloseSnacbar}
                    severity={'success'}
                    vertical={'top'}
                    horizontal={'center'}
                    duration={4000}
                ></BasicSnackbarHookComponent>
            }

            {socketConnectLoadingOpen &&
                <SocketConnectLoadingHookComponent
                    open={socketConnectLoadingOpen}
                ></SocketConnectLoadingHookComponent>
            }
        </>
    );
}

export default OrderComponent;

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