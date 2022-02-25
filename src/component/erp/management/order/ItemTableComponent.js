import { useReducer } from 'react';
import styled from 'styled-components';
import CustomCheckbox from '../../../template/checkbox/CustomCheckbox';

const Container = styled.div`

`;

const TableWrapper = styled.div`
    margin-top: 10px;
    padding: 0 30px;

    @media all and (max-width: 992px){
        padding: 10px 10px;
    }
`;

const TableBox = styled.div`
    height: 80vh;
	overflow: auto;
    border: 1px solid #309FFF40;

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        background: #309FFF;
        color: white;
        padding: 10px;
        font-size: 14px;
    }

    table tbody tr{
        &:hover{
            background: #309FFF40;
        }
    }

    table tbody .tr-active{
        background: #309FFF40;
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
        height:7px;
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
    margin-top: 20px;
    padding: 0 30px;

    @media only screen and (max-width:768px){
        padding: 0 10px;
    }
`;

const ButtonBox = styled.div`
    .sold-btn-item{
        padding: 5px 0;
        width: 150px;

        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 5px;

        font-size: 16px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            transform: scale(1.03);
        }

        &:active{
            transform: scale(1);
            background: #2C73D2ee;
            border: 1px solid #2C73D2ee;
        }
    }
`;

const initialCheckedItemListState = [];
const checkedItemListStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return [];
        default: return [];
    }
}
const ItemTableComponent = (props) => {
    const [checkedItemListState, dispatchCheckedItemListState] = useReducer(checkedItemListStateReducer, initialCheckedItemListState);

    const _isCheckedAll = () => {
        if (!props.orderItemListState) {
            return false;
        }

        let orderItemIds = [...props.orderItemListState.map(r => r.id)];
        let checkedItemIds = [...checkedItemListState.map(r => r.id)];

        orderItemIds.sort();
        checkedItemIds.sort();

        return JSON.stringify(orderItemIds) === JSON.stringify(checkedItemIds);
    }

    const _isCheckedOne = (id) => {
        return checkedItemListState.some(r => r.id === id);
    }

    const _onCheckAll = () => {
        if (_isCheckedAll()) {
            dispatchCheckedItemListState({
                type: 'CLEAR'
            })
        } else {
            let data = [...props.orderItemListState];
            dispatchCheckedItemListState({
                type: 'SET_DATA',
                payload: data
            })
        }
    }

    const _onChangeCheckedListState = (e, selectedData) => {
        e.preventDefault();
        let data = [...checkedItemListState];
        let selectedId = selectedData.id;

        if (_isCheckedOne(selectedId)) {
            data = data.filter(r => r.id !== selectedId);
        } else {
            data.push(selectedData);
        }

        dispatchCheckedItemListState({
            type: 'SET_DATA',
            payload: data
        })
    }

    // TODO : 판매전환 로직 완성해야됨.
    return (
        <>
            <Container>
                <OperatorWrapper>
                    <ButtonBox>
                        <button
                            type='button'
                            className='sold-btn-item'
                        >판매 전환</button>
                    </ButtonBox>
                </OperatorWrapper>
                {props.headerState &&
                    <TableWrapper>
                        <TableBox>
                            <table cellSpacing="0">
                                <colgroup>
                                    <col width={'100px'}></col>
                                    {props.headerState?.headerDetail.details.map((r, index) => {
                                        return (
                                            <col key={index} width={'300px'}></col>
                                        );
                                    })}

                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="fiexed-header">
                                            <CustomCheckbox
                                                checked={_isCheckedAll()}
                                                size={'16px'}

                                                onChange={() => _onCheckAll()}
                                            ></CustomCheckbox>
                                        </th>
                                        {props.headerState?.headerDetail.details.map((r, index) => {
                                            return (
                                                <th key={index} className="fiexed-header" scope="col">{r.customCellName}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.orderItemListState?.map((r1, rowIndex) => {
                                        let checked = _isCheckedOne(r1.id)
                                        return (
                                            <tr
                                                key={rowIndex}
                                                className={`${checked && 'tr-active'}`}
                                                onClick={(e) => _onChangeCheckedListState(e, r1)}
                                            >
                                                <td>
                                                    <CustomCheckbox
                                                        checked={checked}
                                                        size={'16px'}

                                                        onChange={(e) => _onChangeCheckedListState(e, r1)}
                                                    ></CustomCheckbox>
                                                </td>
                                                {props.headerState?.headerDetail.details.map(r2 => {
                                                    return (
                                                        <td key={r2.cellNumber}>{r1[r2.matchedColumnName]}</td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </TableBox>
                    </TableWrapper>
                }

                {!props.headerState &&
                    <div style={{ textAlign: 'center', padding: '100px 0', fontWeight: '600' }}>뷰 헤더를 먼저 설정해 주세요.</div>
                }
            </Container>
        </>
    );
}
export default ItemTableComponent;