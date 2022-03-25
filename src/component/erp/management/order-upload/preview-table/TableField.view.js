import { TableFieldWrapper } from "./PreviewTable.styled";

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div className='table-box'>
                <table cellSpacing="0">
                    <colgroup>
                        {props.erpOrderUploadDefaultHeader.map((r, index) => {
                            return (
                                <col key={index} width={'300px'}></col>
                            );
                        })}

                    </colgroup>
                    <thead>
                        <tr>
                            {props.erpOrderUploadDefaultHeader.map((data, index) => {
                                return (
                                    <th key={index} className="fixed-header" scope="col">{data.originCellName}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {props.excelDataList?.map((rowData, rowIndex) => {
                            return (
                                <tr key={rowIndex}>
                                    <td>{rowData.uniqueCode}</td>
                                    <td>{rowData.orderNumber1}</td>
                                    <td>{rowData.orderNumber2}</td>
                                    <td>{rowData.orderNumber3}</td>
                                    <td>{rowData.prodName}</td>
                                    <td>{rowData.optionName}</td>
                                    <td>{rowData.unit}</td>
                                    <td>{rowData.receiver}</td>
                                    <td>{rowData.receiverContact1}</td>
                                    <td>{rowData.receiverContact2}</td>
                                    <td>{rowData.destination}</td>
                                    <td>{rowData.zipCode}</td>
                                    <td>{rowData.transportType}</td>
                                    <td>{rowData.deliveryMessage}</td>
                                    <td>{rowData.prodUniqueNumber1}</td>
                                    <td>{rowData.prodUniqueNumber2}</td>
                                    <td>{rowData.optionUniqueNumber1}</td>
                                    <td>{rowData.optionUniqueNumber2}</td>
                                    <td>{rowData.prodCode}</td>
                                    <td>{rowData.optionCode}</td>
                                    <td>{rowData.managementMemo1}</td>
                                    <td>{rowData.managementMemo2}</td>
                                    <td>{rowData.managementMemo3}</td>
                                    <td>{rowData.managementMemo4}</td>
                                    <td>{rowData.managementMemo5}</td>
                                    <td>{rowData.managementMemo6}</td>
                                    <td>{rowData.managementMemo7}</td>
                                    <td>{rowData.managementMemo8}</td>
                                    <td>{rowData.managementMemo9}</td>
                                    <td>{rowData.managementMemo10}</td>
                                    <td>{rowData.managementMemo11}</td>
                                    <td>{rowData.managementMemo12}</td>
                                    <td>{rowData.managementMemo13}</td>
                                    <td>{rowData.managementMemo14}</td>
                                    <td>{rowData.managementMemo15}</td>
                                    <td>{rowData.managementMemo16}</td>
                                    <td>{rowData.managementMemo17}</td>
                                    <td>{rowData.managementMemo18}</td>
                                    <td>{rowData.managementMemo19}</td>
                                    <td>{rowData.managementMemo20}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </TableFieldWrapper>
    );
}