import styled from 'styled-components';

const Container = styled.div`

`;

const TitleFieldWrapper = styled.div`
    padding: 10px 10px;
    border-bottom: 1px solid #e1e1e1;
    
    .title-box{
        font-size: 18px;
        font-weight: 600;

    }
`;

const SampleDownloadFieldWrapper = styled.div`
    margin-top: 10px;
    padding: 0 10px;
    .button-box{

    }

    .button-el{
        overflow: hidden;
        position: relative;
        width: 80px;
        height: 25px;

        background: #fff;
        border: 1px solid #a1a1a1;
        border-radius: 2px;

        font-size: 12px;
        font-weight: 700;
        color: #555;

        cursor: pointer;
        
        transition: all .1s;
    }
`;

const FileUploaderFieldWrapper = styled.div`
    margin-top: 10px;
    padding: 0 10px;
    display: flex;
    align-items: center;

    .input-el{
        flex:1;
        box-sizing: border-box;
        width: 100%;
        height:30px;

        margin-right: 10px;
        padding: 0 5px;

        background:#e0e0e040;
        border:1px solid #e0e0e0;
        border-radius: 2px;

        cursor: default;

        &:focus{
            outline: none;
        }
    }

    .button-el{
        width:100px;
        height:30px;

        background:#2C73D2;
        border:1px solid #2C73D2;
        border-radius: 2px;
        
        color:white;
        font-weight: 600;

        cursor:pointer;        
    }
`;

const ButtonFieldWrapper = styled.div`
    margin-top: 20px;
    .flex-box{
        display: flex;
    }

    .button-el{
        position:relative;
        overflow: hidden;

        width:100%;

        padding:8px 0;

        background:white;
        border:1px solid #fff;

        font-weight: 600;
        
        cursor: pointer;

        &:hover{
            background:#e0e0e040;
        }
    }
`;

export {
    Container,
    TitleFieldWrapper,
    SampleDownloadFieldWrapper,
    FileUploaderFieldWrapper,
    ButtonFieldWrapper
}