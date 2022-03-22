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
import { getDefaultHeaderDetails } from "../../../../../static-data/staticData";

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

const defaultHeaderDetails = getDefaultHeaderDetails();

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
                        defaultHeaderList={defaultHeaderDetails}
                        isCheckedOne={isCheckedOne}

                        onCheckHeaderOne={_onAction_checkHeaderOne}
                    ></DefaultHeaderTableView>
                    <DownArrow></DownArrow>
                    <TitleView
                        title={'다운로드 엑셀 양식'}
                    ></TitleView>
                    <UpdateHeaderTableView
                        updateHeader={updateHeader}
                        defaultHeaderList={defaultHeaderDetails}

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
                    defaultHeaderList={defaultHeaderDetails}

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