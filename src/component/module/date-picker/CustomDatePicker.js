import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { forwardRef, useEffect, useRef, useState } from 'react';
import { getMonth, getYear } from 'date-fns';

const Container = styled.div`
    .react-datepicker__header {
        background:white;
        padding: 15px;
    }

    .react-datepicker__navigation{
        top: 15px;
    }
    .react-datepicker-popper{
        z-index: 99;
    }

    .react-datepicker__triangle{
        display: none;
    }

`;

const ButtonBox = styled.div`
    .button-item{
        width: 100%;
        padding: 5px 0;
        background: white;
        border: 1px solid #e1e1e1;
        cursor: pointer;
    }

    .button-label{
        color: #444;
        font-size: ${props => props.labelSize ? props.labelSize : 16}px;
    }

    .button-value{
        /* margin-top: 5px; */
        font-size: ${props => props.valueSize ? props.valueSize : 16}px;
        font-weight: 600;
        color: #444;
    }
`;

const CustomDatePicker = (props) => {
    const calendar = useRef(null);
    const [currentDate, setCurrentDate] = useState();

    const cancelDatePicker = () => {
        calendar.current.setOpen(false);
    };

    const openDatePicker = () => {
        calendar.current.setOpen(true);
    };

    const closeDatePicker = () => {
        // setCurrentDate(startDate);
        calendar.current.setOpen(false);
    };

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <ButtonBox
            valueSize={props.valueSize}
            labelSize={props.labelSize}
        >
            <button className="button-item" onClick={onClick} ref={ref}>
                <div className='button-label'>{props.label || ''}</div>
                <div className='button-value'>{value || '날짜를 선택해 주세요.'}</div>
            </button>
        </ButtonBox>
    ));

    return (
        <>
            <Container>
                <DatePicker
                    locale={ko}
                    dateFormat="yyyy-MM-dd"
                    selected={props.selected || null}
                    onChange={props.onChange}
                    customInput={<ExampleCustomInput />}
                    withPortal
                    // shouldCloseOnSelect={false}
                    ref={calendar}
                    // renderCustomHeader={({
                    //     date,
                    //     prevMonthButtonDisabled,
                    //     nextMonthButtonDisabled,
                    //     decreaseMonth,
                    //     increaseMonth,
                    // }) => (
                    //     <div
                    //         style={{
                    //             margin: 10,
                    //             display: "flex",
                    //             justifyContent: "center",
                    //         }}
                    //     >
                    //         <div
                    //             className="btn_month btn_month-prev"
                    //             onClick={decreaseMonth}
                    //             disabled={prevMonthButtonDisabled}
                    //         >
                    //             <img src="/static/images/arrow-black-left.png" />
                    //         </div>
                    //         <div className="month-day">
                    //             {getYear(date)}.{months[getMonth(date)]}
                    //         </div>

                    //         <div
                    //             className="btn_month btn_month-next"
                    //             onClick={increaseMonth}
                    //             disabled={nextMonthButtonDisabled}
                    //         >
                    //             <img src="/static/images/arrow-black-right.png" />
                    //         </div>
                    //     </div>
                    // )}
                >
                    {/* <div className="button-container">
                        <div className="btn_ctrl btn_ctrl-cancel" onClick={closeDatePicker}>
                            {" "}
                            취소
                        </div>
                        <div className="btn_ctrl btn_ctrl-confirm" onClick={closeDatePicker}>
                            선택
                        </div>
                    </div> */}
                </DatePicker>
            </Container>
        </>
    );
}

const months = [

]
export default CustomDatePicker;