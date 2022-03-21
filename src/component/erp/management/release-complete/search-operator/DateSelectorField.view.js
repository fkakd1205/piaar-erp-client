import { DateSelectorFieldWrapper } from "./SearchOperator.styled";
import CustomDatePicker from '../../../../module/date-picker/CustomDatePicker';

export default function DateSelectorFieldView(props) {
    return (
        <DateSelectorFieldWrapper>
            <div className='label-item'>조회기간 (주문등록일)</div>
            <div className='flex-box'>
                <select
                    className='select-item'
                    value={props.periodType || ''}
                    onChange={props.onChangePeriodType}
                >
                    <option value=''>선택</option>
                    <option value='registration'>주문등록일</option>
                    <option value='sales'>판매등록일</option>
                </select>
                {props.periodType &&
                    <>
                        <div className='date-selector-box'>
                            <CustomDatePicker
                                valueSize={14}
                                labelSize={12}
                                label={'시작일'}
                                selected={props.startDate}
                                onChange={value => props.onChangeStartDateValue(value)}
                            ></CustomDatePicker>
                        </div>
                        <div className='date-selector-box'>
                            <CustomDatePicker
                                valueSize={14}
                                labelSize={12}
                                label={'종료일'}
                                selected={props.endDate}
                                onChange={value => props.onChangeEndDateValue(value)}
                            ></CustomDatePicker>
                        </div>
                    </>
                }

            </div>
        </DateSelectorFieldWrapper>
    );
}