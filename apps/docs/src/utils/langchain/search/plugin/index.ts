import { EngineType } from "..";

export interface Plugin {
  name: string;
  engine: EngineType;
  process: (data: { page: any; [key: string]: any }) => any;
}
