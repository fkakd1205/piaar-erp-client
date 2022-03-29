import { useEffect, useReducer } from "react";
import { getDefaultHeaderDetails } from "../../../../../static-data/staticData";
import PageContentFieldView from "./PageContentField.view";
import PageHeaderFieldView from "./PageHeaderField.view";
import { Container } from "./SingleAddModal.styled";

const DEFAULT_HEADER_DETAILS = getDefaultHeaderDetails();
const SingleAddModalComponent = (props) => {
    const [dataValue, dispatchDataValue] = useReducer(dataValueReducer, initialDataValue);
    const [allowedFields, dispatchAllowedFields] = useReducer(allowedFieldsReducer, initialAllowedFields);

    useEffect(() => {
        if (!DEFAULT_HEADER_DETAILS) {
            return;
        }

        dispatchAllowedFields({
            type: 'SET_DATA',
            payload: DEFAULT_HEADER_DETAILS.slice(1, 34)
        })

    }, [])

    const onActionChangeDataValue = (e) => {
        dispatchDataValue({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onActionAddData = (e) => {
        e.preventDefault();
        if (!dataValue.prodName) {
            alert('상품명은 필수 항목입니다.');
            return;
        }

        if (!dataValue.optionName) {
            alert('옵션정보는 필수 항목입니다.');
            return;
        }

        if (!dataValue.unit || dataValue.unit <= 0 || isNaN(dataValue.unit)) {
            alert('수량은 필수 항목이며, 1 이상의 숫자값만 허용됩니다.');
            return;
        }

        if (!dataValue.receiver) {
            alert('수취인명은 필수 항목입니다.');
            return;
        }
        if (!dataValue.receiverContact1) {
            alert('전화번호1은 필수 항목입니다.');
            return;
        }

        if (!dataValue.destination) {
            alert('주소는 필수 항목입니다.');
            return;
        }

        if (isNaN(dataValue.price)) {
            alert('판매금액은 숫자값만 허용됩니다.');
            return;
        }

        if (isNaN(dataValue.deliveryCharge)) {
            alert('배송비는F 숫자값만 허용됩니다.');
            return;
        }

        props.onActionAddSingleData(dataValue)
    }

    return (
        <Container>
            <form onSubmit={onActionAddData}>
                <PageHeaderFieldView></PageHeaderFieldView>
                {allowedFields &&
                    <PageContentFieldView
                        allowedFields={allowedFields}
                        dataValue={dataValue}

                        onActionChangeDataValue={onActionChangeDataValue}
                    ></PageContentFieldView>
                }
            </form>
        </Container>
    );
}
export default SingleAddModalComponent;

const initialDataValue = {
    id: '',
    uniqueCode: '',
    prodName: '',
    optionName: '',
    unit: '0',
    receiver: '',
    receiverContact1: '',
    receiverContact2: '',
    destination: '',
    salesChannel: '',
    orderNumber1: '',
    orderNumber2: '',
    channelProdCode: '',
    channelOptionCode: '',
    zipCode: '',
    courier: '',
    transportType: '',
    deliveryMessage: '',
    waybillNumber: '',
    price: '0',
    deliveryCharge: '0',
    barCode: '',
    prodCode: '',
    optionCode: '',
    releaseOptionCode: '',
    managementMemo1: '',
    managementMemo2: '',
    managementMemo3: '',
    managementMemo4: '',
    managementMemo5: '',
    managementMemo6: '',
    managementMemo7: '',
    managementMemo8: '',
    managementMemo9: '',
    managementMemo10: '',
    freightCode: '',
    salesYn: 'n',
    salesAt: null,
    releaseYn: 'n',
    releaseAt: null,
    stockReflectYn: 'n',
    createdAt: null,
    createdBy: ''
}
const initialAllowedFields = null;

const dataValueReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default: return initialDataValue;
    }
}

const allowedFieldsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialAllowedFields;
    }
}