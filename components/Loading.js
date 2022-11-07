import styled, { keyframes } from "styled-components"

const Loading = () => {
    return (
        <Content>
            <SLoading className="loader"></SLoading>
        </Content>
    )
}

export default Loading

const spin = keyframes`
    0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Content = styled.div`
    display: flex;
    justify-content: center;
`

const SLoading = styled.div`
    border: 10px solid #f3f3f3;
    border-top: 10px solid #3498db;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: ${spin} 1s linear infinite;
`
