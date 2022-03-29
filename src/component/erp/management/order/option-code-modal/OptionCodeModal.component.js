import { useReducer, useState } from "react";
import ModalErrorMessageComponent from "../../../../module/modal/ModalErrorMessageComponent";
import ConfirmMessageField from "./ConfirmMessageField.view";
import HeaderFieldView from "./HeaderField.view";
import InputFieldView from "./InputFieldView";
import ListFieldView from "./ListField.view";
import { Container, ListFieldWrapper } from "./OptionCodeModal.styled";

const OptionCodeModalComponent = (props) => {
    const [selectedProductOption, dispatchSelectedProductOption] = useReducer(selectedProductOptionStateReducer, initialSelectedProductOptionState);
    const [inputValue, setInputValue] = useState('');
    const [confirmModeOpen, setConfirmModeOpen] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const onChangeInputValue = (e) => {
        setInputValue(e.target.value);
    }

    const onActionOpenConfirmModal = (productOption) => {
        dispatchSelectedProductOption({
            type: 'SET_DATA',
            payload: productOption
        })
        setConfirmModeOpen(true);
    }

    const onActionCloseConfirmModal = () => {
        dispatchSelectedProductOption({
            type: 'CLEAR'
        })
        setConfirmModeOpen(false);
        setButtonDisabled(false);
    }

    const onActionConfirm = () => {
        setButtonDisabled(true);
        props.onConfirm(selectedProductOption.option.code)
    }

    return (
        <>
            <Container>
                <HeaderFieldView
                    element={'옵션 코드 수정'}
                ></HeaderFieldView>
                {(!confirmModeOpen && props.productOptionList && props.productOptionList?.length > 0) &&
                    <>
                        <InputFieldView
                            inputValue={inputValue}

                            onChangeInputValue={onChangeInputValue}
                        ></InputFieldView>
                        <ListFieldView
                            productOptionList={props.productOptionList}
                            inputValue={inputValue}

                            onActionOpenConfirmModal={onActionOpenConfirmModal}
                        ></ListFieldView>
                    </>
                }
                {confirmModeOpen &&
                    <>
                        <ConfirmMessageField
                            selectedProductOption={selectedProductOption}
                            checkedOrderItemList={props.checkedOrderItemList}
                            buttonDisabled={buttonDisabled}

                            onActionCloseConfirmModal={onActionCloseConfirmModal}
                            onActionConfirm={onActionConfirm}
                        ></ConfirmMessageField>
                    </>
                }
                {(!props.productOptionList || props.productOptionList?.length <= 0) &&
                    <ModalErrorMessageComponent
                        element='선택 가능한 옵션 코드가 없습니다.'
                        padding={50}
                    ></ModalErrorMessageComponent>
                }
            </Container>
        </>
    );
}
export default OptionCodeModalComponent;

const initialSelectedProductOptionState = null;
const selectedProductOptionStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}