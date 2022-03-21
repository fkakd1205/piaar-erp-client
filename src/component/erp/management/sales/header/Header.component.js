import { Container, Wrapper } from "./Header.styled";
import HeaderFieldView from "./HeaderField.view";

const HeaderComponent = (props) => {
    return (
        <>
            <Container>
                <Wrapper>
                    <HeaderFieldView
                        onActionOpenHeaderSettingModal={props._onAction_openHeaderSettingModal}
                    ></HeaderFieldView>
                </Wrapper>
            </Container>
        </>
    );
}
export default HeaderComponent;