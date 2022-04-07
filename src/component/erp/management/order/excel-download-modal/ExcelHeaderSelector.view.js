import { ExcelHeaderSelectorWrapper } from "./ExcelDownloadModal.styled";


const ExcelHeaderSelectorView = (props) => {
    return (
        <>
            <ExcelHeaderSelectorWrapper>
                <div className='select-wrapper'>
                    <div className='select-label'>다운로드 양식을 선택해 주세요.</div>
                    <select
                        className='select-el'
                        value={props.selectedExcelHeader?.id || ''}
                        onChange={props.onActionSelectExcelFormHeader}
                    >
                        <option value=''>선택</option>
                        {props.downloadExcelList?.map(excelFormHeader => {
                            return (
                                <option
                                    key={excelFormHeader.id}
                                    value={excelFormHeader.id}
                                >{excelFormHeader.title}</option>
                            );
                        })}
                    </select>
                </div>
            </ExcelHeaderSelectorWrapper>
        </>
    );
}
export default ExcelHeaderSelectorView;