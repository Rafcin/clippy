export interface Plugin {
  name: string;
  process: (data: any) => any;
}
