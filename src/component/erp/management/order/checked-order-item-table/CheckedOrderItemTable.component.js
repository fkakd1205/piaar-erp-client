import { useReducer } from "react";
import { Container } from "./CheckedOrderItemTable.styled";
import TableFieldView from "./TableField.view";

const CheckedOrderItemTableComponent = (props) => {
    const [viewSize, dispatchViewSize] = useReducer(viewSizeReducer, initialViewSize);

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
                {(props.viewHeader && props.checkedOrderItemList) &&
                    <TableFieldView
                        viewHeader={props.viewHeader}
                        checkedOrderItemList={props.checkedOrderItemList}
                        viewSize={viewSize}

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
export default CheckedOrderItemTableComponent;

const initialViewSize = 50;

const viewSizeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return 50;
    }
}