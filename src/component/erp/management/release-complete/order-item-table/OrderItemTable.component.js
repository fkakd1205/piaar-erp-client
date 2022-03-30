import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import FixOrderItemModalComponent from "../fix-order-item-modal/FixOrderItemModal.component";
import { Container, TipFieldWrapper } from "./OrderItemTable.styled";
import SelectorButtonFieldView from "./SelectorButtonField.view";
import TableFieldView from "./TableField.view";

function Tip() {
    return (
        <TipFieldWrapper>
            <div>
                <span className='highlight'>[출고 옵션코드]</span> 를 기준으로 매칭된 상품 데이터 정보를 불러옵니다.
            </div>
            <div>
                <span className='highlight'>[출고 옵션코드]</span> 에 매칭된 상품의 재고가 반영됩니다.
            </div>
        </TipFieldWrapper>
    );
}

const OrderItemTableComponent = (props) => {
    const tableScrollRef = useRef();

    const [viewSize, dispatchViewSize] = useReducer(viewSizeReducer, initialViewSize);
    const [fixTargetItem, dispatchFixTargetItem] = useReducer(fixTargetItemReducer, initialFixTargetItem);

    const [fixItemModalOpen, setFixItemModalOpen] = useState(false);

    useEffect(() => {
        if (!props.orderItemList || props.orderItemList?.length <= 0) {
            return;
        }

        if (tableScrollRef && tableScrollRef.current) {
            tableScrollRef.current.scrollTop = 0;
        }

        dispatchViewSize({
            type: 'SET_DATA',
            payload: 50
        })
    }, [props.orderItemList])

    const isCheckedOne = useCallback((id) => {
        return props.checkedOrderItemList.some(r => r.id === id);
    }, [props.checkedOrderItemList])


    const onActionCheckOrderItem = (e, orderItem) => {
        e.stopPropagation();
        props._onAction_checkOrderItem(e, orderItem);
    }

    const onActionCheckOrderItemAll = () => {
        props._onAction_checkOrderItemAll();
    }

    const onActionReleaseOrderItemAll = () => {
        props._onAction_releaseOrderItemAll();
    }

    const onActionfetchMoreOrderItems = async () => {
        let newSize = viewSize + 20;
        dispatchViewSize({
            type: 'SET_DATA',
            payload: newSize
        })
    }

    const onActionOpenFixItemModal = (e, orderItem) => {
        e.stopPropagation();
        dispatchFixTargetItem({
            type: 'SET_DATA',
            payload: orderItem
        })
        setFixItemModalOpen(true);
    }

    const onActionCloseFixItemModal = () => {
        dispatchFixTargetItem({
            type: 'CLEAR'
        })
        setFixItemModalOpen(false);
    }

    const onChangeFixTargetItem = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        dispatchFixTargetItem({
            type: 'CHANGE_DATA',
            payload: {
                name: name,
                value: value
            }
        })
    }

    const onActionConfirmUpdateFixOrderItem = (e) => {
        e.preventDefault();
        if (!fixTargetItem.uniqueCode) {
            alert('[피아르 고유번호] 는 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.prodName) {
            alert('[상품명] 은 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.optionName) {
            alert('[옵션정보] 는 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.unit) {
            alert('[수량] 은 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.receiver) {
            alert('[수취인명] 은 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.receiverContact1) {
            alert('[전화번호1] 은 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.destination) {
            alert('[주소] 는 필수 입력 값 입니다.');
            return;
        }
        props._onSubmit_updateErpOrderItemOne(fixTargetItem);
        onActionCloseFixItemModal();
    }
    
    return (
        <>
            <Container>
                {(props.viewHeader && props.orderItemList) &&
                    <>
                        <Tip></Tip>
                        <SelectorButtonFieldView
                            onActionCheckOrderItemAll={onActionCheckOrderItemAll}
                            onActionReleaseOrderItemAll={onActionReleaseOrderItemAll}
                        ></SelectorButtonFieldView>
                        <TableFieldView
                            tableScrollRef={tableScrollRef}

                            viewHeader={props.viewHeader}
                            orderItemList={props.orderItemList}
                            viewSize={viewSize}
                            isCheckedOne={isCheckedOne}

                            onActionCheckOrderItem={onActionCheckOrderItem}
                            onActionCheckOrderItemAll={onActionCheckOrderItemAll}
                            onActionfetchMoreOrderItems={onActionfetchMoreOrderItems}
                            onActionOpenFixItemModal={onActionOpenFixItemModal}
                        ></TableFieldView>
                    </>
                }
                {!props.viewHeader &&
                    <div style={{ textAlign: 'center', padding: '100px 0', fontWeight: '600' }}>뷰 헤더를 먼저 설정해 주세요.</div>
                }
            </Container>
            {(fixItemModalOpen && fixTargetItem) &&
                <CommonModalComponent
                    open={fixItemModalOpen}
                    fullWidth={true}
                    maxWidth={'sm'}

                    onClose={onActionCloseFixItemModal}
                >
                    <FixOrderItemModalComponent
                        fixTargetItem={fixTargetItem}

                        onChangeFixTargetItem={onChangeFixTargetItem}
                        onActionCloseFixItemModal={onActionCloseFixItemModal}
                        onActionConfirmUpdateFixOrderItem={onActionConfirmUpdateFixOrderItem}
                    ></FixOrderItemModalComponent>
                </CommonModalComponent>
            }
        </>
    );
}

export default OrderItemTableComponent;

const initialViewSize = 50;
const initialFixTargetItem = null;

const viewSizeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return 50;
    }
}

const fixTargetItemReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialFixTargetItem;
        default: return initialFixTargetItem;
    }
}