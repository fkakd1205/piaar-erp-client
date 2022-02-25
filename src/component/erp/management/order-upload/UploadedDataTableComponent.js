import styled from 'styled-components';

const Container = styled.div`

`;

const TableWrapper = styled.div`
    padding: 10px 30px;

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

const erpOrderUploadDefaultHeader = [
    '피아르 고유번호',
    '주문번호1',
    '주문번호2',
    '주문번호3',
    '상품명',
    '옵션명',
    '수량',
    '수취인명',
    '전화번호1',
    '전화번호2',
    '주소',
    '우편번호',
    '배송방식',
    '배송메세지',
    '상품고유번호1',
    '상품고유번호2',
    '옵션고유번호1',
    '옵션고유번호2',
    '피아르 상품코드',
    '피아르 옵션코드',
    '관리메모1',
    '관리메모2',
    '관리메모3',
    '관리메모4',
    '관리메모5',
    '관리메모6',
    '관리메모7',
    '관리메모8',
    '관리메모9',
    '관리메모10',
    '관리메모11',
    '관리메모12',
    '관리메모13',
    '관리메모14',
    '관리메모15',
    '관리메모16',
    '관리메모17',
    '관리메모18',
    '관리메모19',
    '관리메모20'
];

const UploadedDataTableComponent = (props) => {
    return (
        <>
            <Container>
                <TableWrapper>
                    <TableBox>
                        <table cellSpacing="0">
                            <colgroup>
                                {erpOrderUploadDefaultHeader.map((r, index) => {
                                    return (
                                        <col key={index} width={'300px'}></col>
                                    );
                                })}

                            </colgroup>
                            <thead>
                                <tr>
                                    {erpOrderUploadDefaultHeader.map((data, index) => {
                                        return (
                                            <th key={index} className="fiexed-header" scope="col">{data}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {props.uploadedExcelDataState?.map((rowData, rowIndex) => {
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
                    </TableBox>
                </TableWrapper>
            </Container>
        </>
    );
}
export default UploadedDataTableComponent;