import React, { useCallback, useMemo, useReducer, useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomCheckbox from '../../../module/checkbox/CustomCheckbox';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';
import ConfirmModalComponent from '../../../module/modal/ConfirmModalComponent';
import { dateToYYYYMMDD, dateToYYYYMMDDhhmmss, dateToYYYYMMDDhhmmssFile } from '../../../../utils/dateFormatUtils';
import OptionCodeModalComponent from './OptionCodeModalComponent';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteScrollObserver from '../../../module/observer/InfiniteScrollObserver';

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
    -webkit-gap: 10px;

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

const ItemTableComponent = (props) => {
    const [viewSize, dispatchViewSize] = useReducer(viewSizeReducer, initialViewSize);

    useEffect(() => {
        if (!props.orderItemListState || props.orderItemListState?.length <= 0) {
            return;
        }

        dispatchViewSize({
            type: 'SET_DATA',
            payload: 50
        })
    }, [props.orderItemListState])

    const _isCheckedAll = useCallback(() => {
        if (!props.orderItemListState || props.orderItemListState?.length <= 0) {
            return false;
        }

        return props.orderItemListState.length === props.checkedOrderItemListState.length;
    }, [props.checkedOrderItemListState.length, props.orderItemListState])

    const _isCheckedOne = useCallback((id) => {
        return props.checkedOrderItemListState.some(r => r.id === id);
    }, [props.checkedOrderItemListState])


    const fetchMoreOrderItems = async () => {
        let newSize = viewSize + 20;
        dispatchViewSize({
            type: 'SET_DATA',
            payload: newSize
        })
    }
    return (
        <>
            <Container>
                {(props.headerState && props.orderItemListState) &&
                    <TableWrapper>
                        <TableBox>
                            <table cellSpacing="0">
                                <colgroup>
                                    <col width={'50px'}></col>
                                    {props.headerState?.headerDetail.details.map((r, index) => {
                                        return (
                                            <col key={index} width={'200px'}></col>
                                        );
                                    })}

                                </colgroup>
                                <thead>
                                    <tr>
                                        <th
                                            className="fiexed-header"
                                            onClick={() => props._onChange_checkAllCheckedOrderListState()}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <input
                                                type='checkbox'
                                                checked={_isCheckedAll()}

                                                onChange={() => props._onChange_checkAllCheckedOrderListState()}
                                            ></input>
                                        </th>
                                        {props.headerState?.headerDetail.details.map((r, index) => {
                                            return (
                                                <th key={index} className="fiexed-header" scope="col">{r.customCellName}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>

                                <tbody>
                                    {props.orderItemListState &&
                                        <>
                                            {props.orderItemListState?.slice(0, viewSize).map((r1, rowIndex) => {
                                                let checked = _isCheckedOne(r1.id)
                                                return (
                                                    <tr
                                                        key={rowIndex}
                                                        className={`${checked && 'tr-active'}`}
                                                        onClick={(e) => props._onChange_checkOneCheckedOrderListState(e, r1)}
                                                    >
                                                        <td style={{ cursor: 'pointer' }}>
                                                            <input type='checkbox' checked={checked} onChange={(e) => props._onChange_checkOneCheckedOrderListState(e, r1)}></input>
                                                        </td>
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
                                        </>
                                    }
                                </tbody>
                            </table>
                            <InfiniteScrollObserver
                                elementTagType={'div'}
                                totalSize={props.orderItemListState.length}
                                startOffset={0}
                                endOffset={viewSize}
                                fetchData={fetchMoreOrderItems}
                                loadingElementTag={
                                    <p style={{ textAlign: 'center', fontSize:'14px', fontWeight:'600', color:'#444' }}>
                                        로딩중...
                                    </p>
                                }
                                endElementTag={
                                    <p style={{ textAlign: 'center', fontSize:'14px', fontWeight:'600', color:'#444' }}>
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
        </>
    );
}


export default ItemTableComponent;

const initialViewSize = 50;

const viewSizeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return 50;
    }
}