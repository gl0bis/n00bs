import React from 'react';

import { Resizable } from 're-resizable';
import Game from './Game';
import { WebsocketProvider } from './service/game';
import AppContainer from './components/container/AppContainer';
import SideContainer from './components/container/SideContainer';
import ContentContainer from './components/container/ContentContainer';
import GlobalStyle from './GlobalStyle';
import UserScript from './components/user-script';
import TextContainer from './components/visual/TextContainer';
import HelpText from './components/help-text';

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <WebsocketProvider>
        <AppContainer>
          <Resizable
            defaultSize={{
              width: '40%',
              height: 'auto',
            }}
            minHeight="100%"
            enable={{ right: true }}
          >
            <SideContainer>
              <UserScript />
            </SideContainer>
          </Resizable>
          <ContentContainer>
            <Game />
            <TextContainer>
              <HelpText />
            </TextContainer>
          </ContentContainer>
        </AppContainer>
      </WebsocketProvider>
    </>
  );
}

export default App;
