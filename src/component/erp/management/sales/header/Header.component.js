import { Container, Wrapper } from "./Header.styled";
import HeaderFieldView from "./HeaderField.view";

function Layout({ children }) {
    return (
        <Container>
            <Wrapper>
                {children}
            </Wrapper>
        </Container>
    );
}
const HeaderComponent = (props) => {
    return (
        <>
            {/* <Container>
                <Wrapper>
                    <HeaderFieldView
                        onActionOpenHeaderSettingModal={props._onAction_openHeaderSettingModal}
                    ></HeaderFieldView>
                </Wrapper>
            </Container> */}
            <Layout>
                <HeaderFieldView
                    onActionOpenHeaderSettingModal={props._onAction_openHeaderSettingModal}
                ></HeaderFieldView>
            </Layout>
        </>
    );
}
export default HeaderComponent;