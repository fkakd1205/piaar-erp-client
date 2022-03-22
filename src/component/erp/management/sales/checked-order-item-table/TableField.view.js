import { dateToYYYYMMDDhhmmss } from '../../../../../utils/dateFormatUtils';
import InfiniteScrollObserver from '../../../../module/observer/InfiniteScrollObserver';
import { TableFieldWrapper } from './CheckedOrderItemTable.styled';

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div
                className='table-box'
            >
                <table cellSpacing="0">
                    <colgroup>
                        {props.viewHeader?.headerDetail.details?.map((r, index) => {
                            return (
                                <col key={index} width={'200px'}></col>
                            );
                        })}

                    </colgroup>
                    <thead>
                        <tr>
                            {props.viewHeader?.headerDetail.details?.map((r, index) => {
                                return (
                                    <th key={index} className="fixed-header" scope="col">{r.customCellName}</th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {props.checkedOrderItemList &&
                            <>
                                {props.checkedOrderItemList?.slice(0, props.viewSize).map((r1, rowIndex) => {
                                    return (
                                        <tr
                                            key={rowIndex}
                                        >
                                            {props.viewHeader?.headerDetail.details?.map(r2 => {
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
                    totalSize={props.checkedOrderItemList.length}
                    startOffset={0}
                    endOffset={props.viewSize}
                    fetchData={props.onActionfetchMoreOrderItems}
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
            </div>
        </TableFieldWrapper>
    );
}