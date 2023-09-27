import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ITheGraphConfig } from './the-graph.types';
import { InjectTheGraphConfig } from './the-graph.inject';

@Injectable()
export class TheGraphService {
  constructor(@InjectTheGraphConfig() protected readonly options: ITheGraphConfig) {}
  public async get<Res extends object, Vars extends object = object>(query: string, variables: Vars): Promise<Res> {
    return axios
      .post(this.options.url, {
        query,
        variables: variables,
      })
      .then((res) => res.data.data);
  }
}
