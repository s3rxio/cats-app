import headerStylesModule from "./header.module.scss";

const headerStyles = {
  root: headerStylesModule.header,
  container: headerStylesModule.header__container,
  link: headerStylesModule.header__link,
  linkActive: headerStylesModule.header__link_active,
};

export { headerStylesModule, headerStyles };
