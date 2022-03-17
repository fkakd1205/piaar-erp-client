import React, { useCallback, useMemo, useReducer, useState } from 'react';
import styled from 'styled-components';
import CustomCheckbox from '../../../module/checkbox/CustomCheckbox';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';
import ConfirmModalComponent from '../../../module/modal/ConfirmModalComponent';
import { dateToYYYYMMDD, dateToYYYYMMDDhhmmss, dateToYYYYMMDDhhmmssFile } from '../../../../utils/dateFormatUtils';
import OptionCodeModalComponent from './OptionCodeModalComponent';
import InfiniteScrollObserver from '../../../module/observer/InfiniteScrollObserver';

const Container = styled.div`
    margin-top: 20px;
`;

const TitleBox = styled.div`
    padding: 0 30px;
    font-size: 18px;
    font-weight: 600;
    
    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const TableWrapper = styled.div`
    margin-top: 10px;
    padding: 0 30px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const TableBox = styled.div`
    height: 300px;
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
        font-size: 12px;
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
        font-size: 11px;
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

    .option-code-item{
        cursor: pointer;
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
    margin-top: 10px;

    @media only screen and (max-width:768px){
        padding: 0 10px;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const ButtonBox = styled.div`
    .common-btn-item{
        width: 100px;
        height: 34px;

        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 5px;

        font-size: 14px;
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

const CheckedItemTableComponent = (props) => {
    const [viewSize, dispatchViewSize] = useReducer(viewSizeReducer, initialViewSize);
    const [salesConfirmModalOpen, setSalesConfirmModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [optionCodeModalOpen, setOptionCodeModalOpen] = useState(false);

    const fetchMoreOrderItems = async () => {
        let newSize = viewSize + 20;
        dispatchViewSize({
            type: 'SET_DATA',
            payload: newSize
        })
    }

    const _onSalesConfirmModalOpen = useCallback(() => {
        if (!props.checkedOrderItemListState || props.checkedOrderItemListState.length <= 0) {
            alert('판매 전환 데이터를 선택해 주세요.');
            return;
        }
        setSalesConfirmModalOpen(true);
    }, [props.checkedOrderItemListState])

    const _onSalesConfirmModalClose = useCallback(() => {
        setSalesConfirmModalOpen(false);
    }, [])

    const _onDeleteConfirmModalOpen = useCallback(() => {
        if (!props.checkedOrderItemListState || props.checkedOrderItemListState.length <= 0) {
            alert('삭제할 데이터를 선택해 주세요.');
            return;
        }
        setDeleteConfirmModalOpen(true);
    }, [props.checkedOrderItemListState])

    const _onDeleteConfirmModalClose = useCallback(() => {
        setDeleteConfirmModalOpen(false);
    }, [])

    const _onOptionCodeModalOpen = useCallback((e) => {
        e.stopPropagation();
        if (!props.checkedOrderItemListState || props.checkedOrderItemListState.length <= 0) {
            alert('수정 될 데이터를 선택해 주세요.');
            return;
        }
        setOptionCodeModalOpen(true);
    }, [props.checkedOrderItemListState])

    const _onOptionCodeModalClose = useCallback((e) => {
        setOptionCodeModalOpen(false);
    }, []);

    const _onCheckedOrderItemListClear = () => {
        props._onCheckedOrderItemListClear()
    }

    // 판매 전환 서밋
    const _onSubmit_changeSalesYnForOrderItemList = useCallback(() => {
        _onSalesConfirmModalClose();

        let data = props.checkedOrderItemListState.map(r => {
            return {
                ...r,
                salesYn: 'n',
                salesAt: null
            }
        })

        props._onSubmit_changeSalesYnForOrderItemList(data);
    }, [_onSalesConfirmModalClose, props]);

    // 데이터 삭제 서밋
    const _onSubmit_deleteOrderItemList = useCallback(() => {
        _onDeleteConfirmModalClose();
        props._onSubmit_deleteOrderItemList(props.checkedOrderItemListState);
    }, [_onDeleteConfirmModalClose, props])

    // 옵션 코드 변경 서밋
    const _onSubmit_changeOptionCodeForOrderItemListInBatch = useCallback((optionCode) => {
        let data = [...props.checkedOrderItemListState];
        data = data.map(r => {
            return {
                ...r,
                optionCode: optionCode
            }
        })

        props._onSubmit_changeOptionCodeForOrderItemListInBatch(data);
        _onOptionCodeModalClose();
    }, [_onOptionCodeModalClose, props]);

    return (
        <>
            <Container>
                <TitleBox>
                    선택된 데이터 ({props.checkedOrderItemListState?.length || 0})
                </TitleBox>
                <OperatorWrapper>
                    <ButtonWrapper>
                        <ButtonBox>
                            <button
                                type='button'
                                className='common-btn-item'
                                onClick={() => _onCheckedOrderItemListClear()}
                            >전체 선택 해제</button>
                        </ButtonBox>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <ButtonBox>
                            <button
                                type='button'
                                className='common-btn-item'
                                onClick={() => _onSalesConfirmModalOpen()}
                            >판매 전환 취소</button>
                        </ButtonBox>
                        <ButtonBox>
                            <button
                                type='button'
                                className='common-btn-item'
                                onClick={(e) => _onOptionCodeModalOpen(e)}
                            >옵션 코드 수정</button>
                        </ButtonBox>
                        <ButtonBox>
                            <button
                                type='button'
                                className='common-btn-item'
                                onClick={() => props._onChange_openExcelDownloadModal()}
                            >엑셀 다운로드</button>
                        </ButtonBox>
                    </ButtonWrapper>
                </OperatorWrapper>
                {props.headerState &&
                    <TableWrapper>
                        <TableBox>
                            <table cellSpacing="0">
                                <colgroup>
                                    {props.headerState?.headerDetail.details.map((r, index) => {
                                        return (
                                            <col key={index} width={'200px'}></col>
                                        );
                                    })}

                                </colgroup>
                                <thead>
                                    <tr>
                                        {props.headerState?.headerDetail.details.map((r, index) => {
                                            return (
                                                <th key={index} className="fiexed-header" scope="col">{r.customCellName}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>

                                <tbody>
                                    {props.checkedOrderItemListState?.slice(0, viewSize).map((r1, rowIndex) => {
                                        return (
                                            <tr
                                                key={rowIndex}
                                            >
                                                {props.headerState?.headerDetail.details.map(r2 => {
                                                    let matchedColumnName = r2.matchedColumnName;
                                                    if (matchedColumnName === 'createdAt') {
                                                        return (
                                                            <td key={r2.cellNumber}>{dateToYYYYMMDDhhmmss(r1[matchedColumnName] || new Date())}</td>
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
                            <InfiniteScrollObserver
                                elementTagType={'div'}
                                totalSize={props.checkedOrderItemListState?.length || 0}
                                startOffset={0}
                                endOffset={viewSize}
                                fetchData={fetchMoreOrderItems}
                                loadingElementTag={
                                    <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#444' }}>
                                        로딩중...
                                    </p>
                                }
                                endElementTag={
                                    <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#444' }}>
                                        마지막 데이터 입니다.
                                    </p>
                                }
                            />
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
                message={`[ ${props.checkedOrderItemListState?.length || 0} ] 건의 데이터를 판매 전환 하시겠습니까?`}

                onConfirm={_onSubmit_changeSalesYnForOrderItemList}
                onClose={_onSalesConfirmModalClose}
            ></ConfirmModalComponent>
            <ConfirmModalComponent
                open={deleteConfirmModalOpen}
                title={'데이터 삭제 확인 메세지'}
                message={`[ ${props.checkedOrderItemListState?.length || 0} ] 건의 데이터를 삭제 하시겠습니까?`}

                onConfirm={_onSubmit_deleteOrderItemList}
                onClose={_onDeleteConfirmModalClose}
            ></ConfirmModalComponent>
            <CommonModalComponent
                open={optionCodeModalOpen}

                onClose={_onOptionCodeModalClose}
            >
                <OptionCodeModalComponent
                    checkedOrderItemListState={props.checkedOrderItemListState}
                    productOptionListState={props.productOptionListState}

                    onConfirm={(optionCode) => _onSubmit_changeOptionCodeForOrderItemListInBatch(optionCode)}
                ></OptionCodeModalComponent>
            </CommonModalComponent>
        </>
    );
}


export default CheckedItemTableComponent;

const initialViewSize = 20;

const viewSizeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return 20;
    }
}