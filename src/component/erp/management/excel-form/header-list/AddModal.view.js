import Ripple from '../../../../module/button/Ripple';
import { AddModalWrapper } from './HeaderList.styled';

function Title({ title }) {
    return (
        <div className='title-box'>
            {title}
        </div>
    );
}

function Content({ createHeader, onChangeCreateHeaderValue }) {
    return (
        <div className='content-box'>
            <div className='input-box'>
                <div className='input-label'>양식의 이름을 설정해주세요.</div>
                <input
                    type='text'
                    name='title'
                    className='input-el'
                    placeholder='ex) 양식1'
                    value={createHeader.title}
                    onChange={onChangeCreateHeaderValue}
                ></input>
            </div>
        </div>
    );
}

function Footer({ disabledBtn, onCreate, onClose }) {
    return (
        <div className='footer-box'>
            <button
                type='button'
                className='button-el'
                onClick={onClose}
            >
                취소
                <Ripple
                    color={'#c1c1c160'}
                ></Ripple>
            </button>
            <button
                type='submit'
                className='button-el'
                style={{ background: '#2C73D2', color: 'white' }}
                disabled={disabledBtn}
            >
                생성
                <Ripple
                    color={'#e1e1e160'}
                    duration={1000}
                ></Ripple>
            </button>
        </div>
    );
}

export default function AddModalView(props) {
    return (
        <>
            <AddModalWrapper>
                <form onSubmit={(e) => { e.preventDefault(); props.onCreate() }}>
                    <Title
                        title={'다운로드 엑셀 양식 생성'}
                    ></Title>
                    <Content
                        createHeader={props.createHeader}

                        onChangeCreateHeaderValue={props.onChangeCreateHeaderValue}
                    ></Content>
                    <Footer
                        disabledBtn={props.disabledBtn}

                        onCreate={props.onCreate}
                        onClose={props.onClose}
                    ></Footer>
                </form>
            </AddModalWrapper>
        </>
    );
}