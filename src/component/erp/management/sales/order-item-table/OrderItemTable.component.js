import { useCallback, useEffect, useReducer } from "react";
import { Container } from "./OrderItemTable.styled";
import TableFieldView from "./TableField.view";

const OrderItemTableComponent = (props) => {
    const [viewSize, dispatchViewSize] = useReducer(viewSizeReducer, initialViewSize);

    useEffect(() => {
        if (!props.orderItemList || props.orderItemList?.length <= 0) {
            return;
        }

        dispatchViewSize({
            type: 'SET_DATA',
            payload: 50
        })
    }, [props.orderItemList])

    const isCheckedAll = useCallback(() => {
        if (!props.orderItemList || props.orderItemList?.length <= 0) {
            return false;
        }

        return props.orderItemList.length === props.checkedOrderItemList.length;
    }, [props.checkedOrderItemList, props.orderItemList])

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

    const onActionfetchMoreOrderItems = async () => {
        let newSize = viewSize + 20;
        dispatchViewSize({
            type: 'SET_DATA',
            payload: newSize
        })
    }

    return (
        <>
            <Container>
                {(props.viewHeader && props.orderItemList) &&
                    <TableFieldView
                        viewHeader={props.viewHeader}
                        orderItemList={props.orderItemList}
                        viewSize={viewSize}
                        isCheckedOne={isCheckedOne}
                        isCheckedAll={isCheckedAll}

                        onActionCheckOrderItem={onActionCheckOrderItem}
                        onActionCheckOrderItemAll={onActionCheckOrderItemAll}
                        onActionfetchMoreOrderItems={onActionfetchMoreOrderItems}
                    ></TableFieldView>
                }
                {!props.viewHeader &&
                    <div style={{ textAlign: 'center', padding: '100px 0', fontWeight: '600' }}>뷰 헤더를 먼저 설정해 주세요.</div>
                }
            </Container>
        </>
    );
}

export default OrderItemTableComponent;

const initialViewSize = 50;

const viewSizeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return 50;
    }
}