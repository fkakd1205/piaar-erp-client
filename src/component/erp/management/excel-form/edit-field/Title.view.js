import { TitleWrapper } from "./EditField.styled";

const Title = ({ title }) => {
    return (
        <TitleWrapper>
            <div className='title'>
                {title}
            </div>
        </TitleWrapper>
    );
}

const TitleView = (props) => {
    return (
        <>
            <Title
                title={props.title}
            ></Title>
        </>
    );
}
export default TitleView;