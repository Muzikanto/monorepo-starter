type ICreateAppEventArgs<Data> = Omit<IAppEvent<Data>, 'timestamp' | 'name'>;

export interface IAppEvent<Data> {
  name: string;
  timestamp: number;
  data: Data;
}

export class AppEvent<Data = object> implements IAppEvent<Data> {
  public name: string;
  public timestamp: number;
  public data: Data;

  constructor(args: ICreateAppEventArgs<Data>) {
    const { data } = args;

    this.timestamp = new Date().getTime();
    this.data = data;
    this.name = this.constructor.name || 'AppEvent';
  }

  public toJson(): IAppEvent<Data> {
    return {
      name: this.name,
      timestamp: this.timestamp,
      data: this.data,
    };
  }

  public static create<Data>(args: ICreateAppEventArgs<Data>): AppEvent<Data> {
    const event = new AppEvent<Data>(args);

    event.name = this.name || this.constructor.name || event.name;

    return event;
  }
}
