import { Container, Wrapper } from "./EditField.styled";
import DefaultHeaderTableView from "./DefaultHeaderTable.view";
import TitleView from "./Title.view";
import { useEffect, useReducer, useState } from "react";
import UpdateHeaderTableView from "./UpdateHeaderTable.view";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import ViewDetailSelectModal from "./ViewDetailSelectModal.view";
import DeleteButtonFieldView from "./DeleteButtonField.view";
import UpdateButtonFieldView from './UpdateButtonField.view';

function Layout({ children }) {
    return (
        <Container>
            <Wrapper>
                {children}
            </Wrapper>
        </Container>
    );
}

function DownArrow() {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px 0' }}>
            <img src='/assets/icon/down_arrow_icon.png' width={32}></img>
        </div>
    );
}

export default function EditFieldComponent(props) {
    const [updateHeader, dispatchUpdateHeader] = useReducer(updateHeaderReducer, initialUpdateHeader);
    const [selectedHeaderDetail, dispatchSelectedHeaderDetail] = useReducer(selectedHeaderDetailReducer, initialSelectedHeaderDetail);
    const [addViewDetailModalOpen, setAddViewDetailModalOpen] = useState(false);
    const [deleteHeaderConfirmModalOpen, setDeleteHeaderConfirmModalOpen] = useState(false);

    useEffect(() => {
        if (!props.selectedHeader) {
            return;
        }

        dispatchUpdateHeader({
            type: 'SET_DATA',
            payload: props.selectedHeader
        })

    }, [props.selectedHeader]);

    const isCheckedOne = (matchedColumnName) => {
        return updateHeader.headerDetail.details.some(r => r.matchedColumnName === matchedColumnName);
    }

    const _onAction_checkHeaderOne = (data) => {
        let details = [...updateHeader.headerDetail.details];

        if (isCheckedOne(data.matchedColumnName)) {
            details = details.filter(r => r.matchedColumnName !== data.matchedColumnName);
        } else {
            details.push(data);
        }

        let header = {
            ...updateHeader,
            headerDetail: {
                details: details
            }
        }

        dispatchUpdateHeader({
            type: 'SET_DATA',
            payload: header
        })
    }

    const _onChange_orderToLeft = (index) => {
        let details = [...updateHeader.headerDetail.details];

        if (index <= 0) {
            return;
        }

        let prevData = details[index - 1];
        let targetData = details[index];

        details[index - 1] = targetData;
        details[index] = prevData;

        let header = {
            ...updateHeader,
            headerDetail: {
                details: details
            }
        }

        dispatchUpdateHeader({
            type: 'SET_DATA',
            payload: header
        })
    }

    const _onChange_orderToRight = (index) => {
        let details = [...updateHeader.headerDetail.details];

        if (index >= details.length - 1) {
            return;
        }

        let nextData = details[index + 1];
        let targetData = details[index];

        details[index + 1] = targetData;
        details[index] = nextData;

        let header = {
            ...updateHeader,
            headerDetail: {
                details: details
            }
        }

        dispatchUpdateHeader({
            type: 'SET_DATA',
            payload: header
        })
    }

    const _onChange_headerDetailValue = (e, index) => {
        let details = [...updateHeader.headerDetail.details];
        let name = e.target.name;

        if (name === 'mergeYn') {
            details = details.map(r => {
                if (details.indexOf(r) === index) {
                    return {
                        ...r,
                        [name]: e.target.checked ? 'y' : 'n',
                        splitter: e.target.checked === false ? '-' : r.splitter,
                        viewDetails: e.target.checked === false ? [{ matchedColumnName: r.matchedColumnName }] : [...r.viewDetails]
                    }
                } else {
                    return r;
                }
            })
        } else {
            details = details.map(r => {
                if (details.indexOf(r) === index) {
                    return {
                        ...r,
                        [name]: e.target.value
                    }
                } else {
                    return r;
                }
            })
        }

        let header = {
            ...updateHeader,
            headerDetail: {
                details: details
            }
        }

        dispatchUpdateHeader({
            type: 'SET_DATA',
            payload: header
        })
    }

    const _onAction_openAddViewDetailModal = (headerDetail) => {
        setAddViewDetailModalOpen(true);
        dispatchSelectedHeaderDetail({
            type: 'SET_DATA',
            payload: headerDetail
        })
    }

    const _onAction_closeAddViewDetailModal = () => {
        setAddViewDetailModalOpen(false);
        dispatchSelectedHeaderDetail({
            type: 'CLEAR'
        })
    }

    const _onAction_addViewDetail = (matchedColumnName) => {
        let details = [...updateHeader.headerDetail.details];
        let headerDetail = { ...selectedHeaderDetail };
        let viewDetails = [...headerDetail.viewDetails];

        if (viewDetails.some(r => r.matchedColumnName === matchedColumnName)) {
            alert('동일한 데이터를 두번 이상 나열 할 수 없습니다.')
            return;
        }

        viewDetails.push({
            matchedColumnName: matchedColumnName
        })

        headerDetail = {
            ...headerDetail,
            viewDetails: viewDetails
        }
        details = details.map(r => {
            if (r.matchedColumnName === headerDetail.matchedColumnName) {
                return headerDetail
            } else {
                return r;
            }
        })

        let header = {
            ...updateHeader,
            headerDetail: {
                details: details
            }
        }

        dispatchUpdateHeader({
            type: 'SET_DATA',
            payload: header
        })

        _onAction_closeAddViewDetailModal();
    }

    const _onAction_deleteViewDetail = (headerDetail, matchedColumnName) => {
        let details = [...updateHeader.headerDetail.details];

        if (headerDetail.viewDetails.length <= 1) {
            alert('뷰 데이터는 하나 이상이어야 합니다.');
            return;
        }

        let newViewDetails = [...headerDetail.viewDetails].filter(r => r.matchedColumnName !== matchedColumnName);

        let newHeaderDetail = {
            ...headerDetail,
            viewDetails: newViewDetails
        }

        details = details.map(r => {
            if (r.matchedColumnName === newHeaderDetail.matchedColumnName) {
                return newHeaderDetail;
            } else {
                return r;
            }
        })

        let header = {
            ...updateHeader,
            headerDetail: {
                details: details
            }
        }

        dispatchUpdateHeader({
            type: 'SET_DATA',
            payload: header
        })
    }

    const onActionDeleteHeaderConfirmModalOpen = () => {
        setDeleteHeaderConfirmModalOpen(true);
    }

    const onActionDeleteHeaderConfirmModalClose = () => {
        setDeleteHeaderConfirmModalOpen(false);
    }

    const onActionDeleteHeader = () => {
        props._onSubmit_deleteOne();
        onActionDeleteHeaderConfirmModalClose()
    }

    const onActionUpdateHeader = () => {
        props._onSubmit_updateOne(updateHeader);
    }

    return (
        <>
            {updateHeader &&
                <Layout>
                    <DeleteButtonFieldView
                        onActionDeleteHeaderConfirmModalOpen={onActionDeleteHeaderConfirmModalOpen}
                    ></DeleteButtonFieldView>
                    <TitleView
                        title={'기준 양식'}
                    ></TitleView>
                    <DefaultHeaderTableView
                        defaultHeaderList={defaultHeaderList}
                        isCheckedOne={isCheckedOne}

                        onCheckHeaderOne={_onAction_checkHeaderOne}
                    ></DefaultHeaderTableView>
                    <DownArrow></DownArrow>
                    <TitleView
                        title={'다운로드 엑셀 양식'}
                    ></TitleView>
                    <UpdateHeaderTableView
                        updateHeader={updateHeader}
                        defaultHeaderList={defaultHeaderList}

                        onChangeOrderToLeft={_onChange_orderToLeft}
                        onChangeOrderToRight={_onChange_orderToRight}
                        onChangeHeaderDetailValue={_onChange_headerDetailValue}
                        onOpenAddViewDetailModal={_onAction_openAddViewDetailModal}
                        onCloseAddViewDetailModal={_onAction_closeAddViewDetailModal}
                        onAddViewDetail={_onAction_addViewDetail}
                        onDeleteViewDetail={_onAction_deleteViewDetail}
                    ></UpdateHeaderTableView>
                    <UpdateButtonFieldView
                        onActionUpdateHeader={onActionUpdateHeader}
                    ></UpdateButtonFieldView>
                </Layout>
            }

            {/* Modal */}
            <CommonModalComponent
                open={addViewDetailModalOpen}

                onClose={_onAction_closeAddViewDetailModal}
            >
                <ViewDetailSelectModal
                    defaultHeaderList={defaultHeaderList}

                    onAddViewDetail={_onAction_addViewDetail}
                ></ViewDetailSelectModal>
            </CommonModalComponent>
            <ConfirmModalComponent
                open={deleteHeaderConfirmModalOpen}
                message={`정말로 해당 양식을 삭제 하시겠습니까?`}

                onConfirm={onActionDeleteHeader}
                onClose={onActionDeleteHeaderConfirmModalClose}
            ></ConfirmModalComponent>
        </>
    );
}

const initialUpdateHeader = null;
const initialSelectedHeaderDetail = null;

const updateHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return null;
    }
}

const selectedHeaderDetailReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const defaultHeaderList = [
    {
        "cellNumber": 0,
        "originCellName": "피아르 고유번호",
        "customCellName": "피아르 고유번호",
        "matchedColumnName": "uniqueCode",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "uniqueCode"
            }
        ]
    },
    {
        "cellNumber": 1,
        "originCellName": "주문번호1",
        "customCellName": "주문번호1",
        "matchedColumnName": "orderNumber1",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "orderNumber1"
            }
        ]
    },
    {
        "cellNumber": 2,
        "originCellName": "주문번호2",
        "customCellName": "주문번호2",
        "matchedColumnName": "orderNumber2",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "orderNumber2"
            }
        ]
    },
    {
        "cellNumber": 3,
        "originCellName": "주문번호3",
        "customCellName": "주문번호3",
        "matchedColumnName": "orderNumber3",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "orderNumber3"
            }
        ]
    },
    {
        "cellNumber": 4,
        "originCellName": "상품명",
        "customCellName": "상품명",
        "matchedColumnName": "prodName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "prodName"
            }
        ]
    },
    {
        "cellNumber": 5,
        "originCellName": "옵션명",
        "customCellName": "옵션명",
        "matchedColumnName": "optionName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionName"
            }
        ]
    },
    {
        "cellNumber": 6,
        "originCellName": "수량",
        "customCellName": "수량",
        "matchedColumnName": "unit",
        "fixedValue": '',
        "mergeYn": "y",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "unit"
            }
        ]
    },
    {
        "cellNumber": 7,
        "originCellName": "수취인명",
        "customCellName": "수취인명",
        "matchedColumnName": "receiver",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "receiver"
            }
        ]
    },
    {
        "cellNumber": 8,
        "originCellName": "전화번호1",
        "customCellName": "전화번호1",
        "matchedColumnName": "receiverContact1",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "receiverContact1"
            }
        ]
    },
    {
        "cellNumber": 9,
        "originCellName": "전화번호2",
        "customCellName": "전화번호2",
        "matchedColumnName": "receiverContact2",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "receiverContact2"
            }
        ]
    },
    {
        "cellNumber": 10,
        "originCellName": "주소",
        "customCellName": "주소",
        "matchedColumnName": "destination",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "destination"
            }
        ]
    },
    {
        "cellNumber": 11,
        "originCellName": "우편번호",
        "customCellName": "우편번호",
        "matchedColumnName": "zipCode",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "zipCode"
            }
        ]
    },
    {
        "cellNumber": 12,
        "originCellName": "배송방식",
        "customCellName": "배송방식",
        "matchedColumnName": "transportType",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "transportType"
            }
        ]
    },
    {
        "cellNumber": 13,
        "originCellName": "배송메세지",
        "customCellName": "배송메세지",
        "matchedColumnName": "deliveryMessage",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "deliveryMessage"
            }
        ]
    },
    {
        "cellNumber": 14,
        "originCellName": "상품고유번호1",
        "customCellName": "상품고유번호1",
        "matchedColumnName": "prodUniqueNumber1",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "prodUniqueNumber1"
            }
        ]
    },
    {
        "cellNumber": 15,
        "originCellName": "상품고유번호2",
        "customCellName": "상품고유번호2",
        "matchedColumnName": "prodUniqueNumber2",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "prodUniqueNumber2"
            }
        ]
    },
    {
        "cellNumber": 16,
        "originCellName": "옵션고유번호1",
        "customCellName": "옵션고유번호1",
        "matchedColumnName": "optionUniqueNumber1",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionUniqueNumber1"
            }
        ]
    },
    {
        "cellNumber": 17,
        "originCellName": "옵션고유번호2",
        "customCellName": "옵션고유번호2",
        "matchedColumnName": "optionUniqueNumber2",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionUniqueNumber2"
            }
        ]
    },
    {
        "cellNumber": 18,
        "originCellName": "피아르 상품코드",
        "customCellName": "피아르 상품코드",
        "matchedColumnName": "prodCode",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "prodCode"
            }
        ]
    },
    {
        "cellNumber": 19,
        "originCellName": "피아르 옵션코드",
        "customCellName": "피아르 옵션코드",
        "matchedColumnName": "optionCode",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionCode"
            }
        ]
    },
    {
        "cellNumber": 20,
        "originCellName": "관리메모1",
        "customCellName": "관리메모1",
        "matchedColumnName": "managementMemo1",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo1"
            }
        ]
    },
    {
        "cellNumber": 21,
        "originCellName": "관리메모2",
        "customCellName": "관리메모2",
        "matchedColumnName": "managementMemo2",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo2"
            }
        ]
    },
    {
        "cellNumber": 22,
        "originCellName": "관리메모3",
        "customCellName": "관리메모3",
        "matchedColumnName": "managementMemo3",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo3"
            }
        ]
    },
    {
        "cellNumber": 23,
        "originCellName": "관리메모4",
        "customCellName": "관리메모4",
        "matchedColumnName": "managementMemo4",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo4"
            }
        ]
    },
    {
        "cellNumber": 24,
        "originCellName": "관리메모5",
        "customCellName": "관리메모5",
        "matchedColumnName": "managementMemo5",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo5"
            }
        ]
    },
    {
        "cellNumber": 25,
        "originCellName": "관리메모6",
        "customCellName": "관리메모6",
        "matchedColumnName": "managementMemo6",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo6"
            }
        ]
    },
    {
        "cellNumber": 26,
        "originCellName": "관리메모7",
        "customCellName": "관리메모7",
        "matchedColumnName": "managementMemo7",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo7"
            }
        ]
    },
    {
        "cellNumber": 27,
        "originCellName": "관리메모8",
        "customCellName": "관리메모8",
        "matchedColumnName": "managementMemo8",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo8"
            }
        ]
    },
    {
        "cellNumber": 28,
        "originCellName": "관리메모9",
        "customCellName": "관리메모9",
        "matchedColumnName": "managementMemo9",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo9"
            }
        ]
    },
    {
        "cellNumber": 29,
        "originCellName": "관리메모10",
        "customCellName": "관리메모10",
        "matchedColumnName": "managementMemo10",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo10"
            }
        ]
    },
    {
        "cellNumber": 30,
        "originCellName": "관리메모11",
        "customCellName": "관리메모11",
        "matchedColumnName": "managementMemo11",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo11"
            }
        ]
    },
    {
        "cellNumber": 31,
        "originCellName": "관리메모12",
        "customCellName": "관리메모12",
        "matchedColumnName": "managementMemo12",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo12"
            }
        ]
    },
    {
        "cellNumber": 32,
        "originCellName": "관리메모13",
        "customCellName": "관리메모13",
        "matchedColumnName": "managementMemo13",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo13"
            }
        ]
    },
    {
        "cellNumber": 33,
        "originCellName": "관리메모14",
        "customCellName": "관리메모14",
        "matchedColumnName": "managementMemo14",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo14"
            }
        ]
    },
    {
        "cellNumber": 34,
        "originCellName": "관리메모15",
        "customCellName": "관리메모15",
        "matchedColumnName": "managementMemo15",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo15"
            }
        ]
    },
    {
        "cellNumber": 35,
        "originCellName": "관리메모16",
        "customCellName": "관리메모16",
        "matchedColumnName": "managementMemo16",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo16"
            }
        ]
    },
    {
        "cellNumber": 36,
        "originCellName": "관리메모17",
        "customCellName": "관리메모17",
        "matchedColumnName": "managementMemo17",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo17"
            }
        ]
    },
    {
        "cellNumber": 37,
        "originCellName": "관리메모18",
        "customCellName": "관리메모18",
        "matchedColumnName": "managementMemo18",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo18"
            }
        ]
    },
    {
        "cellNumber": 38,
        "originCellName": "관리메모19",
        "customCellName": "관리메모19",
        "matchedColumnName": "managementMemo19",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo19"
            }
        ]
    },
    {
        "cellNumber": 39,
        "originCellName": "관리메모20",
        "customCellName": "관리메모20",
        "matchedColumnName": "managementMemo20",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo20"
            }
        ]
    },
    {
        "cellNumber": 40,
        "originCellName": "*카테고리명",
        "customCellName": "*카테고리명",
        "matchedColumnName": "categoryName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "categoryName"
            }
        ]
    },
    {
        "cellNumber": 41,
        "originCellName": "*상품명",
        "customCellName": "*상품명",
        "matchedColumnName": "prodDefaultName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "prodDefaultName"
            }
        ]
    },
    {
        "cellNumber": 42,
        "originCellName": "*상품관리명",
        "customCellName": "*상품관리명",
        "matchedColumnName": "prodManagementName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "prodManagementName"
            }
        ]
    },
    {
        "cellNumber": 43,
        "originCellName": "*옵션명",
        "customCellName": "*옵션명",
        "matchedColumnName": "optionDefaultName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionDefaultName"
            }
        ]
    },
    {
        "cellNumber": 44,
        "originCellName": "*옵션관리명",
        "customCellName": "*옵션관리명",
        "matchedColumnName": "optionManagementName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionManagementName"
            }
        ]
    },
    {
        "cellNumber": 45,
        "originCellName": "*재고수량",
        "customCellName": "*재고수량",
        "matchedColumnName": "optionStockUnit",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionStockUnit"
            }
        ]
    },
    {
        "cellNumber": 46,
        "originCellName": "*주문등록일",
        "customCellName": "*주문등록일",
        "matchedColumnName": "createdAt",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "createdAt"
            }
        ]
    },
    {
        "cellNumber": 47,
        "originCellName": "판매등록일",
        "customCellName": "판매등록일",
        "matchedColumnName": "salesAt",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "salesAt"
            }
        ]
    },
    {
        "cellNumber": 48,
        "originCellName": "운송코드",
        "customCellName": "운송코드",
        "matchedColumnName": "freightCode",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "freightCode"
            }
        ]
    },
];