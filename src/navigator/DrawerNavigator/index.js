// @flow
import React from 'react';
import {
  Stack,
  Scene,
  Actions,
  ActionConst,
  Drawer,
} from 'react-native-router-flux';

import {
  TabButtonLeft,
} from '../../components';
import { Metrics} from '../../theme';
import Messages from '../../containers/Messages';
import chatScreen from '../../containers/chatScreen';
import Sidebar from '../../containers/Sidebar';
import History from '../../containers/History';


class DrawerMenu {
  getDrawerMenu() {
    return (
      <Drawer
        drawer
        hideNavBar
        type={ActionConst.RESET}
        key="dashboard"
        contentComponent={Sidebar}
        renderLeftButton={() => (
          <TabButtonLeft
            imagesArray={['rightArrow']}
            actions={[Actions.drawerOpen]}
          />
        )}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenHandler={ratio => {
          return {
            mainOverlay: {
              opacity: ratio === 0 ? 0 : 0.3,
              backgroundColor: '#000',
            },
          };
        }}
        drawerWidth={Metrics.screenWidth * 0.72}>
        <Scene hideNavBar>
          <Stack key="root">
            <Scene hideNavBar key="Message" component={chatScreen} />
            <Scene hideNavBar key="Messages" component={Messages} />
            <Scene hideNavBar key="History" component={History} />
          </Stack>
        </Scene>
      </Drawer>
    );
  }
}

export default new DrawerMenu();
