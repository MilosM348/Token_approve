import styled from "styled-components";

export const Styles = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    padding: 20px 50px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    .menu {
      display: flex;
      justify-content: center;
      .menu-item {
        text-decoration: none;
        font-size: 20px;
        color: black;
        font-weight: 600;
        padding: 0px 10px;
        cursor: pointer;
      }
    }
    .right {
      button.wallet-connect {
        padding: 10px 15px;
        border-radius: 5px;
        border: solid 1px gray;
        cursor: pointer;
      }
    }
  }
`;