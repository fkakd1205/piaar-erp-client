import { useCallback, useReducer, useState } from 'react';
import { dateToYYYYMMDDhhmmss } from '../../../../utils/dateFormatUtils';
import Ripple from '../../../module/button/Ripple';
import ConfirmModalComponent from '../../../module/modal/ConfirmModalComponent';
import { ButtonBox, Container, OperatorWrapper, TableBox, TableWrapper } from './SecondMergedItemTable.styled';

const SecondMergedItemTableComponent = (props) => {
    return (
        <>
            <Container>
                {props.headerState &&
                    <TableWrapper>
                        <TableBox>
                            <table cellSpacing="0">
                                <colgroup>
                                    {props.headerState?.headerDetail.details.map((r, index) => {
                                        return (
                                            <col key={index} width={'300px'}></col>
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
                                    {props.orderItemListState?.map((r1, rowIndex) => {
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
                        </TableBox>
                    </TableWrapper>
                }
                {!props.headerState &&
                    <div style={{ textAlign: 'center', padding: '100px 0', fontWeight: '600' }}>2차 병합 헤더를 먼저 설정해 주세요.</div>
                }
            </Container>
        </>
    );
}
export default SecondMergedItemTableComponent;