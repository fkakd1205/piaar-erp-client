import { DetailSearchFieldWrapper } from "./SearchOperator.styled";

export default function DetailSearchFieldView(props) {
    return (
        <DetailSearchFieldWrapper>
            <div className='label-item'>상세조건</div>
            <div className='flex-box'>

                <select
                    className='select-item'
                    value={props.searchColumnName || ''}
                    onChange={props.onChangeSearchColumnNameValue}
                >
                    <option value=''>전체</option>
                    {props.viewHeader?.headerDetail?.details?.map(r => {
                        let bool = props.defaultHeaderDetails.map(r2 => r2.allowedSearch ? r2.matchedColumnName : null).includes(r.matchedColumnName);
                        if (bool) {
                            return (
                                <option key={r.matchedColumnName} value={r.matchedColumnName}>{r.customCellName}({r.originCellName})</option>
                            );
                        }
                        return null;
                    })}
                </select>
                {props.searchColumnName &&
                    <input
                        type='text'
                        className='input-item'
                        value={props.searchQuery || ''}
                        onChange={props.onChangeSearchQueryValue}
                        placeholder='입력해주세요.'
                    ></input>
                }
            </div>
        </DetailSearchFieldWrapper>
    );
}