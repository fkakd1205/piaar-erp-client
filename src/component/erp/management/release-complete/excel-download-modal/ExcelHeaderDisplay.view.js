import { ExcelHeaderDisplayWrapper, TableBox, TableWrapper } from "./ExcelDownloadModal.styled";

const Colgroup = ({ header }) => {
    return (
        <colgroup>
            {header.headerDetail.details.map((r, index) => {
                return (
                    <col key={index} width={'200px'}></col>
                );
            })}

        </colgroup>
    );
}

const TableHead = ({ header }) => {
    return (
        <thead>
            <tr>
                {header.headerDetail.details.map((r, index) => {
                    return (
                        <th key={index} scope="col">{r.customCellName}</th>
                    )
                })}
            </tr>
        </thead>
    );
}

const TableBody = ({ defaultHeaderDetails, header }) => {
    return (
        <tbody>
            <tr>
                {header.headerDetail.details.map((detail, index) => {
                    let name = detail.viewDetails.map(r => {
                        let originCellName = defaultHeaderDetails.filter(dr => dr.matchedColumnName === r.matchedColumnName)[0].originCellName;
                        return originCellName;
                    });
                    return (
                        <td key={detail.matchedColumnName}>
                            {name.join(detail.splitter)}
                        </td>
                    );
                })}
            </tr>
        </tbody>
    );
}

const ExcelHeaderDisplayView = (props) => {
    return (
        <>
            <ExcelHeaderDisplayWrapper>
                <div className='table-box'>
                    <table cellSpacing="0">
                        <Colgroup
                            header={props.selectedExcelHeader}
                        ></Colgroup>
                        <TableHead
                            header={props.selectedExcelHeader}
                        ></TableHead>
                        <TableBody
                            defaultHeaderDetails={props.defaultHeaderDetails}
                            header={props.selectedExcelHeader}
                        ></TableBody>
                    </table>
                </div>
            </ExcelHeaderDisplayWrapper>
        </>
    );
}
export default ExcelHeaderDisplayView;