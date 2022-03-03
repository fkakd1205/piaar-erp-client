import { useReducer, useState } from 'react';
import styled from 'styled-components';
import CustomCheckbox from '../../../template/checkbox/CustomCheckbox';
import CommonModalComponent from '../../../template/modal/CommonModalComponent';
import ConfirmModalComponent from '../../../template/modal/ConfirmModalComponent';
import { dateToYYYYMMDD } from '../../../../utils/dateFormatUtils';

const Container = styled.div`
    margin-top: 20px;
`;

const TableWrapper = styled.div`
    margin-top: 10px;
    padding: 0 30px;

    @media all and (max-width: 992px){
        padding: 0 10px;
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    gap: 10px;

    @media only screen and (max-width:768px){
        padding: 0 10px;
    }
`;

const ButtonBox = styled.div`
    .sold-btn-item{
        width: 150px;
        height: 34px;

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

    .delete-btn-item{
        position: relative;
        width: 34px;
        height: 34px;

        background: #ff3060;
        border: 1px solid #ff3060;
        border-radius: 50%;

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
            background: #ff3060ee;
            border: 1px solid #ff3060ee;
        }
    }

    .delete-icon-item{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 22px;
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
    const [salesConfirmModalOpen, setSalesConfirmModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

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

    const _onSalesConfirmModalOpen = () => {
        if (!checkedItemListState || checkedItemListState.length <= 0) {
            alert('판매 전환 데이터를 선택해 주세요.');
            return;
        }
        setSalesConfirmModalOpen(true);
    }

    const _onSalesConfirmModalClose = () => {
        setSalesConfirmModalOpen(false);
    }

    const _onDeleteConfirmModalOpen = () => {
        if (!checkedItemListState || checkedItemListState.length <= 0) {
            alert('삭제할 데이터를 선택해 주세요.');
            return;
        }
        setDeleteConfirmModalOpen(true);
    }

    const _onDeleteConfirmModalClose = () => {
        setDeleteConfirmModalOpen(false);
    }

    // 판매 전환 서밋
    const _onSubmitOrderItemListToSales = () => {
        _onSalesConfirmModalClose();
        props._onSubmitOrderItemListToSales(checkedItemListState);
        dispatchCheckedItemListState({
            type: 'CLEAR'
        })
    }

    // 데이터 삭제 서밋
    const _onSubmitOrderItemListDelete = () => {
        _onDeleteConfirmModalClose();
        props._onSubmitOrderItemListDelete(checkedItemListState);
        dispatchCheckedItemListState({
            type: 'CLEAR'
        })
    }

    return (
        <>
            <Container>
                <OperatorWrapper>
                    <ButtonBox>
                        <button
                            type='button'
                            className='sold-btn-item'
                            onClick={() => _onSalesConfirmModalOpen()}
                        >판매 전환</button>
                    </ButtonBox>
                    <ButtonBox>
                        <button
                            type='button'
                            className='delete-btn-item'
                            onClick={() => _onDeleteConfirmModalOpen()}
                        >
                            <img className='delete-icon-item' src='/assets/icon/delete_icon.png' alt='delete button'></img>
                        </button>
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
                                                    let matchedColumnName = r2.matchedColumnName;
                                                    if (matchedColumnName === 'createdAt') {
                                                        return (
                                                            <td key={r2.cellNumber}>{dateToYYYYMMDD(r1[matchedColumnName] || new Date())}</td>
                                                        )
                                                    }
                                                    return (
                                                        <td key={r2.cellNumber}>{r1[matchedColumnName]}</td>
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

            {/* Modal */}
            <ConfirmModalComponent
                open={salesConfirmModalOpen}
                title={'판매 전환 확인 메세지'}
                message={`[ ${checkedItemListState.length} ] 건의 데이터를 판매 전환 하시겠습니까?`}

                onConfirm={_onSubmitOrderItemListToSales}
                onClose={_onSalesConfirmModalClose}
            ></ConfirmModalComponent>
            <ConfirmModalComponent
                open={deleteConfirmModalOpen}
                title={'데이터 삭제 확인 메세지'}
                message={`[ ${checkedItemListState.length} ] 건의 데이터를 삭제 하시겠습니까?`}

                onConfirm={_onSubmitOrderItemListDelete}
                onClose={_onDeleteConfirmModalClose}
            ></ConfirmModalComponent>
        </>
    );
}
export default ItemTableComponent;