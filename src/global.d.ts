import Chrome from 'chrome';

declare namespace chrome {
  export default Chrome;
}

declare module 'virtual:reload-on-update-in-background-script' {
  export const reloadOnUpdate: (watchPath: string) => void;
  export default reloadOnUpdate;
}

declare module 'virtual:reload-on-update-in-view' {
  const refreshOnUpdate: (watchPath: string) => void;
  export default refreshOnUpdate;
}

declare type ChaynsUserInfo = {
  AdminMode: boolean;
  FacebookUserName: string;
  FirstName: string;
  Gender: unknown;
  Language: 'de' | unknown;
  LastName: string;
  PersonID: string;
  TobitAccessToken: string;
  TobitUserID: number;
};

declare type ChaynsTappInfo = {
  ExclusiveMode: boolean;
  HideFromMenu: boolean;
  Icon: { source: string; type: unknown };
  Id: number;
  ShowName: string;
  SortID: number;
  UserGroupIds: number[];
  customUrl: string;
  isSubTapp: boolean;
  minAge: number;
  viewMode: unknown;
};

declare type ChaynsSiteInfo = {
  ChaynsProLicense: boolean;
  ColorScheme: unknown;
  CurrentUrl: string;
  Environment: 'Release' | unknown;
  FontID: unknown;
  IsColorSchemeDark: boolean;
  Language: 'de' | unknown;
  LocationID: number;
  LocationPersonID: string;
  SiteID: string;
  TappSelected: ChaynsTappInfo;
  Title: string;
  TransLang: 'de' | unknown;
  Version: string;
  color: string;
  colorMode: unknown;
  domain: string;
  headlineFontId: unknown;
  isApiDialogsAvailable: boolean;
  urlHash: string;
};

declare type ChaynsData = {
  UserInfo: ChaynsUserInfo;
  SiteInfo: ChaynsSiteInfo;
};

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}
