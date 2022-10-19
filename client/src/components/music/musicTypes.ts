export interface ISong {
  artists: {
    adamid: string;
    alias: string;
    id: string;
  }[];
  highlightsurls?: {};
  hub: {
    actions: {
      id?: string;
      name: string;
      type: string;
      uri?: string;
    }[];
    displayname: string;
    explicit: boolean;
    image: string;
    options: {
      actions: {
        id?: string;
        name: string;
        type: string;
        uri?: string;
      }[];
      beacondata: {
        providername: string;
        type: string;
      };
      caption: string;
      colouroverflowimage: boolean;
      image: string;
      listcaption: string;
      overflowimage: string;
      providername: string;
      type: string;
    }[];
    type: string;
  };
  images: {
    background: string;
    coverart: string;
    coverarthq: string;
    joecolor: string;
  };
  key: string;
  layout: string;
  properties: {};
  share: {
    avatar?: string;
    href: string;
    html: string;
    image: string;
    snapchat: string;
    subject: string;
    text: string;
    twitter: string;
  };
  subtitle: string;
  title: string;
  type: string;
  url: string;
}