import { PageContentFieldWrapper } from "./SingleAddModal.styled";

export default function PageContentFieldView(props) {
    return (
        <PageContentFieldWrapper>
            <div style={{fontSize:'12px', color:'#2C73D2', fontWeight:'600'}}>
                <span style={{color:'red'}}>*</span> 는 필수 항목 입니다.
            </div>
            {props.allowedFields.map(detail => {
                if (detail.requiredFlag) {
                    return (
                        <div
                            key={detail.matchedColumnName}
                            className='input-box'
                        >
                            <div
                                className='input-label'
                                style={{ color: 'red' }}
                            >
                                {detail.originCellName} *
                            </div>
                            <input
                                className='input-el'
                                name={detail.matchedColumnName}
                                type={detail.variableType === 'number' ? 'number' : 'text'}
                                value={props.dataValue[detail.matchedColumnName] || ''}
                                onChange={props.onActionChangeDataValue}
                            ></input>
                        </div>
                    );
                }

                return null;
            })}
            {props.allowedFields.map(detail => {
                if (!detail.requiredFlag) {
                    return (
                        <div
                            key={detail.matchedColumnName}
                            className='input-box'
                        >
                            <div
                                className='input-label'
                            >
                                {detail.originCellName}
                            </div>
                            <input
                                className='input-el'
                                name={detail.matchedColumnName}
                                type={detail.variableType === 'number' ? 'number' : 'text'}
                                value={props.dataValue[detail.matchedColumnName] || ''}
                                onChange={props.onActionChangeDataValue}
                            ></input>
                        </div>
                    );
                }
                return null;
            })}

        </PageContentFieldWrapper>
    );
}