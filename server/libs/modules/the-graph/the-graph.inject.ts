import { Inject } from '@nestjs/common';

export const THE_GRAPH_CONFIG_KEY = 'the-graph-key';
export const InjectTheGraphConfig = (): ParameterDecorator => Inject(THE_GRAPH_CONFIG_KEY);
