import CustomCheckbox from "../../../../module/checkbox/CustomCheckbox";
import HeaderFieldView from "./HeaderField.view";
import InfoTextFieldView from "./InfoTextField.view";
import TableOperatorFieldView from "./TableOperatorField.view";
import DefaultTableFieldView from './DefaultTableField.view'
import { Container } from "./ViewHeaderSettingModal.styled";
import { staticDefaultHeaderDetails } from "../../../../../static-data/staticData";
import { useEffect, useReducer } from "react";
import CreateTableFieldView from "./CreateTableField.view";

const defaultHeaderDetails = staticDefaultHeaderDetails;

const ViewHeaderSettingModalComponent = (props) => {
    const [createHeaderDetails, dispatchCreateHeaderDetails] = useReducer(createHeaderDetailsReducer, initialCreateHeaderDetails);

    useEffect(() => {
        if (!props.viewHeader) {
            return;
        }

        dispatchCreateHeaderDetails({
            type: 'SET_DATA',
            payload: props.viewHeader.headerDetail.details
        })
    }, [props.viewHeader]);

    const isCheckedAll = () => {
        if (createHeaderDetails.length <= 0) {
            return false;
        }
        return defaultHeaderDetails.length === createHeaderDetails.length
    }

    const isCheckedOne = (matchedColumnName) => {
        return createHeaderDetails.some(r => r.matchedColumnName === matchedColumnName);
    }

    // 저장 및 업데이트
    const onActionSaveAndModify = () => {
        props._onSubmit_saveAndModifyViewHeader(createHeaderDetails);
    }

    const onActionCheckHeaderDetailAll = () => {
        if (isCheckedAll()) {
            dispatchCreateHeaderDetails({
                type: 'CLEAR'
            })
        } else {
            let data = [...defaultHeaderDetails];
            dispatchCreateHeaderDetails({
                type: 'SET_DATA',
                payload: data
            })
        }
    }

    const onActionCheckHeaderDetail = (selectedData) => {
        let data = [...createHeaderDetails];
        let selectedMatchedColumnName = selectedData.matchedColumnName;

        if (isCheckedOne(selectedMatchedColumnName)) {
            data = data.filter(r => r.matchedColumnName !== selectedMatchedColumnName);
        } else {
            data.push(selectedData);
        }

        dispatchCreateHeaderDetails({
            type: 'SET_DATA',
            payload: data
        })
    }

    const onActionOrderToLeft = (index) => {
        let data = [...createHeaderDetails];

        if (index <= 0) {
            return;
        }

        let prevData = data[index - 1];
        let targetData = data[index];

        data[index - 1] = targetData;
        data[index] = prevData;


        dispatchCreateHeaderDetails({
            type: 'SET_DATA',
            payload: data
        })
    }

    const onActionOrderToRight = (index) => {
        let data = [...createHeaderDetails];

        if (index >= data.length - 1) {
            return;
        }

        let nextData = data[index + 1];
        let targetData = data[index];

        data[index + 1] = targetData;
        data[index] = nextData;

        dispatchCreateHeaderDetails({
            type: 'SET_DATA',
            payload: data
        })
    }

    const onChangeCreateHeaderDetailsValue = (e, index) => {
        let data = [...createHeaderDetails]
        data = data.map(r => {
            if (data.indexOf(r) === index) {
                return {
                    ...r,
                    [e.target.name]: e.target.value
                }
            } else {
                return r;
            }
        })

        dispatchCreateHeaderDetails({
            type: 'SET_DATA',
            payload: data
        })
    }

    const onActionSortByDefault = () => {
        let data = [...createHeaderDetails];
        data.sort(function (a, b) {
            return a.cellNumber - b.cellNumber;
        });

        dispatchCreateHeaderDetails({
            type: 'SET_DATA',
            payload: data
        })
    }

    return (
        <>
            <Container>
                <HeaderFieldView
                    onActionSaveAndModify={onActionSaveAndModify}
                ></HeaderFieldView>
                <InfoTextFieldView
                    element={
                        <div>* 주문 현황에서 확인할 데이터 항목을 선택해주세요.</div>
                    }
                ></InfoTextFieldView>
                <TableOperatorFieldView
                    element={
                        <CustomCheckbox
                            checked={isCheckedAll()}
                            size={'20px'}
                            label={'전체 선택'}
                            labelSize={'16px'}

                            onChange={() => onActionCheckHeaderDetailAll()}
                        ></CustomCheckbox>
                    }
                ></TableOperatorFieldView>
                <DefaultTableFieldView
                    defaultHeaderDetails={defaultHeaderDetails}
                    isCheckedOne={isCheckedOne}

                    onActionCheckHeaderDetail={onActionCheckHeaderDetail}
                ></DefaultTableFieldView>
                <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px 0' }}>
                    <img src='/assets/icon/down_arrow_icon.png' width={32}></img>
                </div>
                <InfoTextFieldView
                    element={
                        <>
                            <div>* 선택한 양식의 헤더명과 순서를 변경할 수 있습니다.</div>
                            <div>* 새롭게 체크 된 항목은 뒤에서 부터 추가 됩니다.</div>
                        </>
                    }
                ></InfoTextFieldView>
                <TableOperatorFieldView
                    element={
                        <button
                            type='button'
                            style={{ padding: '5px 10px', background: '#309FFF', border: '1px solid #309FFF', borderRadius: '5px', color: 'white', fontWeight: '600', cursor: 'pointer' }}
                            onClick={() => onActionSortByDefault()}
                        >기준 양식으로 순서 정렬</button>
                    }
                >
                </TableOperatorFieldView>
                {(createHeaderDetails && createHeaderDetails.length > 0) &&
                    <CreateTableFieldView
                        createHeaderDetails={createHeaderDetails}

                        onActionOrderToLeft={onActionOrderToLeft}
                        onActionOrderToRight={onActionOrderToRight}
                        onChangeCreateHeaderDetailsValue={onChangeCreateHeaderDetailsValue}
                    ></CreateTableFieldView>
                }

            </Container>
        </>
    );
}
export default ViewHeaderSettingModalComponent;

const initialCreateHeaderDetails = [];

const createHeaderDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return [];
        default: return [];
    }
}