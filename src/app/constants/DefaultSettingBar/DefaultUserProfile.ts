import { ApplicationInterfaces, BarNames, BarTypes } from '#application';

const width = 415;
export const DefaultUserProfile: ApplicationInterfaces.ISettingBar = {
  name: BarNames.USER_PROFILE,
  type: BarTypes.VERTICAL,
  title: 'Информация о пользователе',
  position: { x: window.innerWidth - width - 10, y: 55 },
  size: { width: width, height: 250 },
  isVisible: true,
  isClosed: true,
  isResizable: true,
  isDraggable: true,
};
