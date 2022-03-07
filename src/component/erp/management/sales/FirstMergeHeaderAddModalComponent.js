import { useReducer } from 'react';
import styled from 'styled-components';
import CustomCheckbox from '../../../template/checkbox/CustomCheckbox';

const Container = styled.div`
    margin-bottom: 30px;
`;

const HeaderWrapper = styled.div`
    position: sticky;
    top: 0;
    z-index: 99;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;
    background : white;
`;

const HeaderTitleBox = styled.div`
    padding: 10px 20px;
    font-size: 20px;
    font-weight: 700;

    @media all and (max-width:992px){
        padding: 10px 10px;
        font-size: 16px;
    }
`;

const HeaderControlBox = styled.div`
    padding: 10px 20px;

    @media all and (max-width:992px){
        padding: 10px 10px;
    }

    .button-item{
        position: relative;
        
        width: 40px;
        height: 40px;

        background: #2C73D2;
        border:none;
        border-radius: 50%;

        transition: 0.4s;

        cursor: pointer;
        &:hover{
            transform: rotate(-360deg);
            background: #309FFF
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
            background: #7DC2FF;
        }

        @media all and (max-width:992px){
            width: 32px;
            height: 32px;
        }
    }

    .icon-item{
        width: 25px;
        height: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        @media all and (max-width:992px){
            width: 20px;
            height: 20px;
        }
    }

    .icon-item img{
        width: 100%;
    }
`;

const InputBox = styled.div`
    margin-top: 20px;
    padding: 0 20px;
    .input-label{
        font-size: 16px;
        font-weight: 600;
    }

    .input-item{
        margin-top: 5px;
        width: 300px;
        padding: 10px 5px;
        border: 1px solid #e1e1e1;
        box-sizing: border-box;

        &:focus{
            outline: none;
        }
        @media all and (max-width: 992px){
            width: 100%;
        }
    }

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const DefaultHeaderTableWrapper = styled.div`
    margin-top: 10px;
    padding: 0 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const DefaultHeaderTableBox = styled.div`
	overflow: auto;
    border: 1px solid #e1e1e1;

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table tbody tr{
        &:hover{
            background: #309FFF40;
        }
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle !important;
        border-bottom: 1px solid #309FFF20;
        text-align: center;
        font-size: 12px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

        &:hover{
            background: #309FFF80;
            color: white;
            font-weight: 600;
        }
    }

    & .fiexed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:3px;
        width: 5px;
    }

    &::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #309FFF;
        border-radius: 10px;
    }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }
`;

const DefaultHeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
    background: ${props => props.checked ? 'white' : '#f1f1f180'};
    color: ${props => props.checked ? '#444' : '#888'};
    padding: 10px;
    font-size: 14px;
`;

const CreateHeaderTableWrapper = styled.div`
    margin-top: 10px;
    padding: 0 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const CreateHeaderTableBox = styled.div`
	overflow: auto;
    border: 1px solid #e1e1e1;

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table thead tr th {
        vertical-align: middle !important;
        text-align: center;
        background: 'white';
        color: '#444';
        padding: 10px;
        font-size: 14px;
    }
    
    table tbody tr{
        &:hover{
            background: #309FFF40;
        }
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle !important;
        /* border-bottom: 1px solid #309FFF20; */
        text-align: center;
        font-size: 14px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

        &:hover{
            background: #309FFF80;
            color: white;
            font-weight: 600;
        }
    }

    td .td-label{
        font-size: 14px;
        color: #444;
        margin-bottom: 5px;
    }

    & .fiexed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    .button-item{
        position: relative;
        
        width: 30px;
        height: 30px;

        background: #2C73D2;
        border:none;
        border-radius: 50%;

        transition: 0.4s;

        &:hover{
            transform: rotate(-360deg);
            background: #309FFF
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
            background: #7DC2FF;
        }

        @media all and (max-width:992px){
            margin-left: 10px;
            width: 32px;
            height: 32px;
        }
    }

    .icon-item{
        width: 25px;
        height: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        @media all and (max-width:992px){
            width: 20px;
            height: 20px;
        }
    }

    .icon-item img{
        width: 100%;
    }

    .input-item{
        text-align: center;
        border: 1px solid #e1e1e1;
        border-radius: 5px;
        padding: 10px 0;

        &:focus{
            outline: none;
        }
    }

    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:3px;
        width: 5px;
    }

    &::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #309FFF;
        border-radius: 10px;
    }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }
`;

const OperatorWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
    padding: 0 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const InfoText = styled.div`
    margin-top: 20px;
    padding: 0 20px;
    font-size: 14px;
    color: #2C73D2;
    word-break: keep-all;

    @media all and (max-width: 992px){
        font-size: 12px;
        padding: 0 10px;
    }
`;

const FirstMergeHeaderAddModalComponent = (props) => {
    const [createHeaderTitleState, dispatchCreateHeaderTitleState] = useReducer(createHeaderTitleStateReducer, initialCreateHeaderTitleState);
    const [createHeaderValueState, dispatchCreateHeaderValueState] = useReducer(createHeaderValueStateReducer, initialCreateHeaderValueState);

    const _onChangeCreateHeaderTitleState = (e) => {
        dispatchCreateHeaderTitleState({
            type: 'SET_DATA',
            payload: e.target.value
        })
    }

    const _isCheckedAll = () => {
        if (!createHeaderValueState || createHeaderValueState?.length <= 0) {
            return false;
        }

        return defaultHeaderList.length === createHeaderValueState.length;
    }

    const _isCheckedOne = (matchedColumnName) => {
        return createHeaderValueState.some(r => r.matchedColumnName === matchedColumnName);
    }

    const _onCheckAll = () => {
        if (_isCheckedAll()) {
            dispatchCreateHeaderValueState({
                type: 'CLEAR'
            })
        } else {
            let data = [...defaultHeaderList];
            dispatchCreateHeaderValueState({
                type: 'SET_DATA',
                payload: data
            })
        }

    }

    const _onChangeCheckedListState = (selectedData) => {
        let data = [...createHeaderValueState];
        let selectedMatchedColumnName = selectedData.matchedColumnName;

        if (_isCheckedOne(selectedMatchedColumnName)) {
            data = data.filter(r => r.matchedColumnName !== selectedMatchedColumnName);
        } else {
            data.push(selectedData);
        }

        dispatchCreateHeaderValueState({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onSortByDefault = () => {
        let data = [...createHeaderValueState];
        data.sort(function (a, b) {
            return a.cellNumber - b.cellNumber;
        });

        dispatchCreateHeaderValueState({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onChangeOrderToLeft = (index) => {
        let data = [...createHeaderValueState];

        if (index <= 0) {
            return;
        }

        let prevData = data[index - 1];
        let targetData = data[index];

        data[index - 1] = targetData;
        data[index] = prevData;


        dispatchCreateHeaderValueState({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onChangeOrderToRight = (index) => {
        let data = [...createHeaderValueState];

        if (index >= data.length - 1) {
            return;
        }

        let nextData = data[index + 1];
        let targetData = data[index];

        data[index + 1] = targetData;
        data[index] = nextData;

        dispatchCreateHeaderValueState({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onChangeCreateHeaderValue = (e, index) => {
        let data = [...createHeaderValueState]
        let name = e.target.name;

        if (name === 'mergeYn') {
            console.log(e.target.checked)
            data = data.map(r => {
                if (data.indexOf(r) === index) {
                    return {
                        ...r,
                        [name]: e.target.checked ? 'y' : 'n'
                    }
                } else {
                    return r;
                }
            })
        } else {
            data = data.map(r => {
                if (data.indexOf(r) === index) {
                    return {
                        ...r,
                        [name]: e.target.value
                    }
                } else {
                    return r;
                }
            })
        }

        dispatchCreateHeaderValueState({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onSubmit = () => {
        let body = {
            cid: null,
            id: null,
            title: createHeaderTitleState,
            headerDetail: {
                details: createHeaderValueState
            },
            createdAt: null,
            createdBy: null,
            updatedAt: null
        }

        props._onSubmit_createFirstMergeHeader(body)
    }

    return (
        <>
            <Container>
                <HeaderWrapper>
                    <HeaderControlBox>
                        <button
                            type='button'
                            className='button-item'
                            onClick={props._onAddModeClose}
                        >
                            <div className='icon-item'>
                                <img src='/assets/icon/left_arrow_icon.png' alt=''></img>
                            </div>
                        </button>
                    </HeaderControlBox>
                    <HeaderTitleBox>1차 병합 헤더 생성</HeaderTitleBox>
                    <HeaderControlBox>
                        <button
                            type='button'
                            className='button-item'
                            onClick={() => _onSubmit()}
                        >
                            <div className='icon-item'>
                                <img src='/assets/icon/add_icon.png' alt=''></img>
                            </div>
                        </button>
                    </HeaderControlBox>
                </HeaderWrapper>
                <InputBox>
                    <div className='input-label'>헤더 타이틀</div>
                    <input
                        type='text'
                        className='input-item'
                        value={createHeaderTitleState || ''}
                        onChange={(e) => _onChangeCreateHeaderTitleState(e)}
                    ></input>
                </InputBox>
                <InfoText>* 병합 테이블에서 확인할 데이터 항목을 선택해주세요.</InfoText>
                <OperatorWrapper>
                    <CustomCheckbox
                        checked={_isCheckedAll()}
                        size={'20px'}
                        label={'전체 선택'}
                        labelSize={'16px'}

                        onChange={() => _onCheckAll()}
                    ></CustomCheckbox>
                </OperatorWrapper>
                <DefaultHeaderTableWrapper>
                    <DefaultHeaderTableBox>
                        <table
                            cellSpacing="0"
                        >
                            <colgroup>
                                {defaultHeaderList.map((r, index) => {
                                    return (
                                        <col key={index} width={'120px'}></col>
                                    );
                                })}

                            </colgroup>
                            <thead>
                                <tr>
                                    {defaultHeaderList.map((r, index) => {
                                        let isChecked = _isCheckedOne(r.matchedColumnName);
                                        return (
                                            <DefaultHeaderTh
                                                key={index}
                                                scope="col"
                                                checked={isChecked}
                                            >
                                                <CustomCheckbox
                                                    checked={isChecked}
                                                    size={'20px'}
                                                    labelSize={'16px'}

                                                    onChange={() => _onChangeCheckedListState(r)}
                                                ></CustomCheckbox>
                                            </DefaultHeaderTh>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    {defaultHeaderList.map((r, index) => {
                                        let isChecked = _isCheckedOne(r.matchedColumnName);
                                        return (
                                            <DefaultHeaderTh
                                                key={index}
                                                scope="col"
                                                checked={isChecked}
                                                onClick={() => _onChangeCheckedListState(r)}
                                                style={{ cursor: 'pointer' }}
                                            >{r.originCellName}</DefaultHeaderTh>
                                        )
                                    })}
                                </tr>
                            </thead>
                        </table>
                    </DefaultHeaderTableBox>
                </DefaultHeaderTableWrapper>
                <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px 0' }}>
                    <img src='/assets/icon/down_arrow_icon.png' width={32}></img>
                </div>
                <InfoText>
                    <div>* 선택한 양식의 헤더 데이터와 순서를 변경할 수 있습니다.</div>
                    <div>* 새롭게 체크 된 항목은 뒤에서 부터 추가 됩니다.</div>
                </InfoText>
                {createHeaderValueState && createHeaderValueState.length > 0 &&
                    <>
                        <OperatorWrapper>
                            <button
                                type='button'
                                style={{ padding: '5px 10px', background: '#309FFF', border: '1px solid #309FFF', borderRadius: '5px', color: 'white', fontWeight: '600', cursor: 'pointer' }}
                                onClick={() => _onSortByDefault()}
                            >기준 양식으로 순서 정렬</button>
                        </OperatorWrapper>
                        <CreateHeaderTableWrapper>
                            <CreateHeaderTableBox>
                                <table
                                    cellSpacing="0"
                                >
                                    <colgroup>
                                        {createHeaderValueState.map((r, index) => {
                                            return (
                                                <col key={index} width={'300px'}></col>
                                            );
                                        })}

                                    </colgroup>
                                    <thead>
                                        <tr>
                                            {createHeaderValueState.map((r, index) => {
                                                return (
                                                    <th
                                                        key={index}
                                                        scope="col"
                                                    >
                                                        <div>기준 항목 [<span style={{ color: '#e57474' }}>번호</span>][<span style={{ color: '#4d8ceb' }}>네임</span>]</div>
                                                        <div>[<span style={{ color: '#e57474' }}>{r.cellNumber}</span>][<span style={{ color: '#4d8ceb' }}>{r.originCellName}</span>]</div>
                                                    </th>
                                                )
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {createHeaderValueState.map((r, index) => {
                                                return (
                                                    <td
                                                        key={index}
                                                        scope="col"
                                                    >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <div>
                                                                <button className='button-item' onClick={() => _onChangeOrderToLeft(index)}>
                                                                    <div className='icon-item'>
                                                                        <img className='icon-img' src='/assets/icon/left_arrow_icon.png'></img>
                                                                    </div>
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <input type='text' className='input-item' name='customCellName' value={r.customCellName} onChange={(e) => _onChangeCreateHeaderValue(e, index)}></input>
                                                            </div>
                                                            <div>
                                                                <button className='button-item' onClick={() => _onChangeOrderToRight(index)}>
                                                                    <div className='icon-item'>
                                                                        <img className='icon-img' src='/assets/icon/right_arrow_icon.png'></img>
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                        <tr>
                                            {createHeaderValueState.map((r, index) => {
                                                return (
                                                    <td
                                                        key={index}
                                                        scope="col"
                                                    >
                                                        <div>
                                                            <div className='td-label'>병합 여부</div>
                                                            <CustomCheckbox
                                                                checked={r.mergeYn === 'y'}
                                                                name={'mergeYn'}
                                                                size={'20px'}
                                                                labelSize={'16px'}

                                                                onChange={(e) => _onChangeCreateHeaderValue(e, index)}
                                                            ></CustomCheckbox>
                                                        </div>
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                        <tr>
                                            {createHeaderValueState.map((r, index) => {
                                                return (
                                                    <td
                                                        key={index}
                                                        scope="col"
                                                    >
                                                        <div>
                                                            <div className='td-label'>고정값</div>
                                                            <input type='text' className='input-item' name='fixedValue' value={r.fixedValue} onChange={(e) => _onChangeCreateHeaderValue(e, index)}></input>
                                                        </div>
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    </tbody>
                                </table>
                            </CreateHeaderTableBox>
                        </CreateHeaderTableWrapper>
                    </>
                }

            </Container>
        </>
    );
}
export default FirstMergeHeaderAddModalComponent;

const initialCreateHeaderValueState = [];
const initialCreateHeaderTitleState = '';

const createHeaderValueStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return [];
        default: return [];
    }
}

const createHeaderTitleStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return '';
    }
}

const defaultHeaderList = [
    {
        "cellNumber": 0,
        "originCellName": "피아르 고유번호",
        "customCellName": "피아르 고유번호",
        "matchedColumnName": "uniqueCode",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 1,
        "originCellName": "주문번호1",
        "customCellName": "주문번호1",
        "matchedColumnName": "orderNumber1",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 2,
        "originCellName": "주문번호2",
        "customCellName": "주문번호2",
        "matchedColumnName": "orderNumber2",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 3,
        "originCellName": "주문번호3",
        "customCellName": "주문번호3",
        "matchedColumnName": "orderNumber3",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 4,
        "originCellName": "상품명",
        "customCellName": "상품명",
        "matchedColumnName": "prodName",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 5,
        "originCellName": "옵션명",
        "customCellName": "옵션명",
        "matchedColumnName": "optionName",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 6,
        "originCellName": "수량",
        "customCellName": "수량",
        "matchedColumnName": "unit",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 7,
        "originCellName": "수취인명",
        "customCellName": "수취인명",
        "matchedColumnName": "receiver",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 8,
        "originCellName": "전화번호1",
        "customCellName": "전화번호1",
        "matchedColumnName": "receiverContact1",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 9,
        "originCellName": "전화번호2",
        "customCellName": "전화번호2",
        "matchedColumnName": "receiverContact2",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 10,
        "originCellName": "주소",
        "customCellName": "주소",
        "matchedColumnName": "destination",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 11,
        "originCellName": "우편번호",
        "customCellName": "우편번호",
        "matchedColumnName": "zipCode",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 12,
        "originCellName": "배송방식",
        "customCellName": "배송방식",
        "matchedColumnName": "transportType",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 13,
        "originCellName": "배송메세지",
        "customCellName": "배송메세지",
        "matchedColumnName": "deliveryMessage",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 14,
        "originCellName": "상품고유번호1",
        "customCellName": "상품고유번호1",
        "matchedColumnName": "prodUniqueNumber1",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 15,
        "originCellName": "상품고유번호2",
        "customCellName": "상품고유번호2",
        "matchedColumnName": "prodUniqueNumber2",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 16,
        "originCellName": "옵션고유번호1",
        "customCellName": "옵션고유번호1",
        "matchedColumnName": "optionUniqueNumber1",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 17,
        "originCellName": "옵션고유번호2",
        "customCellName": "옵션고유번호2",
        "matchedColumnName": "optionUniqueNumber2",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 18,
        "originCellName": "피아르 상품코드",
        "customCellName": "피아르 상품코드",
        "matchedColumnName": "prodCode",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 19,
        "originCellName": "피아르 옵션코드",
        "customCellName": "피아르 옵션코드",
        "matchedColumnName": "optionCode",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 20,
        "originCellName": "관리메모1",
        "customCellName": "관리메모1",
        "matchedColumnName": "managementMemo1",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 21,
        "originCellName": "관리메모2",
        "customCellName": "관리메모2",
        "matchedColumnName": "managementMemo2",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 22,
        "originCellName": "관리메모3",
        "customCellName": "관리메모3",
        "matchedColumnName": "managementMemo3",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 23,
        "originCellName": "관리메모4",
        "customCellName": "관리메모4",
        "matchedColumnName": "managementMemo4",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 24,
        "originCellName": "관리메모5",
        "customCellName": "관리메모5",
        "matchedColumnName": "managementMemo5",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 25,
        "originCellName": "관리메모6",
        "customCellName": "관리메모6",
        "matchedColumnName": "managementMemo6",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 26,
        "originCellName": "관리메모7",
        "customCellName": "관리메모7",
        "matchedColumnName": "managementMemo7",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 27,
        "originCellName": "관리메모8",
        "customCellName": "관리메모8",
        "matchedColumnName": "managementMemo8",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 28,
        "originCellName": "관리메모9",
        "customCellName": "관리메모9",
        "matchedColumnName": "managementMemo9",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 29,
        "originCellName": "관리메모10",
        "customCellName": "관리메모10",
        "matchedColumnName": "managementMemo10",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 30,
        "originCellName": "관리메모11",
        "customCellName": "관리메모11",
        "matchedColumnName": "managementMemo11",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 31,
        "originCellName": "관리메모12",
        "customCellName": "관리메모12",
        "matchedColumnName": "managementMemo12",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 32,
        "originCellName": "관리메모13",
        "customCellName": "관리메모13",
        "matchedColumnName": "managementMemo13",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 33,
        "originCellName": "관리메모14",
        "customCellName": "관리메모14",
        "matchedColumnName": "managementMemo14",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 34,
        "originCellName": "관리메모15",
        "customCellName": "관리메모15",
        "matchedColumnName": "managementMemo15",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 35,
        "originCellName": "관리메모16",
        "customCellName": "관리메모16",
        "matchedColumnName": "managementMemo16",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 36,
        "originCellName": "관리메모17",
        "customCellName": "관리메모17",
        "matchedColumnName": "managementMemo17",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 37,
        "originCellName": "관리메모18",
        "customCellName": "관리메모18",
        "matchedColumnName": "managementMemo18",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 38,
        "originCellName": "관리메모19",
        "customCellName": "관리메모19",
        "matchedColumnName": "managementMemo19",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 39,
        "originCellName": "관리메모20",
        "customCellName": "관리메모20",
        "matchedColumnName": "managementMemo20",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 40,
        "originCellName": "*카테고리명",
        "customCellName": "*카테고리명",
        "matchedColumnName": "categoryName",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 41,
        "originCellName": "*상품명",
        "customCellName": "*상품명",
        "matchedColumnName": "prodDefaultName",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 42,
        "originCellName": "*상품관리명",
        "customCellName": "*상품관리명",
        "matchedColumnName": "prodManagementName",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 43,
        "originCellName": "*옵션명",
        "customCellName": "*옵션명",
        "matchedColumnName": "optionDefaultName",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 44,
        "originCellName": "*옵션관리명",
        "customCellName": "*옵션관리명",
        "matchedColumnName": "optionManagementName",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 45,
        "originCellName": "*재고수량",
        "customCellName": "*재고수량",
        "matchedColumnName": "optionStockUnit",
        "fixedValue": '',
        "mergeYn": "n"
    },
    {
        "cellNumber": 46,
        "originCellName": "*주문등록일",
        "customCellName": "*주문등록일",
        "matchedColumnName": "createdAt",
        "fixedValue": '',
        "mergeYn": "n"
    }
];